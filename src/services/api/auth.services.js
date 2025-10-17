import api from "./api.services";
import { toast } from "react-toastify";

const route = "/Auth";

export const Authenticate = async (data) => {
  try {
    const response = await api.post(route.concat("/Authenticate"), {
      cnpj: data.cnpj,
      login: data.username,
      senha: data.senha,
    });

    if (response.status == 200) {
      const token = response.data.token;
      if (token) {
        // armazenar token de forma simples no localStorage; considerar usar httpOnly cookie no backend para maior segurança
        localStorage.setItem("token", token);
      }
      return response.data;
    } else {
      toast.error(`Erro ao autenticar: ${await response.text()}`);
    }
  } catch (err) {
    console.error(err);
    toast.error("Error ao tentar realizar o login: " + (err?.message || ""));
  }
};
