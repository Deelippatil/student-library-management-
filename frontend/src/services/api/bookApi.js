import api from './client';

export const bookApi = {
  getAllBooks: async (params = {}) => {
    return api.get('/books', params);
  },

  getCategories: async () => {
    return api.get('/books/categories');
  },

  getBookById: async (id) => {
    return api.get(`/books/${id}`);
  },

  addBook: async (bookData) => {
    return api.post('/books', bookData);
  },

  updateBook: async (id, bookData) => {
    return api.put(`/books/${id}`, bookData);
  },

  deleteBook: async (id) => {
    return api.delete(`/books/${id}`);
  },
};

export default bookApi;

