import { useState, useEffect } from 'react';
import clientAPI from '../services/clientAPI';
import '../styles/OrderFormModal.css';

function OrderFormModal({ isOpen, onClose, onSubmit, orderData = null }) {
  const emptyItem = { itemId: '', pickleType: '', packSizeInKg: '', quantity: 1, unitPrice: '' };
  const [form, setForm] = useState({
    clientId: '',
    orderDate: '',
    deliveryDate: '',
    paidAmt: '',
    orderStatus: 'pending',
    items: [emptyItem]
  });
  const [clients, setClients] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // load clients for select
    (async () => {
      try {
        const data = await clientAPI.getAllClients();
        setClients(Array.isArray(data) ? data : []);
      } catch {
        setClients([]);
      }
    })();
  }, []);

  useEffect(() => {
    // create a local default item to avoid external dependency on emptyItem
    const defaultItem = { itemId: '', pickleType: '', packSizeInKg: '', quantity: 1, unitPrice: '' };
    const buildForm = () => {
      if (orderData) {
        return {
          clientId: orderData.clientId || '',
          orderDate: orderData.orderDate || '',
          deliveryDate: orderData.deliveryDate || '',
          paidAmt: orderData.paidAmt || '',
          orderStatus: orderData.orderStatus || 'pending',
          items: Array.isArray(orderData.items) && orderData.items.length ? orderData.items.map(i=>({ itemId: i.itemId||'', pickleType: i.pickleType||'', packSizeInKg: i.packSizeInKg||'', quantity: i.quantity||1, unitPrice: i.unitPrice||'' })) : [defaultItem]
        };
      }
      return { clientId: '', orderDate: '', deliveryDate: '', paidAmt: '', orderStatus: 'pending', items: [defaultItem] };
    };
    // avoid synchronous setState warning by scheduling update
    setTimeout(()=>{
      setForm(buildForm());
      setErrors({});
    },0);
  }, [orderData, isOpen]);

  const handleItemChange = (idx, name, value) => {
    setForm(prev => {
      const items = [...prev.items];
      items[idx] = { ...items[idx], [name]: value };
      return { ...prev, items };
    });
  };

  const addItem = () => setForm(p => ({ ...p, items: [...p.items, emptyItem] }));
  const removeItem = (idx) => setForm(p => ({ ...p, items: p.items.filter((_,i)=>i!==idx) }));

  const validate = () => {
    const e = {};
    if (!form.clientId) e.clientId = 'Client is required';
    if (!form.orderDate) e.orderDate = 'Order date required';
    if (form.paidAmt === '' || isNaN(form.paidAmt) || parseFloat(form.paidAmt) < 0) e.paidAmt = 'Paid amount must be >= 0';
    if (!form.items || form.items.length === 0) e.items = 'At least one item is required';
    else {
      form.items.forEach((it, idx) => {
        if (!it.itemId || !it.itemId.toString().trim()) e[`itemId_${idx}`] = 'Item id required';
        if (!it.pickleType || !it.pickleType.trim()) e[`pickleType_${idx}`] = 'Pickle type required';
        if (it.packSizeInKg === '' || isNaN(it.packSizeInKg) || parseFloat(it.packSizeInKg) < 0) e[`packSizeInKg_${idx}`] = 'Pack size required';
        if (!it.quantity || isNaN(it.quantity) || parseInt(it.quantity) < 1) e[`quantity_${idx}`] = 'Quantity >=1';
        if (it.unitPrice === '' || isNaN(it.unitPrice) || parseFloat(it.unitPrice) < 0) e[`unitPrice_${idx}`] = 'Unit price required';
      });
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const subtotalFor = (it) => {
    const q = parseFloat(it.quantity) || 0;
    const up = parseFloat(it.unitPrice) || 0;
    return q * up;
  };

  const totalAmount = () => form.items.reduce((s,it)=>s + subtotalFor(it), 0);
  const pendingAmt = () => totalAmount() - (parseFloat(form.paidAmt)||0);

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await onSubmit({
        clientId: form.clientId,
        orderDate: form.orderDate,
        deliveryDate: form.deliveryDate || null,
        paidAmt: parseFloat(form.paidAmt)||0,
        orderStatus: form.orderStatus,
        items: form.items.map(it=>({ itemId: it.itemId, pickleType: it.pickleType, packSizeInKg: parseFloat(it.packSizeInKg)||0, quantity: parseInt(it.quantity)||0, unitPrice: parseFloat(it.unitPrice)||0 }))
      }, orderData?.id);
      onClose();
    } catch (err) {
      console.error(err);
    } finally { setLoading(false); }
  };

  if (!isOpen) return null;

  return (
    <div className="order-modal-overlay" onClick={onClose}>
      <div className="order-modal-content" onClick={(e)=>e.stopPropagation()}>
        <div className="order-modal-header">
          <h2>{orderData? 'Edit Order' : 'Add Order'}</h2>
          <button className="order-close" onClick={onClose}>✕</button>
        </div>
        <form className="order-form" onSubmit={handleSubmit}>
          <div className="order-grid">
            <div className="form-group">
              <label>Client *</label>
              <select name="clientId" value={form.clientId} onChange={(e)=> setForm(f=>({...f, clientId: e.target.value}))}>
                <option value="">Select client</option>
                {clients.map(c=> <option key={c.id} value={c.id}>{c.clientName}</option>)}
              </select>
              {errors.clientId && <div className="error-message">{errors.clientId}</div>}
            </div>

            <div className="form-group">
              <label>Order Date *</label>
              <input type="date" name="orderDate" value={form.orderDate} onChange={(e)=>setForm(f=>({...f, orderDate: e.target.value}))} />
              {errors.orderDate && <div className="error-message">{errors.orderDate}</div>}
            </div>

            <div className="form-group">
              <label>Delivery Date</label>
              <input type="date" name="deliveryDate" value={form.deliveryDate} onChange={(e)=>setForm(f=>({...f, deliveryDate: e.target.value}))} />
            </div>

            <div className="form-group">
              <label>Paid Amount *</label>
              <input type="number" step="0.01" name="paidAmt" value={form.paidAmt} onChange={(e)=>setForm(f=>({...f, paidAmt: e.target.value}))} />
              {errors.paidAmt && <div className="error-message">{errors.paidAmt}</div>}
            </div>

            <div className="form-group">
              <label>Order Status *</label>
              <select name="orderStatus" value={form.orderStatus} onChange={(e)=>setForm(f=>({...f, orderStatus: e.target.value}))}>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div className="form-group full-width">
              <label>Items</label>
              <div className="items-list">
                {form.items.map((it,idx)=> (
                  <div className="item-row" key={idx}>
                    <input placeholder="Item Id" value={it.itemId} onChange={(e)=>handleItemChange(idx,'itemId',e.target.value)} />
                    <input placeholder="Pickle Type" value={it.pickleType} onChange={(e)=>handleItemChange(idx,'pickleType',e.target.value)} />
                    <input placeholder="Pack Kg" type="number" step="0.01" value={it.packSizeInKg} onChange={(e)=>handleItemChange(idx,'packSizeInKg',e.target.value)} />
                    <input placeholder="Qty" type="number" value={it.quantity} onChange={(e)=>handleItemChange(idx,'quantity',e.target.value)} />
                    <input placeholder="Unit Price" type="number" step="0.01" value={it.unitPrice} onChange={(e)=>handleItemChange(idx,'unitPrice',e.target.value)} />
                    <div className="subtotal">₹{subtotalFor(it).toFixed(2)}</div>
                    <button type="button" className="remove" onClick={()=>removeItem(idx)}>Remove</button>
                    {Object.keys(errors).filter(k=>k.endsWith(`_${idx}`)).map(k=> <div key={k} className="error-message">{errors[k]}</div>)}
                  </div>
                ))}
                <button type="button" className="add-item" onClick={addItem}>+ Add Item</button>
                {errors.items && <div className="error-message">{errors.items}</div>}
              </div>
            </div>

            <div className="form-group balance-display">
              <label>Total Amount</label>
              <div className="balance-value">₹{totalAmount().toFixed(2)}</div>
            </div>

            <div className="form-group balance-display">
              <label>Pending Amount</label>
              <div className="balance-value">₹{pendingAmt().toFixed(2)}</div>
            </div>

          </div>

          <div className="modal-footer">
            <button type="button" className="btn-cancel" onClick={onClose} disabled={loading}>Cancel</button>
            <button type="submit" className="btn-submit" disabled={loading}>{loading? 'Saving...': (orderData? 'Update':'Add Order')}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default OrderFormModal;

