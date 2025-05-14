import React, { useEffect, useState } from "react";
import { PageContainer } from "../components/PageContainer/index";
import { getStockClosuresByStock } from "../services/api/stockClosure.services";
import StockControl from "../components/StockControl";
import { useUser } from "../contexts/UserContext";
import { useCompany } from "../contexts/CompanyContext";
import { getStockByUser } from "../services/api/stock.service";
import Layout from "../layout/Layout";

const STOCKS_LIST = [
  {
    idEstoque: 1,
    nomeEstoque: "Roof01",
    nomeResponsavel: "01Teste",
    ativo: true,
    overviewDiario: {
      produtosEmEstoque: 50,
      entradasHoje: 2,
      promocoesAtivas: 3,
      vencimentosProximos: 2,
    },
    overviewMensal: {
      entradasMes: 32,
      saidasMes: 8,
    },
  },
  {
    idEstoque: 2,
    nomeEstoque: "Paola01",
    nomeResponsavel: "01Teste",
    ativo: true,
    overviewDiario: {
      produtosEmEstoque: 96,
      entradasHoje: 66,
      promocoesAtivas: 1,
      vencimentosProximos: 0,
    },
    overviewMensal: {
      entradasMes: 32,
      saidasMes: 8,
    },
  },
  {
    idEstoque: 3,
    nomeEstoque: "Cozinha02",
    nomeResponsavel: "01Teste",
    ativo: false,
    overviewDiario: {
      produtosEmEstoque: 32,
      entradasHoje: 8,
      promocoesAtivas: 0,
      vencimentosProximos: 1,
    },
    overviewMensal: {
      entradasMes: 80,
      saidasMes: 54,
    },
  },
];
const STOCK_CLOSURE = [
  {
    idFechamento: 0,
    idEstoque: 0,
    dataFechamento: new Date(),
    erro: false,
    itens: [
      {
        idProduto: 0,
        nomeProduto: "Teste 01",
        quantidadeFinal: 0,
        divergencia: false,
        quantidadeDivergencia: 0,
        quebrasContabilizadas: 0,
        cortesias: 0,
      },
    ],
  },
  {
    idFechamento: 0,
    idEstoque: 0,
    dataFechamento: new Date(),
    erro: false,
    itens: [
      {
        idProduto: 0,
        nomeProduto: "Teste 01",
        quantidadeFinal: 0,
        divergencia: false,
        quantidadeDivergencia: 0,
        quebrasContabilizadas: 0,
        cortesias: 0,
      },
    ],
  },
  {
    idFechamento: 0,
    idEstoque: 0,
    dataFechamento: new Date(),
    erro: false,
    itens: [
      {
        idProduto: 0,
        nomeProduto: "Teste 01",
        quantidadeFinal: 0,
        divergencia: false,
        quantidadeDivergencia: 0,
        quebrasContabilizadas: 0,
        cortesias: 0,
      },
    ],
  },
  {
    idFechamento: 0,
    idEstoque: 0,
    dataFechamento: new Date(),
    erro: false,
    itens: [
      {
        idProduto: 0,
        nomeProduto: "Teste 01",
        quantidadeFinal: 0,
        divergencia: false,
        quantidadeDivergencia: 0,
        quebrasContabilizadas: 0,
        cortesias: 0,
      },
    ],
  },
];

function StockClosure() {
  const { userId } = useUser();
  const { companyId } = useCompany();
  const [stocks, setStocks] = useState(STOCKS_LIST);
  const [stockClosure, setStockClosure] = useState(STOCK_CLOSURE);

  useEffect(() => {
    if (stocks == null && userId) setStocks(getStockByUser(userId));
  }, [stocks, companyId, userId]);

  useEffect(() => {
    if (stockClosure == null)
      setStockClosure(getStockClosuresByStock(stocks[0].idEstoque));
  }, [stocks, stockClosure]);

  const handleStockSelection = (childStockSelect) => {
    console.log("Selected Stock: ".concat(childStockSelect));
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(
          new Response(
            JSON.stringify("Movimentação de estoque carregada com sucesso."),
            {
              status: 200, // Ok
              headers: {
                "Content-Type": "application/json; utf-8",
              },
            }
          )
        );
      }, 2000);
    });

    // TODO: Backend integration
    // setStockClosure(getStockClosuresByStock(childStockSelect);
  };

  return (
    <Layout>
      <PageContainer.Root>
        <PageContainer.Header title={"Fechamento de Estoque"}>
          <StockControl
            parentStocks={stocks}
            stockSelectionFunc={handleStockSelection}
          />
        </PageContainer.Header>
        <PageContainer.Body>
          <div className="h-screen">
            <div className="flex bg-white p-4 rounded-lg items-center justify-between mb-4">
              <div className="flex">
                <label className="text-black mr-2">Data de Fechamento</label>
                <input
                  name="dataValidade"
                  type="date"
                  className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-900 shadow-sm transition duration-150 ease-in-out focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                />
              </div>
              <div className="flex-shrink-0">
                <label className="text-black mr-2">Erro ?</label>
                <select className="p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-black">
                  <option value="">Selecione a Marca</option>
                </select>
              </div>              
              <div className="flex-shrink-0">
                <button className="ml-4 p-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-all duration-300">
                  Filtrar
                </button>
              </div>
            </div>

            <div className="h-screen overflow-y-auto p-6 bg-gray-100">
              <div className="grid grid-cols-3 gap-4 mb-4 text-sm text-gray-800 bg-gray-300 p-3 rounded-md font-semibold shadow-sm">
                <span>Data Fechamento</span>
                <span>Erro</span>
                <span>Itens</span>
              </div>

              {stockClosure.map((closure) => (
                <details
                  key={closure.idFechamento}
                  className="mb-4 border rounded-md shadow-sm bg-white"
                >
                  <summary className="grid grid-cols-3 gap-4 p-4 text-gray-900 hover:text-green-600 hover:font-medium transition-all duration-300 cursor-pointer">
                    <span>
                      {closure.dataFechamento.toLocaleDateString("pt-BR")}
                    </span>
                    <span>{closure.erro ? "Sim" : "Não"}</span>
                    <span>{closure.itens.length}</span>
                  </summary>

                  <form className="p-5 bg-green-50 rounded-b-md text-gray-800">
                    <div className="grid grid-cols-6 gap-4 mb-3 font-semibold text-green-900 bg-green-200 p-2 rounded">
                      <span>Produto</span>
                      <span>Quantidade Final</span>
                      <span>Divergência</span>
                      <span>Quantidade Divergência</span>
                      <span>Quebras Contabilizadas</span>
                      <span>Cortesias Contabilizadas</span>
                    </div>

                    {closure.itens.map((item, index) => (
                      <div
                        key={index}
                        className="grid grid-cols-6 gap-4 p-3 mb-2 text-sm bg-white text-gray-900 rounded shadow-sm border border-gray-200 hover:border-green-400 transition-all duration-200"
                      >
                        <span>{item.nomeProduto}</span>
                        <span>{item.quantidadeFinal}</span>
                        <span>{item.divergencia ? "Sim" : "Não"}</span>
                        <span>{item.quantidadeDivergencia}</span>
                        <span>{item.quebrasContabilizadas}</span>
                        <span>{item.cortesias}</span>
                      </div>
                    ))}
                  </form>
                </details>
              ))}
            </div>
          </div>
        </PageContainer.Body>
      </PageContainer.Root>
    </Layout>
  );
}

export default StockClosure;
