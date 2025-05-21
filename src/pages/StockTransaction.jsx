import React, { useEffect, useState } from "react";
import { PageContainer } from "../components/PageContainer/index";
import { getStockTransactionsByStock } from "../services/api/stockTransaction.services";
import StockControl from "../components/StockControl";
import { useUser } from "../contexts/UserContext";
import { useCompany } from "../contexts/CompanyContext";
import { getStockByUser } from "../services/api/stock.service";
import Layout from "../layout/Layout";
import TransactionRegisterModal from "../components/StockTransaction/TransactionRegisterModal";
import { toast } from "react-toastify";
import { getStockProducts } from "../services/api/stockProduct.services";
import { useForm } from "react-hook-form";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/solid";

const STOCK_TRANSACTION = [
  {
    idMovimentacao: 1,
    idEstoque: 1,
    idUsuario: 1,
    dataMovimentacao: new Date("2024-08-10"),
    tipoMovimentacao: 2,
    processado: false,
    itens: [
      {
        idItemMovimentacao: 0,
        //idMovimentacao: 1, Only for backend, won't come in DTO
        idProduto: 1,
        nomeProduto: "Teste",
        quantidadeMovimentacao: 50,
        processado: false,
        quebras: 5,
        cortesias: 100,
      },
      {
        idItemMovimentacao: 0,
        //idMovimentacao: 1, Only for backend, won't come in DTO
        idProduto: 2,
        nomeProduto: "Teste 2",
        quantidadeMovimentacao: 50,
        processado: false,
        quebras: 5,
        cortesias: 100,
      },
      {
        idItemMovimentacao: 0,
        //idMovimentacao: 1, Only for backend, won't come in DTO
        idProduto: 3,
        nomeProduto: "Teste 3",
        quantidadeMovimentacao: 50,
        processado: false,
        quebras: 5,
        cortesias: 100,
      },
      {
        idItemMovimentacao: 0,
        //idMovimentacao: 1, Only for backend, won't come in DTO
        idProduto: 4,
        nomeProduto: "Teste 4",
        quantidadeMovimentacao: 50,
        processado: false,
        quebras: 5,
        cortesias: 100,
      },
    ],
  },
  {
    idMovimentacao: 2,
    idEstoque: 1,
    idUsuario: 1,
    dataMovimentacao: new Date("2024-06-01"),
    tipoMovimentacao: 1,
    processado: false,
    itens: [
      {
        idItemMovimentacao: 0,
        //idMovimentacao: 1, Only for backend, won't come in DTO
        idProduto: 1,
        nomeProduto: "Teste",
        quantidadeMovimentacao: 50,
        processado: false,
        quebras: 5,
        cortesias: 100,
      },
      {
        idItemMovimentacao: 0,
        //idMovimentacao: 1, Only for backend, won't come in DTO
        idProduto: 2,
        nomeProduto: "Teste 2",
        quantidadeMovimentacao: 50,
        processado: false,
        quebras: 5,
        cortesias: 100,
      },
      {
        idItemMovimentacao: 0,
        //idMovimentacao: 1, Only for backend, won't come in DTO
        idProduto: 3,
        nomeProduto: "Teste 3",
        quantidadeMovimentacao: 50,
        processado: false,
        quebras: 5,
        cortesias: 100,
      },
      {
        idItemMovimentacao: 0,
        //idMovimentacao: 1, Only for backend, won't come in DTO
        idProduto: 4,
        nomeProduto: "Teste 4",
        quantidadeMovimentacao: 50,
        processado: false,
        quebras: 5,
        cortesias: 100,
      },
    ],
  },
  {
    idMovimentacao: 3,
    idEstoque: 1,
    idUsuario: 1,
    dataMovimentacao: new Date("2025-03-20"),
    tipoMovimentacao: 2,
    processado: false,
    itens: [
      {
        idItemMovimentacao: 0,
        //idMovimentacao: 1, Only for backend, won't come in DTO
        idProduto: 1,
        nomeProduto: "Teste",
        quantidadeMovimentacao: 50,
        processado: false,
        quebras: 5,
        cortesias: 100,
      },
      {
        idItemMovimentacao: 0,
        //idMovimentacao: 1, Only for backend, won't come in DTO
        idProduto: 2,
        nomeProduto: "Teste 2",
        quantidadeMovimentacao: 50,
        processado: false,
        quebras: 5,
        cortesias: 100,
      },
      {
        idItemMovimentacao: 0,
        //idMovimentacao: 1, Only for backend, won't come in DTO
        idProduto: 3,
        nomeProduto: "Teste 3",
        quantidadeMovimentacao: 50,
        processado: false,
        quebras: 5,
        cortesias: 100,
      },
      {
        idItemMovimentacao: 0,
        //idMovimentacao: 1, Only for backend, won't come in DTO
        idProduto: 4,
        nomeProduto: "Teste 4",
        quantidadeMovimentacao: 50,
        processado: false,
        quebras: 5,
        cortesias: 100,
      },
    ],
  },
  {
    idMovimentacao: 4,
    idEstoque: 1,
    idUsuario: 1,
    dataMovimentacao: new Date("2024-12-22"),
    tipoMovimentacao: 2,
    processado: false,
    itens: [
      {
        idItemMovimentacao: 0,
        //idMovimentacao: 1, Only for backend, won't come in DTO
        idProduto: 1,
        nomeProduto: "Teste",
        quantidadeMovimentacao: 50,
        processado: false,
        quebras: 5,
        cortesias: 100,
      },
      {
        idItemMovimentacao: 0,
        //idMovimentacao: 1, Only for backend, won't come in DTO
        idProduto: 2,
        nomeProduto: "Teste 2",
        quantidadeMovimentacao: 50,
        processado: false,
        quebras: 5,
        cortesias: 100,
      },
      {
        idItemMovimentacao: 0,
        //idMovimentacao: 1, Only for backend, won't come in DTO
        idProduto: 3,
        nomeProduto: "Teste 3",
        quantidadeMovimentacao: 50,
        processado: false,
        quebras: 5,
        cortesias: 100,
      },
      {
        idItemMovimentacao: 0,
        //idMovimentacao: 1, Only for backend, won't come in DTO
        idProduto: 4,
        nomeProduto: "Teste 4",
        quantidadeMovimentacao: 50,
        processado: false,
        quebras: 5,
        cortesias: 100,
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
      tipoMovimentacaosHoje: 2,
      promocoesAtivas: 3,
      vencimentosProximos: 2,
    },
    overviewMensal: {
      tipoMovimentacaosMes: 32,
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
      tipoMovimentacaosHoje: 66,
      promocoesAtivas: 1,
      vencimentosProximos: 0,
    },
    overviewMensal: {
      tipoMovimentacaosMes: 32,
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
      tipoMovimentacaosHoje: 8,
      promocoesAtivas: 0,
      vencimentosProximos: 1,
    },
    overviewMensal: {
      tipoMovimentacaosMes: 80,
      saidasMes: 54,
    },
  },
];
const PRODUCT_LIST = [
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
    dataValidade: "2025-07-15",
    nomeResponsavel: "Lucas",
    nomeMarca: "Pepsi",
    tipoProduto: 0,
    quantidade: 50,
    valor: 10,
    promocao: false,
  },
  {
    idProduto: 2,
    idEstoque: 1,
    nomeProduto: "Produto C",
    dataValidade: "2025-06-30",
    nomeResponsavel: "Ana",
    nomeMarca: "Tanqueray",
    tipoProduto: 0,
    quantidade: 50,
    valor: 200,
    promocao: true,
  },
];

