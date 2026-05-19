import axios from 'axios';

const API_BASE_URL = 'https://svachamadmin-backend.onrender.com/api/orders';

const orderAPI = {
  createOrder: async (data) => {
    try {
      const res = await axios.post(API_BASE_URL, data);
      return res.data;
    } catch (err) {
      throw err.response?.data || err.message;
    }
  },

  getAllOrders: async () => {
    try {
      const res = await axios.get(API_BASE_URL);
      return res.data;
    } catch (err) {
      throw err.response?.data || err.message;
    }
  },

  getOrderById: async (id) => {
    try {
      const res = await axios.get(`${API_BASE_URL}/${id}`);
      return res.data;
    } catch (err) {
      throw err.response?.data || err.message;
    }
  },

  updateOrder: async (id, data) => {
    try {
      const res = await axios.put(`${API_BASE_URL}/${id}`, data);
      return res.data;
    } catch (err) {
      throw err.response?.data || err.message;
    }
  },

  deleteOrder: async (id) => {
    try {
      const res = await axios.delete(`${API_BASE_URL}/${id}`);
      return res.data;
    } catch (err) {
      throw err.response?.data || err.message;
    }
  },

  getSummary: async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/summary`);
      return res.data;
    } catch (err) {
      throw err.response?.data || err.message;
    }
  }
  ,
  getSortedByStatus: async (status) => {
    try {
      const url = status ? `${API_BASE_URL}/sorted-by-status?status=${encodeURIComponent(status)}` : `${API_BASE_URL}/sorted-by-status`;
      const res = await axios.get(url);
      return res.data;
    } catch (err) {
      throw err.response?.data || err.message;
    }
  }
};

export default orderAPI;

