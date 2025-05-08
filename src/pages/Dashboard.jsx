import React, { useEffect, useState } from "react";
import { useCompany } from "../contexts/CompanyContext";
import { useUser } from "../contexts/UserContext";
import { PageContainer } from "../components/PageContainer/index";
import {
  TrashIcon,
  PencilIcon,
  
} from "@heroicons/react/24/solid";
import {
  TagIcon,
  ArrowDownIcon,  
  CalendarIcon,
} from "@heroicons/react/24/solid";

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
      entradasMes: 40,
      saidasMes: 32,
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
    nomeProduto: "Produto A",
    dataValidade: "2025-05-01",
    nomeResponsavel: "Paola",
    valor: "R$ 15,00",
    promocao: true,
  },
  {
    nomeProduto: "Produto B",
    dataValidade: "2025-07-15",
    nomeResponsavel: "Lucas",
    valor: "R$ 10,00",
    promocao: false,
  },
  {
    nomeProduto: "Produto C",
    dataValidade: "2025-06-30",
    nomeResponsavel: "Ana",
    valor: "R$ 20,00",
    promocao: true,
  },
];

const Dashboard = () => {
  const { appCompanyId } = useCompany();
  const { userId } = useUser();

  const [stocks, setStocks] = useState(STOCKS_LIST);
  const [boardData, setBoardData] = useState(STOCKS_LIST[0]);
  const [productList, setProductList] = useState(PRODUCT_LIST);
  const [newProduct, setNewProduct] = useState({
    nomeProduto: "",
    dataValidade: "",
    nomeResponsavel: "",
    valor: "",
    promocao: false,
  });

  useEffect(() => {
    // Fetch stocks from API here
  }, [appCompanyId, userId]);

  const handleStockSelection = (e) => {
    const selectedStockId = e.target.value;
    const item = stocks.find((stock) => stock.idEstoque == selectedStockId);
    setBoardData({
      ...boardData,
      nomeEstoque: item.nomeEstoque,
      entradaEstoque: item.overviewMensal.entradasMes,
      saidasEstoque: item.overviewMensal.saidasMes,
      ultimaMovimentacao: new Date().toLocaleString("pt-BR"),
      overviewDiario: item.overviewDiario,
      overviewMensal: item.overviewMensal,
    });
  };

  const handleAddProduct = () => {
    if (
      newProduct.nomeProduto &&
      newProduct.dataValidade &&
      newProduct.nomeResponsavel &&
      newProduct.valor
    ) {
      setProductList([...productList, newProduct]);
      setNewProduct({
        nomeProduto: "",
        dataValidade: "",
        nomeResponsavel: "",
        valor: "",
        promocao: false,
      });
      alert("Produto Adicionado");
    } else {
      alert("Preencha todos os campos");
    }
  };

  return (
    <PageContainer.Root>
      <PageContainer.Header title={"Dashboard"}>
        <div className="mb-8">
          <label className="block text-gray-800 text-lg font-semibold mb-2">
            Selecionar Estoque:
          </label>
          <select
            onChange={handleStockSelection}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
          >
            {stocks.map((item) => (
              <option key={item.idEstoque} value={item.idEstoque}>
                {item.nomeEstoque}
              </option>
            ))}
          </select>
        </div>
      </PageContainer.Header>

      <PageContainer.Body>
        <div className="h-screen">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              {
                title: "Produtos em Estoque",
                value: boardData.overviewDiario.produtosEmEstoque,
                icon: <TagIcon className="w-16 h-16 text-blue-500" />,
              },
              {
                title: "Entradas Hoje",
                value: boardData.overviewDiario.entradasHoje,
                icon: <ArrowDownIcon className="w-16 h-16 text-blue-500" />,
              },
              {
                title: "Promoções Ativas",
                value: boardData.overviewDiario.promocoesAtivas,
                icon: <TagIcon className="w-16 h-16 text-blue-500" />,
              },
              {
                title: "Vencimentos Próximos",
                value: boardData.overviewDiario.vencimentosProximos,
                icon: <CalendarIcon className="w-16 h-16 text-blue-500" />,
              },
            ].map(({ title, value, icon }, index) => (
              <div
                key={index}
                className="p-6 bg-white text-black shadow-md rounded-lg hover:shadow-xl hover:border-blue-500 transition-all duration-300 ease-in-out hover:scale-105 hover:cursor-pointer border border-gray-300"
              >
                <div className="flex items-center space-x-4">
                  {icon}
                  <div>
                    <p className="text-sm font-semibold text-gray-600">
                      {title}
                    </p>
                  </div>
                </div>
                <p className="text-xl font-bold text-blue-600 mt-2">{value}</p>
              </div>
            ))}
          </div>

          {/* Movimentações Mensais
          <MonthlyMovement boardData={boardData}></MonthlyMovement> */}

          {/* Lista de Produtos */}
          <div className="mb-8">
            <div className="flex bg-white p-4 rounded-lg items-center justify-between space-x-4 mb-4">
              {/* Search Input */}
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Buscar Produto..."
                  className="text-black p-2 pl-10 pr-4 border-2 border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                <select className="p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black">
                  <option value="">Selecione Produto</option>
                  <option value="produto1">Produto 1</option>
                  <option value="produto2">Produto 2</option>
                  <option value="produto3">Produto 3</option>
                </select>
              </div>

              {/* Filter Button */}
              <div className="flex-shrink-0">
                <button
                  onClick={handleAddProduct}
                  className="ml-4 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300"
                >
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
                  onClick={handleAddProduct}
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
                <div>Responsável</div>
                <div>Valor</div>
                <div>Promoção</div>
                <div>Ações</div>
              </div>

              <div>
                {productList.map((product, index) => (
                  <div
                    key={index}
                    className="text-black grid grid-cols-6 gap-6 mb-2 p-4 bg-white border-b border-gray-300 hover:border-blue-500 transition-all duration-300 hover:cursor-pointer"
                  >
                    <div className="flex items-center">
                      <img
                        src="https://img.icons8.com/ios-filled/50/product.png"
                        className="w-6 h-6 mr-2"
                        alt="Product Icon"
                      />
                      {product.nomeProduto}
                    </div>
                    <div>{product.dataValidade}</div>
                    <div>{product.nomeResponsavel}</div>
                    <div>{product.valor}</div>
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
                        className="p-2 bg-red-600 rounded-lg hover:bg-red-700 transition-all duration-300"
                        onClick={() => handleDelete(product)}
                        aria-label="Excluir"
                      >
                        <TrashIcon className="w-6 h-6 text-white" />
                      </button>
                      <button
                        className="p-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-all duration-300"
                        onClick={() => handleEdit(product)}
                        aria-label="Editar"
                      >
                        <PencilIcon className="w-6 h-6 text-white" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          </div>
        </div>
      </PageContainer.Body>
    </PageContainer.Root>
  );
};

export default Dashboard;
