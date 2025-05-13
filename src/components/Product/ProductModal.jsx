import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";

function ProductModal({
  title,
  isNewProduct,
  product,
  closeFunc,
  postSaveFunc,
  postDeleteFunc,
}) {
  const [formData, setFormData] = useState({
    idProduto: product.idProduto,
    nomeProduto: product.nomeProduto,
    idMarca: product.idMarca,
    valor: product.valor,
    quantidade: 0,
    dataValidade: new Date().getDate(),
    promocao: product.promocao,
  });

  const handleFormDataValuesChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name == "idMarca" ? 1 : value,
    }));
  };

  const validateFieldsOnSubmit = () => {
    var error = "";

    if (formData.nomeProduto.length < 3)
      error = "O campo de nome do produto deve ter no mínimo 3 caracteres.";
    if (formData.idMarca == 0) error = "Escolha uma marca para o produto.";
    if (formData.valor <= 0) error = "O valor tem que ser maior que 0.";
    if (formData.quantidade == 0) error = "A quantidade deve ser maior que 0.";
    if (formData.dataValidade == new Date().getDate())
      error = "A data de validade não pode ser a data atual";

    if (error.length > 0) {
      toast.warn(error);
      return false;
    }

    return true;
  };

  const onSubmitProduct = () => {
    try {
      if (validateFieldsOnSubmit()) {
        if (isNewProduct) {
          new Promise((resolve) => {
            setTimeout(() => {
              resolve(
                new Response(JSON.stringify("Produtos criado com sucesso."), {
                  status: 200, // Ok
                  headers: {
                    "Content-Type": "application/json; utf-8",
                  },
                })
              );
            }, 2000);
          });

          console.log("Child trigger post save.");
          postSaveFunc(formData, isNewProduct);
          toast.success("Produto adicionado com sucesso.");
        } else {
          new Promise((resolve) => {
            setTimeout(() => {
              resolve(
                new Response(
                  JSON.stringify("Produto atualizado com sucesso."),
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

          toast.success("Produto atualizado com sucesso.");
        }
      } else {
        toast.error("Preencha todos os campos para salvar o produto.");
      }
    } catch (e) {
      toast.error(
        "Erro ao tentar".concat(
          " ",
          isNewProduct ? "salvar" : "editar",
          "produto."
        )
      );
      console.log(
        "Erro ao tentar".concat(
          " ",
          isNewProduct ? "salvar" : "editar",
          "produto: ",
          e
        )
      );
    }
  };

  const onDeleteProduct = () => {
    try {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve(
            new Response(JSON.stringify("Produto removido com sucesso."), {
              status: 200, // Ok
              headers: {
                "Content-Type": "application/json; utf-8",
              },
            })
          );
        }, 2000);
      });

      postDeleteFunc(formData);
    } catch (e) {
      toast.error("Erro ao tentar remover produto");
      console.log("Erro ao tentar remover produto: ".concat(e));
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

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
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
                      {title}
                    </span>
                    <button
                      type="button"
                      className="place-self-end rounded-md bg-red-600 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto"
                      onClick={() => closeFunc(false, isNewProduct)}
                    >
                      Fechar
                    </button>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Edite ou altere as propriedades do produto presente no
                      estoque.
                    </p>

                    <>
                      <div className="mt-10">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Nome Produto
                        </label>
                        <input
                          name="nomeProduto"
                          type="text"
                          value={formData.nomeProduto}
                          onChange={handleFormDataValuesChange}
                          className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-900 shadow-sm transition duration-150 ease-in-out focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                        />
                      </div>
                      <div className="mt-10">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Marca
                        </label>
                        <select
                          name="idMarca"
                          value={formData.idMarca}
                          onChange={handleFormDataValuesChange}
                          className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-900 shadow-sm transition duration-150 ease-in-out focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                        >
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                        </select>
                      </div>
                      <div className="mt-10">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Valor Unitário
                        </label>
                        <input
                          name="valor"
                          type="number"
                          value={formData.valor}
                          onChange={handleFormDataValuesChange}
                          className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-900 shadow-sm transition duration-150 ease-in-out focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                        />
                      </div>
                      <div className="mt-10">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Quantidade
                        </label>
                        {isNewProduct ? (
                          <></>
                        ) : (
                          <span className="text-xs font-semibold text-black/50">
                            (Utilize a tela de movimentações para alterar as
                            quantidades de produtos existentes)
                          </span>
                        )}
                        <input
                          name="quantidade"
                          type="number"
                          readOnly={isNewProduct ? false : true}
                          value={formData.quantidade}
                          onChange={handleFormDataValuesChange}
                          className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-900 shadow-sm transition duration-150 ease-in-out focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                        />
                      </div>
                      <div className="mt-10">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Data de Validade
                        </label>
                        <input
                          name="dataValidade"
                          type="date"
                          value={formData.dataValidade}
                          onChange={handleFormDataValuesChange}
                          className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-900 shadow-sm transition duration-150 ease-in-out focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                        />
                      </div>
                      <div className="mt-6 flex items-center gap-2">
                        <input
                          name="promocao"
                          type="checkbox"
                          checked={formData.promocao}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              promocao: e.target.checked,
                            }))
                          }
                          className="h-5 w-5 rounded border-gray-300 text-red-600 focus:ring-red-500"
                        />
                        <label
                          htmlFor="promocao"
                          className="text-sm text-gray-700"
                        >
                          Promoção
                        </label>
                      </div>
                    </>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                className="w-full rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto"
                onClick={onSubmitProduct}
              >
                Salvar
              </button>
              <button
                type="button"
                className="w-full rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto"
                onClick={onDeleteProduct}
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductModal;
