import React, { useState, useEffect } from "react";

import { SetSessionStock } from "../services/api/stock.service";

function StockControl({ parentStocks, stockSelectionFunc }) {
  const [selectedStock, setSelectedStock] = useState(-1);
  const [stocks, setStocks] = useState([]);

  const handleStockSelection = (e) => {
    var stockId = stockSelectionFunc(e.target.value);
    SetSessionStock(stockId).then(() => setSelectedStock(stockId));
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
        defaultValue={
          selectedStock == -1
            ? stocks[0]
            : stocks.find((stock) => stock.idStock == selectedStock)
        }
        onChange={handleStockSelection}
        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white text-gray-900"
      >
        {stocks.map((item, index) => (
          <option key={item.idEstoque} value={item.idEstoque} id={index}>
            {item.nomeEstoque}
          </option>
        ))}
      </select>
    </div>
  );
}

export default StockControl;
