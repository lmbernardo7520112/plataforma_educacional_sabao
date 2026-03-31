import axios from 'axios';

/**
 * Instância principal do Axios para comunicação com o Backend.
 * No ambiente de desenvolvimento (Vite), o /api é redirecionado
 * via proxy no vite.config.ts para http://localhost:3000
 */
export const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Interceptor para tratamento global de erros (opcional)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Caso o backend mande uma mensagem de erro compreensível, nós a exibimos.
    const customMessage = error.response?.data?.message;
    if (customMessage) {
      console.error('API Error:', customMessage);
    }
    return Promise.reject(error);
  }
);
