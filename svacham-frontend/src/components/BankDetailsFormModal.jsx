import { useState, useEffect } from 'react';
import '../styles/OrderFormModal.css';

function BankDetailsFormModal({ isOpen, onClose, onSubmit, bankData = null }){
  const empty = { holderName:'', bankName:'', last4Acc:'', amtCredited:'', amtDeposited:'', accountBal:'', notes:'' };
  const [form,setForm]=useState(empty);
  const [errors,setErrors]=useState({});
  const [loading,setLoading]=useState(false);

  useEffect(()=>{
    if(bankData){
      setForm({
        holderName: bankData.holderName||'',
        bankName: bankData.bankName||'',
        last4Acc: bankData.last4Acc||'',
        amtCredited: bankData.amtCredited||'',
        amtDeposited: bankData.amtDeposited||'',
        accountBal: bankData.accountBal||'',
        notes: bankData.notes||''
      });
    } else setForm(empty);
    setErrors({});
  },[bankData,isOpen]);

  const validate = ()=>{
    const e = {};
    if(!form.holderName || !form.holderName.trim()) e.holderName='Holder name required';
    if(!form.bankName || !form.bankName.trim()) e.bankName='Bank name required';
    if(!form.last4Acc || !/^[0-9]{4}$/.test(form.last4Acc)) e.last4Acc='Last 4 account digits required';
    if(form.amtCredited==='' || isNaN(form.amtCredited) || parseFloat(form.amtCredited)<0) e.amtCredited='Amount credited must be >=0';
    if(form.amtDeposited==='' || isNaN(form.amtDeposited) || parseFloat(form.amtDeposited)<0) e.amtDeposited='Amount deposited must be >=0';
    setErrors(e);
    return Object.keys(e).length===0;
  };

  const handleSubmit = async (ev)=>{
    ev.preventDefault();
    if(!validate()) return;
    setLoading(true);
    try{
      await onSubmit({
        holderName: form.holderName,
        bankName: form.bankName,
        last4Acc: form.last4Acc,
        amtCredited: parseFloat(form.amtCredited)||0,
        amtDeposited: parseFloat(form.amtDeposited)||0,
        notes: form.notes
      }, bankData?.seq);
      onClose();
    }catch(err){ console.error(err); }
    finally{ setLoading(false); }
  };

  if(!isOpen) return null;

  return (
    <div className="order-modal-overlay" onClick={onClose}>
      <div className="order-modal-content" onClick={(e)=>e.stopPropagation()}>
        <div className="order-modal-header"><h2>{bankData? 'Edit Account':'Add Account'}</h2><button className="order-close" onClick={onClose}>✕</button></div>
        <form className="order-form" onSubmit={handleSubmit}>
          <div className="order-grid">
            <div className="form-group"><label>Holder Name *</label><input value={form.holderName} onChange={e=>setForm(f=>({...f, holderName: e.target.value}))} /><div className="error-message">{errors.holderName}</div></div>
            <div className="form-group"><label>Bank Name *</label><input value={form.bankName} onChange={e=>setForm(f=>({...f, bankName: e.target.value}))} /><div className="error-message">{errors.bankName}</div></div>
            <div className="form-group"><label>Last4Acc *</label><input value={form.last4Acc} onChange={e=>setForm(f=>({...f, last4Acc: e.target.value}))} /><div className="error-message">{errors.last4Acc}</div></div>
            <div className="form-group"><label>Amt Credited *</label><input type="number" step="0.01" value={form.amtCredited} onChange={e=>setForm(f=>({...f, amtCredited: e.target.value}))} /><div className="error-message">{errors.amtCredited}</div></div>
            <div className="form-group"><label>Amt Deposited *</label><input type="number" step="0.01" value={form.amtDeposited} onChange={e=>setForm(f=>({...f, amtDeposited: e.target.value}))} /><div className="error-message">{errors.amtDeposited}</div></div>
            <div className="form-group full-width"><label>Notes</label><input value={form.notes} onChange={e=>setForm(f=>({...f, notes: e.target.value}))} /></div>
          </div>

          <div className="modal-footer"><button type="button" className="btn-cancel" onClick={onClose} disabled={loading}>Cancel</button><button type="submit" className="btn-submit" disabled={loading}>{loading? 'Saving...': (bankData? 'Update':'Add Account')}</button></div>
        </form>
      </div>
    </div>
  );
}

export default BankDetailsFormModal;

