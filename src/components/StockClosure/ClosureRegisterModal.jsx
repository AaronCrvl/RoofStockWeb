import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import ProductModal from "../Product/ProductModal";
import { toast } from "react-toastify";
import { formatdateToInput } from "../../utils/dateFunctions.util";

function ClosureRegisterModal({
  stockId,
  defaultClosure,
  closureItemEdit,
  isEdit,
  pClosureItens,
  availableItensList,
  closeFunc,
  postSaveFunc,
}) {
  const [availableProducts] = useState(availableItensList || []);
  const [itensGridView, setItensGridView] = useState(availableProducts);
  const [openItemModal, setOpenItemModal] = useState(false);
  const [closureItens, setClosureItens] = useState(pClosureItens || []);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      dataFechamento: defaultClosure
        ? formatdateToInput(defaultClosure.dataFechamento)
        : formatdateToInput(),
      dataIncialFechamento: defaultClosure
        ? formatdateToInput(defaultClosure.dataIncialFechamento)
        : formatdateToInput(),
      dataFinalFechamento: defaultClosure
        ? formatdateToInput(defaultClosure.dataFinalFechamento)
        : formatdateToInput(),
      erro: defaultClosure ? defaultClosure.erro : false,
    },
  });

  useEffect(() => {
    if (isEdit && closureItemEdit) {
      setSelectedProduct(closureItemEdit);
      setOpenItemModal(true);
    }
  }, [isEdit, closureItemEdit]);

  const handleItemModalVisibility = (open) => {
    setOpenItemModal(open);
    if (!open) setSelectedProduct(null);
  };

  const handleItemAdd = (id) => {
    const item = availableProducts.find((prod) => prod.idProduto === id);
    if (item) {
      setSelectedProduct(item);
      setOpenItemModal(true);
    }
  };

  const handlePostAddItem = (product) => {
    try {
      // Check if product already exists, update or add new
      const existsIndex = closureItens.findIndex(
        (item) => item.idProduto === product.idProduto
      );
      let newItems;
      if (existsIndex !== -1) {
        newItems = [...closureItens];
        newItems[existsIndex] = product;
      } else {
        newItems = [...closureItens, product];
      }
      setClosureItens(newItems);
      handleItemModalVisibility(false);
    } catch (error) {
      toast.error("Erro ao salvar item do fechamento.");
      console.error("Error saving closure item:", error);
    }
  };

  const handleGridTextSearch = (e) => {
    const text = e.target.value.toLowerCase();
    if (!text) {
      setItensGridView(availableProducts);
    } else {
      const filtered = availableProducts.filter((product) =>
        product.nomeProduto.toLowerCase().includes(text)
      );
      setItensGridView(filtered);
    }
  };

  const onSubmit = () => {
    if (closureItens.length === 0) {
      toast.error("O fechamento precisa de itens.");
      return;
    }

    const data = {
      idFechamento: isEdit && defaultClosure ? defaultClosure.idFechamento : 0,
      idEstoque: stockId,
      dataFechamento: getValues("dataFechamento"),
      dataIncialFechamento: getValues("dataIncialFechamento"),
      dataFinalFechamento: getValues("dataFinalFechamento"),
      erro: getValues("erro"),
      itens: closureItens,
    };

    postSaveFunc(data);
    toast.success("Fechamento salvo com sucesso!");
    closeFunc(false);
  };

  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      {/* Background overlay */}
      <div
        className="fixed inset-0 bg-gray-500/75 transition-opacity"
        aria-hidden="true"
      ></div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="fixed inset-0 z-20 flex items-center justify-center p-4 overflow-y-auto"
      >
        <div className="relative w-full max-w-3xl overflow-hidden rounded-lg bg-white shadow-xl">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
            <h2
              className="text-xl font-semibold text-gray-900"
              id="modal-title"
            >
              Cadastro de Fechamento
            </h2>
            <button
              type="button"
              className="rounded-md bg-red-600 px-3 py-1 text-sm font-semibold text-white hover:bg-red-500"
              onClick={() => closeFunc(false)}
              aria-label="Fechar modal"
            >
              Fechar
            </button>
          </div>

          {/* Body */}
          <div className="space-y-6 p-6 text-gray-700">
            {/* Dates */}
            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="dataFechamento"
              >
                Data do Fechamento
              </label>
              <input
                id="dataFechamento"
                type="date"
                {...register("dataFechamento", {
                  required: "Data obrigatória.",
                })}
                className={`w-full rounded-md border px-4 py-2 text-gray-900 shadow-sm focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 ${
                  errors.dataFechamento ? "border-red-600" : "border-gray-300"
                }`}
              />
              {errors.dataFechamento && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.dataFechamento.message}
                </p>
              )}
            </div>

            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="dataIncialFechamento"
              >
                Data Inicial do Período
              </label>
              <input
                id="dataIncialFechamento"
                type="date"
                {...register("dataIncialFechamento", {
                  required: "Data obrigatória.",
                })}
                className={`w-full rounded-md border px-4 py-2 text-gray-900 shadow-sm focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 ${
                  errors.dataIncialFechamento
                    ? "border-red-600"
                    : "border-gray-300"
                }`}
              />
              {errors.dataIncialFechamento && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.dataIncialFechamento.message}
                </p>
              )}
            </div>

            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="dataFinalFechamento"
              >
                Data Final do Período
              </label>
              <input
                id="dataFinalFechamento"
                type="date"
                {...register("dataFinalFechamento", {
                  required: "Data obrigatória.",
                })}
                className={`w-full rounded-md border px-4 py-2 text-gray-900 shadow-sm focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 ${
                  errors.dataFinalFechamento
                    ? "border-red-600"
                    : "border-gray-300"
                }`}
              />
              {errors.dataFinalFechamento && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.dataFinalFechamento.message}
                </p>
              )}
            </div>

            {/* Product Search */}
            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="productSearch"
              >
                Buscar Produto
              </label>
              <input
                id="productSearch"
                type="text"
                placeholder="Digite o nome do produto"
                onChange={handleGridTextSearch}
                className="w-full rounded-md border border-gray-300 px-4 py-2 text-gray-900 shadow-sm focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
                autoComplete="off"
              />
            </div>

            {/* Product list */}
            <div className="max-h-40 overflow-y-auto rounded-md border border-gray-300 bg-gray-50">
              {itensGridView && itensGridView.length > 0 ? (
                itensGridView.map((item) => (
                  <div
                    key={item.idProduto}
                    className="flex cursor-pointer items-center justify-between border-b border-gray-200 px-4 py-2 hover:bg-red-100"
                    onClick={() => handleItemAdd(item.idProduto)}
                    role="button"
                    tabIndex={0}
                    onKeyPress={(e) => {
                      if (e.key === "Enter" || e.key === " ")
                        handleItemAdd(item.idProduto);
                    }}
                  >
                    <span>{item.nomeProduto}</span>
                    <span className="text-sm text-gray-500">
                      {item.quantidadeEstoque} em estoque
                    </span>
                  </div>
                ))
              ) : (
                <p className="p-4 text-center text-gray-500">
                  Nenhum produto encontrado.
                </p>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end border-t border-gray-200 bg-white px-6 py-4">
            <button
              type="submit"
              className="rounded-md bg-red-600 px-6 py-2 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Salvar Fechamento
            </button>
          </div>
        </div>
      </form>

      {openItemModal && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-50">
          <ProductModal
            title="Alterar item no fechamento"
            product={selectedProduct}
            isNewProduct={true}
            isTransaction={true}
            postSaveFunc={handlePostAddItem}
            closeFunc={() => handleItemModalVisibility(false)}
            isClosure={true}
          />
        </div>
      )}
    </div>
  );
}

export default ClosureRegisterModal;
