import api from './client';

export const circulationApi = {
  issueBook: async ({ book_id, student_id, due_date, notes }) => {
    return api.post('/circulation/issue', { book_id, student_id, due_date, notes });
  },

  returnBook: async ({ transaction_id, return_notes }) => {
    return api.post('/circulation/return', { transaction_id, return_notes });
  },

  getAllRecords: async (params = {}) => {
    return api.get('/circulation/records', params);
  },

  getTransactionById: async (id) => {
    return api.get(`/circulation/records/${id}`);
  },
};

export default circulationApi;

