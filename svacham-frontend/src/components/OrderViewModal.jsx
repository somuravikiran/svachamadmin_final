import '../styles/OrderViewModal.css';

function OrderViewModal({ isOpen, onClose, order = null }){
  if(!isOpen || !order) return null;
  const fmt = v=> v? `₹${parseFloat(v).toLocaleString('en-IN',{minimumFractionDigits:2})}`:'₹0.00';
  const fmtDate = d=> d? new Date(d).toLocaleDateString('en-IN'):'-';
  return (
    <div className="ov-overlay" onClick={onClose}>
      <div className="ov-content" onClick={(e)=>e.stopPropagation()}>
        <div className="ov-header">
          <h2>Order Details</h2>
          <button className="ov-close" onClick={onClose}>✕</button>
        </div>
        <div className="ov-body">
          <div className="section"><h3>Client</h3>
            <p><strong>{order.clientName}</strong> ({order.clientId})</p>
          </div>
          <div className="section grid">
            <div><label>Order Date</label><p>{fmtDate(order.orderDate)}</p></div>
            <div><label>Delivery Date</label><p>{fmtDate(order.deliveryDate)}</p></div>
            <div><label>Total Amount</label><p>{fmt(order.totalAmt)}</p></div>
            <div><label>Paid Amount</label><p>{fmt(order.paidAmt)}</p></div>
            <div><label>Pending Amount</label><p>{fmt(order.pendingAmt)}</p></div>
            <div><label>Status</label><p>{order.orderStatus}</p></div>
          </div>

          <div className="section"><h3>Items</h3>
            <table className="items-table">
              <thead><tr><th>ItemId</th><th>Type</th><th>Pack Kg</th><th>Qty</th><th>Unit Price</th><th>Subtotal</th></tr></thead>
              <tbody>
                {order.items && order.items.map((it,idx)=> (
                  <tr key={idx}><td>{it.itemId}</td><td>{it.pickleType}</td><td>{it.packSizeInKg}</td><td>{it.quantity}</td><td>{fmt(it.unitPrice)}</td><td>{fmt(it.subtotal)}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="ov-footer"><button className="btn-close" onClick={onClose}>Close</button></div>
      </div>
    </div>
  );
}

export default OrderViewModal;
