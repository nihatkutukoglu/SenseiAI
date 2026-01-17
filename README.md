# 🧠 SenseiAI

SenseiAI, modern web teknolojileri ve yapay zeka destekli veri analizi yeteneklerini birleştiren kapsamlı bir platformdur. Bu proje, işletmelerin müşteri ilişkilerini yönetmelerine (CRM), kurumsal kaynaklarını planlamalarına (ERP) ve müşteri kaybını (Churn) tahmin etmelerine yardımcı olmak için tasarlanmıştır.

## 📂 Proje Yapısı

Proje üç ana modülden oluşmaktadır:

1.  **crm-erp**: İşletme yönetimi için Next.js tabanlı web uygulaması.
2.  **web**: Kullanıcı arayüzü ve AI Studio etkileşimleri için Vite/React tabanlı frontend.
3.  **veri-madenciligi-notebook**: Müşteri verilerini analiz etmek ve Churn tahmini yapmak için Python tabanlı veri madenciliği modülü.

---

## 🚀 Modüller ve Kurulum

Her modül kendi bağımlılıklarına ve çalıştırma komutlarına sahiptir. Aşağıda her biri için detaylı bilgiler verilmiştir.

### 1. CRM-ERP Modülü (`/crm-erp`)

Next.js framework'ü ile geliştirilmiş CRM ve ERP sistemidir.

**Kurulum ve Çalıştırma:**

```bash
cd crm-erp
npm install
npm run dev
```

Uygulama [http://localhost:3000](http://localhost:3000) adresinde çalışacaktır.

### 2. Web Arayüzü (`/web`)

Hızlı ve modern bir kullanıcı deneyimi için Vite ve React kullanılarak hazırlanmıştır.

**Kurulum ve Çalıştırma:**

```bash
cd web
npm install
npm run dev
```

Uygulama genellikle [http://localhost:5173](http://localhost:5173) adresinde çalışır (terminal çıktısını kontrol edin).

### 3. Veri Madenciliği ve Analiz (`/veri-madenciligi-notebook`)

Müşteri terki (Churn) analizi ve tahminlemesi yapan Python modülüdür. Veri analizi (EDA), görselleştirme ve makine öğrenmesi (XGBoost) içerir.

**Özellikler:**

- 🔍 **Kapsamlı EDA**: Veri setinin yapısal ve istatistiksel analizi.
- 📊 **Görselleştirme**: Matplotlib ve Seaborn ile detaylı grafikler.
- 🤖 **Makine Öğrenmesi**: XGBoost algoritması ile Churn tahmini.
- 💡 **SHAP Analizi**: Model kararlarını etkileyen faktörlerin açıklanması.
- 🎮 **CLI Simülasyonu**: Yeni müşteri verileriyle interaktif tahmin yapma imkanı.

**Gereksinimler:**
Bu modülü çalıştırmak için Python yüklü olmalı ve aşağıdaki kütüphaneler kurulmalıdır:

```bash
pip install pandas numpy seaborn matplotlib scikit-learn xgboost shap joblib statsmodels
```

**Çalıştırma:**

```bash
cd veri-madenciligi-notebook
python rapor.py
```

---

## 🛠️ Kullanılan Teknolojiler

- **Frontend**: React, Next.js, Vite, Tailwind CSS (tahmini)
- **Data Science**: Python, Pandas, Scikit-learn, XGBoost, SHAP
- **Dil**: TypeScript, JavaScript, Python

## 📝 Lisans

Bu proje özel mülkiyettir.
