import '../styles/StockItemViewModal.css';

function StockItemViewModal({ isOpen, onClose, stockItem = null }){
  if(!isOpen || !stockItem) return null;
  return (
    <div className="sv-overlay" onClick={onClose}>
      <div className="sv-content" onClick={(e)=>e.stopPropagation()}>
        <div className="sv-header"><h2>Stock Item Details {stockItem.seq? `#${stockItem.seq}` : ''}</h2><button className="sv-close" onClick={onClose}>✕</button></div>
        <div className="sv-body">
          <div className="section"><h3>{stockItem.itemName}</h3><p>Category: {stockItem.itemCategory}</p></div>
          <div className="section grid">
            <div><label>Quantity</label><p>{stockItem.quantity}</p></div>
            <div><label>Total Stock</label><p>{stockItem.totalStock}</p></div>
            <div><label>Used Stock</label><p>{stockItem.usedStock}</p></div>
            <div><label>Remaining</label><p>{stockItem.remainingStock}</p></div>
            <div><label>Status</label><p>{stockItem.status}</p></div>
          </div>
          {stockItem.notes && <div className="section"><h3>Notes</h3><p>{stockItem.notes}</p></div>}
        </div>
        <div className="sv-footer"><button className="btn-close" onClick={onClose}>Close</button></div>
      </div>
    </div>
  );
}

export default StockItemViewModal;

