import React, { useEffect, useState } from 'react';
import { useCompany } from '../contexts/CompanyContext';
import { useUser } from '../contexts/UserContext';
import PageContainer from '../components/PageContainer';
import Body from '../components/Body';
import Header from '../components/Header';

const Home = () => {
  // Context Data -------------------------------------> 
  const { appCompanyId } = useCompany();
  const { userId } = useUser();

  // State Management -------------------------------------> 
  const [stocks, setStocks] = useState(mockStocks);
  const [boardData, setBoardData] = useState(stocks[0]);
  const [productList, setProductList] = useState(mockProductList);

  // New Product Form State
  const [newProduct, setNewProduct] = useState({
    nomeProduto: '',
    dataValidade: '',
    nomeResponsavel: '',
    valor: '',
    promocao: false,
  });

  // Once company changes, filters the stocks that belong to that company
  useEffect(() => {
    // getStockByUserId(userId, appCompanyId).then((result) => {
    //   setStocks(result);
    // });
  }, [appCompanyId, userId]);

  // Handle Functions -------------------------------------> 
  function handleAddProduct() {
    if (
      newProduct.nomeProduto &&
      newProduct.dataValidade &&
      newProduct.nomeResponsavel &&
      newProduct.valor
    ) {
      setProductList([...productList, newProduct]);
      setNewProduct({
        nomeProduto: '',
        dataValidade: '',
        nomeResponsavel: '',
        valor: '',
        promocao: false,
      });
      alert('Produto Adicionado');
    } else {
      alert('Preencha todos os campos');
    }
  }

  // JSX -------------------------------------> 
  return (
    <PageContainer>
    <Header></Header>
    <Body>
    <div className="">
      <h1 className="text-3xl font-bold mb-6">Home</h1>

      {/* Stock Selector */}
      <div className="mb-8">
        <label className="text-lg font-semibold mb-2">Selecionar Estoque:</label>
        <div>
          {stocks.map((item) => (
            <button
              key={item.idEstoque}
              onClick={() =>
                setBoardData({
                  nomeEstoque: item.nomeEstoque,
                  entradaEstoque: item.overviewMensal.entradasMes,
                  saidasEstoque: item.overviewMensal.saidasMes,
                  ultimaMovimentacao: new Date().toLocaleString('pt-BR'),
                  overviewDiario: {
                    entradasHoje: item.overviewDiario.entradasHoje,
                    produtosEmEstoque: item.overviewDiario.produtosEmEstoque,
                    promocoesAtivas: item.overviewDiario.promocoesAtivas,
                    vencimentosProximos: item.overviewDiario.vencimentosProximos,
                  },
                  overviewMensal: {
                    entradasMes: item.overviewMensal.entradasMes,
                    saidasMes: item.overviewMensal.saidasMes,
                  },
                })
              }
              className={`p-3 rounded-lg text-lg w-full text-left mb-3 ${
                boardData.nomeEstoque === item.nomeEstoque
                  ? 'bg-blue-100'
                  : 'bg-gray-200'
              }`}
            >
              {item.nomeEstoque}
            </button>
          ))}
        </div>
      </div>

      {/* Dashboard */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        {['produtosEmEstoque', 'entradasHoje', 'promocoesAtivas', 'vencimentosProximos'].map((key) => (
          <div className="p-4 bg-white shadow-lg rounded-lg flex items-center justify-between" key={key}>
            <div>
              <img
                src={`https://img.icons8.com/ios-filled/50/${key === 'produtosEmEstoque' ? 'box' : key === 'entradasHoje' ? 'down--v1' : key === 'promocoesAtivas' ? 'discount' : 'expiry-date'}.png`}
                className="w-12 h-12"
                alt={key}
              />
              <p className="text-sm font-semibold mt-2">{key === 'produtosEmEstoque' ? 'Produtos em Estoque' : key === 'entradasHoje' ? 'Entradas Hoje' : key === 'promocoesAtivas' ? 'Promoções' : 'Vencimentos'}</p>
            </div>
            <p className="text-xl font-bold text-blue-600">
              {boardData.overviewDiario[key]}
            </p>
          </div>
        ))}
      </div>

      {/* Movimentações */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Movimentação Mensal {boardData.nomeEstoque}</h2>
        <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg">
          <div className="flex items-center">
            <img
              src="https://www.freeiconspng.com/thumbs/up-arrow-png/up-arrow-png-19.png"
              alt="arrow-up"
              className="w-8 h-8 mr-2"
            />
            <p className="text-2xl">{boardData.overviewMensal.entradasMes}</p>
          </div>
          <div className="flex items-center">
            <img
              src="https://png.pngtree.com/png-clipart/20190516/original/pngtree-vector-down-arrow-icon-png-image_4184125.jpg"
              alt="arrow-down"
              className="w-8 h-8 mr-2"
            />
            <p className="text-2xl">{boardData.overviewMensal.saidasMes}</p>
          </div>
          <p className="text-sm">{new Date().toLocaleString('pt-BR')}</p>
        </div>
      </div>

      {/* Lista de Produtos */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Lista de Produtos - {boardData.nomeEstoque}</h2>
        <div className="flex items-center mb-4">
          <input
            type="text"
            placeholder="Buscar Produto..."
            className="p-2 border rounded-lg w-full"
          />
          <button
            onClick={handleAddProduct}
            className="ml-4 p-2 bg-blue-600 text-white rounded-lg"
          >
            Adicionar Produto
          </button>
        </div>
        <div>
          {productList.map((product, index) => (
            <div key={index} className="p-4 bg-white shadow-lg rounded-lg mb-4">
              <h3 className="text-lg font-semibold">{product.nomeProduto}</h3>
              <p className="text-sm text-gray-600">Validade: {product.dataValidade}</p>
              <p className="text-sm text-gray-600">Responsável: {product.nomeResponsavel}</p>
              <p className="text-sm text-gray-600">Valor: {product.valor}</p>
              <p className={`text-sm ${product.promocao ? 'text-red-600 font-bold' : 'text-gray-600'}`}>
                {product.promocao ? 'Em Promoção' : 'Sem Promoção'}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
    </Body>
    </PageContainer>
  );
};

// Mock Data for demonstration
let mockStocks = [
  {
    idEstoque: 1,
    nomeEstoque: 'Roof01',
    nomeResponsavel: '01Teste',
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
    nomeEstoque: 'Paola01',
    nomeResponsavel: '01Teste',
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
    nomeEstoque: 'Cozinha02',
    nomeResponsavel: '01Teste',
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

let mockProductList = [
  {
    nomeProduto: 'Produto A',
    dataValidade: '2025-05-01',
    nomeResponsavel: 'Paola',
    valor: 'R$ 15,00',
    promocao: true,
  },
  {
    nomeProduto: 'Produto B',
    dataValidade: '2025-07-15',
    nomeResponsavel: 'Lucas',
    valor: 'R$ 10,00',
    promocao: false,
  },
  {
    nomeProduto: 'Produto C',
    dataValidade: '2025-06-30',
    nomeResponsavel: 'Ana',
    valor: 'R$ 20,00',
    promocao: true,
  },
];

export default Home;
