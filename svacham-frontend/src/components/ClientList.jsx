import { useState, useEffect } from 'react';
import clientAPI from '../services/clientAPI';
import ClientFormModal from './ClientFormModal';
import ClientViewModal from './ClientViewModal';
import '../styles/ClientList.css';

function ClientList() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [editingClient, setEditingClient] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterState, setFilterState] = useState('');
  const [summary, setSummary] = useState(null);

  // Fetch all clients on component mount
  useEffect(() => {
    fetchClients();
    fetchSummary();
  }, []);

  const fetchClients = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await clientAPI.getAllClients();
      setClients(Array.isArray(data) ? data : []);
    } catch (err) {
      setError('Failed to fetch clients. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchSummary = async () => {
    try {
      const data = await clientAPI.getSummary();
      setSummary(data);
    } catch (err) {
      console.error('Failed to fetch summary:', err);
    }
  };

  const handleAddClient = () => {
    setEditingClient(null);
    setShowFormModal(true);
  };

  const handleEditClient = (client) => {
    setEditingClient(client);
    setShowFormModal(true);
  };

  const handleViewClient = (client) => {
    setSelectedClient(client);
    setShowViewModal(true);
  };

  const handleFormSubmit = async (formData, clientId) => {
    try {
      if (clientId) {
        // Update existing client
        await clientAPI.updateClient(clientId, formData);
        setSuccess('Client updated successfully!');
      } else {
        // Create new client
        await clientAPI.createClient(formData);
        setSuccess('Client created successfully!');
      }
      fetchClients();
      fetchSummary();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.message || 'Failed to save client. Please try again.');
      console.error(err);
    }
  };

  const handleDeleteClient = async (id) => {
    if (window.confirm('Are you sure you want to delete this client?')) {
      try {
        await clientAPI.deleteClient(id);
        setSuccess('Client deleted successfully!');
        fetchClients();
        fetchSummary();
        setTimeout(() => setSuccess(''), 3000);
      } catch (err) {
        setError(err.message || 'Failed to delete client. Please try again.');
        console.error(err);
      }
    }
  };

  // Filter clients
  const filteredClients = clients.filter((client) => {
    const matchesSearch =
      !searchTerm ||
      client.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.phoneNo.includes(searchTerm) ||
      client.city.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesState = !filterState || client.state === filterState;

    return matchesSearch && matchesState;
  });

  const uniqueStates = [...new Set(clients.map((c) => c.state))].sort();

  const formatCurrency = (value) => {
    if (!value) return '₹0.00';
    return `₹${parseFloat(value).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <div className="client-list-container">
      {/* Header Section */}
      <div className="client-header">
        <div className="header-content">
          <h1>Clients Management</h1>
          <p>Manage and track all your clients information and payments</p>
        </div>
        <button className="btn-add-client" onClick={handleAddClient}>
          <span>➕</span> Add New Client
        </button>
      </div>

      {/* Summary Cards */}
      {summary && (
        <div className="summary-cards">
          <div className="summary-card">
            <h3>Total Clients</h3>
            <p className="summary-value">{summary.totalClients || 0}</p>
          </div>
          <div className="summary-card">
            <h3>Total Amount</h3>
            <p className="summary-value">{formatCurrency(summary.totalAmount)}</p>
          </div>
          <div className="summary-card">
            <h3>Total Paid</h3>
            <p className="summary-value paid">{formatCurrency(summary.totalPaid)}</p>
          </div>
          <div className="summary-card">
            <h3>Total Balance</h3>
            <p className="summary-value balance">{formatCurrency(summary.totalBalance)}</p>
          </div>
        </div>
      )}

      {/* Alerts */}
      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      {/* Filters */}
      <div className="filters-section">
        <div className="search-box">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
          <input
            type="text"
            placeholder="Search by name, phone, or city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <select
          className="filter-select"
          value={filterState}
          onChange={(e) => setFilterState(e.target.value)}
        >
          <option value="">All States</option>
          {uniqueStates.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
      </div>

      {/* Table Section */}
      <div className="clients-table-wrapper">
        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading clients...</p>
          </div>
        ) : filteredClients.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📋</div>
            <h3>No clients found</h3>
            <p>
              {clients.length === 0
                ? 'Start by adding your first client'
                : 'No results match your search filter'}
            </p>
          </div>
        ) : (
          <table className="clients-table">
            <thead>
              <tr>
                <th>Client Name</th>
                <th>Phone</th>
                <th>City</th>
                <th>State</th>
                <th>Total Amount</th>
                <th>Amount Paid</th>
                <th>Balance</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.map((client) => (
                <tr key={client.id}>
                  <td className="cell-name">
                    <span className="client-avatar">{client.clientName.charAt(0).toUpperCase()}</span>
                    {client.clientName}
                  </td>
                  <td>{client.phoneNo}</td>
                  <td>{client.city}</td>
                  <td>
                    <span className="state-badge">{client.state}</span>
                  </td>
                  <td className="cell-amount">{formatCurrency(client.totalAmt)}</td>
                  <td className="cell-amount paid">{formatCurrency(client.amtPaid)}</td>
                  <td className="cell-amount">
                    {client.balAmt && parseFloat(client.balAmt) > 0 ? (
                      <span className="balance-tag">{formatCurrency(client.balAmt)}</span>
                    ) : (
                      <span className="paid-tag">Paid</span>
                    )}
                  </td>
                  <td className="cell-actions">
                    <button
                      className="action-btn view-btn"
                      onClick={() => handleViewClient(client)}
                      title="View details"
                    >
                      <span className="action-icon">👁️</span>
                      <span className="action-label">View</span>
                    </button>
                    <button
                      className="action-btn edit-btn"
                      onClick={() => handleEditClient(client)}
                      title="Edit client"
                    >
                      <span className="action-icon">✏️</span>
                      <span className="action-label">Edit</span>
                    </button>
                    <button
                      className="action-btn delete-btn"
                      onClick={() => handleDeleteClient(client.id)}
                      title="Delete client"
                    >
                      <span className="action-icon">🗑️</span>
                      <span className="action-label">Delete</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination Info */}
      {filteredClients.length > 0 && (
        <div className="pagination-info">
          Showing {filteredClients.length} of {clients.length} clients
        </div>
      )}

      {/* Modals */}
      <ClientFormModal
        isOpen={showFormModal}
        onClose={() => {
          setShowFormModal(false);
          setEditingClient(null);
        }}
        onSubmit={handleFormSubmit}
        clientData={editingClient}
      />

      <ClientViewModal
        isOpen={showViewModal}
        onClose={() => {
          setShowViewModal(false);
          setSelectedClient(null);
        }}
        clientData={selectedClient}
      />
    </div>
  );
}

export default ClientList;

