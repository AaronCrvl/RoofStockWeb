import React, { useState, useEffect } from "react";

function StockControl({ parentStocks, stockSelectionFunc, selectedStock }) {
  const [stocks, setStocks] = useState(parentStocks || []);

  const handleStockSelection = (e) => {
    stockSelectionFunc(e.target.value);
  };

  useEffect(() => {
    if ((!stocks || stocks.length === 0) && parentStocks != null)
      setStocks(parentStocks);
  }, [stocks, parentStocks]);
  return (
    <div className="mb-8">
      <label className="block text-gray-800 text-lg font-semibold mb-2">
        Selecionar Estoque:
      </label>
      <select
        value={selectedStock}
        onChange={handleStockSelection}
        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white text-gray-900"
      >
        {stocks &&
          stocks.map((item) => (
            <option key={item.idEstoque} value={item.idEstoque}>
              {item.nomeEstoque}
            </option>
          ))}
      </select>
    </div>
  );
}

export default StockControl;
