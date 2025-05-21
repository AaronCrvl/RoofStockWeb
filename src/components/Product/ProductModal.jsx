import React from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

function ProductModal({
  title,
  isNewProduct,
  product,
  closeFunc,
  postSaveFunc,
  postDeleteFunc,
  isTransaction = false,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      idProduto: product == null ? 0 : product.idProduto,
      nomeProduto: product == null ? "" : product.nomeProduto,
      idMarca: product == null ? 0 : product.idMarca,
      valor: product == null ? 0 : product.valor,
      quantidade: product == null ? 0 : product.quantidade,
      dataValidade:  product == null ?  new Date()
        .getFullYear()
        .toString()
        .concat(
          "-",
          String(new Date().getMonth() + 1).padStart(2, "0"),
          "-",
          String(new Date().getDate()).padStart(2, "0")
        ) : product.dataValidade,
      promocao: product == null ? false : product.promocao,
      quantidadeMovimentacao: 0,
      quebras: 0,
      cortesias: 0,
    },
  });

  const onSubmitProduct = (data) => {
    try {
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

        postSaveFunc(data, isNewProduct);        
      } else {
        new Promise((resolve) => {
          setTimeout(() => {
            resolve(
              new Response(JSON.stringify("Produto atualizado com sucesso."), {
                status: 200, // Ok
                headers: {
                  "Content-Type": "application/json; utf-8",
                },
              })
            );
          }, 2000);
        });        
      }
    } catch (e) {
      toast.error(
        "Erro ao tentar".concat(
          " ",
          isNewProduct ? "salvar" : "editar",
          " produto."
        )
      );
      console.log(
        "Erro ao tentar".concat(
          " ",
          isNewProduct ? "salvar" : "editar",
          " produto: ",
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
      
      if (postDeleteFunc != null) postDeleteFunc(product.idProduto);
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

      <form
        className="fixed inset-0 z-10 w-screen overflow-y-auto"
        onSubmit={handleSubmit(onSubmitProduct)}
      >
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
                      onClick={() =>
                        isTransaction
                          ? closeFunc(false)
                          : closeFunc(false, isNewProduct)
                      }
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
                      <div
                        className={"mt-10".concat(
                          isTransaction ? " opacity-50 " : " opacity-10 "
                        )}
                      >
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Nome Produto
                        </label>
                        <input
                          name="nomeProduto"
                          type="text"
                          {...register("nomeProduto", {
                            required: "O nome do produto é obrigatório.",
                            minLength: 3,
                          })}
                          className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-900 shadow-sm transition duration-150 ease-in-out focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                        />
                        {errors.nomeProduto && (
                          <p className="text-red-600">
                            {errors.nomeProduto.message}
                          </p>
                        )}
                      </div>
                      <div
                        className={"mt-10".concat(
                          isTransaction ? " opacity-50 " : " opacity-10 "
                        )}
                      >
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Marca
                        </label>
                        <select
                          name="idMarca"
                          readOnly={isTransaction ? true : false}
                          {...register("idMarca", {
                            required:
                              "A seleção da marca do produto é obrigatória.",
                          })}
                          className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-900 shadow-sm transition duration-150 ease-in-out focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                        >
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                        </select>
                        {errors.idMarca && (
                          <p className="text-red-600">
                            {errors.idMarca.message}
                          </p>
                        )}
                      </div>
                      <div
                        className={"mt-10".concat(
                          isTransaction ? " opacity-50 " : " opacity-10 "
                        )}
                      >
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Valor Unitário
                        </label>
                        <input
                          name="valor"
                          readOnly={isTransaction ? true : false}
                          type="number"
                          {...register("valor", {
                            required: "O valor é obrigatório.",
                            min: {
                              value: 1,
                              message: "O valor deve ser maior que zero.",
                            },
                          })}
                          className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-900 shadow-sm transition duration-150 ease-in-out focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                        />
                        {errors.valor && (
                          <p className="text-red-600">{errors.valor.message}</p>
                        )}
                      </div>
                      <div
                        className={"mt-10".concat(
                          isTransaction ? " opacity-50 " : " opacity-10 "
                        )}
                      >
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Quantidade Em Estoque
                        </label>
                        {isNewProduct ? (
                          <></>
                        ) : (
                          <span className="text-xs font-semibold text-black/50">
                            (Utilize a tela de movimentações para alterar as
                            quantidades de produtos existentes)
                          </span>
                        )}
                        {isTransaction ? (
                          <></>
                        ) : (
                          <span className="text-xs font-semibold text-black/50">
                            Em estoque atualmente : {product.quantidade}
                          </span>
                        )}
                        <input
                          name="quantidade"
                          type="number"
                          readOnly={isNewProduct ? false : true}
                          {...register("quantidade", {
                            required: "A quantidade é obrigatória.",
                            min: {
                              value: 1,
                              message: "A quantidade deve ser maior que zero.",
                            },
                          })}
                          className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-900 shadow-sm transition duration-150 ease-in-out focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                        />
                        {errors.quantidade && (
                          <p className="text-red-600">
                            {errors.quantidade.message}
                          </p>
                        )}
                      </div>
                      <div
                        className={"mt-10".concat(
                          isTransaction ? " opacity-50 " : " opacity-10 "
                        )}
                      >
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Data de Validade
                        </label>
                        <input
                          name="dataValidade"
                          type="date"
                          readOnly={isTransaction ? true : false}
                          {...register("dataValidade", {
                            required: "A data de validade é obrigatória.",
                            valueAsDate: true,
                          })}
                          className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-900 shadow-sm transition duration-150 ease-in-out focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                        />
                        {errors.dataValidade && (
                          <p className="text-red-600">
                            {errors.dataValidade.message}
                          </p>
                        )}
                      </div>
                      <div
                        className={"mt-6 flex items-center gap-2".concat(
                          isTransaction ? " opacity-50 " : " opacity-10 "
                        )}
                      >
                        <input
                          name="promocao"
                          type="checkbox"
                          readOnly={isTransaction ? true : false}
                          {...register("promocao", {
                            value: false,
                          })}
                          className="h-5 w-5 rounded border-gray-300 text-red-600 focus:ring-red-500"
                        />
                        <label
                          htmlFor="promocao"
                          className="text-sm text-gray-700"
                        >
                          Promoção
                        </label>
                        {errors.promocao && (
                          <p className="text-red-600">
                            {errors.promocao.message}
                          </p>
                        )}
                      </div>

                      {isTransaction && (
                        <>
                          <div className="mt-10">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Quantidade Movimentação
                            </label>
                            <input
                              name="quantidadeMovimentacao"
                              type="number"
                              {...register("quantidadeMovimentacao", {
                                required:
                                  "A quantidade de movimentação é obrigatória.",
                                min: {
                                  value: 1,
                                  message:
                                    "A quantidade de movimentação não pode ser menor ou igual a zero.",
                                },
                              })}
                              className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-900 shadow-sm transition duration-150 ease-in-out focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                            />
                            {errors.quantidadeMovimentacao && (
                              <p className="text-red-600">
                                {errors.quantidadeMovimentacao.message}
                              </p>
                            )}
                          </div>
                          <div className="mt-10">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Quebras
                            </label>
                            <input
                              name="quebras"
                              type="number"
                              {...register("quebras", {
                                required:
                                  "A quantidade de quebras é obrigatória.",
                                min: {
                                  value: 0,
                                  message:
                                    "A quantidade de quebras não pode ser negativa.",
                                },
                              })}
                              className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-900 shadow-sm transition duration-150 ease-in-out focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                            />
                            {errors.quebras && (
                              <p className="text-red-600">
                                {errors.quebras.message}
                              </p>
                            )}
                          </div>

                          <div className="mt-10">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Cortesias
                            </label>
                            <input
                              name="cortesias"
                              type="number"
                              {...register("cortesias", {
                                required:
                                  "A quantidade de cortesias é obrigatória.",
                                min: {
                                  value: 0,
                                  message:
                                    "A quantidade de cortesias não pode ser negativa.",
                                },
                              })}
                              className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-900 shadow-sm transition duration-150 ease-in-out focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                            />
                            {errors.cortesias && (
                              <p className="text-red-600">
                                {errors.cortesias.message}
                              </p>
                            )}
                          </div>
                        </>
                      )}
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
              {postDeleteFunc && (
                <button
                  type="button"
                  className="w-full rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto"
                  onClick={onDeleteProduct}
                >
                  Excluir
                </button>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ProductModal;
