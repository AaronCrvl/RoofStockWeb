// ================== Imports ==================
import api from "./api.services";
import { toast } from "react-toastify";

// ================== Constants ==================
const route = "/User";

// ================== Endpoints ==================
export const GetUserData = async (userId) => {
  try {
    const response = await api.get(route.concat("GetById"), {
      params: {
        idUsuario: userId,
      },
    });

    if (response.ok) {
      return await response.json();
    } else {
      toast.error(`Erro: ${await response.text()}`);
    }
  } catch (err) {
    console.error("Error getting user data: ", err);
    toast.error(err);
  }
};

export const CreateUser = async (data) => {
  try {
    const response = await api.post(route.concat("/Create"), {
      cnpjEmpresa: data.cnpj.toString(),
      cpf: data.cpf.toString(),
      email: data.email,
      nomePessoa: data.nome,
      cargo: data.cargo.toString(),
      login: data.username,
      senha: data.senha,
      telefone: data.telefone.toString(),
    });

    if (response.status == 200) {
      toast.success(
        "Conta criada com sucesso. Acesse a página de login para acesar o sistema."
      );
    } else {
      toast.error(`Erro ao criar conta: ${await response.text()}`);
    }
  } catch (err) {
    toast.error("Error ao tentar criar uma conta: ", err);
  }
};

export const UpdateUser = async (data) => {
  try {
    const response = await api.patch(route.concat("/Update"), {
      email: data.email,
      nomePessoa: data.nome,
      login: data.username,
      senha: data.senha,
      telefone: data.telefone.toString(),
    });

    if (response.status == 200) {
      toast.success("Dados de usuário atualizados com sucesso.");
    } else {
      toast.error(
        `Erro ao atualizar dados de usuário: ${await response.text()}`
      );
    }
  } catch (err) {
    toast.error("Erro ao atualizar dados de usuário: ", err);
  }
};
