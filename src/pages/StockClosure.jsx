// ================== Imports ==================
import React, { useEffect, useState } from "react";
import { PageContainer } from "../components/PageContainer/index";
import { GetStockClosureByStock } from "../services/api/stockClosure.services";
import StockControl from "../components/StockControl";
import { useUser } from "../contexts/UserContext";
import { GetStockByUser } from "../services/api/stock.service";
import Layout from "../layout/Layout";
import { useForm } from "react-hook-form";
import { formatdateToInput } from "../utils/dateFunctions.util";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/solid";
import ClosureRegisterModal from "../components/StockClosure/ClosureRegisterModal";
import { ExportAllStockClosuresToPdf } from "../utils/PDF/pdfGenerator.utils";
import ExportPdf from "../components/ui/ExportPdf";

// ================== Constants ==================
const fakeAvailableProducts = [
  { idProduto: 1, nomeProduto: "Produto A", quantidadeEstoque: 10 },
  { idProduto: 2, nomeProduto: "Produto B", quantidadeEstoque: 5 },
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
    overviewMensal: { entradasMes: 32, saidasMes: 8 },
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
    overviewMensal: { entradasMes: 32, saidasMes: 8 },
  },
];

const STOCK_CLOSURE = [
  {
    idFechamento: 0,
    idEstoque: 1,
    dataFechamento: formatdateToInput(),
    dataInicioPeriodo: formatdateToInput("2025-07-01"),
    dataFinalPeriodo: formatdateToInput("2025-07-30"),
    erro: false,
    itens: [
      {
        idProduto: 1,
        nomeProduto: "Produto A",
        quantidadeFinal: 10,
        divergencia: false,
        quantidadeDivergencia: 0,
        quebrasContabilizadas: 0,
        cortesias: 0,
      },
      {
        idProduto: 2,
        nomeProduto: "Produto B",
        quantidadeFinal: 5,
        divergencia: true,
        quantidadeDivergencia: 1,
        quebrasContabilizadas: 0,
        cortesias: 1,
      },
    ],
  },
];

