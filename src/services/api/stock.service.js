import api from "./api.services";
import { toast } from "react-toastify";

// GET - Get stock by ID
export const getStockById = async (id) => {
  try {
    const response = await api.get(`/Estoque/ObterEstoque/${id}`);

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

// GET - Get stocks that user have access
export const getStockByUser = async (idUser) => {
  try {
    const response = await api.get(
      `/Estoque/ObterEstoquePorUsuario?idUsuario=${idUser}`
    );

    if (response.ok) {
      const data =  await response.json();      
      return data;
    } else {
      toast.error(`Erro: ${await response.text()}`);
    }
  } catch (err) {
    console.error("Error getting stock by supervisor ID:", err);
    toast(err);
  }
};

// GET - Get stock by name
export const getStockByName = async (stockName) => {
  try {    
    const response = await api.get(
      `/Estoque/ObterEstoquePorNome/${encodeURIComponent(stockName)}`
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

// POST - Create new stock
export const createStock = async (newStock) => {
  try {    
    const response = await api.post("/Estoque/CriarEstoque", newStock);

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

// PUT - Update stock
export const updateStock = async (id, updatedStock) => {
  try {    
    const response = await api.put(
      `/Estoque/AlterarEstoque/${id}`,
      updatedStock
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

// DELETE - Delete stock
export const deleteStock = async (id) => {
  try {    
    const response = await api.delete(`/Estoque/ExcluirEstoque/${id}`);

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

// PUT - Deactivate stock
export const deactivateStock = async (id) => {
  try {    
    const response = await api.put(`/Estoque/DesativarEstoque/${id}`);

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

// PUT - Activate stock
export const activateStock = async (id) => {
  try {    
    const response = await api.put(`/Estoque/AtivarEstoque/${id}`);

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
