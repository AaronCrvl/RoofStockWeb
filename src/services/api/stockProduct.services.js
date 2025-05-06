import api from './api.services';
import { getBaseUrl } from '../../Utils/integration.utils';

// POST - Add product to stock
export const addStockProduct = async (stockProduct) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(`POST ${getBaseUrl()}/EstoqueProduto/Adicionar`);
      const response = await api.post(`/EstoqueProduto/Adicionar`, stockProduct);

      if (response.ok) {
        resolve(await response.text());
      } else {
        reject(`Error: ${await response.text()}`);
      }
    } catch (err) {
      console.error('Error adding product to stock:', err);
      reject(err);
    }
  });
};

// GET - Get product from stock by IDs
export const getStockProduct = async (stockId, productId) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(`GET ${getBaseUrl()}/EstoqueProduto/Obter/${stockId}/${productId}`);
      const response = await api.get(`/EstoqueProduto/Obter/${stockId}/${productId}`);

      if (response.ok) {
        resolve(await response.json());
      } else {
        reject(`Error: ${await response.text()}`);
      }
    } catch (err) {
      console.error('Error getting product from stock:', err);
      reject(err);
    }
  });
};

// GET - List all products from a stock
export const listStockProducts = async (stockId) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(`GET ${getBaseUrl()}/EstoqueProduto/Listar/${stockId}`);
      const response = await api.get(`/EstoqueProduto/Listar/${stockId}`);

      if (response.ok) {
        resolve(await response.json());
      } else {
        reject(`Error: ${await response.text()}`);
      }
    } catch (err) {
      console.error('Error listing products from stock:', err);
      reject(err);
    }
  });
};

// PUT - Update product in stock
export const updateStockProduct = async (stockProduct) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(`PUT ${getBaseUrl()}/EstoqueProduto/Alterar`);
      const response = await api.put(`/EstoqueProduto/Alterar`, stockProduct);

      if (response.ok) {
        resolve(await response.text());
      } else {
        reject(`Error: ${await response.text()}`);
      }
    } catch (err) {
      console.error('Error updating product in stock:', err);
      reject(err);
    }
  });
};

// DELETE - Remove product from stock
export const deleteStockProduct = async (stockId, productId) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(`DELETE ${getBaseUrl()}/EstoqueProduto/Excluir/${stockId}/${productId}`);
      const response = await api.delete(`/EstoqueProduto/Excluir/${stockId}/${productId}`);

      if (response.ok) {
        resolve(await response.text());
      } else {
        reject(`Error: ${await response.text()}`);
      }
    } catch (err) {
      console.error('Error deleting product from stock:', err);
      reject(err);
    }
  });
};

// PUT - Deactivate product in stock
export const deactivateStockProduct = async (stockId, productId) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(`PUT ${getBaseUrl()}/EstoqueProduto/Desativar/${stockId}/${productId}`);
      const response = await api.put(`/EstoqueProduto/Desativar/${stockId}/${productId}`);

      if (response.ok) {
        resolve(await response.text());
      } else {
        reject(`Error: ${await response.text()}`);
      }
    } catch (err) {
      console.error('Error deactivating product in stock:', err);
      reject(err);
    }
  });
};
