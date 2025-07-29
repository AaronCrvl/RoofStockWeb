import React, { useEffect, useState } from "react";
import { useUser } from "../contexts/UserContext";
import { PageContainer } from "../components/PageContainer/index";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/solid";
import {
  TagIcon,
  ArrowDownIcon,
  CalendarIcon,
} from "@heroicons/react/24/solid";
import { GetStockByUser } from "../services/api/stock.service";
import {
  GetStockProducts,
  AddStockProduct,
  UpdateStockProduct,
  DeleteStockProduct,
} from "../services/api/stockProduct.services";
import ProductModal from "../components/Product/ProductModal";
import Layout from "../layout/Layout";
import { dateDiffForProductExpireDate } from "../utils/dateFunctions.util";
import StockControl from "../components/StockControl";
import { toast } from "react-toastify";

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

const Dashboard = () => {
  const { userId } = useUser();

  const [stocks, setStocks] = useState(STOCKS_LIST);
  const [stocksOverview, setStocksOverview] = useState(STOCKS_LIST[0]);
  const [products, setProducts] = useState(PRODUCT_LIST);
  const [productsGridView, setProductsGridView] = useState(PRODUCT_LIST);
  const [viewProductModal, setViewProductModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isNewProduct, setIsNewProduct] = useState(false);

  useEffect(() => {
    if (stocks == null && userId) {
      setStocks(GetStockByUser(userId));
      setStocksOverview(stocks[0]);
    }
  }, [stocks, userId]);

  useEffect(() => {
    if (products == null && stocks != null)
      setProducts(GetStockProducts(stocks[0].idEstoque));
  }, [products, stocks]);

  const handleStockSelection = (childStockSelect) => {
    const item = stocks.find((stock) => stock.idEstoque == childStockSelect);
    setStocksOverview({
      ...stocksOverview,
      nomeEstoque: item.nomeEstoque,
      entradaEstoque: item.overviewMensal.entradasMes,
      saidasEstoque: item.overviewMensal.saidasMes,
      ultimaMovimentacao: new Date().toLocaleString("pt-BR"),
      overviewDiario: item.overviewDiario,
      overviewMensal: item.overviewMensal,
    });

    setProducts(GetStockProducts(childStockSelect));
    setProductsGridView([...products]);
  };

  const handleGridTextSearch = (e) => {
    if (e.target.value.length == 0) {
      setProductsGridView([...products]);
    }
    const filteredList = products.filter((p) =>
      p.nomeProduto.includes(e.target.value)
    );
    setProductsGridView(filteredList);
  };

  const handleProductModal = (open, newProduct, product = null) => {
    setViewProductModal(open);
    setIsNewProduct(newProduct);
    setSelectedProduct(product);
  };

  const postSaveProduct = (product, isNew) => {
    if (isNew) {
      AddStockProduct(product)
        .then(() => {
          const newList = [...products, product];
          setProducts(newList);
          setProductsGridView(newList);

          const stockOverViewUpated = stocks.map((stock) =>
            stock.idEstoque == product.idEstoque
              ? {
                  ...stock,
                  overviewDiario: {
                    produtosEmEstoque: stock.overviewDiario.produtosEmEstoque,
                    entradasHoje: stock.overviewDiario.entradasHoje + 1,
                    promocoesAtivas: product.promocao
                      ? stock.overviewDiario.promocoesAtivas + 1
                      : stock.overviewDiario.entradasHoje,
                    vencimentosProximos:
                      dateDiffForProductExpireDate(
                        new Date(),
                        product.dataValidade
                      ) > 14
                        ? stock.overviewDiario.vencimentosProximos
                        : stock.overviewDiario.vencimentosProximos + 1,
                  },
                }
              : stock
          );

          setStocks(stockOverViewUpated);
          const selectedStock = stocks.find(
            (stock) => stock.idEstoque == stocksOverview.idEstoque
          );
          setStocksOverview(selectedStock);
          toast.success("Produto adicionado com sucesso.");
          handleProductModal(false, null);
        })
        .catch(() => {
          toast.error("Ocorreu um erro ao adicionar o produto ao estoque.");
        });
    } else {      
      const updatedProductList = products.map((prod) =>
        prod.idProduto === product.idProduto
          ? {
              ...prod,
              idProduto: product.idProduto,
              nomeProduto: product.nomeProduto,
              idMarca: product.idMarca,
              valor: product.valor,
              promocao: product.promocao,
            }
          : prod
      );

      const updatedProduct = updatedProductList.find(
        (prod) => prod.idProduto === product.idProduto
      );
      UpdateStockProduct(product.idProduto, updatedProduct)
        .then(() => {
          setProducts(updatedProductList);
          setProductsGridView(updatedProductList);
          toast.success("Produto atualizado com sucesso.");
          handleProductModal(false, null);
        })
        .catch(() => {
          toast.error("Ocorreu um erro ao atualizar o produto no estoque.");
        });
    }    
  };

  const postDeleteProduct = (idProduto) => {
    DeleteStockProduct(idProduto)
      .then(() => {
        const newProductList = products.filter(
          (prod) => prod.idProduto !== idProduto
        );

        setProducts(newProductList);
        setProductsGridView(newProductList);
        toast.success("Produto removido com sucesso.");
        handleProductModal(false, null);
      })
      .catch(() => {
        toast.error("Ocorreu um erro ao remover o produto do estoque.");
      });
  };

  return (
    <Layout>
      <PageContainer.Root>
        <PageContainer.Header title={"Dashboard"}>
          <StockControl
            parentStocks={stocks}
            stockSelectionFunc={handleStockSelection}
          />
        </PageContainer.Header>

        <PageContainer.Body>
          <div className="h-screen">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[
                {
                  title: "Produtos em Estoque",
                  value: stocksOverview.overviewDiario.produtosEmEstoque,
                  icon: <TagIcon className="w-16 h-16 text-orange-500" />,
                },
                {
                  title: "Entradas Hoje",
                  value: stocksOverview.overviewDiario.entradasHoje,
                  icon: <ArrowDownIcon className="w-16 h-16 text-orange-500" />,
                },
                {
                  title: "Promoções Ativas",
                  value: stocksOverview.overviewDiario.promocoesAtivas,
                  icon: <TagIcon className="w-16 h-16 text-orange-500" />,
                },
                {
                  title: "Vencimentos Próximos",
                  value: stocksOverview.overviewDiario.vencimentosProximos,
                  icon: <CalendarIcon className="w-16 h-16 text-orange-500" />,
                },
              ].map(({ title, value, icon }, index) => (
                <div
                  key={index}
                  className="p-6 bg-white text-black shadow-md rounded-lg hover:shadow-xl hover:border-orange-500 transition-all duration-300 ease-in-out hover:scale-105 hover:cursor-pointer border border-gray-300"
                >
                  <div className="flex items-center space-x-4">
                    {icon}
                    <div>
                      <p className="text-sm font-semibold text-gray-600">
                        {title}
                      </p>
                    </div>
                  </div>
                  <p className="text-xl font-bold text-orange-600 mt-2">
                    {value}
                  </p>
                </div>
              ))}
            </div>

            {/* Movimentações Mensais
          <MonthlyMovement stocksOverview={stocksOverview}></MonthlyMovement> */}

            {/* Lista de Produtos */}
            <div className="mb-8">
              <div className="flex bg-white p-4 rounded-lg items-center justify-between space-x-4 mb-4">
                {/* Search Input */}
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

                {/* Product Option Select */}
                <div className="flex-shrink-0">
                  <select className="p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-black">
                    <option value="">Selecione a Marca</option>
                    {["Alcolico", "Sem Alcool"].map((type, index) =>
                      index > 1 ? (
                        <></>
                      ) : (
                        <option
                          key={index}
                          value={type.tipoProduto == "Alcolico" ? 0 : 1}
                        >
                          {type}
                        </option>
                      )
                    )}
                  </select>
                </div>

                {/* Filter Button */}
                <div className="flex-shrink-0">
                  <button className="ml-4 p-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-all duration-300">
                    Filtrar
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white mt-10 p-4 rounded-lg">
              {/* Search Section */}
              <div className="mb-10">
                <div className="flex">
                  <span className="text-black mr-auto font-bold text-xl">
                    Controle de Estoque
                  </span>
                  <button
                    onClick={() => handleProductModal(true, true, null)}
                    className="bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300"
                  >
                    Adicionar Produto
                  </button>
                </div>
              </div>

              <>
                <div className="grid grid-cols-6 gap-6 mb-1 text-black bg-gray-200 p-2 rounded-lg font-semibold">
                  <div>Produto</div>
                  <div>Validade</div>
                  <div>Quantidade em Estoque</div>
                  <div>Valor</div>
                  <div>Promoção</div>
                  <div>Ações</div>
                </div>
                <div>
                  {productsGridView.map((product) => (
                    <div key={product.idProduto}>
                      <div className="text-black grid grid-cols-6 gap-6 mb-2 p-4 bg-white border-b border-gray-300 hover:border-orange-500 transition-all duration-300 hover:cursor-pointer">
                        <div className="flex items-center">
                          <img
                            src="https://img.icons8.com/ios-filled/50/product.png"
                            className="w-6 h-6 mr-2"
                            alt="Product Icon"
                          />
                          {product.nomeProduto}
                        </div>
                        <div>{product.dataValidade}</div>
                        <div>{product.quantidade}</div>
                        <div>
                          {"R$".concat(
                            " ",
                            parseFloat(product.valor).toFixed(2)
                          )}
                        </div>
                        <div
                          className={
                            product.promocao
                              ? "text-red-600 font-bold"
                              : "text-gray-600"
                          }
                        >
                          {product.promocao ? "Em Promoção" : "Sem Promoção"}
                        </div>

                        <div className="flex justify-end items-center space-x-4">
                          <button
                            className="p-2 bg-orange-600 rounded-lg hover:bg-orange-700 transition-all duration-300"
                            onClick={() =>
                              handleProductModal(true, false, product)
                            }
                            aria-label="Editar"
                          >
                            <PencilIcon className="w-6 h-6 text-white" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {viewProductModal && (
                    <>
                      <ProductModal
                        title={
                          isNewProduct ? "Inserir Produto" : "Editar Produto"
                        }
                        closeFunc={handleProductModal}
                        isNewProduct={isNewProduct}
                        product={
                          isNewProduct
                            ? {
                                idProduto:
                                  Math.max(
                                    ...products.map((prod) => prod.idProduto)
                                  ) + 1,
                                idEstoque: 0,
                                nomeProduto: "",
                                idMarca: 0,
                                valor: 0,
                                quantidade: 0,
                                promocao: false,
                              }
                            : selectedProduct
                        }
                        postSaveFunc={postSaveProduct}
                        postDeleteFunc={postDeleteProduct}
                      />
                    </>
                  )}
                </div>
              </>
            </div>
          </div>
        </PageContainer.Body>
      </PageContainer.Root>
    </Layout>
  );
};

export default Dashboard;
