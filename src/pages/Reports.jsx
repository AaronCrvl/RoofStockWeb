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
    <div className="sticky top-4 z-10 bg-white/80 backdrop-blur-md rounded-lg border border-gray-200 p-4 shadow-sm overflow-x-auto scrollbar-hide transition-all duration-300">
      <div className="flex flex-nowrap gap-6 min-w-full">
        {cards.map((c, idx) => (
          <div
            key={idx}
            className="min-w-[280px] bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition duration-200 p-5 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-gray-800">
                {c.title}
              </h3>
              <span className="text-2xl font-bold text-indigo-600">
                {c.items.length}
              </span>
            </div>

            <div className="space-y-3 flex-1">
              {c.items.length === 0 ? (
                <p className="text-sm text-gray-400">
                  Nenhum produto encontrado
                </p>
              ) : (
                c.items.slice(0, 4).map((p) => (
                  <div
                    key={p.idProduto}
                    className="flex justify-between items-start p-2 bg-gray-50 hover:bg-gray-100 rounded-md transition"
                  >
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-800">
                        {p.nomeProduto}
                      </span>
                      <span className="text-xs text-gray-500">
                        {p.nomeMarca} • {p.nomeResponsavel}
                      </span>
                    </div>
                    <div className="text-right text-xs text-gray-600 space-y-1">
                      <div>
                        Qtd:{" "}
                        <span className="font-semibold">{p.quantidade}</span>
                      </div>
                      <div>Val: {p.dataValidade}</div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="pt-4 text-right">
              <button className="text-sm text-indigo-600 hover:underline font-medium">
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
            <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm text-gray-500 text-sm animate-pulse">
              Carregando relatórios...
            </div>
          ) : (
            <div className="space-y-8">
              <ReportDashboard products={filteredProducts} />

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">
                      Resumo Inteligente
                    </h2>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Foram encontrados {filteredProducts.length} produtos para
                      os critérios selecionados. Um resumo inteligente com dados
                      de promoções, validades e mais será exibido aqui.
                    </p>
                  </section>
                </div>

                <aside className="space-y-6">
                  <ChartsPanel products={filteredProducts} />
                  <AlertsPanel products={filteredProducts} />
                </aside>
              </div>
            </div>
          )}
        </PageContainer.Body>
      </PageContainer.Root>
    </Layout>
  );
};

export default Reports;