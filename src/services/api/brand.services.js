import api from './api.services';
import { getBaseUrl } from '../../Utils/integration.utils';

// POST - Create a new brand
export const createBrand = async (brand) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(`POST ${getBaseUrl()}/Marca/CriarMarca`);
      const response = await api.post(`/Marca/CriarMarca`, brand);

      if (response.ok) {
        resolve(await response.text());
      } else {
        reject(`Error: ${await response.text()}`);
      }
    } catch (err) {
      console.error('Error creating brand:', err);
      reject(err);
    }
  });
};

// GET - Get brand by ID
export const getBrandById = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(`GET ${getBaseUrl()}/Marca/CarregarMarca/${id}`);
      const response = await api.get(`/Marca/CarregarMarca/${id}`);

      if (response.ok) {
        resolve(await response.json());
      } else {
        reject(`Error: ${await response.text()}`);
      }
    } catch (err) {
      console.error('Error getting brand by ID:', err);
      reject(err);
    }
  });
};

// GET - Get brand by name
export const getBrandByName = async (name) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(`GET ${getBaseUrl()}/Marca/CarregarMarcaPorNome/${name}`);
      const response = await api.get(`/Marca/CarregarMarcaPorNome/${name}`);

      if (response.ok) {
        resolve(await response.json());
      } else {
        reject(`Error: ${await response.text()}`);
      }
    } catch (err) {
      console.error('Error getting brand by name:', err);
      reject(err);
    }
  });
};

// PUT - Update brand
export const updateBrand = async (id, brand) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(`PUT ${getBaseUrl()}/Marca/AlterarMarca/${id}`);
      const response = await api.put(`/Marca/AlterarMarca/${id}`, brand);

      if (response.ok) {
        resolve(await response.text());
      } else {
        reject(`Error: ${await response.text()}`);
      }
    } catch (err) {
      console.error('Error updating brand:', err);
      reject(err);
    }
  });
};

// DELETE - Delete brand by ID
export const deleteBrand = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(`DELETE ${getBaseUrl()}/Marca/ExcluirMarca/${id}`);
      const response = await api.delete(`/Marca/ExcluirMarca/${id}`);

      if (response.ok) {
        resolve(await response.text());
      } else {
        reject(`Error: ${await response.text()}`);
      }
    } catch (err) {
      console.error('Error deleting brand:', err);
      reject(err);
    }
  });
};
