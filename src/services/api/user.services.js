import api from "./api.services";
import { toast } from "react-toastify";

export const Create = async (data) => {
  try {
    const response = await api.post("/User/Create", {
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
