import api from './api.services';
import { getBaseUrl } from '../../Utils/integration.utils';

export const Authenticate = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("Let's authenticate");
      console.log(`${getBaseUrl()}/Autenticacao/Autenticar`);

      const response = await api.post('/Autenticacao/Autenticar', {
        login: 'testeeeeeee',
        senha: 'senhatesteeeeeee',
      });

      if (response.ok) {
        console.log(`Res: ${response}`);
        resolve(response);
      } else if (response.status === 401) {
        reject('Não autorizado. Verifique suas credenciais.');
      } else {
        const error = await response.text();
        reject(`Erro: ${error}`);
      }
    } catch (err) {
      console.error('Auth Error: ' + err);
      reject();
    }
  });
};
