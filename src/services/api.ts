import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3001"
});

// Interceptor para adicionar o token JWT automaticamente
apiClient.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para lidar com erros de autenticação (401)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        // Redireciona para login se não estiver na página de login ou cadastro
        if (!window.location.pathname.includes('/login') && 
            !window.location.pathname.includes('/cadastro')) {
          window.location.href = "/login";
        }
      }
    }
    return Promise.reject(error);
  }
);

export const userService = {
  // Atualizar perfil
  updateProfile: async (id: number | string, data: any) => {
    return apiClient.patch(`/users/${id}`, data); 
  },
  
  // Deletar conta
  deleteAccount: async (id: number | string) => {
    return apiClient.delete(`/users/${id}`);
  },

  // Alterar senha (Agora passando o ID corretamente)
  changePassword: async (id: number | string, data: { oldPassword: string, newPassword: string }) => {
    // Rota ajustada para o padrão REST: PATCH /users/:id/password
    return apiClient.patch(`/users/${id}/password`, data);
  }
};

export default apiClient;