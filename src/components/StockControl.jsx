import React, { useState, useEffect } from "react";

function StockControl({ parentStocks, stockSelectionFunc }) {
  const [stocks, setStocks] = useState(parentStocks);  

  const handleStockSelection = (e) => {    
    stockSelectionFunc(e.target.value);
  };

  useEffect(() => {
    if (stocks == null && parentStocks != null) setStocks(parentStocks);  
  }, [stocks, parentStocks]);
  return (
    <div className="mb-8">
      <label className="block text-gray-800 text-lg font-semibold mb-2">
        Selecionar Estoque:
      </label>
      <select
        onChange={handleStockSelection}
        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white text-gray-900"
      >
        {stocks.map((item) => (
          <option key={item.idEstoque} value={item.idEstoque}>
            {item.nomeEstoque}
          </option>
        ))}
      </select>
    </div>
  );
}

export default StockControl;