// ================== Components ==================
function StockClosure() {
  // ====== State ======
  const { userId } = useUser();

  const [stocks, setStocks] = useState(STOCKS_LIST);
  const [stockClosure, setStockClosure] = useState(STOCK_CLOSURE);
  const [stockClosureGridView, setStockClosureGridView] =
    useState(STOCK_CLOSURE);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingClosureId, setEditingClosureId] = useState(null);
  const [editingItemIndex, setEditingItemIndex] = useState(null);

  const { getValues, register } = useForm({
    defaultValues: {
      dataFechamento: formatdateToInput(),
      erro: 0,
    },
  });

  useEffect(() => {
    if (!stocks.length && userId) {
      GetStockByUser(userId).then((data) => {
        setStocks(data);
      });
    }
  }, [stocks, userId]);

  useEffect(() => {
    if (!stockClosure.length && stocks.length > 0) {
      GetStockClosureByStock(stocks[0].idEstoque).then((stocks) => {
        setStockClosure(GetStockClosureByStock(stocks[0].idEstoque));
        setStockClosureGridView(GetStockClosureByStock(stocks[0].idEstoque));
      });
    }
  }, [stocks, stockClosure]);

  // ====== Event Handlers ======
  const handleStockSelection = (stockId) => {
    console.log("Selected Stock:", stockId);
    GetStockClosureByStock(stockId).then((closures) => {
      setStockClosure(closures);
      setStockClosureGridView(closures);
    });
  };

  const handleGridSelection = () => {
    const { dataFechamento, erro } = getValues();

    let filtered = [...stockClosure];

    if (dataFechamento) {
      filtered = filtered.filter((c) => c.dataFechamento === dataFechamento);
    }

    if (erro === 1) {
      filtered = filtered.filter((c) => c.erro === true);
    } else if (erro === 2) {
      filtered = filtered.filter((c) => c.erro === false);
    }

    setStockClosureGridView(filtered);
  };

  const handleOpenEditModal = (closureId, itemIndex) => {
    setEditingClosureId(closureId);
    setEditingItemIndex(itemIndex);
    setModalOpen(true);
  };

  const handleNewClosureModalView = () => {
    setEditingClosureId(null);
    setEditingItemIndex(-1);
    setModalOpen(true);
  };

  const handleGetEditingItem = () => {
    if (editingClosureId === null && editingItemIndex === -1) {
      return {
        idProduto: null,
        nomeProduto: "",
        quantidadeFinal: 0,
        divergencia: false,
        quantidadeDivergencia: 0,
        quebrasContabilizadas: 0,
        cortesias: 0,
      };
    }

    const closure = stockClosure.find(
      (c) => c.idFechamento === editingClosureId
    );
    if (!closure || editingItemIndex === null) return null;
    return closure.itens[editingItemIndex];
  };

  // ====== Callback Functions ======
  const postSaveItem = (isEdit, returnedItem) => {
    if (isEdit) {
      setStockClosure((prev) => {
        const closureIndex = prev.findIndex(
          (c) => c.idFechamento === editingClosureId
        );
        if (closureIndex === -1) return prev;

        const updatedClosure = { ...prev[closureIndex] };
        updatedClosure.itens = [...updatedClosure.itens];
        updatedClosure.itens[editingItemIndex] = returnedItem;

        const newClosures = [...prev];
        newClosures[closureIndex] = updatedClosure;

        setStockClosureGridView(newClosures);
        setStockClosure(newClosures);
      });

      setEditingClosureId(returnedItem.idFechamento);
      setEditingItemIndex(
        stockClosure.findIndex(
          (closure) => closure.idFechamento == returnedItem.idFechamento
        )
      );
    } else {
      var newClosures = [...stockClosure, returnedItem];
      setStockClosure(newClosures);

      setEditingClosureId(null);
      setEditingItemIndex(null);
    }
  };

  // ====== Render ======
  return (
    <Layout>
      <PageContainer.Root>
        <PageContainer.Header title="Fechamento de Estoque">
          <StockControl
            parentStocks={stocks}
            stockSelectionFunc={handleStockSelection}
          />
        </PageContainer.Header>
        <PageContainer.Body>
          <div className="h-screen">
            <div className="flex bg-white p-4 rounded-lg items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <label className="text-black">Data de Fechamento</label>
                <input
                  {...register("dataFechamento")}
                  name="dataFechamento"
                  type="date"
                  className="rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-900 shadow-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="text-black mr-2">Erro?</label>
                <select
                  defaultValue={0}
                  className="p-2 border-2 border-gray-300 rounded-lg text-black"
                  {...register("erro")}
                >
                  <option value={0}>Selecione</option>
                  <option value={1}>Sim</option>
                  <option value={2}>Não</option>
                </select>
              </div>
              <button
                className="ml-4 p-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition"
                onClick={handleGridSelection}
              >
                Filtrar
              </button>
              <button
                className="ml-4 p-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition"
                onClick={handleNewClosureModalView}
              >
                Adicionar Fechamento
              </button>
            </div>

            <div className="h-screen overflow-y-auto p-6 bg-gray-100">
              <div className="grid grid-cols-5 gap-4 mb-4 text-sm text-gray-800 bg-gray-300 p-3 rounded-md font-semibold shadow-sm">
                <span>Data Fechamento</span>
                <span>Data Inicial Fechamento</span>
                <span>Data Final Fechamento</span>
                <span>Erro</span>
                <span>Itens</span>
              </div>

              {stockClosureGridView
                .sort(
                  (a, b) =>
                    new Date(b.dataFechamento) - new Date(a.dataFechamento)
                )
                .map((closure) => (
                  <details
                    key={closure.idFechamento}
                    className="mb-4 border rounded-md shadow-sm bg-white"
                  >
                    <summary className="grid grid-cols-5 gap-4 p-4 text-gray-900 hover:text-green-600 hover:font-medium cursor-pointer">
                      <span>{closure.dataFechamento}</span>
                      <span>{closure.dataInicioPeriodo}</span>
                      <span>{closure.dataFinalPeriodo}</span>
                      <span>{closure.erro ? "Sim" : "Não"}</span>
                      <span>{closure.itens.length}</span>
                    </summary>

                    <form className="p-5 bg-green-50 rounded-b-md text-gray-800">
                      <div className="grid grid-cols-7 gap-4 mb-3 font-semibold text-green-900 bg-green-200 p-2 rounded">
                        <span>Produto</span>
                        <span>Quantidade Final</span>
                        <span>Divergência</span>
                        <span>Qtd. Divergência</span>
                        <span>Quebras</span>
                        <span>Cortesias</span>
                        <span>Ações</span>
                      </div>

                      {closure.itens.map((item, index) => (
                        <div
                          key={index}
                          className="grid grid-cols-7 gap-4 p-3 mb-2 text-sm bg-white text-gray-900 rounded shadow-sm"
                        >
                          <span>{item.nomeProduto}</span>
                          <span>{item.quantidadeFinal}</span>
                          <span>{item.divergencia ? "Sim" : "Não"}</span>
                          <span>{item.quantidadeDivergencia}</span>
                          <span>{item.quebrasContabilizadas}</span>
                          <span>{item.cortesias}</span>
                          <div className="flex justify-center items-center space-x-4">
                            <button
                              type="button"
                              className="p-2 bg-blue-600 rounded-lg hover:bg-blue-900 text-white"
                              aria-label="Editar"
                              onClick={() =>
                                handleOpenEditModal(closure.idFechamento, index)
                              }
                            >
                              <PencilIcon className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              className="p-2 bg-red-600 rounded-lg hover:bg-red-900 text-white"
                              aria-label="Excluir"
                              onClick={() => {
                                setStockClosure((prev) => {
                                  const closureIndex = prev.findIndex(
                                    (c) =>
                                      c.idFechamento === closure.idFechamento
                                  );
                                  if (closureIndex === -1) return prev;

                                  const updatedClosure = {
                                    ...prev[closureIndex],
                                  };
                                  updatedClosure.itens =
                                    updatedClosure.itens.filter(
                                      (_, i) => i !== index
                                    );

                                  const newClosures = [...prev];
                                  newClosures[closureIndex] = updatedClosure;

                                  setStockClosureGridView(newClosures);

                                  return newClosures;
                                });
                              }}
                            >
                              <TrashIcon className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </form>
                  </details>
                ))}
            </div>
          </div>         
          <ExportPdf
            ExportFunction={ExportAllStockClosuresToPdf}
            sortedData={stockClosure.sort(
              (a, b) => new Date(b.dataFechamento) - new Date(a.dataFechamento)
            )}
          />
          {modalOpen && (
            <ClosureRegisterModal
              isEdit={
                editingItemIndex == null || editingItemIndex <= 0 ? false : true
              }
              closureItemEdit={handleGetEditingItem}
              closeFunc={setModalOpen}
              postSaveFunc={postSaveItem}
              availableItensList={fakeAvailableProducts}
            />
          )}
        </PageContainer.Body>
      </PageContainer.Root>
    </Layout>
  );
}

export default StockClosure;
