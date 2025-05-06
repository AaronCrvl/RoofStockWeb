import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PageContainer from '../../components/PageContainer';
import Body from '../../components/Body';
import Header from '../../components/Header';
import { getStockById } from '../../services/api/stock.service';

const Stock = () => {
  const navigate = useNavigate();
  const { sentId } = useParams(); // assuming you're using <Route path="/estoque/:sentId" />
  const [stock, setStock] = useState(null);

  useEffect(() => {
    if (!stock) {
      const fetchStock = async () => {
        const data = await getStockById(sentId);
        setStock(data);
      };
      fetchStock();
    }
  }, [stock, sentId]);

  const handleRedirect = (page, id) => {
    navigate(`/${page}/${id}`);
  };

  const options = [
    { id: 0, option: 'Movimentações', redirect: 'MovimentacaoEstoque' },
    { id: 1, option: 'Fechamento', redirect: 'FechamentoEstoque' },
    { id: 2, option: 'Produtos', redirect: 'ProdutosEstoque' },
    { id: 3, option: 'Marcas', redirect: 'Marcas' },
  ];

  return (
    <PageContainer>
      <Header title="Estoque" />
      <Body>
        <div className="px-5 pt-5">
          <h1 className="text-2xl font-bold mb-4">
            Movimentações {sentId}
          </h1>

          {stock && (
            <div className="grid gap-4">
              {options.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleRedirect(item.redirect, stock.id)}
                  className="bg-white p-5 rounded-xl shadow-md text-left hover:shadow-lg transition-shadow"
                >
                  <span className="text-lg font-medium text-gray-800">{item.option}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </Body>
    </PageContainer>
  );
};

export default Stock;
