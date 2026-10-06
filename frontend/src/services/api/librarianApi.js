import api from './client';

export const librarianApi = {
  getDashboard: async () => {
    return api.get('/librarian/dashboard');
  },

  getAllStudents: async (params = {}) => {
    return api.get('/librarian/students', params);
  },

  getStudentById: async (id) => {
    return api.get(`/librarian/students/${id}`);
  },

  updateStudentStatus: async (id, status) => {
    return api.put(`/librarian/students/${id}/status`, { status });
  },
};

export default librarianApi;

