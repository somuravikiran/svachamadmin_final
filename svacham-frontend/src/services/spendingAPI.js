import axios from 'axios';

const API_BASE_URL = 'https://svachamadmin-backend.onrender.com/api/spendings';

const spendingAPI = {
  createSpending: async (data) => {
    try {
      const res = await axios.post(API_BASE_URL, data);
      return res.data;
    } catch (err) {
      throw err.response?.data || err.message;
    }
  },

  getAllSpendings: async () => {
    try {
      const res = await axios.get(API_BASE_URL);
      return res.data;
    } catch (err) {
      throw err.response?.data || err.message;
    }
  },

  getSpendingById: async (id) => {
    try {
      const res = await axios.get(`${API_BASE_URL}/${id}`);
      return res.data;
    } catch (err) {
      throw err.response?.data || err.message;
    }
  },

  // endpoints using sequence number instead of internal id
  getSpendingBySeq: async (seq) => {
    try {
      const res = await axios.get(`${API_BASE_URL}/seq/${seq}`);
      return res.data;
    } catch (err) {
      throw err.response?.data || err.message;
    }
  },

  updateSpending: async (id, data) => {
    try {
      const res = await axios.put(`${API_BASE_URL}/${id}`, data);
      return res.data;
    } catch (err) {
      throw err.response?.data || err.message;
    }
  },

  updateSpendingBySeq: async (seq, data) => {
    try {
      const res = await axios.put(`${API_BASE_URL}/seq/${seq}`, data);
      return res.data;
    } catch (err) {
      throw err.response?.data || err.message;
    }
  },

  deleteSpending: async (id) => {
    try {
      const res = await axios.delete(`${API_BASE_URL}/${id}`);
      return res.data;
    } catch (err) {
      throw err.response?.data || err.message;
    }
  },

  deleteSpendingBySeq: async (seq) => {
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

export default spendingAPI;
