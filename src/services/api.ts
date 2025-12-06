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
  // Buscar usuário por ID (privado - requer autenticação)
  findOne: async (id: number | string) => {
    return apiClient.get(`/users/${id}`);
  },

  // Buscar usuário por username (público)
  findByUsername: async (username: string) => {
    return apiClient.get(`/users/username/${username}`);
  },

  // Atualizar perfil
  updateProfile: async (id: number | string, data: any) => {
    return apiClient.patch(`/users/${id}`, data); 
  },
  
  // Deletar conta
  deleteAccount: async (id: number | string) => {
    return apiClient.delete(`/users/${id}`);
  },

  // Alterar senha
  changePassword: async (id: number | string, data: { oldPassword: string, newPassword: string }) => {
    return apiClient.patch(`/users/${id}/password`, data);
  }
};

export const reviewService = {
  getByAuthor: async (authorId: number) => {
    return apiClient.get(`/reviews?authorId=${authorId}`);
  },

  getByLoja: async (lojaId: number) => {
    return apiClient.get(`/reviews?lojaId=${lojaId}`);
  },

  getByProduto: async (produtoId: number) => {
    return apiClient.get(`/reviews?produtoId=${produtoId}`);
  },

  create: async (data: any) => {
    return apiClient.post('/reviews', data);
  },

  update: async (id: number, data: any) => {
    return apiClient.patch(`/reviews/${id}`, data);
  },

  delete: async (id: number) => {
    return apiClient.delete(`/reviews/${id}`);
  }
};

export const produtoService = {
  // Buscar todos os produtos
  getAll: async () => {
    return apiClient.get('/produtos');
  },

  // Buscar produtos por loja
  getByLoja: async (lojaId: number) => {
    return apiClient.get(`/produtos?lojaId=${lojaId}`);
  },

  // Buscar produto por ID
  getById: async (id: number) => {
    return apiClient.get(`/produtos/${id}`);
  },

  // --- CORREÇÃO IMPORTANTE AQUI ---
  // Mantivemos APENAS esta função 'create' que suporta FormData e LojaId na URL.
  // A versão duplicada abaixo foi removida.
  create: async (formData: FormData, lojaId: number | string) => {
    // Passamos o lojaId na URL (?lojaId=...) para o Guard do backend ler antes do upload
    return apiClient.post(`/produtos?lojaId=${lojaId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  // Atualizar produto
  update: async (id: number, data: any) => {
    return apiClient.patch(`/produtos/${id}`, data);
  },

  // Deletar produto
  delete: async (id: number) => {
    return apiClient.delete(`/produtos/${id}`);
  }
};

export const lojaService = {
  getAll: async () => {
    return apiClient.get('/lojas');
  },

  getByDono: async (donoId: number) => {
    return apiClient.get(`/lojas?donoId=${donoId}`);
  },

  getById: async (id: number) => {
    return apiClient.get(`/lojas/${id}`);
  },

  create: async (data: any) => {
    return apiClient.post('/lojas', data);
  },

  update: async (id: number, data: any) => {
    return apiClient.patch(`/lojas/${id}`, data);
  },

  delete: async (id: number) => {
    return apiClient.delete(`/lojas/${id}`);
  }
};

export default apiClient;