import React, { useState } from "react";
import { useForm } from "react-hook-form";
import ProductModal from "../Product/ProductModal";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { formatdateToInput } from "../../utils/dateFunctions.util";

function TransactionRegisterModal({
  stockId,
  defaultTransaction,
  transactionItemEdit,
  isEdit,
  pTransactionItens,
  availableItensList,
  closeFunc,
  postSaveFunc,
}) {
  const [availableProducts] = useState(availableItensList);
  const [itensGridView, setIensGridView] = useState(null);
  const [openItemModal, setOpenItemModal] = useState(false);
  const [transactionItens, setTransactionItens] = useState(
    pTransactionItens == null ? [] : pTransactionItens
  );
  const [selectedProduct, setSelectedProduct] = useState(null);
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      dataMovimentacao:
        defaultTransaction == null
          ? formatdateToInput()
          : formatdateToInput(defaultTransaction.dataMovimentacao),
      tipoMivimentacao:
        defaultTransaction == null ? 1 : defaultTransaction.tipoMivimentacao,
    },
  });

  //   useEffect(() => {
  //     if (
  //       availableItensList != null &&
  //       availableProducts != null &&
  //       itensGridView == null
  //     )
  //       setIensGridView(...availableProducts);
  //   }, [availableItensList, availableProducts, itensGridView]);

  useEffect(() => {
    if (isEdit) {
      setSelectedProduct(transactionItemEdit);
      handleItemModalVisibility(true);
    }
  }, [isEdit, transactionItemEdit]);

  const handleItemModalVisibility = (open) => {
    setOpenItemModal(open);
    if (!open) setSelectedProduct(null);
  };

  const handleOwnVisibility = (open) => {
    closeFunc(open);
  };

  const handleItemAdd = (id) => {
    var item = availableProducts.filter((prod) => prod.idProduto == id)[0];
    setSelectedProduct(item);
    handleItemModalVisibility(true);
  };

  const handlePostAddItem = (product) => {
    var newTransactionItens = [...transactionItens, product];
    setTransactionItens(newTransactionItens);
    handleItemModalVisibility(false);
  };

  const handleGridTextSearch = (e) => {
    var text = e.target.value;
    if (text == "") setIensGridView(...availableProducts);
    else {
      var newFilteredList = availableProducts.filter((product) =>
        product.nomeProduto.includes(text)
      );
      setIensGridView(newFilteredList);
    }
  };

  const onSubmitTransaction = () => {
    if (transactionItens.length == 0)
      toast.error("A movimentação precisa de itens para ser enviada.");
    else {
      postSaveFunc({
        idMovimentacao: 0,
        idEstoque: stockId,
        idUsuario: 0,
        dataMovimentacao: getValues("dataMovimentacao"),
        tipoMovimentacao: getValues("tipoMivimentacao"),
        processado: false,
        itens: [...transactionItens],
      });
      toast.success(
        "Produto adicionado aos itens da movimentação com sucesso."
      );
      closeFunc(false);
    }
  };

  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="fixed inset-0 bg-gray-500/75 transition-opacity"
        aria-hidden="true"
      ></div>

      <form
        className="fixed inset-0 z-10 w-screen overflow-y-auto"
        onSubmit={handleSubmit(onSubmitTransaction)}
      >
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-orange-200 sm:mx-0 sm:size-10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M6 2a1 1 0 0 0-1 1v2H3a1 1 0 0 0-1 1v15a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a1 1 0 0 0-1-1h-2V3a1 1 0 0 0-1-1H6zm1 3V4h10v1H7zm0 3h10v12H7V8z" />
                  </svg>
                </div>

                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <div className="flex w-full">
                    <span
                      className="text-base font-semibold text-6xl text-gray-900"
                      id="modal-title"
                    >
                      Cadastro de Movimentação de Estoque
                    </span>
                    <button
                      type="button"
                      className="place-self-end rounded-md bg-red-600 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto"
                      onClick={() => handleOwnVisibility(false)}
                    >
                      Fechar
                    </button>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Insira movimentações de estoque, conforme os eventos são
                      concluídos.
                    </p>

                    <>
                      <div className="mt-10">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Data da Movimentação
                        </label>
                        <input
                          name="dataMovimentacao"
                          type="date"
                          {...register("dataMovimentacao", {
                            required: "A data da movimentação é obrigatória.",
                            valueAsDate: true,
                            validate: {
                              validDate: (date) =>
                                new Date() <= new Date(date) ||
                                "A data utilizada não é válida.", // transaction date is earlier then today
                            },
                          })}
                          className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-900 shadow-sm transition duration-150 ease-in-out focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                        />
                        {errors.dataMovimentacao && (
                          <p className="text-red-600">
                            {errors.dataMovimentacao.message}
                          </p>
                        )}
                      </div>
                      <div className="mt-10">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Tipo de Movimentação
                        </label>
                        <select
                          name="tipoMivimentacao"
                          {...register("tipoMivimentacao", {
                            required: "O tipo de movimentação é obrigatório.",
                          })}
                          className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-900 shadow-sm transition duration-150 ease-in-out focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                        >
                          <option value={1}>Entrada</option>
                          <option value={2}>Saída</option>
                        </select>
                        {errors.tipoMivimentacao && (
                          <p className="text-red-600">
                            {errors.tipoMivimentacao.message}
                          </p>
                        )}
                      </div>
                      <div className="mt-10">
                        <div className="flex w-full">
                          <div className="flex-1 relative">
                            <input
                              type="text"
                              placeholder="Buscar Produto..."
                              className="text-black p-2 pl-10 pr-4 border-2 border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
                              onChange={handleGridTextSearch}
                            />
                            {/* Search Icon */}
                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                strokeWidth="2"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M10 16h6M10 12h6m-6-4h6M6 20h12a2 2 0 002-2v-4a2 2 0 00-2-2M6 12a6 6 0 1112 0 6 6 0 01-12 0z"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 rounded-lg bg-gray-300/75 text-black font-bold bg-red-400/75 p-2">
                          {itensGridView &&
                            itensGridView.length > 0 &&
                            itensGridView.map((item, index) => (
                              <div
                                key={index}
                                className="block p-1 rounded-lg hover:cursor-pointer hover:bg-red-100"
                                onClick={() => handleItemAdd(item.idProduto)}
                              >
                                {"".concat(
                                  item.nomeProduto,
                                  " - Estoque: ",
                                  item.quantidade,
                                  " - Validade: ",
                                  item.dataValidade
                                )}
                              </div>
                            ))}
                        </div>
                      </div>

                      <div className="mt-10">
                        <div className="w-full rounded-lg bg-white shadow-md p-4 select-none">
                          <div className="grid grid-cols-4 gap-4 bg-gray-100 font-semibold text-gray-700 py-2 px-3 rounded-md">
                            <span>Nome</span>
                            <span>Quantidade</span>
                            <span>Quebras</span>
                            <span>Cortesias</span>
                          </div>

                          {transactionItens && transactionItens.length > 0 ? (
                            transactionItens.map((product, index) => (
                              <div
                                key={index}
                                className={`grid grid-cols-4 gap-4 px-3 py-2 ${
                                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                                } text-gray-800 rounded-md`}
                              >
                                <span>{product.nomeProduto}</span>
                                <span>{product.quantidadeMovimentacao}</span>
                                <span>{product.quebras}</span>
                                <span>{product.cortesias}</span>
                              </div>
                            ))
                          ) : (
                            <div className="text-center text-gray-500 py-4">
                              Nenhum item encontrado.
                            </div>
                          )}
                        </div>
                      </div>
                    </>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="submit"
                className="w-full rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      </form>
      {openItemModal && (
        <ProductModal
          title={"Adicionar item na movimentação"}
          product={selectedProduct}
          isNewProduct={true}
          isTransaction={true}
          postSaveFunc={handlePostAddItem}
          postDeleteFunc={null}
          closeFunc={() => handleItemModalVisibility(false)}
        />
      )}
    </div>
  );
}

export default TransactionRegisterModal;
