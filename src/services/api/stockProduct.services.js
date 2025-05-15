import api from "./api.services";
import { toast } from "react-toastify";

const route = "/Product";

// POST - Add product to stock
export const addStockProduct = async (stockProduct) => {
  try {
    const response = await api.post(`${route}/Create`, stockProduct);

    if (response.ok) {
      return await response.json();
    } else {
      toast.error(`Erro: ${await response.text()}`);
    }
  } catch (err) {
    console.error("Error adding stock:", err);
    toast(err);
  }
};

// GET - List all products from a stock
export const getStockProducts = async (stockId) => {
  try {
    const response = await api.get(`${route}/GetByStock`, {
      params: {
        stockId: stockId,
      },
    });

    if (response.ok) {
      return await response.json();
    } else {
      toast.error(`Erro: ${await response.text()}`);
    }
  } catch (err) {
    console.error("Error getting products in stock:", err);
    toast(err);
  }
};

// PUT - Update product in stock
export const updateStockProduct = async (id, stockProduct) => {
  try {
    const response = await api.patch(`${route}/Alter`, stockProduct, {
      params: {
        id: id,
      },
    });

    if (response.ok) {
      return await response.json();
    } else {
      toast.error(`Erro: ${await response.text()}`);
    }
  } catch (err) {
    console.error("Error altering product:", err);
    toast(err);
  }
};

// DELETE - Remove product in stock
export const deleteStockProduct = async (id) => {
  try {
    const response = await api.delete(`${route}/Delete`, {
      params: {
        id: id,
      },
    });

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
