// CHECK: Recharts is installed and used by this component for rendering simple charts.
// If you see import errors here, run: pnpm add recharts

import React from "react";
import { daysUntil } from "../../utils/report.utils";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

export default function ChartsPanel({ products = [] }) {
  const total = products.length || 0;

  const buckets = {
    '0-7': 0,
    '8-14': 0,
    '15-30': 0,
    '>30': 0,
  };

  let promoCount = 0;

  products.forEach((p) => {
    const d = daysUntil(p.dataValidade);
    if (p.promocao) promoCount++;

    if (d < 0) buckets['0-7']++;
    else if (d <= 7) buckets['0-7']++;
    else if (d <= 14) buckets['8-14']++;
    else if (d <= 30) buckets['15-30']++;
    else buckets['>30']++;
  });

  const barData = Object.keys(buckets).map((k) => ({ name: k, value: buckets[k] }));
  const pieData = [
    { name: 'Promocao', value: promoCount },
    { name: 'Normal', value: total - promoCount },
  ];
  const COLORS = ['#6366f1', '#a78bfa'];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
      <div className="bg-white p-4 rounded-lg shadow">
        <h4 className="font-semibold mb-3">Vencimentos por faixa</h4>
        <div style={{ width: '100%', height: 240 }}>
          <ResponsiveContainer>
            <BarChart data={barData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#6366f1" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h4 className="font-semibold mb-3">Promoções</h4>
        <div style={{ width: '100%', height: 240 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80}>
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
