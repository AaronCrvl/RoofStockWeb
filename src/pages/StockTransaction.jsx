import React, { useEffect, useState } from "react";
import { PageContainer } from "../components/PageContainer/index";
import { getStockTransactionsByStock } from "../services/api/stockTransaction.services";
import StockControl from "../components/StockControl";
import { useUser } from "../contexts/UserContext";
import { useCompany } from "../contexts/CompanyContext";
import { getStockByUser } from "../services/api/stock.service";
import Layout from "../layout/Layout";

const STOCK_TRANSACTION = [
  {
    idMovimentacao: 1,
    idEstoque: 1,
    idUsuario: 1,
    dataMovimentacao: new Date(),
    entrada: false,
    processado: false,
    itens: [
      {
        idItemMovimentacao: 0,
        //idMovimentacao: 1, Only for backend, won't come in DTO
        idProduto: 1,
        nomeProduto: "Teste",
        quantidade: 50,
        processado: false,
      },
      {
        idItemMovimentacao: 0,
        //idMovimentacao: 1, Only for backend, won't come in DTO
        idProduto: 2,
        nomeProduto: "Teste 2",
        quantidade: 50,
        processado: false,
      },
      {
        idItemMovimentacao: 0,
        //idMovimentacao: 1, Only for backend, won't come in DTO
        idProduto: 3,
        nomeProduto: "Teste 3",
        quantidade: 50,
        processado: false,
      },
      {
        idItemMovimentacao: 0,
        //idMovimentacao: 1, Only for backend, won't come in DTO
        idProduto: 4,
        nomeProduto: "Teste 4",
        quantidade: 50,
        processado: false,
      },
    ],
  },
  {
    idMovimentacao: 2,
    idEstoque: 1,
    idUsuario: 1,
    dataMovimentacao: new Date(),
    entrada: false,
    processado: false,
    itens: [
      {
        idItemMovimentacao: 0,
        //idMovimentacao: 1, Only for backend, won't come in DTO
        idProduto: 1,
        nomeProduto: "Teste",
        quantidade: 50,
        processado: false,
      },
      {
        idItemMovimentacao: 0,
        //idMovimentacao: 1, Only for backend, won't come in DTO
        idProduto: 2,
        nomeProduto: "Teste 2",
        quantidade: 50,
        processado: false,
      },
      {
        idItemMovimentacao: 0,
        //idMovimentacao: 1, Only for backend, won't come in DTO
        idProduto: 3,
        nomeProduto: "Teste 3",
        quantidade: 50,
        processado: false,
      },
      {
        idItemMovimentacao: 0,
        //idMovimentacao: 1, Only for backend, won't come in DTO
        idProduto: 4,
        nomeProduto: "Teste 4",
        quantidade: 50,
        processado: false,
      },
    ],
  },
  {
    idMovimentacao: 3,
    idEstoque: 1,
    idUsuario: 1,
    dataMovimentacao: new Date(),
    entrada: false,
    processado: false,
    itens: [
      {
        idItemMovimentacao: 0,
        //idMovimentacao: 1, Only for backend, won't come in DTO
        idProduto: 1,
        nomeProduto: "Teste",
        quantidade: 50,
        processado: false,
      },
      {
        idItemMovimentacao: 0,
        //idMovimentacao: 1, Only for backend, won't come in DTO
        idProduto: 2,
        nomeProduto: "Teste 2",
        quantidade: 50,
        processado: false,
      },
      {
        idItemMovimentacao: 0,
        //idMovimentacao: 1, Only for backend, won't come in DTO
        idProduto: 3,
        nomeProduto: "Teste 3",
        quantidade: 50,
        processado: false,
      },
      {
        idItemMovimentacao: 0,
        //idMovimentacao: 1, Only for backend, won't come in DTO
        idProduto: 4,
        nomeProduto: "Teste 4",
        quantidade: 50,
        processado: false,
      },
    ],
  },
  {
    idMovimentacao: 1,
    idEstoque: 1,
    idUsuario: 1,
    dataMovimentacao: new Date(),
    entrada: false,
    processado: false,
    itens: [
      {
        idItemMovimentacao: 0,
        //idMovimentacao: 1, Only for backend, won't come in DTO
        idProduto: 1,
        nomeProduto: "Teste",
        quantidade: 50,
        processado: false,
      },
      {
        idItemMovimentacao: 0,
        //idMovimentacao: 1, Only for backend, won't come in DTO
        idProduto: 2,
        nomeProduto: "Teste 2",
        quantidade: 50,
        processado: false,
      },
      {
        idItemMovimentacao: 0,
        //idMovimentacao: 1, Only for backend, won't come in DTO
        idProduto: 3,
        nomeProduto: "Teste 3",
        quantidade: 50,
        processado: false,
      },
      {
        idItemMovimentacao: 0,
        //idMovimentacao: 1, Only for backend, won't come in DTO
        idProduto: 4,
        nomeProduto: "Teste 4",
        quantidade: 50,
        processado: false,
      },
    ],
  },
  {
    idMovimentacao: 2,
    idEstoque: 1,
    idUsuario: 1,
    dataMovimentacao: new Date(),
    entrada: false,
    processado: false,
    itens: [
      {
        idItemMovimentacao: 0,
        //idMovimentacao: 1, Only for backend, won't come in DTO
        idProduto: 1,
        nomeProduto: "Teste",
        quantidade: 50,
        processado: false,
      },
      {
        idItemMovimentacao: 0,
        //idMovimentacao: 1, Only for backend, won't come in DTO
        idProduto: 2,
        nomeProduto: "Teste 2",
        quantidade: 50,
        processado: false,
      },
      {
        idItemMovimentacao: 0,
        //idMovimentacao: 1, Only for backend, won't come in DTO
        idProduto: 3,
        nomeProduto: "Teste 3",
        quantidade: 50,
        processado: false,
      },
      {
        idItemMovimentacao: 0,
        //idMovimentacao: 1, Only for backend, won't come in DTO
        idProduto: 4,
        nomeProduto: "Teste 4",
        quantidade: 50,
        processado: false,
      },
    ],
  },
  {
    idMovimentacao: 3,
    idEstoque: 1,
    idUsuario: 1,
    dataMovimentacao: new Date(),
    entrada: false,
    processado: false,
    itens: [
      {
        idItemMovimentacao: 0,
        //idMovimentacao: 1, Only for backend, won't come in DTO
        idProduto: 1,
        nomeProduto: "Teste",
        quantidade: 50,
        processado: false,
      },
      {
        idItemMovimentacao: 0,
        //idMovimentacao: 1, Only for backend, won't come in DTO
        idProduto: 2,
        nomeProduto: "Teste 2",
        quantidade: 50,
        processado: false,
      },
      {
        idItemMovimentacao: 0,
        //idMovimentacao: 1, Only for backend, won't come in DTO
        idProduto: 3,
        nomeProduto: "Teste 3",
        quantidade: 50,
        processado: false,
      },
      {
        idItemMovimentacao: 0,
        //idMovimentacao: 1, Only for backend, won't come in DTO
        idProduto: 4,
        nomeProduto: "Teste 4",
        quantidade: 50,
        processado: false,
      },
    ],
  },
  {
    idMovimentacao: 1,
    idEstoque: 1,
    idUsuario: 1,
    dataMovimentacao: new Date(),
    entrada: false,
    processado: false,
    itens: [
      {
        idItemMovimentacao: 0,
        //idMovimentacao: 1, Only for backend, won't come in DTO
        idProduto: 1,
        nomeProduto: "Teste",
        quantidade: 50,
        processado: false,
      },
      {
        idItemMovimentacao: 0,
        //idMovimentacao: 1, Only for backend, won't come in DTO
        idProduto: 2,
        nomeProduto: "Teste 2",
        quantidade: 50,
        processado: false,
      },
      {
        idItemMovimentacao: 0,
        //idMovimentacao: 1, Only for backend, won't come in DTO
        idProduto: 3,
        nomeProduto: "Teste 3",
        quantidade: 50,
        processado: false,
      },
      {
        idItemMovimentacao: 0,
        //idMovimentacao: 1, Only for backend, won't come in DTO
        idProduto: 4,
        nomeProduto: "Teste 4",
        quantidade: 50,
        processado: false,
      },
    ],
  },
  {
    idMovimentacao: 2,
    idEstoque: 1,
    idUsuario: 1,
    dataMovimentacao: new Date(),
    entrada: false,
    processado: false,
    itens: [
      {
        idItemMovimentacao: 0,
        //idMovimentacao: 1, Only for backend, won't come in DTO
        idProduto: 1,
        nomeProduto: "Teste",
        quantidade: 50,
        processado: false,
      },
      {
        idItemMovimentacao: 0,
        //idMovimentacao: 1, Only for backend, won't come in DTO
        idProduto: 2,
        nomeProduto: "Teste 2",
        quantidade: 50,
        processado: false,
      },
      {
        idItemMovimentacao: 0,
        //idMovimentacao: 1, Only for backend, won't come in DTO
        idProduto: 3,
        nomeProduto: "Teste 3",
        quantidade: 50,
        processado: false,
      },
      {
        idItemMovimentacao: 0,
        //idMovimentacao: 1, Only for backend, won't come in DTO
        idProduto: 4,
        nomeProduto: "Teste 4",
        quantidade: 50,
        processado: false,
      },
    ],
  },
  {
    idMovimentacao: 3,
    idEstoque: 1,
    idUsuario: 1,
    dataMovimentacao: new Date(),
    entrada: false,
    processado: false,
    itens: [
      {
        idItemMovimentacao: 0,
        //idMovimentacao: 1, Only for backend, won't come in DTO
        idProduto: 1,
        nomeProduto: "Teste",
        quantidade: 50,
        processado: false,
      },
      {
        idItemMovimentacao: 0,
        //idMovimentacao: 1, Only for backend, won't come in DTO
        idProduto: 2,
        nomeProduto: "Teste 2",
        quantidade: 50,
        processado: false,
      },
      {
        idItemMovimentacao: 0,
        //idMovimentacao: 1, Only for backend, won't come in DTO
        idProduto: 3,
        nomeProduto: "Teste 3",
        quantidade: 50,
        processado: false,
      },
      {
        idItemMovimentacao: 0,
        //idMovimentacao: 1, Only for backend, won't come in DTO
        idProduto: 4,
        nomeProduto: "Teste 4",
        quantidade: 50,
        processado: false,
      },
    ],
  },
  {
    idMovimentacao: 1,
    idEstoque: 1,
    idUsuario: 1,
    dataMovimentacao: new Date(),
    entrada: false,
    processado: false,
    itens: [
      {
        idItemMovimentacao: 0,
        //idMovimentacao: 1, Only for backend, won't come in DTO
        idProduto: 1,
        nomeProduto: "Teste",
        quantidade: 50,
        processado: false,
      },
      {
        idItemMovimentacao: 0,
        //idMovimentacao: 1, Only for backend, won't come in DTO
        idProduto: 2,
        nomeProduto: "Teste 2",
        quantidade: 50,
        processado: false,
      },
      {
        idItemMovimentacao: 0,
        //idMovimentacao: 1, Only for backend, won't come in DTO
        idProduto: 3,
        nomeProduto: "Teste 3",
        quantidade: 50,
        processado: false,
      },
      {
        idItemMovimentacao: 0,
        //idMovimentacao: 1, Only for backend, won't come in DTO
        idProduto: 4,
        nomeProduto: "Teste 4",
        quantidade: 50,
        processado: false,
      },
    ],
  },
  {
    idMovimentacao: 2,
    idEstoque: 1,
    idUsuario: 1,
    dataMovimentacao: new Date(),
    entrada: false,
    processado: false,
    itens: [
      {
        idItemMovimentacao: 0,
        //idMovimentacao: 1, Only for backend, won't come in DTO
        idProduto: 1,
        nomeProduto: "Teste",
        quantidade: 50,
        processado: false,
      },
      {
        idItemMovimentacao: 0,
        //idMovimentacao: 1, Only for backend, won't come in DTO
        idProduto: 2,
        nomeProduto: "Teste 2",
        quantidade: 50,
        processado: false,
      },
      {
        idItemMovimentacao: 0,
        //idMovimentacao: 1, Only for backend, won't come in DTO
        idProduto: 3,
        nomeProduto: "Teste 3",
        quantidade: 50,
        processado: false,
      },
      {
        idItemMovimentacao: 0,
        //idMovimentacao: 1, Only for backend, won't come in DTO
        idProduto: 4,
        nomeProduto: "Teste 4",
        quantidade: 50,
        processado: false,
      },
    ],
  },
  {
    idMovimentacao: 3,
    idEstoque: 1,
    idUsuario: 1,
    dataMovimentacao: new Date(),
    entrada: false,
    processado: false,
    itens: [
      {
        idItemMovimentacao: 0,
        //idMovimentacao: 1, Only for backend, won't come in DTO
        idProduto: 1,
        nomeProduto: "Teste",
        quantidade: 50,
        processado: false,
      },
      {
        idItemMovimentacao: 0,
        //idMovimentacao: 1, Only for backend, won't come in DTO
        idProduto: 2,
        nomeProduto: "Teste 2",
        quantidade: 50,
        processado: false,
      },
      {
        idItemMovimentacao: 0,
        //idMovimentacao: 1, Only for backend, won't come in DTO
        idProduto: 3,
        nomeProduto: "Teste 3",
        quantidade: 50,
        processado: false,
      },
      {
        idItemMovimentacao: 0,
        //idMovimentacao: 1, Only for backend, won't come in DTO
        idProduto: 4,
        nomeProduto: "Teste 4",
        quantidade: 50,
        processado: false,
      },
    ],
  },
  {
    idMovimentacao: 1,
    idEstoque: 1,
    idUsuario: 1,
    dataMovimentacao: new Date(),
    entrada: false,
    processado: false,
    itens: [
      {
        idItemMovimentacao: 0,
        //idMovimentacao: 1, Only for backend, won't come in DTO
        idProduto: 1,
        nomeProduto: "Teste",
        quantidade: 50,
        processado: false,
      },
      {
        idItemMovimentacao: 0,
        //idMovimentacao: 1, Only for backend, won't come in DTO
        idProduto: 2,
        nomeProduto: "Teste 2",
        quantidade: 50,
        processado: false,
      },
      {
        idItemMovimentacao: 0,
        //idMovimentacao: 1, Only for backend, won't come in DTO
        idProduto: 3,
        nomeProduto: "Teste 3",
        quantidade: 50,
        processado: false,
      },
      {
        idItemMovimentacao: 0,
        //idMovimentacao: 1, Only for backend, won't come in DTO
        idProduto: 4,
        nomeProduto: "Teste 4",
        quantidade: 50,
        processado: false,
      },
    ],
  },
  {
    idMovimentacao: 2,
    idEstoque: 1,
    idUsuario: 1,
    dataMovimentacao: new Date(),
    entrada: false,
    processado: false,
    itens: [
      {
        idItemMovimentacao: 0,
        //idMovimentacao: 1, Only for backend, won't come in DTO
        idProduto: 1,
        nomeProduto: "Teste",
        quantidade: 50,
        processado: false,
      },
      {
        idItemMovimentacao: 0,
        //idMovimentacao: 1, Only for backend, won't come in DTO
        idProduto: 2,
        nomeProduto: "Teste 2",
        quantidade: 50,
        processado: false,
      },
      {
        idItemMovimentacao: 0,
        //idMovimentacao: 1, Only for backend, won't come in DTO
        idProduto: 3,
        nomeProduto: "Teste 3",
        quantidade: 50,
        processado: false,
      },
      {
        idItemMovimentacao: 0,
        //idMovimentacao: 1, Only for backend, won't come in DTO
        idProduto: 4,
        nomeProduto: "Teste 4",
        quantidade: 50,
        processado: false,
      },
    ],
  },
  {
    idMovimentacao: 3,
    idEstoque: 1,
    idUsuario: 1,
    dataMovimentacao: new Date(),
    entrada: false,
    processado: false,
    itens: [
      {
        idItemMovimentacao: 0,
        //idMovimentacao: 1, Only for backend, won't come in DTO
        idProduto: 1,
        nomeProduto: "Teste",
        quantidade: 50,
        processado: false,
      },
      {
        idItemMovimentacao: 0,
        //idMovimentacao: 1, Only for backend, won't come in DTO
        idProduto: 2,
        nomeProduto: "Teste 2",
        quantidade: 50,
        processado: false,
      },
      {
        idItemMovimentacao: 0,
        //idMovimentacao: 1, Only for backend, won't come in DTO
        idProduto: 3,
        nomeProduto: "Teste 3",
        quantidade: 50,
        processado: false,
      },
      {
        idItemMovimentacao: 0,
        //idMovimentacao: 1, Only for backend, won't come in DTO
        idProduto: 4,
        nomeProduto: "Teste 4",
        quantidade: 50,
        processado: false,
      },
    ],
  },
];
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

