import '../styles/StockViewModal.css';

function StockViewModal({ isOpen, onClose, stock = null }){
  if(!isOpen || !stock) return null;
  const fmt = v=> v!=null ? `₹${parseFloat(v).toLocaleString('en-IN',{minimumFractionDigits:2})}`:'₹0.00';
  const fmtDate = d=> d? new Date(d).toLocaleDateString('en-IN'):'-';
  return (
    <div className="sv-overlay" onClick={onClose}>
      <div className="sv-content" onClick={(e)=>e.stopPropagation()}>
        <div className="sv-header"><h2>Stock Details {stock.seq? `#${stock.seq}` : ''}</h2><button className="sv-close" onClick={onClose}>✕</button></div>
        <div className="sv-body">
          <div className="section"><h3>Item</h3><p><strong>{stock.itemName}</strong> - {stock.quality}</p></div>
          <div className="section grid">
            <div><label>Category</label><p>{stock.itemCategory}</p></div>
            <div><label>Unit</label><p>{stock.stockUnit}</p></div>
            <div><label>Total</label><p>{stock.totalStock}</p></div>
            <div><label>Used</label><p>{stock.usedStock}</p></div>
            <div><label>Remaining</label><p>{stock.remainingStock}</p></div>
            <div><label>Purchased Price</label><p>{fmt(stock.purchasedPricePerUnit)}</p></div>
            <div><label>Selling Price</label><p>{fmt(stock.sellingPricePerUnit)}</p></div>
            <div><label>Added</label><p>{fmtDate(stock.stockAddedDate)}</p></div>
            <div><label>Status</label><p>{stock.status}</p></div>
          </div>
          {stock.notes && <div className="section"><h3>Notes</h3><p>{stock.notes}</p></div>}
        </div>
        <div className="sv-footer"><button className="btn-close" onClick={onClose}>Close</button></div>
      </div>
    </div>
  );
}

export default StockViewModal;

