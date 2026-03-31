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

api.interceptors.request.use((config) => {
  // Coleta tanto token nativo SQUAD quanto token Root de PROFESSOR caindo na Malha de RBAC Segura
  const token = localStorage.getItem('ecosabon_token') || localStorage.getItem('ecosabon_teacher_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
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
    
    // Auto-Logout na queda do Token
    if (error.response?.status === 401) {
      localStorage.removeItem('ecosabon_token');
      // Despacha o usuário para o lobby
      window.location.href = '/';
    }

    return Promise.reject(error);
  }
);
