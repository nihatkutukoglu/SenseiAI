"use client";

import React from "react";
import OperationalCRM from "./OperationalCRM";

const SalesModule = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Satış & CRM</h2>
        <p className="text-slate-400">Müşteri ilişkileri ve satış yönetimi</p>
      </div>

      {/* CRM Component */}
      <OperationalCRM />
    </div>
  );
};

export default SalesModule;
