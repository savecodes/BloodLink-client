import React from "react";

export const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    const isMoneyValue = data.dataKey === "funding";

    // Handle different chart types
    let label = "";
    let value = "";

    if (data.payload.month) {
      // Line Chart (Monthly Funding)
      label = data.payload.month;
      value = isMoneyValue ? `$${data.value.toLocaleString()}` : data.value;
    } else if (data.payload.name && data.name) {
      // Bar Chart (Platform Stats)
      label = data.payload.name;
      value = data.value;
    } else if (data.name) {
      // Pie Chart (Blood Group)
      label = data.name;
      value = data.value;
    }

    return (
      <div className="bg-white px-4 py-3 rounded-lg shadow-lg border border-gray-200">
        <p className="text-xs text-gray-600 mb-1">{label}</p>
        <p className="text-sm font-bold text-gray-900">{value}</p>
      </div>
    );
  }
  return null;
};
