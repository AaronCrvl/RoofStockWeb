import api from './api.services';
import { getBaseUrl } from '../../Utils/integration.utils';

// GET - Get user by ID
export const getUserById = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(`GET ${getBaseUrl()}/Usuario/ObterUsuario/${id}`);
      const response = await api.get(`/Usuario/ObterUsuario/${id}`);

      if (response.ok) {
        resolve(await response.json());
      } else {
        reject(`Error: ${await response.text()}`);
      }
    } catch (err) {
      console.error('Error getting user by ID:', err);
      reject(err);
    }
  });
};

// GET - Get user by username
export const getUserByUsername = async (username) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(`GET ${getBaseUrl()}/Usuario/ObterUsuario/${username}`);
      const response = await api.get(`/Usuario/ObterUsuario/${username}`);

      if (response.ok) {
        resolve(await response.json());
      } else {
        reject(`Error: ${await response.text()}`);
      }
    } catch (err) {
      console.error('Error getting user by username:', err);
      reject(err);
    }
  });
};

// POST - Create new user
export const createUser = async (user) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(`POST ${getBaseUrl()}/Usuario/CriarUsuario`);
      const response = await api.post(`/Usuario/CriarUsuario`, user);

      if (response.ok) {
        resolve(await response.json());
      } else {
        reject(`Error: ${await response.text()}`);
      }
    } catch (err) {
      console.error('Error creating user:', err);
      reject(err);
    }
  });
};

// POST - Edit user
export const editUser = async (id, user) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(`POST ${getBaseUrl()}/Usuario/EditarUsuario/${id}`);
      const response = await api.post(`/Usuario/EditarUsuario/${id}`, user);

      if (response.ok) {
        resolve(await response.json());
      } else {
        reject(`Error: ${await response.text()}`);
      }
    } catch (err) {
      console.error('Error editing user:', err);
      reject(err);
    }
  });
};
