import React, { useState, useEffect } from "react";
import { PageContainer } from "../components/PageContainer";
import Layout from "../layout/Layout";
import { getDashboardCards, daysUntil } from "../utils/report.utils";
import StockControl from "../components/StockControl";
import ChartsPanel from "../components/Report/ChartsPanel";
import AlertsPanel from "../components/Report/AlertsPanel";

// Sample mock products used to simulate loading
const sampleProducts = [
  {
    idProduto: 0,
    idEstoque: 1,
    nomeProduto: "Produto A",
    dataValidade: "2025-05-01",
    nomeResponsavel: "Paola",
    valor: 15,
    quantidade: 50,
    nomeMarca: "Coca-Cola",
    tipoProduto: 0,
    promocao: true,
  },
  {
    idProduto: 1,
    idEstoque: 1,
    nomeProduto: "Produto B",
    dataValidade: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    nomeResponsavel: "Joao",
    valor: 8.5,
    quantidade: 5,
    nomeMarca: "Marca X",
    tipoProduto: 1,
    promocao: false,
  },
  {
    idProduto: 2,
    idEstoque: 1,
    nomeProduto: "Produto C",
    dataValidade: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    nomeResponsavel: "Ana",
    valor: 20,
    quantidade: 12,
    nomeMarca: "Marca Y",
    tipoProduto: 0,
    promocao: true,
  },
  {
    idProduto: 3,
    idEstoque: 1,
    nomeProduto: "Produto D",
    dataValidade: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    nomeResponsavel: "Carlos",
    valor: 5,
    quantidade: 0,
    nomeMarca: "Marca Z",
    tipoProduto: 0,
    promocao: false,
  },
];

const ReportDashboard = ({ products = [] }) => {
  const cards = getDashboardCards(products);

  return (
    <div className="w-full">
      <div className="flex gap-4 overflow-x-auto">
        {cards.map((c, idx) => (
          <div
            key={idx}
            className="min-w-[260px] flex-1 bg-white rounded-lg shadow p-4 flex flex-col"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xl font-semibold text-gray-800">{c.title}</h3>
              <div className="text-3xl font-bold text-indigo-600">
                {c.items.length}
              </div>
            </div>

            <div className="flex-1">
              {c.items.length === 0 ? (
                <div className="text-sm text-gray-500">
                  Nenhum produto encontrado
                </div>
              ) : (
                <ul className="space-y-2">
                  {c.items.slice(0, 4).map((p) => (
                    <li
                      key={p.idProduto}
                      className="flex items-center justify-between bg-gray-50 rounded p-2"
                    >
                      <div>
                        <div className="text-sm font-medium text-gray-800">
                          {p.nomeProduto}
                        </div>
                        <div className="text-xs text-gray-500">
                          {p.nomeMarca} • Resp: {p.nomeResponsavel}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold">
                          Qtd: {p.quantidade}
                        </div>
                        <div className="text-xs text-gray-500">
                          Val: {p.dataValidade}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="mt-3 text-right">
              <button className="text-sm text-indigo-600 hover:underline">
                Ver todos
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Reports = () => {
  const [products, setProducts] = useState(null);
  const [timeRange, setTimeRange] = useState("all");
  const [stocks, setStocks] = useState([
    { idEstoque: 1, nomeEstoque: "Roof01" },
    { idEstoque: 2, nomeEstoque: "Paola01" },
  ]);
  const [selectedStock, setSelectedStock] = useState(stocks[0].idEstoque);

  useEffect(() => {
    if (products == null) {
      const iv = setInterval(() => {
        setProducts(sampleProducts);
        clearInterval(iv);
      }, 2000);

      return () => clearInterval(iv);
    }
  }, [products]);

  useEffect(() => {
    if (stocks == null) {
      const iv = setInterval(() => {
        setStocks([
          { idEstoque: 1, nomeEstoque: "Roof01" },
          { idEstoque: 2, nomeEstoque: "Paola01" },
        ]);
        clearInterval(iv);
      }, 2000);

      return () => clearInterval(iv);
    }
  }, [stocks]);

  const handleStockSelection = (stockId) => {
    setSelectedStock(Number(stockId));
    // simulate loading products for selected stock with 2s delay
    setProducts(null);
    const iv = setInterval(() => {
      // In real usage, call getStockProducts(stockId)
      setProducts(sampleProducts.filter((p) => p.idEstoque == stockId));
      clearInterval(iv);
    }, 2000);
  };

  const filteredProducts = (products || []).filter((p) => {
    switch (timeRange) {
      case "today":
        return daysUntil(p.dataValidade) === 0;
      case "last7":
      case "thisWeek":
        return (() => {
          const d = daysUntil(p.dataValidade);
          return d >= 0 && d <= 7;
        })();
      case "thisMonth":
        return (() => {
          const d = daysUntil(p.dataValidade);
          return d >= 0 && d <= 30;
        })();
      default:
        return true;
    }
  });

  return (
    <Layout>
      <PageContainer.Root>
        <PageContainer.Header title={"Relatórios"}>
          <div className="w-full flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="w-full md:w-1/2">
              <StockControl
                parentStocks={stocks}
                stockSelectionFunc={handleStockSelection}
                selectedStock={selectedStock}
              />
            </div>
            <div className="flex items-center space-x-3 md:ml-4">
              <label className="text-black">Visualizar por:</label>
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">Todos</option>
                <option value="today">Hoje</option>
                <option value="thisWeek">Esta semana</option>
                <option value="last7">Últimos 7 dias</option>
                <option value="thisMonth">Este mês</option>
              </select>
            </div>
          </div>
        </PageContainer.Header>
        <PageContainer.Body>
          {products == null ? (
            <div className="p-6 bg-white rounded-lg shadow text-gray-500">
              Carregando relatórios...
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                <ReportDashboard products={filteredProducts} />

                <div className="bg-white p-4 rounded-lg shadow">
                  <h3 className="text-lg font-semibold mb-2">
                    Resumo (AI) — placeholder
                  </h3>
                  <p className="text-sm text-gray-700">
                    Resumo gerado por AI (placeholder): Neste período há{" "}
                    {filteredProducts.length} produtos que correspondem aos critérios
                    selecionados. Aqui será exibido um resumo automático com
                    insights como número de promoções, quantidade média e produtos
                    mais críticos.
                  </p>
                </div>
              </div>

              <aside className="space-y-4">
                <ChartsPanel products={filteredProducts} />
                <AlertsPanel products={filteredProducts} />
              </aside>
            </div>
          )}
        </PageContainer.Body>
      </PageContainer.Root>
    </Layout>
  );
};

export default Reports;