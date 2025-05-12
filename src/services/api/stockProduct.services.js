import api from "./api.services";
import { toast } from "react-toastify";

// POST - Add product to stock
export const addStockProduct = async (stockProduct) => {
  try {
    const response = await api.post(`/EstoqueProduto/Adicionar`, stockProduct);

    if (response.ok) {
      return await response.json();
    } else {
      toast.error(`Erro: ${await response.text()}`);
    }
  } catch (err) {
    console.error("Error getting stock by supervisor ID:", err);
    toast(err);
  }
};

// GET - Get product from stock by IDs
export const getStockProduct = async (stockId, productId) => {
  try {
    const response = await api.get(
      `/EstoqueProduto/Obter/${stockId}/${productId}`
    );

    if (response.ok) {
      return await response.json();
    } else {
      toast.error(`Erro: ${await response.text()}`);
    }
  } catch (err) {
    console.error("Error getting stock by supervisor ID:", err);
    toast(err);
  }
};

// GET - List all products from a stock
export const getStockProducts = async (stockId) => {
  try {
    const response = await api.get(`/EstoqueProduto/Listar/${stockId}`);

    if (response.ok) {
      return await response.json();
    } else {
      toast.error(`Erro: ${await response.text()}`);
    }
  } catch (err) {
    console.error("Error getting stock by supervisor ID:", err);
    toast(err);
  }
};

// PUT - Update product in stock
export const updateStockProduct = async (stockProduct) => {
  try {
    const response = await api.put(`/EstoqueProduto/Alterar`, stockProduct);

    if (response.ok) {
      return await response.json();
    } else {
      toast.error(`Erro: ${await response.text()}`);
    }
  } catch (err) {
    console.error("Error getting stock by supervisor ID:", err);
    toast(err);
  }
};

// DELETE - Remove product from stock
export const deleteStockProduct = async (stockId, productId) => {
  try {
    const response = await api.delete(
      `/EstoqueProduto/Excluir/${stockId}/${productId}`
    );

    if (response.ok) {
      return await response.json();
    } else {
      toast.error(`Erro: ${await response.text()}`);
    }
  } catch (err) {
    console.error("Error getting stock by supervisor ID:", err);
    toast(err);
  }
};

// PUT - Deactivate product in stock
export const deactivateStockProduct = async (stockId, productId) => {
  try {
    const response = await api.put(
      `/EstoqueProduto/Desativar/${stockId}/${productId}`
    );

    if (response.ok) {
      return await response.json();
    } else {
      toast.error(`Erro: ${await response.text()}`);
    }
  } catch (err) {
    console.error("Error getting stock by supervisor ID:", err);
    toast(err);
  }
};
