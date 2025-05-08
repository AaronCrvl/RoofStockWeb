import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useUser } from "../../contexts/UserContext";

const Login = () => {
  const { setLogged, setAdmin, admin } = useUser();
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [cnpj, setCNPJ] = useState("");
  const navigate = useNavigate();

  function handleLogin() {
    // if (login.length == 0 || senha.length == 0 || cnpj == 0) {
    //   console.log("err");
    //   toast.error("Preencha todos os campos para realizar o login.");
    //   return;
    // }

    setLogged(true)
    setAdmin(false);
    toast.success("Login realizado com sucesso.");
    admin ? navigate("/adminDashboard") : navigate("/dashboard");

    // Example for API call:
    // Authenticate({ login, senha }).then(response => {
    //   if (response.status === 200) {
    //     ...
    //   }
    // });
  }

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-blue-100 px-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md">
          <h2 className="text-4xl font-bold mb-6 text-center text-gray-800">
            Faça o login{" "}
          </h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            <input
              type="text"
              placeholder="Insira o CNPJ"
              value={cnpj}
              onChange={(e) => setCNPJ(e.target.value)}
              className="text-black w-full mb-4 p-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Insira o login"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              className="text-black w-full mb-4 p-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              placeholder="Insira a senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="text-black w-full mb-6 p-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex">
              <button
                type="submit"
                className="w-full mr-2 bg-blue-600 text-white font-semibold py-3 rounded-md transition-colors hover:bg-blue-700"
              >
                Efetuar Login
              </button>
              <button className="w-full bg-gray-600 text-white font-semibold py-3 rounded-md transition-colors hover:bg-gray-700">
                Cadastrar
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
