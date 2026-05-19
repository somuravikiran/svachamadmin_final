import axios from 'axios';

const API_BASE_URL = 'http://localhost:8095/api/gstbills';

const gstbillAPI = {
  createBill: async (data) => {
    try {
      const res = await axios.post(API_BASE_URL, data);
      return res.data;
    } catch (err) {
      throw err.response?.data || err.message;
    }
  },

  getAllBills: async () => {
    try {
      const res = await axios.get(API_BASE_URL);
      return res.data;
    } catch (err) {
      throw err.response?.data || err.message;
    }
  },

  getBillById: async (id) => {
    try {
      const res = await axios.get(`${API_BASE_URL}/${id}`);
      return res.data;
    } catch (err) {
      throw err.response?.data || err.message;
    }
  },

  updateBill: async (id, data) => {
    try {
      const res = await axios.put(`${API_BASE_URL}/${id}`, data);
      return res.data;
    } catch (err) {
      throw err.response?.data || err.message;
    }
  },

  deleteBill: async (id) => {
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
};

export default gstbillAPI;

