import api from './api.services';
import { getBaseUrl } from '../../Utils/integration.utils';

// GET - Get company by ID
export const getCompanyById = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(`GET ${getBaseUrl()}/Empresa/ObterEmpresa/${id}`);
      const response = await api.get(`/Empresa/ObterEmpresa/${id}`);

      if (response.ok) {
        resolve(await response.json());
      } else {
        reject(`Error: ${await response.text()}`);
      }
    } catch (err) {
      console.error('Error getting company by ID: ', err);
      reject(err);
    }
  });
};

// GET - Get company by user ID
export const getCompaniesByUserId = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(
        `GET ${getBaseUrl()}/Empresa/ObterEmpresasPorUsuario?id=${id}`
      );
      const response = await api.get(
        `/Empresa/ObterEmpresasPorUsuario?id=${id}`
      );

      if (response.ok) {
        resolve(await response.json());
      } else {
        reject(`Error: ${await response.text()}`);
      }
    } catch (err) {
      console.error('Error getting company by user ID: ', err);
      reject(err);
    }
  });
};

// GET - Get company by name
export const getCompanyByName = async (name) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(`GET ${getBaseUrl()}/Empresa/ObterEmpresaPorNome/${name}`);
      const response = await api.get(
        `/Empresa/ObterEmpresaPorNome/${encodeURIComponent(name)}`
      );

      if (response.ok) {
        resolve(await response.json());
      } else {
        reject(`Error: ${await response.text()}`);
      }
    } catch (err) {
      console.error('Error getting company by name: ', err);
      reject(err);
    }
  });
};

// POST - Create company
export const createCompany = async (newCompany) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(`POST ${getBaseUrl()}/Empresa/CriarEmpresa`);
      const response = await api.post(`/Empresa/CriarEmpresa`, newCompany);

      if (response.ok) {
        resolve(await response.json());
      } else {
        reject(`Error: ${await response.text()}`);
      }
    } catch (err) {
      console.error('Error creating company: ', err);
      reject(err);
    }
  });
};

// PUT - Update company
export const updateCompany = async (id, updatedCompany) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(`PUT ${getBaseUrl()}/Empresa/AlterarEmpresa/${id}`);
      const response = await api.put(
        `/Empresa/AlterarEmpresa/${id}`,
        updatedCompany
      );

      if (response.ok) {
        resolve(await response.json());
      } else {
        reject(`Error: ${await response.text()}`);
      }
    } catch (err) {
      console.error('Error updating company: ', err);
      reject(err);
    }
  });
};

// DELETE - Delete company
export const deleteCompany = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(`DELETE ${getBaseUrl()}/Empresa/ExcluirEmpresa/${id}`);
      const response = await api.delete(`/Empresa/ExcluirEmpresa/${id}`);

      if (response.ok) {
        resolve(await response.json());
      } else {
        reject(`Error: ${await response.text()}`);
      }
    } catch (err) {
      console.error('Error deleting company: ', err);
      reject(err);
    }
  });
};

// PUT - Deactivate company
export const deactivateCompany = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(`PUT ${getBaseUrl()}/Empresa/DesativarEmpresa/${id}`);
      const response = await api.put(`/Empresa/DesativarEmpresa/${id}`);

      if (response.ok) {
        resolve(await response.json());
      } else {
        reject(`Error: ${await response.text()}`);
      }
    } catch (err) {
      console.error('Error deactivating company: ', err);
      reject(err);
    }
  });
};

// PUT - Activate company
export const activateCompany = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(`PUT ${getBaseUrl()}/Empresa/AtivarEmpresa/${id}`);
      const response = await api.put(`/Empresa/AtivarEmpresa/${id}`);

      if (response.ok) {
        resolve(await response.json());
      } else {
        reject(`Error: ${await response.text()}`);
      }
    } catch (err) {
      console.error('Error activating company: ', err);
      reject(err);
    }
  });
};
