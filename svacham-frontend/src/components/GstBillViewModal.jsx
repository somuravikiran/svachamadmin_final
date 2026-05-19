import '../styles/GstBillViewModal.css';

function GstBillViewModal({ isOpen, onClose, billData = null }) {
  if (!isOpen || !billData) return null;

  const fmtDate = (d)=>{
    if(!d) return 'N/A';
    const date = new Date(d);
    return date.toLocaleDateString('en-IN');
  }

  const fmtCurrency = (v)=> v ? `₹${parseFloat(v).toLocaleString('en-IN', {minimumFractionDigits:2})}` : '₹0.00';

  return (
    <div className="view-overlay" onClick={onClose}>
      <div className="view-content" onClick={(e)=>e.stopPropagation()}>
        <div className="view-header">
          <h2>GST Bill Details</h2>
          <button className="view-close" onClick={onClose}>✕</button>
        </div>
        <div className="view-body">
          <div className="section">
            <h3>Vendor & Bill</h3>
            <div className="grid">
              <div>
                <label>Vendor</label>
                <p>{billData.vendorName}</p>
              </div>
              <div>
                <label>Bill Number</label>
                <p>{billData.billNumber}</p>
              </div>
              <div>
                <label>GST Number</label>
                <p>{billData.gstNumber}</p>
              </div>
              <div>
                <label>Bill Date</label>
                <p>{fmtDate(billData.billDate)}</p>
              </div>
            </div>
          </div>

          <div className="section">
            <h3>Amounts</h3>
            <div className="grid">
              <div>
                <label>Bill Amount</label>
                <p>{fmtCurrency(billData.billAmt)}</p>
              </div>
              <div>
                <label>GST %</label>
                <p>{billData.gstPercentage}%</p>
              </div>
              <div>
                <label>GST Amount</label>
                <p>{fmtCurrency(billData.gstAmt)}</p>
              </div>
              <div>
                <label>Total (incl GST)</label>
                <p>{fmtCurrency(billData.totalAmt)}</p>
              </div>
            </div>
          </div>

          <div className="section">
            <h3>Payment & Status</h3>
            <div className="grid">
              <div>
                <label>Payment Method</label>
                <p>{billData.paymentMethod}</p>
              </div>
              <div>
                <label>Status</label>
                <p>{billData.status}</p>
              </div>
              <div className="full">
                <label>Notes</label>
                <p>{billData.notes || '—'}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="view-footer">
          <button className="btn-close" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default GstBillViewModal;

