import api from "./api.services";
import { toast } from "react-toastify";

const route = "/Stock";

// GET - Get stock by ID
export const getStockById = async (id) => {
  try {
    const response = await api.get(`${route}/Get?`, {
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
    console.error("Error getting stock by ID:", err);
    toast.error(err)
  }
};

export const GetStockByUser = async (idUser) => {
  try {
    const response = await api.get(`${route}/GetByUser`, {
      params: { idUser: idUser },
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      toast.error(`Erro: ${await response.text()}`);
    }
  } catch (err) {
    console.error("Error getting stock by user ID:", err);
    toast.error(err)
  }
};

export const SetSessionStock = async (idEstoque) => {
  try {
    const response = await api.patch(`${route}/SetSessionStock`, {
      params: { idEstoque: idEstoque },
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      toast.error(`Erro: ${await response.text()}`);
    }
  } catch (err) {
    console.error("Error setting selected stock in session:", err);
    toast.error(err);
  }
};

// POST - Create new stock
export const createStock = async (newStock) => {
  try {
    const response = await api.post(`${route}/Create`, newStock);

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

// PUT - Update stock
export const updateStock = async (id, updatedStock) => {
  try {
    const response = await api.patch(`${route}/Alter`, updatedStock, {
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
    toast.error(err)
  }
};

// DELETE - Delete stock
export const deleteStock = async (id) => {
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
    toast.error(err)
  }
};

// PUT - Deactivate stock
export const deactivateStock = async (id) => {
  try {
    const response = await api.patch(`${route}/Unactivate`, null, {
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
    toast.error(err)
  }
};

// PUT - Activate stock
export const activateStock = async (id) => {
  try {
     const response = await api.patch(`${route}/Activate`, null, {
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
    toast.error(err)
  }
};