function StockTransaction() {
  const { userId } = useUser();
  const { companyId } = useCompany();
  const [stocks, setStocks] = useState(STOCKS_LIST);
  const [stockTransaction, setStockTransaction] = useState(STOCK_TRANSACTION);
  const [gridView, setGridView] = useState(STOCK_TRANSACTION);
  const [products, setProducts] = useState(PRODUCT_LIST);
  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  const [isEditItem, setIsEditItem] = useState(false);
  const { register, getValues } = useForm({
    defaultValues: {
      dataMovimentacao: new Date()
        .getFullYear()
        .toString()
        .concat(
          "-",
          String(new Date().getMonth() + 1).padStart(2, "0"),
          "-",
          String(new Date().getDate()).padStart(2, "0")
        ),
      tipoMovimentacao: 0,
      processado: 0,
    },
  });

  useEffect(() => {
    if (products == null && stocks != null)
      setProducts(getStockProducts(stocks[0].idEstoque));
  }, [products, stocks]);

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

  const handleGridSearch = () => {
    const params = getValues([
      "tipoMovimentacao",
      "processado",
      "dataMovimentacao",
    ]);

    let newFilteredList =
      params[0] == 0
        ? [...stockTransaction]
        : stockTransaction.filter((tran) => tran.tipoMovimentacao == params[0]);

    newFilteredList =
      params[1] == 0
        ? newFilteredList
        : newFilteredList.filter((tran) => tran.processado == params[1]);

    setGridView(newFilteredList);
  };

  const handleModalVisibility = (open) => {
    setOpenRegisterModal(open);
  };

  const handleAddNewTransaction = (newTransaction) => {
    var newStockTransactions = [...stockTransaction, newTransaction];
    setStockTransaction(newStockTransactions);
    toast.success("Movimentação criada com sucesso");
  };

  const handleTransactionItemEdit = () => {

  }

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
                name="dataMovimentacao"
                type="date"
                {...register("dataMovimentacao", {
                  valueAsDate: true,
                })}
                className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-900 shadow-sm transition duration-150 ease-in-out focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
              />
            </div>
            <div className="flex-shrink-0">
              <label className="text-black mr-2">Tipo Movimentação</label>
              <select
                className="p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                {...register("tipoMovimentacao", {
                  valueAsNumber: true,
                  min: 0,
                  max: 2,
                })}
              >
                <option value={0}>Selecione o tipo</option>
                <option value={1}>Entrada</option>
                <option value={2}>Saída</option>
              </select>
            </div>
            <div className="flex-shrink-0">
              <label className="text-black mr-2">Processado ?</label>
              <select
                className="p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                {...register("processado", {
                  valueAsNumber: true,
                  min: 0,
                  max: 2,
                })}
              >
                <option value={0}>Selecione</option>
                <option value={1}>Sim</option>
                <option value={2}>Não</option>
              </select>
            </div>
            <div className="flex-shrink-0">
              <button
                onClick={handleGridSearch}
                className="ml-4 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300"
              >
                Filtrar
              </button>
            </div>
            <div className="flex-shrink-0">
              <button
                className="ml-4 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300"
                onClick={() => handleModalVisibility(true)}
              >
                + Adicionar Movimentação
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

            {gridView
              .sort(
                (a, b) =>
                  new Date(b.dataMovimentacao) - new Date(a.dataMovimentacao)
              )
              .map((transaction) => (
                <details
                  key={transaction.idMovimentacao}
                  className="mb-4 border rounded-md shadow-xl bg-white"
                >
                  <summary className="grid grid-cols-4 gap-4 p-4 text-gray-900 hover:text-blue-600 hover:font-medium transition-all duration-300 cursor-pointer hover:scale-110">
                    <span>
                      {transaction.dataMovimentacao == undefined
                        ? ""
                        : transaction.dataMovimentacao.toLocaleDateString()}
                    </span>
                    <span>
                      {transaction.tipoMovimentacao == 1 ? "Entrada" : "Saída"}
                    </span>
                    <span>{transaction.processado ? "Sim" : "Não"}</span>
                    <span>{transaction.itens.length}</span>
                  </summary>

                  <form className="p-5 bg-blue-200/50 rounded-b-md text-gray-800 border-t">
                    <div className="grid grid-cols-4 gap-4 mb-2 font-semibold text-blue-900 bg-blue-200 p-2 rounded">
                      <span>Produto</span>
                      <span>Processado</span>
                      <span>Quantidade</span>
                      <span>Ações</span>
                    </div>

                    {transaction.itens.map((item, index) => (
                      <div
                        key={index}
                        className="grid grid-cols-4 gap-4 p-3 mb-2 text-sm bg-white text-gray-900 rounded shadow-sm border border-gray-200 hover:border-blue-400 transition-all duration-200"
                      >
                        <span>{item.nomeProduto}</span>
                        <span>{item.processado ? "Sim" : "Não"}</span>
                        <span>{item.quantidadeMovimentacao}</span>
                        <div className="flex justify-center items-center space-x-4">
                          <button
                            className="p-2 bg-orange-600 rounded-lg hover:bg-orange-700 transition-all duration-300"
                            aria-label="Editar"
                          >
                            <PencilIcon className="w-6 h-6 text-white" />
                          </button>
                          <button
                            className="p-2 bg-orange-600 rounded-lg hover:bg-orange-700 transition-all duration-300"
                            aria-label="Editar"
                          >
                            <TrashIcon className="w-6 h-6 text-white" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </form>
                </details>
              ))}
          </div>
          <>
            {openRegisterModal && (
              <TransactionRegisterModal
                stockId={stockTransaction[0].idEstoque}
                isEdit={isEditItem}
                availableItensList={products}
                postSaveFunc={handleAddNewTransaction}
                closeFunc={handleModalVisibility}
              />
            )}
          </>
        </PageContainer.Body>
      </PageContainer.Root>
    </Layout>
  );
}

export default StockTransaction;
