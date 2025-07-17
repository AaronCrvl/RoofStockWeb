import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Create } from "../../services/api/user.services";

const CreateAccount = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmitCreate = async (data) => {
    try {
      Create(data).then((response) => {
        console.log(response);
      });
    } catch (err) {
      toast.error("Erro ao criar conta.".concat(err));
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-white-500/50 px-6">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md">
        <h2 className="text-4xl font-bold mb-6 text-center text-gray-800">
          Criar Conta
        </h2>
        <form onSubmit={handleSubmit(onSubmitCreate)}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="CNPJ"
              {...register("cnpj", {
                required: "CNPJ é obrigatório.",
                minLength: 14,
                valueAsNumber: true,
              })}
              className="text-black w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            {errors.cnpj && (
              <p className="text-red-500">{errors.cnpj.message}</p>
            )}
          </div>

          <div className="mb-6">
            <input
              type="text"
              placeholder="Nome Completo"
              {...register("nome", {
                required: "O nome é obrigatório.",
                minLength: 5,
              })}
              className="text-black w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            {errors.nome && (
              <p className="text-red-500">{errors.nome.message}</p>
            )}
          </div>

          <div className="mb-4">
            <input
              type="number"
              placeholder="CPF"
              {...register("cpf", {
                required: "O cpf é obrigatório.",
                minLength: 11,
                valueAsNumber: true,
                pattern: {
                  message: "CPF inválido.",
                },
              })}
              className="text-black w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            {errors.cpf && <p className="text-red-500">{errors.cpf.message}</p>}
          </div>

          <div className="mb-6">
            <input
              type="text"
              placeholder="Username"
              {...register("username", {
                required: "O username é obrigatório.",
                minLength: 5,
              })}
              className="text-black w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            {errors.username && (
              <p className="text-red-500">{errors.username.message}</p>
            )}
          </div>

          <div className="mb-4">
            <input
              type="email"
              placeholder="Email (XXX@mail.com)"
              {...register("email", {
                required: "Email é obrigatório.",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Email inválido.",
                },
              })}
              className="text-black w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="mb-4">
            <input
              type="tel"
              placeholder="Telefone ((DDD) XXXX - XXXX)"
              {...register("telefone", {
                required: "O telefone é obrigatório.",
                minLength: 8,
                pattern: {
                  message: "telefone inválido.",
                },
              })}
              className="text-black w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            {errors.telefone && (
              <p className="text-red-500">{errors.telefone.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cargo
            </label>
            <select
              name="cargo"
              placeholder="Selecione o cargo do funcionário"
              {...register("cargo", {
                required: "A seleção do cargo do funcionário é obrigatória.",
              })}
              className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-900 shadow-sm transition duration-150 ease-in-out focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
            >
              <option value={1}>Atendente</option>
              <option value={2}>Gerente</option>
              <option value={3}>Gestor</option>
              <option value={4}>Admnistrador</option>
            </select>
            {errors.idMarca && (
              <p className="text-red-600">{errors.idMarca.message}</p>
            )}
          </div>

          <div className="mb-6">
            <input
              type="password"
              placeholder="Senha"
              {...register("senha", {
                required: "Senha é obrigatória.",
                minLength: 8,
              })}
              className="text-black w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            {errors.senha && (
              <p className="text-red-500">{errors.senha.message}</p>
            )}
          </div>

          <div className="flex">
            <button
              type="submit"
              className="w-full mr-2 bg-green-600 text-white font-semibold py-3 rounded-md transition-colors hover:bg-green-700"
            >
              Criar!
            </button>
            <button
              type="button"
              className="w-full bg-gray-600 text-white font-semibold py-3 rounded-md transition-colors hover:bg-gray-700"
              onClick={() => navigate("/login")}
            >
              Voltar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAccount;
