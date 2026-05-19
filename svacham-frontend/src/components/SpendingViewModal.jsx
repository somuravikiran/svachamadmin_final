import '../styles/SpendingViewModal.css';

function SpendingViewModal({ isOpen, onClose, spending = null }){
  if(!isOpen || !spending) return null;
  const fmt = v=> v? `₹${parseFloat(v).toLocaleString('en-IN',{minimumFractionDigits:2})}`:'₹0.00';
  const fmtDate = d=> d? new Date(d).toLocaleDateString('en-IN'):'-';
  return (
    <div className="ov-overlay" onClick={onClose}>
      <div className="ov-content" onClick={(e)=>e.stopPropagation()}>
        <div className="ov-header"><h2>Spending Details {spending.seq? `#${spending.seq}` : ''}</h2><button className="ov-close" onClick={onClose}>✕</button></div>
        <div className="ov-body">
          <div className="section"><h3>Item</h3><p><strong>{spending.itemName}</strong> ({spending.itemCategory})</p></div>
          <div className="section grid">
            <div><label>Vendor</label><p>{spending.vendorName}</p></div>
            <div><label>Spent Date</label><p>{fmtDate(spending.spentDate)}</p></div>
            <div><label>Amount</label><p>{fmt(spending.amt)}</p></div>
            <div><label>Payment Mode</label><p>{spending.paymentMode}</p></div>
            <div><label>Status</label><p>{spending.status}</p></div>
          </div>
          {spending.description && <div className="section"><h3>Description</h3><p>{spending.description}</p></div>}
        </div>
        <div className="ov-footer"><button className="btn-close" onClick={onClose}>Close</button></div>
      </div>
    </div>
  );
}

export default SpendingViewModal;

