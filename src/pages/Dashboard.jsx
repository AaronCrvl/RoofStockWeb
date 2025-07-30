import React, { useEffect, useState } from "react";
import { useUser } from "../contexts/UserContext";
import { PageContainer } from "../components/PageContainer/index";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/solid";
import {
  TagIcon,
  ArrowDownIcon,
  CalendarIcon,
} from "@heroicons/react/24/solid";
import { getStockByUser } from "../services/api/stock.service";
import { getStockProducts } from "../services/api/stockProduct.services";
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
      setStocks(getStockByUser(userId));
      setStocksOverview(stocks[0]);
    }
  }, [stocks, userId]);

  useEffect(() => {
    if (products == null && stocks != null)
      setProducts(getStockProducts(stocks[0].idEstoque));
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

    new Promise((resolve) => {
      setTimeout(() => {
        resolve(
          new Response(JSON.stringify("Produtos carregados com sucesso."), {
            status: 200, // Ok
            headers: {
              "Content-Type": "application/json; utf-8",
            },
          })
        );
      }, 5000);
    });

    // TODO: Backend integration
    //setProducts(getStockProducts(selectedStockId));
    //setProductsGridView([...products]);
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

  const postSaveProduct = (id, product, isNew) => {
    if (isNew) {
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

      setProducts(updatedProductList);
      setProductsGridView(updatedProductList);
      toast.success("Produto atualizado com sucesso.");
    }

    handleProductModal(false, null);
  };

  const postDeleteProduct = (idProduto) => {
    const newProductList = products.filter(
      (prod) => prod.idProduto !== idProduto
    );

    setProducts(newProductList);
    setProductsGridView(newProductList);
    toast.success("Produto removido com sucesso.");
    handleProductModal(false, null);
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
          <div className="min-h-screen px-4 sm:px-6 md:px-8">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              {[
                {
                  title: "Produtos em Estoque",
                  value: stocksOverview.overviewDiario.produtosEmEstoque,
                  icon: <TagIcon className="w-10 h-10 text-orange-500" />,
                },
                {
                  title: "Entradas Hoje",
                  value: stocksOverview.overviewDiario.entradasHoje,
                  icon: <ArrowDownIcon className="w-10 h-10 text-orange-500" />,
                },
                {
                  title: "Promoções Ativas",
                  value: stocksOverview.overviewDiario.promocoesAtivas,
                  icon: <TagIcon className="w-10 h-10 text-orange-500" />,
                },
                {
                  title: "Vencimentos Próximos",
                  value: stocksOverview.overviewDiario.vencimentosProximos,
                  icon: <CalendarIcon className="w-10 h-10 text-orange-500" />,
                },
              ].map(({ title, value, icon }, index) => (
                <div
                  key={index}
                  className="p-4 bg-white text-black shadow-md rounded-lg hover:shadow-xl hover:border-orange-500 transition-all duration-300 ease-in-out hover:scale-105 cursor-pointer border border-gray-200"
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

            {/* Search & Filters */}
            <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-lg items-stretch sm:items-center justify-between mb-4">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Buscar Produto..."
                  className="text-black p-2 pl-10 pr-4 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
                  onChange={handleGridTextSearch}
                />
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

              <select className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-black">
                <option value="">Selecione a Marca</option>
                {["Alcolico", "Sem Alcool"].map((type, index) => (
                  <option
                    key={index}
                    value={type === "Alcolico" ? 0 : 1}
                  >
                    {type}
                  </option>
                ))}
              </select>

              <button className="p-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition duration-300">
                Filtrar
              </button>
            </div>

            {/* Product Table */}
            <div className="bg-white mt-10 p-4 rounded-lg overflow-x-auto">
              {/* Horizontal scroll container for small screens */}
              <div className="min-w-full md:min-w-[700px]">
                {/* Header and Button */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
                  <h2 className="text-xl font-bold text-black">
                    Controle de Estoque
                  </h2>
                  <button
                    onClick={() => handleProductModal(true, true, null)}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-300 text-sm w-full sm:w-auto"
                  >
                    Adicionar Produto
                  </button>
                </div>

                {/* Table Header */}
                <div className="hidden md:grid grid-cols-6 gap-4 mb-2 text-black bg-gray-200 p-2 rounded-lg font-semibold">
                  <div>Produto</div>
                  <div>Validade</div>
                  <div>Quantidade</div>
                  <div>Valor</div>
                  <div>Promoção</div>
                  <div>Ações</div>
                </div>

                {/* Product List */}
                <div className="space-y-4">
                  {productsGridView.map((product) => (
                    <div
                      key={product.idProduto}
                      className="text-black grid grid-cols-1 md:grid-cols-6 gap-4 p-4 bg-white border border-gray-200 rounded-lg hover:border-orange-500 transition duration-300"
                    >
                      {/* Mobile layout: label + value */}
                      <div className="flex items-center">
                        <img
                          src="https://img.icons8.com/ios-filled/50/product.png"
                          className="w-5 h-5 mr-2"
                          alt="Product Icon"
                        />
                        <span className="font-medium">
                          {product.nomeProduto}
                        </span>
                      </div>
                      <div>
                        <span className="md:hidden font-semibold">
                          Validade:{" "}
                        </span>
                        {product.dataValidade}
                      </div>
                      <div>
                        <span className="md:hidden font-semibold">
                          Quantidade:{" "}
                        </span>
                        {product.quantidade}
                      </div>
                      <div>
                        <span className="md:hidden font-semibold">Valor: </span>
                        R$ {parseFloat(product.valor).toFixed(2)}
                      </div>
                      <div>
                        <span className="md:hidden font-semibold">
                          Promoção:{" "}
                        </span>
                        <span
                          className={
                            product.promocao
                              ? "text-red-600 font-bold"
                              : "text-gray-600"
                          }
                        >
                          {product.promocao ? "Em Promoção" : "Sem Promoção"}
                        </span>
                      </div>
                      <div className="flex justify-start md:justify-end items-center space-x-2">
                        <button
                          className="p-2 bg-orange-600 rounded-lg hover:bg-orange-700"
                          onClick={() =>
                            handleProductModal(true, false, product)
                          }
                        >
                          <PencilIcon className="w-5 h-5 text-white" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Modal */}
                {viewProductModal && (
                  <ProductModal
                    title={isNewProduct ? "Inserir Produto" : "Editar Produto"}
                    closeFunc={handleProductModal}
                    isNewProduct={isNewProduct}
                    product={
                      isNewProduct
                        ? {
                            idProduto:
                              Math.max(
                                ...products.map((prod) => prod.idProduto)
                              ) + 1,
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
                    isClosure={false}
                    isTransaction={false}
                  />
                )}
              </div>
            </div>
          </div>
        </PageContainer.Body>
      </PageContainer.Root>
    </Layout>
  );
};

export default Dashboard;
