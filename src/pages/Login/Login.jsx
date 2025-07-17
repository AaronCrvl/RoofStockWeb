import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useUser } from "../../contexts/UserContext";
import { useForm } from "react-hook-form";
import { Authenticate } from "../../services/api/auth.services";

const Login = () => {
  const { setLogged, setAdmin, admin } = useUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmitLogin = (data) => {        
    Authenticate(data).then((response) => {
      if (localStorage.getItem("token") != null) {
        setLogged(true);
        setAdmin(response.admin);        
        admin ? navigate("/adminDashboard") : navigate("/dashboard");
        toast.success("Login realizado com sucesso.");
      }
      else 
        toast.error("Falha ao realizar login.");
    });
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-orange-500 to-white-500/50 px-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md">
          <h2 className="text-4xl font-bold mb-6 text-center text-gray-800">
            Faça o login{" "}
          </h2>
          <form onSubmit={handleSubmit(onSubmitLogin)}>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Insira o CNPJ"
                {...register("cnpj", {
                  required: "O CNPJ é necessário para realizar o login.",
                })}
                className="text-black w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              {errors.cnpj && (
                <p className="text-red-500">{errors.cnpj.message}</p>
              )}
            </div>
            <div className="mb-4">
              <input
                type="email"
                placeholder="Insira o username"
                {...register("username", {
                  required: "O username é necessário para realizar o login.",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Please Enter A Valid Email!",
                  },
                })}
                className="text-black w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              {errors.username && (
                <p className="text-red-500">{errors.username.message}</p>
              )}
            </div>
            <div className="mb-6">
              <input
                type="password"
                placeholder="Insira a senha"
                {...register("senha", {
                  required: "A senha é necessária para realizar o login.",
                })}
                className="text-black w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              {errors.senha && (
                <p className="text-red-500">{errors.senha.message}</p>
              )}
            </div>
            <>
              <div className="flex">
                <button
                  type="submit"
                  className="w-full mr-2 bg-orange-600 text-white font-semibold py-3 rounded-md transition-colors hover:bg-orange-700"
                >
                  Efetuar Login
                </button>
                <button
                  className="w-full bg-gray-600 text-white font-semibold py-3 rounded-md transition-colors hover:bg-gray-700"
                  onClick={() => navigate("/createAccount")}
                >
                  Cadastrar
                </button>
              </div>
            </>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
