import api from './api.services';
import { getBaseUrl } from '../../Utils/integration.utils';
import useUser  from '../../contexts/UserContext';

// GET - Get stock by ID
export const getStockById = async (id) => {  
  return new Promise(async (resolve, reject) => {
    try {
      console.log(`GET ${getBaseUrl()}/Estoque/ObterEstoque/${id}`);
      const response = await api.get(`/Estoque/ObterEstoque/${id}`);

      if (response.ok) {
        resolve(await response.json());
      } else {
        reject(`Erro: ${await response.text()}`);
      }
    } catch (err) {
      console.error('Error getting stock by ID:', err);
      reject(err);
    }
  });
};

// GET - Get stock by user ID
export const getStockByUserId = async (idUser, idCompany) => {
  const {token} = useUser()
  return new Promise(async (resolve, reject) => {
    try {
      console.log(`GET ${getBaseUrl()}/Estoque/ObterEstoquePorUsuario?idUsuario=${idUser}&idEmpresa=${idCompany}`);
      const response = await api.get(`/Estoque/ObterEstoquePorUsuario?idUsuario=${idUser}&idEmpresa=${idCompany}`, {
        headers: {
          Authorization: `Bearer ${token}`,          
        },
      });

      if (response.ok) {
        resolve(await response.json());
      } else {
        reject(`Erro: ${await response.text()}`);
      }
    } catch (err) {
      console.error('Error getting stock by supervisor ID:', err);
      reject(err);
    }
  });
};

// GET - Get stock by name
export const getStockByName = async (stockName) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(
        `GET ${getBaseUrl()}/Estoque/ObterEstoquePorNome/${stockName}`
      );
      const response = await api.get(
        `/Estoque/ObterEstoquePorNome/${encodeURIComponent(stockName)}`
      );

      if (response.ok) {
        resolve(await response.json());
      } else {
        reject(`Erro: ${await response.text()}`);
      }
    } catch (err) {
      console.error('Error getting stock by name:', err);
      reject(err);
    }
  });
};

// POST - Create new stock
export const createStock = async (newStock) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(`POST ${getBaseUrl()}/Estoque/CriarEstoque`);
      const response = await api.post('/Estoque/CriarEstoque', newStock);

      if (response.ok) {
        resolve(await response.json());
      } else {
        reject(`Erro: ${await response.text()}`);
      }
    } catch (err) {
      console.error('Error creating stock:', err);
      reject(err);
    }
  });
};

// PUT - Update stock
export const updateStock = async (id, updatedStock) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(`PUT ${getBaseUrl()}/Estoque/AlterarEstoque/${id}`);
      const response = await api.put(
        `/Estoque/AlterarEstoque/${id}`,
        updatedStock
      );

      if (response.ok) {
        resolve(await response.json());
      } else {
        reject(`Erro: ${await response.text()}`);
      }
    } catch (err) {
      console.error('Error updating stock:', err);
      reject(err);
    }
  });
};

// DELETE - Delete stock
export const deleteStock = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(`DELETE ${getBaseUrl()}/Estoque/ExcluirEstoque/${id}`);
      const response = await api.delete(`/Estoque/ExcluirEstoque/${id}`);

      if (response.ok) {
        resolve(await response.json());
      } else {
        reject(`Erro: ${await response.text()}`);
      }
    } catch (err) {
      console.error('Error deleting stock:', err);
      reject(err);
    }
  });
};

// PUT - Deactivate stock
export const deactivateStock = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(`PUT ${getBaseUrl()}/Estoque/DesativarEstoque/${id}`);
      const response = await api.put(`/Estoque/DesativarEstoque/${id}`);

      if (response.ok) {
        resolve(await response.json());
      } else {
        reject(`Erro: ${await response.text()}`);
      }
    } catch (err) {
      console.error('Error deactivating stock:', err);
      reject(err);
    }
  });
};

// PUT - Activate stock
export const activateStock = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(`PUT ${getBaseUrl()}/Estoque/AtivarEstoque/${id}`);
      const response = await api.put(`/Estoque/AtivarEstoque/${id}`);

      if (response.ok) {
        resolve(await response.json());
      } else {
        reject(`Erro: ${await response.text()}`);
      }
    } catch (err) {
      console.error('Error activating stock:', err);
      reject(err);
    }
  });
};
