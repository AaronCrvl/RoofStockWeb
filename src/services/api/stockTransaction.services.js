// ================== Imports ==================
import api from "./api.services";
import { toast } from "react-toastify";

// ================== Constants ==================
const route = "/StockTransaction";

// ================== Endpoints ==================
export const CreateStockTransaction = async (transaction) => {
  try {
    const response = await api.post(`${route}/Create`, transaction);

    if (response.ok) {
      return await response.json();
    } else {
      toast.error(`Erro: ${await response.text()}`);
    }
  } catch (err) {
    console.error("Error getting stock transaction: ", err);
    toast.error(err);
  }
};

export const GetStockTransactionByStock = async (stockId) => {
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
    console.error("Error getting stock transaction: ", err);
    toast.error(err);
  }
};

export const UpdateStockTransaction = async (transaction) => {
  try {
    const response = await api.patch(`${route}/Alter`, transaction);

    if (response.ok) {
      return await response.json();
    } else {
      toast.error(`Erro: ${await response.text()}`);
    }
  } catch (err) {
    console.error("Error getting stock transaction: ", err);
    toast.error(err);
  }
};

export const UpdateItemStockTransaction = async (transaction) => {
  try {
    const response = await api.patch(`${route}/AlterItem`, transaction);

    if (response.ok) {
      return await response.json();
    } else {
      toast.error(`Erro: ${await response.text()}`);
    }
  } catch (err) {
    console.error("Error getting stock transaction: ", err);
    toast.error(err);
  }
};

export const DeleteStockTransaction = async (id) => {
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
    console.error("Error getting stock transaction: ", err);
    toast.error(err);
  }
};

export const DeleteItemStockTransaction = async (idMov, idProd) => {
  try {
    const response = await api.delete(`${route}/DeleteItem`, {
      params: {
        idMov: idMov,
        idProd: idProd,
      },
    });

    if (response.ok) {
      return await response.json();
    } else {
      toast.error(`Erro: ${await response.text()}`);
    }
  } catch (err) {
    console.error("Error deleting product from stock: ", err);
    toast.error(err);
  }
};
