import api from './client';

export const studentApi = {
  getDashboard: async () => {
    return api.get('/student/dashboard');
  },

  getActiveLoans: async () => {
    return api.get('/student/loans/active');
  },

  getBorrowingHistory: async () => {
    return api.get('/student/loans/history');
  },
};

export default studentApi;

