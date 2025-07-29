import api from "./api.services";
import { toast } from "react-toastify";

const route = "/Product";

export const AddStockProduct = async (stockProduct) => {
  try {
    const response = await api.post(route.concat(`/Create`), stockProduct);

    if (response.ok) {
      return await response.json();
    } else {
      toast.error(`Erro: ${await response.text()}`);
    }
  } catch (err) {
    console.error("Error adding stock:", err);
    toast.error(err)
  }
};

export const GetStockProducts = async (stockId) => {
  try {
    const response = await api.get(route.concat(`/GetByStock/${stockId}`));

    if (response.ok) {
      return await response.json();
    } else {
      toast.error(`Erro: ${await response.text()}`);
    }
  } catch (err) {
    console.error("Error getting products in stock:", err);
    toast.error(err)
  }
};

export const UpdateStockProduct = async (id, stockProduct) => {
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
    toast.error(err)
  }
};

export const DeleteStockProduct = async (prodId) => {
  try {
    const response = await api.patch(`${route}/DeleteItem`, {
      params: {        
        idProd: prodId,
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
