import axios from 'axios';
import { getBaseUrl } from '../../Utils/integration.utils';

//import { getLocalStorage } from '../local-storage/localstorage.services';

const onRequest = async (config) => {
  // const localStorage = await getLocalStorage();

  // if (localStorage.length) {
  //   const token = localStorage[0].token_key;
  //   config.headers['Authorization'] = `Bearer ${token}`;
  // }
  // return config;
};

// const setupInterceptorsTo = (axiosInstance) => {
//   axiosInstance.interceptors.request.use(onRequest);
//   return axiosInstance;
// };

const api = axios.create({
  baseURL: getBaseUrl(),
  headers: {
    Accept: "application/json",
    'Content-Tye': 'application/json',
  },
});

//setupInterceptorsTo(api);
export default api;