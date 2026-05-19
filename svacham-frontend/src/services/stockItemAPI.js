import axios from 'axios';

const API_BASE_URL = 'https://svachamadmin-backend.onrender.com/api/stock-items';

const stockItemAPI = {
  createStockItem: async (data) => {
    try {
      const res = await axios.post(API_BASE_URL, data);
      return res.data;
    } catch (err) {
      throw err.response?.data || err.message;
    }
  },

  getAllStockItems: async () => {
    try {
      const res = await axios.get(API_BASE_URL);
      return res.data;
    } catch (err) {
      throw err.response?.data || err.message;
    }
  },

  getStockItemBySeq: async (seq) => {
    try {
      const res = await axios.get(`${API_BASE_URL}/seq/${seq}`);
      return res.data;
    } catch (err) {
      throw err.response?.data || err.message;
    }
  },

  updateStockItemBySeq: async (seq, data) => {
    try {
      const res = await axios.put(`${API_BASE_URL}/seq/${seq}`, data);
      return res.data;
    } catch (err) {
      throw err.response?.data || err.message;
    }
  },

  deleteStockItemBySeq: async (seq) => {
    try {
      const res = await axios.delete(`${API_BASE_URL}/seq/${seq}`);
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
  },

  getSorted: async (by) => {
    try {
      const url = by ? `${API_BASE_URL}/sorted?by=${encodeURIComponent(by)}` : `${API_BASE_URL}/sorted`;
      const res = await axios.get(url);
      return res.data;
    } catch (err) {
      throw err.response?.data || err.message;
    }
  }
};

export default stockItemAPI;

