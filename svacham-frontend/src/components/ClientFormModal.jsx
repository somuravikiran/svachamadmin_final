import { useState, useEffect } from 'react';
import '../styles/ClientFormModal.css';

function ClientFormModal({ isOpen, onClose, onSubmit, clientData = null }) {
  const [formData, setFormData] = useState({
    clientName: '',
    phoneNo: '',
    address: '',
    city: '',
    state: '',
    totalAmt: '',
    amtPaid: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (clientData) {
      setFormData({
        clientName: clientData.clientName || '',
        phoneNo: clientData.phoneNo || '',
        address: clientData.address || '',
        city: clientData.city || '',
        state: clientData.state || '',
        totalAmt: clientData.totalAmt || '',
        amtPaid: clientData.amtPaid || '',
      });
    } else {
      setFormData({
        clientName: '',
        phoneNo: '',
        address: '',
        city: '',
        state: '',
        totalAmt: '',
        amtPaid: '',
      });
    }
    setErrors({});
  }, [clientData, isOpen]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.clientName.trim()) {
      newErrors.clientName = 'Client name is required';
    }

    if (!formData.phoneNo.trim()) {
      newErrors.phoneNo = 'Phone number is required';
    } else if (!/^(?:\+91[\-\s]?|0)?[6-9]\d{9}$/.test(formData.phoneNo)) {
      newErrors.phoneNo = 'Invalid Indian mobile number';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }

    if (!formData.state.trim()) {
      newErrors.state = 'State is required';
    }

    if (!formData.totalAmt || isNaN(formData.totalAmt) || parseFloat(formData.totalAmt) < 0) {
      newErrors.totalAmt = 'Total amount must be a valid positive number';
    }

    if (!formData.amtPaid || isNaN(formData.amtPaid) || parseFloat(formData.amtPaid) < 0) {
      newErrors.amtPaid = 'Amount paid must be a valid positive number';
    }

    if (parseFloat(formData.amtPaid) > parseFloat(formData.totalAmt)) {
      newErrors.amtPaid = 'Amount paid cannot exceed total amount';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      await onSubmit(formData, clientData?.id);
      setFormData({
        clientName: '',
        phoneNo: '',
        address: '',
        city: '',
        state: '',
        totalAmt: '',
        amtPaid: '',
      });
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{clientData ? 'Edit Client' : 'Add New Client'}</h2>
          <button className="modal-close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="client-form">
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="clientName">Client Name *</label>
              <input
                id="clientName"
                type="text"
                name="clientName"
                value={formData.clientName}
                onChange={handleChange}
                placeholder="Enter client name"
                className={errors.clientName ? 'error' : ''}
              />
              {errors.clientName && <span className="error-message">{errors.clientName}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="phoneNo">Phone Number *</label>
              <input
                id="phoneNo"
                type="tel"
                name="phoneNo"
                value={formData.phoneNo}
                onChange={handleChange}
                placeholder="10-digit mobile number"
                className={errors.phoneNo ? 'error' : ''}
              />
              {errors.phoneNo && <span className="error-message">{errors.phoneNo}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="city">City *</label>
              <input
                id="city"
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Enter city"
                className={errors.city ? 'error' : ''}
              />
              {errors.city && <span className="error-message">{errors.city}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="state">State *</label>
              <input
                id="state"
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="Enter state"
                className={errors.state ? 'error' : ''}
              />
              {errors.state && <span className="error-message">{errors.state}</span>}
            </div>

            <div className="form-group full-width">
              <label htmlFor="address">Address *</label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter complete address"
                rows="3"
                className={errors.address ? 'error' : ''}
              />
              {errors.address && <span className="error-message">{errors.address}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="totalAmt">Total Amount *</label>
              <input
                id="totalAmt"
                type="number"
                name="totalAmt"
                value={formData.totalAmt}
                onChange={handleChange}
                placeholder="0.00"
                step="0.01"
                min="0"
                className={errors.totalAmt ? 'error' : ''}
              />
              {errors.totalAmt && <span className="error-message">{errors.totalAmt}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="amtPaid">Amount Paid *</label>
              <input
                id="amtPaid"
                type="number"
                name="amtPaid"
                value={formData.amtPaid}
                onChange={handleChange}
                placeholder="0.00"
                step="0.01"
                min="0"
                className={errors.amtPaid ? 'error' : ''}
              />
              {errors.amtPaid && <span className="error-message">{errors.amtPaid}</span>}
            </div>

            {formData.totalAmt && formData.amtPaid && (
              <div className="form-group balance-display">
                <label>Balance Amount</label>
                <div className="balance-value">
                  ₹{(parseFloat(formData.totalAmt) - parseFloat(formData.amtPaid)).toFixed(2)}
                </div>
              </div>
            )}
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn-cancel"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-submit"
              disabled={loading}
            >
              {loading ? 'Submitting...' : clientData ? 'Update Client' : 'Add Client'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ClientFormModal;


