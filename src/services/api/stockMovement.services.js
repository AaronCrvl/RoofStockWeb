import api from './api.services';
import { getBaseUrl } from '../../Utils/integration.utils';

// POST - Create stock transaction
export const createStockTransaction = async (transaction) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(`POST ${getBaseUrl()}/StockMovement/Create`);
      const response = await api.post(`/StockMovement/Create`, transaction);

      if (response.ok) {
        resolve(await response.json());
      } else {
        reject(`Error: ${await response.text()}`);
      }
    } catch (err) {
      console.error('Error creating stock transaction:', err);
      reject(err);
    }
  });
};

// GET - Get stock transaction by ID
export const getStockTransactionById = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(`GET ${getBaseUrl()}/StockMovement/GetById/${id}`);
      const response = await api.get(`/StockMovement/GetById/${id}`);

      if (response.ok) {
        resolve(await response.json());
      } else {
        reject(`Error: ${await response.text()}`);
      }
    } catch (err) {
      console.error('Error getting stock transaction by ID:', err);
      reject(err);
    }
  });
};

// GET - Get stock transactions by warehouse ID
export const getStockTransactionsByWarehouse = async (warehouseId) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(`GET ${getBaseUrl()}/StockMovement/ListByWarehouse/${warehouseId}`);
      const response = await api.get(`/StockMovement/ListByWarehouse/${warehouseId}`);

      if (response.ok) {
        resolve(await response.json());
      } else {
        reject(`Error: ${await response.text()}`);
      }
    } catch (err) {
      console.error('Error getting stock transactions by warehouse:', err);
      reject(err);
    }
  });
};

// PUT - Edit stock transaction (update)
export const editStockTransaction = async (transaction) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(`PUT ${getBaseUrl()}/StockMovement/Update`);
      const response = await api.put(`/StockMovement/Update`, transaction);

      if (response.ok) {
        resolve(await response.json());
      } else {
        reject(`Error: ${await response.text()}`);
      }
    } catch (err) {
      console.error('Error editing stock transaction:', err);
      reject(err);
    }
  });
};

// DELETE - Delete stock transaction
export const deleteStockTransaction = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(`DELETE ${getBaseUrl()}/StockMovement/Delete/${id}`);
      const response = await api.delete(`/StockMovement/Delete/${id}`);

      if (response.ok) {
        resolve(await response.json());
      } else {
        reject(`Error: ${await response.text()}`);
      }
    } catch (err) {
      console.error('Error deleting stock transaction:', err);
      reject(err);
    }
  });
};
