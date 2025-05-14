import api from "./api.services";
import { toast } from "react-toastify";

// POST - Create stock transaction
export const createStockTransaction = async (transaction) => {
  try {
    const response = await api.post(`/StockTransaction/Create`, transaction);

    if (response.ok) {
      return await response.json();
    } else {
      toast.error(`Erro: ${await response.text()}`);
    }
  } catch (err) {
    console.error("Error getting stock transaction: ", err);
    toast(err);
  }
};

// GET - Get stock transaction by ID
export const getStockTransactionById = async (id) => {
  try {
    const response = await api.get(`/StockTransaction/GetById/${id}`);

    if (response.ok) {
      return await response.json();
    } else {
      toast.error(`Erro: ${await response.text()}`);
    }
  } catch (err) {
    console.error("Error getting stock transaction: ", err);
    toast(err);
  }
};

// GET - Get stock transactions by stock ID
export const getStockTransactionsByStock = async (stockId) => {
  try {
    const response = await api.get(
      `/StockTransaction/ListByWarehouse/${stockId}`
    );

    if (response.ok) {
      return await response.json();
    } else {
      toast.error(`Erro: ${await response.text()}`);
    }
  } catch (err) {
    console.error("Error getting stock transaction: ", err);
    toast(err);
  }
};

// PUT - Edit stock transaction (update)
export const editStockTransaction = async (transaction) => {
  try {
    const response = await api.put(`/StockTransaction/Update`, transaction);

    if (response.ok) {
      return await response.json();
    } else {
      toast.error(`Erro: ${await response.text()}`);
    }
  } catch (err) {
    console.error("Error getting stock transaction: ", err);
    toast(err);
  }
};

// DELETE - Delete stock transaction
export const deleteStockTransaction = async (id) => {
  try {    
    const response = await api.delete(`/StockTransaction/Delete/${id}`);

    if (response.ok) {
      return await response.json();
    } else {
      toast.error(`Erro: ${await response.text()}`);
    }
  } catch (err) {
    console.error("Error getting stock transaction: ", err);
    toast(err);
  }
};
