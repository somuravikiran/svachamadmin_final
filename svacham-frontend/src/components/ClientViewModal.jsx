import '../styles/ClientViewModal.css';

function ClientViewModal({ isOpen, onClose, clientData = null }) {
  if (!isOpen || !clientData) return null;

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatCurrency = (value) => {
    if (!value) return '₹0.00';
    return `₹${parseFloat(value).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const calculateBalance = () => {
    if (clientData.totalAmt && clientData.amtPaid) {
      return parseFloat(clientData.totalAmt) - parseFloat(clientData.amtPaid);
    }
    return clientData.balAmt || 0;
  };

  return (
    <div className="view-modal-overlay" onClick={onClose}>
      <div className="view-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="view-modal-header">
          <h2>Client Details</h2>
          <button className="view-modal-close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="view-modal-body">
          <div className="detail-section">
            <h3>Personal Information</h3>
            <div className="detail-grid">
              <div className="detail-item">
                <label>Client Name</label>
                <p>{clientData.clientName || 'N/A'}</p>
              </div>
              <div className="detail-item">
                <label>Phone Number</label>
                <p>{clientData.phoneNo || 'N/A'}</p>
              </div>
              <div className="detail-item full-row">
                <label>Address</label>
                <p>{clientData.address || 'N/A'}</p>
              </div>
              <div className="detail-item">
                <label>City</label>
                <p>{clientData.city || 'N/A'}</p>
              </div>
              <div className="detail-item">
                <label>State</label>
                <p>{clientData.state || 'N/A'}</p>
              </div>
            </div>
          </div>

          <div className="detail-section">
            <h3>Financial Information</h3>
            <div className="financial-grid">
              <div className="financial-item">
                <label>Total Amount</label>
                <p className="amount">{formatCurrency(clientData.totalAmt)}</p>
              </div>
              <div className="financial-item">
                <label>Amount Paid</label>
                <p className="amount paid">{formatCurrency(clientData.amtPaid)}</p>
              </div>
              <div className="financial-item">
                <label>Balance Amount</label>
                <p className={`amount ${calculateBalance() > 0 ? 'balance' : 'zero'}`}>
                  {formatCurrency(calculateBalance())}
                </p>
              </div>
            </div>
          </div>

          <div className="detail-section">
            <h3>Audit Information</h3>
            <div className="detail-grid">
              <div className="detail-item">
                <label>Created Date</label>
                <p>{formatDate(clientData.createdDate)}</p>
              </div>
              <div className="detail-item">
                <label>Updated Date</label>
                <p>{formatDate(clientData.updatedDate)}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="view-modal-footer">
          <button className="btn-close" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default ClientViewModal;


