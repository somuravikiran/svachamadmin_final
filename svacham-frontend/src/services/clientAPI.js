import axios from 'axios';

const API_BASE_URL = 'http://localhost:8095/api/clients';

const clientAPI = {
  // Create client
  createClient: async (clientData) => {
    try {
      const response = await axios.post(API_BASE_URL, clientData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get all clients
  getAllClients: async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get client by ID
  getClientById: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update client
  updateClient: async (id, clientData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/${id}`, clientData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Delete client
  deleteClient: async (id) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get summary
  getSummary: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/summary`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Sort by state
  getClientsByState: async (state) => {
    try {
      const response = await axios.get(`${API_BASE_URL}?state=${state}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

export default clientAPI;

