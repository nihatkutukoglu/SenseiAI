
import pandas as pd
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import classification_report, confusion_matrix, accuracy_score
import xgboost as xgb
import shap
import joblib
import math
from statsmodels.stats.outliers_influence import variance_inflation_factor

# 1. Veri Yükleme
# Reading the dataset (assuming the file exists in the same directory)
try:
    df = pd.read_csv('sensei_churn_data.csv')
except FileNotFoundError:
    # If not found, create a dummy dataframe for demonstration purposes if needed, 
    # but here we'll assume the user has the file as implied by the notebook context.
    print("Error: 'sensei_churn_data.csv' not found.")
    exit()

# ---------------------------------------------------------
# GENİŞLETİLMİŞ EDA (Exploratory Data Analysis) SÜRECİ
# ---------------------------------------------------------

# 1. Genel Resim
def check_df(dataframe, head=5):
    print("##################### Shape #####################")
    print(dataframe.shape)
    print("##################### Types #####################")
    print(dataframe.dtypes)
    print("##################### Head #####################")
    print(dataframe.head(head))
    print("##################### Tail #####################")
    print(dataframe.tail(head))
    print("##################### NA #####################")
    print(dataframe.isnull().sum())
    print("##################### Info #####################")
    print(dataframe.info())
    print("##################### Describe #####################")
    print(dataframe.describe().T)

print("Checking DataFrame...")
check_df(df)

# 2. Kategorik Değişken Analizi
def cat_summary(dataframe, col_name, plot=False):
    print(f"\n####### {col_name} Değişkeni Analizi #######")
    print(pd.DataFrame({col_name: dataframe[col_name].value_counts(),
                        "Ratio": 100 * dataframe[col_name].value_counts() / len(dataframe)}))
    if plot:
        plt.figure(figsize=(8, 5))
        sns.countplot(x=dataframe[col_name], data=dataframe, palette='viridis')
        plt.title(f"{col_name} Dağılımı")
        plt.savefig(f'cat_summary_{col_name}.png')
        plt.close()

print("\n📊 Kategorik Değişken Analizleri")
cat_summary(df, "subscription_plan", plot=True)
cat_summary(df, "churn", plot=True)

# 3. Sayısal Değişken Analizi
print("\n🔢 Sayısal Değişken Analizleri")
# Note: subscription_plan_encoded doesn't exist yet, so this list is safe.
num_cols = [col for col in df.columns if df[col].dtypes != "O" and col not in ["user_id", "churn"]]

def num_summary(dataframe, numerical_col, plot=False):
    quantiles = [0.05, 0.10, 0.20, 0.30, 0.40, 0.50, 0.60, 0.70, 0.80, 0.90, 0.95, 0.99]
    print(f"\n####### {numerical_col} İstatistikleri #######")
    print(dataframe[numerical_col].describe(quantiles).T)
    if plot:
        plt.figure(figsize=(12, 4))
        plt.subplot(1, 2, 1)
        dataframe[numerical_col].hist(bins=20, color='skyblue', edgecolor='black')
        plt.xlabel(numerical_col)
        plt.title(f"{numerical_col} Histogram")
        
        plt.subplot(1, 2, 2)
        sns.boxplot(x=dataframe[numerical_col], color='orange')
        plt.title(f"{numerical_col} Boxplot")
        plt.tight_layout()
        plt.savefig(f'num_summary_{numerical_col}.png')
        plt.close()

for col in num_cols:
    num_summary(df, col, plot=True)

# 4. Hedef Değişken Analizi
print("\n🎯 Hedef Değişken (Churn) Analizi")
def target_summary_with_num(dataframe, target, numerical_col):
    print(f"\n{numerical_col} ortalamasının {target} sınıfına göre dağılımı:")
    print(dataframe.groupby(target).agg({numerical_col: "mean"}), end="\n\n")

for col in num_cols:
    target_summary_with_num(df, "churn", col)

# Eksik Değer Doldurma (Imputation)
print("Performing imputation...")
df['daily_avg_minutes'] = df['daily_avg_minutes'].fillna(df['daily_avg_minutes'].median())
df['sensei_interact_count'] = df['sensei_interact_count'].fillna(df['sensei_interact_count'].median())

# Encoding
print("Encoding categorical variables...")
le = LabelEncoder()
df['subscription_plan_encoded'] = le.fit_transform(df['subscription_plan'])

# Update num_cols to include the new encoded column for the final plot
if 'subscription_plan_encoded' not in num_cols:
    num_cols.append('subscription_plan_encoded')

# Görsel Hedef Analizi - FIXED with dynamic rows
print("Generating Churn Boxplots...")
plt.figure(figsize=(15, 12))
rows = math.ceil(len(num_cols) / 2)
for i, col in enumerate(num_cols):
    plt.subplot(rows, 2, i+1)
    sns.boxplot(x="churn", y=col, data=df, palette="Set2")
    plt.title(f"Churn'e Göre {col.capitalize()}")
plt.tight_layout()
plt.savefig('churn_boxplots_fixed.png')
plt.close()
print("Boxplots saved to churn_boxplots_fixed.png")

# Korelasyon Analizi
print("\n🔥 Korelasyon Analizi")
numeric_df = df.select_dtypes(include=[np.number])
plt.figure(figsize=(10, 8))
sns.heatmap(numeric_df.corr(), annot=True, cmap='coolwarm', fmt=".2f", linewidths=0.5)
plt.title("Değişkenler Arası Korelasyon Matrisi")
plt.savefig('correlation_heatmap.png')
plt.close()

