// ================== Imports ==================
import api from "./api.services";
import { toast } from "react-toastify";

// ================== Constants ==================
const route = "/StockClosure";

// ================== Endpoints ==================
export const CreateStockClosure = async (newStockClosure) => {
  try {
    const response = await api.post(route.concat("/Create"), newStockClosure);

    if (response.ok) {
      return await response.json();
    } else {
      toast.error(`Erro: ${await response.text()}`);
    }
  } catch (err) {
    console.error("Error creting stock closure: ", err);
    toast.error(err);
  }
};

export const UpdateStockClosure = async (updatedStockClosure) => {
  try {
    const response = await api.patch(
      route.concat("/Alter"),
      updatedStockClosure
    );

    if (response.ok) {
      return await response.json();
    } else {
      toast.error(`Erro: ${await response.text()}`);
    }
  } catch (err) {
    console.error("Error updating stock closure: ", err);
    toast.error(err);
  }
};

export const GenerateStockClosure = async (newStockClosure) => {
  try {
    const response = await api.post(route.concat("/Generate"), newStockClosure);

    if (response.ok) {
      return await response.json();
    } else {
      toast.error(`Erro: ${await response.text()}`);
    }
  } catch (err) {
    console.error("Error generating stock closure: ", err);
    toast.error(err);
  }
};

export const GetStockClosureByStock = async (id) => {
  try {
    const response = await api.get(route.concat("/GetByStock"), {
      params: {
        idEstoque: id,
      },
    });

    if (response.ok) {
      return await response.json();
    } else {
      toast.error(`Erro: ${await response.text()}`);
    }
  } catch (err) {
    console.error("Error getting closure by stock: ", err);
    toast.error(err);
  }
};

// DELETE - Delete stock closure
export const deleteStockClosure = async (id) => {
  try {
    const response = await api.delete(`/FechamentoEstoque/Excluir/${id}`);

    if (response.ok) {
      return await response.json();
    } else {
      toast.error(`Erro: ${await response.text()}`);
    }
  } catch (err) {
    console.error("Error getting stock by supervisor ID:", err);
    toast.error(err);
  }
};