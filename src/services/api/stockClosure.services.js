import api from "./api.services";
import { toast } from "react-toastify";

// POST - Create a new stock closure
export const createStockClosure = async (newStockClosure) => {
  try {
    const response = await api.post(
      "/FechamentoEstoque/Criar",
      newStockClosure
    );

    if (response.ok) {
      return await response.json();
    } else {
      toast.error(`Erro: ${await response.text()}`);
    }
  } catch (err) {
    console.error("Error getting stock by supervisor ID:", err);
    toast.error(err)
  }
};

// GET - Get stock closure by ID
export const getStockClosureById = async (id) => {
  try {
    const response = await api.get(`/FechamentoEstoque/Obter/${id}`);

    if (response.ok) {
      return await response.json();
    } else {
      toast.error(`Erro: ${await response.text()}`);
    }
  } catch (err) {
    console.error("Error getting stock by supervisor ID:", err);
    toast.error(err)
  }
};

// GET - Get stock closure by stock ID
export const getStockClosuresByStock = async (stockId) => {
  try {
    const response = await api.get(
      `/FechamentoEstoque/ObterPorEstoque/${stockId}`
    );

    if (response.ok) {
      return await response.json();
    } else {
      toast.error(`Erro: ${await response.text()}`);
    }
  } catch (err) {
    console.error("Error getting stock by supervisor ID:", err);
    toast.error(err)
  }
};

// PUT - Update stock closure
export const updateStockClosure = async (updatedStockClosure) => {
  try {
    const response = await api.put(
      "/FechamentoEstoque/Alterar",
      updatedStockClosure
    );

    if (response.ok) {
      return await response.json();
    } else {
      toast.error(`Erro: ${await response.text()}`);
    }
  } catch (err) {
    console.error("Error getting stock by supervisor ID:", err);
    toast.error(err)
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
    toast.error(err)
  }
};

// PUT - Deactivate stock closure
export const deactivateStockClosure = async (id) => {
  try {
    const response = await api.put(`/FechamentoEstoque/Desativar/${id}`);

    if (response.ok) {
      return await response.json();
    } else {
      toast.error(`Erro: ${await response.text()}`);
    }
  } catch (err) {
    console.error("Error getting stock by supervisor ID:", err);
    toast.error(err)
  }
};
