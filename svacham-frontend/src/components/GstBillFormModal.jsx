import { useState, useEffect } from 'react';
import '../styles/GstBillFormModal.css';

function GstBillFormModal({ isOpen, onClose, onSubmit, billData = null }) {
  const [form, setForm] = useState({
    vendorName: '',
    billNumber: '',
    gstNumber: '',
    billAmt: '',
    gstPercentage: '',
    billDate: '',
    paymentMethod: '',
    status: '',
    notes: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (billData) {
      setForm({
        vendorName: billData.vendorName || '',
        billNumber: billData.billNumber || '',
        gstNumber: billData.gstNumber || '',
        billAmt: billData.billAmt || '',
        gstPercentage: billData.gstPercentage || '',
        billDate: billData.billDate || '',
        paymentMethod: billData.paymentMethod || '',
        status: billData.status || '',
        notes: billData.notes || ''
      });
    } else {
      setForm({
        vendorName: '', billNumber: '', gstNumber: '', billAmt: '', gstPercentage: '', billDate: '', paymentMethod: '', status: '', notes: ''
      });
    }
    setErrors({});
  }, [billData, isOpen]);

  const validate = () => {
    const e = {};
    if (!form.vendorName.trim()) e.vendorName = 'Vendor name is required';
    if (!form.billNumber.trim()) e.billNumber = 'Bill number is required';
    if (!form.gstNumber.trim()) e.gstNumber = 'GST number is required';
    else if (!/^[0-9A-Z]{15}$/i.test(form.gstNumber)) e.gstNumber = 'GST must be 15 alphanumeric characters';
    if (!form.billAmt || isNaN(form.billAmt) || parseFloat(form.billAmt) <= 0) e.billAmt = 'Bill amount must be greater than 0';
    if (form.gstPercentage === '' || isNaN(form.gstPercentage) || parseFloat(form.gstPercentage) < 0 || parseFloat(form.gstPercentage) > 100) e.gstPercentage = 'GST % must be between 0 and 100';
    if (!form.billDate) e.billDate = 'Bill date is required';
    if (!form.paymentMethod.trim() || !/^(card|upi|cash|online)$/i.test(form.paymentMethod)) e.paymentMethod = 'Payment method must be card, upi, cash or online';
    if (!form.status.trim() || !/^(paid|pending|partial)$/i.test(form.status)) e.status = 'Status must be paid, pending or partial';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: '' }));
  };

  const gstAmount = () => {
    const a = parseFloat(form.billAmt) || 0;
    const p = parseFloat(form.gstPercentage) || 0;
    return (a * p) / 100;
  };

  const totalAmount = () => {
    return (parseFloat(form.billAmt) || 0) + gstAmount();
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await onSubmit(form, billData?.id);
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{billData ? 'Edit GST Bill' : 'Add GST Bill'}</h2>
          <button className="modal-close-btn" onClick={onClose}>✕</button>
        </div>
        <form className="gst-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label>Vendor Name *</label>
              <input name="vendorName" value={form.vendorName} onChange={handleChange} />
              {errors.vendorName && <div className="error-message">{errors.vendorName}</div>}
            </div>

            <div className="form-group">
              <label>Bill Number *</label>
              <input name="billNumber" value={form.billNumber} onChange={handleChange} />
              {errors.billNumber && <div className="error-message">{errors.billNumber}</div>}
            </div>

            <div className="form-group">
              <label>GST Number *</label>
              <input name="gstNumber" value={form.gstNumber} onChange={(e)=> setForm(f=>({...f, gstNumber: e.target.value.toUpperCase()}))} />
              {errors.gstNumber && <div className="error-message">{errors.gstNumber}</div>}
            </div>

            <div className="form-group">
              <label>Bill Amount *</label>
              <input name="billAmt" type="number" step="0.01" value={form.billAmt} onChange={handleChange} />
              {errors.billAmt && <div className="error-message">{errors.billAmt}</div>}
            </div>

            <div className="form-group">
              <label>GST % *</label>
              <input name="gstPercentage" type="number" step="0.01" value={form.gstPercentage} onChange={handleChange} />
              {errors.gstPercentage && <div className="error-message">{errors.gstPercentage}</div>}
            </div>

            <div className="form-group">
              <label>Bill Date *</label>
              <input name="billDate" type="date" value={form.billDate} onChange={handleChange} />
              {errors.billDate && <div className="error-message">{errors.billDate}</div>}
            </div>

            <div className="form-group">
              <label>Payment Method *</label>
              <select name="paymentMethod" value={form.paymentMethod} onChange={handleChange}>
                <option value="">Select</option>
                <option value="card">Card</option>
                <option value="upi">UPI</option>
                <option value="cash">Cash</option>
                <option value="online">Online</option>
              </select>
              {errors.paymentMethod && <div className="error-message">{errors.paymentMethod}</div>}
            </div>

            <div className="form-group">
              <label>Status *</label>
              <select name="status" value={form.status} onChange={handleChange}>
                <option value="">Select</option>
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="partial">Partial</option>
              </select>
              {errors.status && <div className="error-message">{errors.status}</div>}
            </div>

            <div className="form-group full-width">
              <label>Notes</label>
              <textarea name="notes" value={form.notes} onChange={handleChange} rows={3} />
            </div>

            <div className="form-group balance-display">
              <label>GST Amount</label>
              <div className="balance-value">₹{gstAmount().toFixed(2)}</div>
            </div>

            <div className="form-group balance-display">
              <label>Total Amount (incl. GST)</label>
              <div className="balance-value">₹{totalAmount().toFixed(2)}</div>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-cancel" onClick={onClose} disabled={loading}>Cancel</button>
            <button type="submit" className="btn-submit" disabled={loading}>{loading ? 'Saving...' : (billData ? 'Update' : 'Add')}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default GstBillFormModal;

