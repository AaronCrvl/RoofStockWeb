import React from "react";

export default function AlertsPanel({ products = [] }) {
  const expired = products.filter((p) => new Date(p.dataValidade) < new Date());
  const outOfStock = products.filter((p) => Number(p.quantidade) <= 0);
  const critical = products.filter((p) => Number(p.quantidade) <= 3 && Number(p.quantidade) > 0);

  const alerts = [
    { title: "Vencidos", items: expired, color: 'red' },
    { title: "Esgotados", items: outOfStock, color: 'gray' },
    { title: "Críticos", items: critical, color: 'yellow' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
      {alerts.map((a) => (
        <div key={a.title} className="bg-white p-4 rounded-lg shadow flex flex-col">
          <div className="flex items-center justify-between">
            <h5 className="font-semibold">{a.title}</h5>
            <div className={`text-sm font-bold text-${a.color}-600`}>{a.items.length}</div>
          </div>

          <div className="mt-3 text-sm text-gray-700 flex-1">
            {a.items.length === 0 ? (
              <div className="text-gray-400">Nenhum item</div>
            ) : (
              <ul className="space-y-1">
                {a.items.slice(0, 5).map((p) => (
                  <li key={p.idProduto} className="flex justify-between">
                    <span>{p.nomeProduto}</span>
                    <span className="text-gray-500">Qtd: {p.quantidade}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="mt-3 text-right">
            <button className="text-sm text-indigo-600 hover:underline">Ver todos</button>
          </div>
        </div>
      ))}
    </div>
  );
}
