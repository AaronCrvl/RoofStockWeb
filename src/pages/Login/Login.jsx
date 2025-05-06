import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageContainer from '../../components/PageContainer';
import Body from '../../components/Body';

const Login = () => {
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [cnpj, setCNPJ] = useState('');
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();
    navigate('/home');

    // Example for API call:
    // Authenticate({ login, senha }).then(response => {
    //   if (response.status === 200) {
    //     ...
    //   }
    // });
  }

  return (
    <PageContainer>
      <div className="flex justify-center items-center min-h-screen bg-blue-100 px-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md">
          <Body>
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
              Faça o login abaixo
            </h2>
            <form onSubmit={handleLogin}>
              <input
                type="text"
                placeholder="Insira o CNPJ"
                value={cnpj}
                onChange={(e) => setCNPJ(e.target.value)}
                className="w-full mb-4 p-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Insira o login"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                className="w-full mb-4 p-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="password"
                placeholder="Insira a senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="w-full mb-6 p-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="w-full bg-blue-500 text-white font-semibold py-3 rounded-md hover:bg-blue-600 transition-colors"
              >
                Efetuar Login
              </button>
            </form>
          </Body>
        </div>
      </div>
    </PageContainer>
  );
};

export default Login;
