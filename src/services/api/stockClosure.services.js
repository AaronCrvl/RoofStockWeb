import api from './api.services';
import { getBaseUrl } from '../../Utils/integration.utils';

// POST - Create a new stock closure
export const createStockClosure = async (newStockClosure) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(`POST ${getBaseUrl()}/FechamentoEstoque/Criar`);
      const response = await api.post('/FechamentoEstoque/Criar', newStockClosure);

      if (response.ok) {
        resolve(await response.json());
      } else {
        reject(`Error: ${await response.text()}`);
      }
    } catch (err) {
      console.error('Error creating stock closure:', err);
      reject(err);
    }
  });
};

// GET - Get stock closure by ID
export const getStockClosureById = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(`GET ${getBaseUrl()}/FechamentoEstoque/Obter/${id}`);
      const response = await api.get(`/FechamentoEstoque/Obter/${id}`);

      if (response.ok) {
        resolve(await response.json());
      } else {
        reject(`Error: ${await response.text()}`);
      }
    } catch (err) {
      console.error('Error getting stock closure by ID:', err);
      reject(err);
    }
  });
};

// GET - Get stock closure by stock ID
export const getStockClosureByStockId = async (stockId) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(`GET ${getBaseUrl()}/FechamentoEstoque/ObterPorEstoque/${stockId}`);
      const response = await api.get(`/FechamentoEstoque/ObterPorEstoque/${stockId}`);

      if (response.ok) {
        resolve(await response.json());
      } else {
        reject(`Error: ${await response.text()}`);
      }
    } catch (err) {
      console.error('Error getting stock closure by stock ID:', err);
      reject(err);
    }
  });
};

// PUT - Update stock closure
export const updateStockClosure = async (updatedStockClosure) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(`PUT ${getBaseUrl()}/FechamentoEstoque/Alterar`);
      const response = await api.put('/FechamentoEstoque/Alterar', updatedStockClosure);

      if (response.ok) {
        resolve(await response.json());
      } else {
        reject(`Error: ${await response.text()}`);
      }
    } catch (err) {
      console.error('Error updating stock closure:', err);
      reject(err);
    }
  });
};

// DELETE - Delete stock closure
export const deleteStockClosure = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(`DELETE ${getBaseUrl()}/FechamentoEstoque/Excluir/${id}`);
      const response = await api.delete(`/FechamentoEstoque/Excluir/${id}`);

      if (response.ok) {
        resolve(await response.json());
      } else {
        reject(`Error: ${await response.text()}`);
      }
    } catch (err) {
      console.error('Error deleting stock closure:', err);
      reject(err);
    }
  });
};

// PUT - Deactivate stock closure
export const deactivateStockClosure = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(`PUT ${getBaseUrl()}/FechamentoEstoque/Desativar/${id}`);
      const response = await api.put(`/FechamentoEstoque/Desativar/${id}`);

      if (response.ok) {
        resolve(await response.json());
      } else {
        reject(`Error: ${await response.text()}`);
      }
    } catch (err) {
      console.error('Error deactivating stock closure:', err);
      reject(err);
    }
  });
};
