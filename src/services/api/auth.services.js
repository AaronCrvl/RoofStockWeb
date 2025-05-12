import api from "./api.services";
import { toast } from "react-toastify";

export const Authenticate = async (data) => {
  try {
    const response = await api.post("/Autenticacao/Autenticar", {
      login: data.login,
      senha: data.senha,
    });

    if (response.ok) {
      var token = await response.json();
      localStorage.setItem("token", token);
    } else {
      toast.error(`Erro: ${await response.text()}`);
    }
  } catch (err) {
    console.error("Error getting stock by supervisor ID:", err);
    toast(err);
  }
};