# VIF Analysis
print("\nCalcalating VIF...")
features = ['age', 'daily_avg_minutes', 'sensei_interact_count', 'last_login_days', 'subscription_plan_encoded']
X_check = df[features]
vif_data = pd.DataFrame()
vif_data["Feature"] = X_check.columns
vif_data["VIF"] = [variance_inflation_factor(X_check.values, i) for i in range(len(X_check.columns))]
print("📊 VIF Analiz Sonuçları:")
print(vif_data)

# Dropping correlated column
print("\nDropping columns based on analysis...")
X = df.drop(columns=['churn', 'user_id', 'subscription_plan', 'daily_avg_minutes'])
y = df['churn']

# Train Test Split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=42)

print("✅ Veri setleri hazır!")
print(f"Eğitim Seti: {X_train.shape}")
print(f"Test Seti: {X_test.shape}")

# Model (XGBoost)
param_grid = {
    'n_estimators': [100, 200, 300],
    'learning_rate': [0.01, 0.05, 0.1],
    'max_depth': [3, 5, 7],
    'subsample': [0.8, 0.9, 1.0]
}

xgb_clf = xgb.XGBClassifier(
    random_state=42,
    use_label_encoder=False,
    eval_metric='logloss'
)

print("⏳ GridSearch ile en iyi model aranıyor...")
grid_search = GridSearchCV(estimator=xgb_clf, param_grid=param_grid, cv=3, n_jobs=-1, verbose=1)
grid_search.fit(X_train, y_train)

print(f"✅ En İyi Parametreler: {grid_search.best_params_}")
print(f"✅ En İyi Cross-Validation Skoru: {grid_search.best_score_:.4f}")

model = grid_search.best_estimator_
y_pred = model.predict(X_test)

print("✅ Final Model Eğitildi ve Test Edildi.")
print("--- Sınıflandırma Raporu ---")
print(classification_report(y_test, y_pred))

joblib.dump(model, 'sensei_churn_model.pkl')
print("💾 Model 'sensei_churn_model.pkl' olarak kaydedildi.")

# Confusion Matrix
plt.figure(figsize=(6, 5))
sns.heatmap(confusion_matrix(y_test, y_pred), annot=True, fmt='d', cmap='Blues')
plt.title('Confusion Matrix')
plt.xlabel('Tahmin')
plt.ylabel('Gerçek')
plt.savefig('confusion_matrix.png')
plt.close()

# SHAP
print("Running SHAP analysis...")
try:
    explainer = shap.Explainer(model)
    shap_values = explainer(X_test)

    plt.figure()
    plt.title('Model Kararlarını Etkileyen Faktörler (SHAP Summary)', fontsize=14)
    shap.summary_plot(shap_values, X_test, show=False)
    plt.savefig('shap_summary.png')
    plt.close()
    print("SHAP summary plot saved.")
except Exception as e:
    print(f"SHAP Analysis failed: {e}")

# ---------------------------------------------------------
# 8. DEPLOYMENT (Canlıya Alma Simülasyonu - CLI)
# ---------------------------------------------------------
print("\n" + "="*40)
print("🚀 8. DEPLOYMENT SİMÜLASYONU (CLI)")
print("="*40)
print("Model canlıya alındı! Aşağıya değer girerek test edebilirsiniz.")
print("(Çıkmak için 'q' yazın)\n")

while True:
    print("\n--- Yeni Müşteri Analizi ---")
    try:
        user_input = input("Devam etmek için Enter, çıkmak için 'q': ")
        if user_input.lower() == 'q':
            break
            
        age_in = float(input("Yaş (Örn: 30): "))
        login_in = float(input("Son Giriş (Gün önce, Örn: 5): "))
        interact_in = float(input("Etkileşim Sayısı (Örn: 10): "))
        plan_in = input("Plan (Free/Pro/Sensei_Master): ")
        
        # Encoding map (based on training)
        plan_map = {'Free': 0, 'Pro': 1, 'Sensei_Master': 2}
        if plan_in not in plan_map:
            print("⚠️ Geçersiz plan! Varsayılan 'Free' alındı.")
            plan_val = 0
        else:
            plan_val = plan_map[plan_in]
            
        # DataFrame oluştur (Sıralama eğitimdeki X_train.columns ile aynı olmalı)
        # Model eğitiminde: ['age', 'sensei_interact_count', 'last_login_days', 'subscription_plan_encoded']
        # (daily_avg_minutes düşürülmüştü)
        
        new_customer = pd.DataFrame({
            'age': [age_in],
            'sensei_interact_count': [interact_in],
            'last_login_days': [login_in],
            'subscription_plan_encoded': [plan_val]
        })
        
        # Tahmin
        prob = model.predict_proba(new_customer)[0][1]
        pred = model.predict(new_customer)[0]
        
        print(f"\n>> TAHMİN SONUCU:")
        if pred == 1:
            print(f"🚨 RİSKLİ MÜŞTERİ (Churn) - Olasılık: %{prob*100:.1f}")
            print("👉 Aksiyon: Acil 'Seni Özledik' bildirimi gönderilmeli!")
        else:
            print(f"✅ GÜVENLİ MÜŞTERİ (Sadık) - Olasılık: %{(1-prob)*100:.1f}")
            
    except ValueError:
        print("❌ Hatalı giriş! Lütfen sayısal değer giriniz.")
    except Exception as e:
        print(f"❌ Bir hata oluştu: {e}")
        break

print("Simülasyon tamamlandı.")

