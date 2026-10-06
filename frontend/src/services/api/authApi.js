import api from './client';

export const authApi = {
  login: async ({ email, password }) => {
    return api.post('/auth/login', { email, password });
  },

  register: async ({ name, email, password, student_id }) => {
    return api.post('/auth/register', { name, email, password, student_id });
  },

  getCurrentUser: async () => {
    return api.get('/auth/me');
  },
};

export default authApi;