function StockTransaction() {
  const { userId } = useUser();
  const { companyId } = useCompany();
  const [stocks, setStocks] = useState(STOCKS_LIST);
  const [stockTransaction, setStockTransaction] = useState(STOCK_TRANSACTION);

  useEffect(() => {
    if (stocks == null && userId) setStocks(getStockByUser(userId));
  }, [stocks, companyId, userId]);

  useEffect(() => {
    if (stockTransaction == null)
      setStockTransaction(getStockTransactionsByStock(stocks[0].idEstoque));
  }, [stocks, stockTransaction]);

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
    // setStockTransaction(getStockTransactionsByStock(childStockSelect);
  };

  return (
    <Layout>
      <PageContainer.Root>
        <PageContainer.Header title={"Movimentação de Estoque"}>
          <StockControl
            parentStocks={stocks}
            stockSelectionFunc={handleStockSelection}
          />
        </PageContainer.Header>
        <PageContainer.Body>
          <div className="flex bg-white p-4 rounded-lg items-center justify-between mb-4">
            <div className="flex">
              <label className="text-black mr-2">Data da Movimentação</label>
              <input
                name="dataValidade"
                type="date"
                className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-900 shadow-sm transition duration-150 ease-in-out focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
              />
            </div>
            <div className="flex-shrink-0">
              <label className="text-black mr-2">Entrada ?</label>
              <select className="p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black">
                <option value="">Selecione a Marca</option>
              </select>
            </div>
            <div className="flex-shrink-0">
              <label className="text-black mr-2">Processado ?</label>
              <select className="p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black">
                <option value="">Selecione a Marca</option>
              </select>
            </div>
            <div className="flex-shrink-0">
              <button className="ml-4 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300">
                Filtrar
              </button>
            </div>
          </div>

          <div className="h-screen overflow-y-auto p-6 bg-gray-100">
            <div className="grid grid-cols-4 gap-4 mb-4 text-sm text-gray-800 bg-gray-300 p-3 rounded-md font-semibold shadow-sm">
              <span>Data Movimentação</span>
              <span>Entrada</span>
              <span>Processado</span>
              <span>Itens</span>
            </div>

            {stockTransaction.map((transaction) => (
              <details
                key={transaction.idMovimentacao}
                className="mb-4 border rounded-md shadow-sm bg-white"
              >
                <summary className="grid grid-cols-4 gap-4 p-4 text-gray-900 hover:text-blue-600 hover:font-medium transition-all duration-300 cursor-pointer">
                  <span>
                    {transaction.dataMovimentacao.toLocaleDateString("pt-BR")}
                  </span>
                  <span>{transaction.entrada ? "Sim" : "Não"}</span>
                  <span>{transaction.processado ? "Sim" : "Não"}</span>
                  <span>{transaction.itens.length}</span>
                </summary>
                
                <form className="p-5 bg-blue-50 rounded-b-md text-gray-800">
                  <div className="grid grid-cols-3 gap-4 mb-3 font-semibold text-blue-900 bg-blue-200 p-2 rounded">
                    <span>Produto</span>
                    <span>Processado</span>
                    <span>Quantidade</span>
                  </div>

                  {transaction.itens.map((item, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-3 gap-4 p-3 mb-2 text-sm bg-white text-gray-900 rounded shadow-sm border border-gray-200 hover:border-blue-400 transition-all duration-200"
                    >
                      <span>{item.nomeProduto}</span>
                      <span>{item.processado ? "Sim" : "Não"}</span>
                      <span>{item.quantidade}</span>
                    </div>
                  ))}
                </form>
              </details>
            ))}
          </div>
        </PageContainer.Body>
      </PageContainer.Root>
    </Layout>
  );
}

export default StockTransaction;
