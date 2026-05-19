import { useState, useEffect } from 'react';
import '../styles/OrderFormModal.css';

function SalaryFormModal({ isOpen, onClose, onSubmit, salaryData = null }){
  const empty = { employeeName:'', employeeRole:'', monthSalary:'', paidAmt:'', salaryMonth:'', paymentDate:'', paymentMode:'Cash', status:'paid', notes:'' };
  const [form,setForm]=useState(empty);
  const [errors,setErrors]=useState({});
  const [loading,setLoading]=useState(false);

  useEffect(()=>{
    if(salaryData){
      setForm({
        employeeName: salaryData.employeeName||'',
        employeeRole: salaryData.employeeRole||'',
        monthSalary: salaryData.monthSalary||'',
        paidAmt: salaryData.paidAmt||'',
        salaryMonth: salaryData.salaryMonth||'',
        paymentDate: salaryData.paymentDate||'',
        paymentMode: salaryData.paymentMode||'Cash',
        status: salaryData.status||'paid',
        notes: salaryData.notes||''
      });
    }else setForm(empty);
    setErrors({});
  },[salaryData,isOpen]);

  const validate = ()=>{
    const e = {};
    if(!form.employeeName || !form.employeeName.trim()) e.employeeName='Employee name required';
    if(!form.employeeRole || !form.employeeRole.trim()) e.employeeRole='Role required';
    if(form.monthSalary==='' || isNaN(form.monthSalary) || parseFloat(form.monthSalary)<0) e.monthSalary='Month salary must be >=0';
    if(form.paidAmt==='' || isNaN(form.paidAmt) || parseFloat(form.paidAmt)<0) e.paidAmt='Paid amount must be >=0';
    if(!form.salaryMonth || !form.salaryMonth.trim()) e.salaryMonth='Salary month required';
    if(!form.paymentDate) e.paymentDate='Payment date required';
    if(!form.paymentMode || !form.paymentMode.trim()) e.paymentMode='Payment mode required';
    if(!form.status || !form.status.trim()) e.status='Status required';
    setErrors(e);
    return Object.keys(e).length===0;
  };

  const balance = ()=>{
    const ms = parseFloat(form.monthSalary)||0; const p = parseFloat(form.paidAmt)||0; return (ms - p);
  };

  const handleSubmit = async (ev)=>{
    ev.preventDefault();
    if(!validate()) return;
    setLoading(true);
    try{
      await onSubmit({
        employeeName: form.employeeName,
        employeeRole: form.employeeRole,
        monthSalary: parseFloat(form.monthSalary)||0,
        paidAmt: parseFloat(form.paidAmt)||0,
        salaryMonth: form.salaryMonth,
        paymentDate: form.paymentDate,
        paymentMode: form.paymentMode,
        status: form.status,
        notes: form.notes
      }, salaryData?.id);
      onClose();
    }catch(err){ console.error(err); }
    finally{ setLoading(false); }
  };

  if(!isOpen) return null;

  return (
    <div className="order-modal-overlay" onClick={onClose}>
      <div className="order-modal-content" onClick={(e)=>e.stopPropagation()}>
        <div className="order-modal-header"><h2>{salaryData? 'Edit Salary':'Add Salary'}</h2><button className="order-close" onClick={onClose}>✕</button></div>
        <form className="order-form" onSubmit={handleSubmit}>
          <div className="order-grid">
            <div className="form-group"><label>Employee Name *</label><input value={form.employeeName} onChange={e=>setForm(f=>({...f, employeeName: e.target.value}))} /><div className="error-message">{errors.employeeName}</div></div>
            <div className="form-group"><label>Employee Role *</label><input value={form.employeeRole} onChange={e=>setForm(f=>({...f, employeeRole: e.target.value}))} /><div className="error-message">{errors.employeeRole}</div></div>
            <div className="form-group"><label>Month Salary *</label><input type="number" step="0.01" value={form.monthSalary} onChange={e=>setForm(f=>({...f, monthSalary: e.target.value}))} /><div className="error-message">{errors.monthSalary}</div></div>
            <div className="form-group"><label>Paid Amount *</label><input type="number" step="0.01" value={form.paidAmt} onChange={e=>setForm(f=>({...f, paidAmt: e.target.value}))} /><div className="error-message">{errors.paidAmt}</div></div>
            <div className="form-group"><label>Salary Month *</label><input type="month" value={form.salaryMonth} onChange={e=>setForm(f=>({...f, salaryMonth: e.target.value}))} /><div className="error-message">{errors.salaryMonth}</div></div>
            <div className="form-group"><label>Payment Date *</label><input type="date" value={form.paymentDate} onChange={e=>setForm(f=>({...f, paymentDate: e.target.value}))} /><div className="error-message">{errors.paymentDate}</div></div>
            <div className="form-group"><label>Payment Mode *</label><select value={form.paymentMode} onChange={e=>setForm(f=>({...f, paymentMode: e.target.value}))}><option>Cash</option><option>Bank Transfer</option><option>UPI</option><option>Cheque</option></select><div className="error-message">{errors.paymentMode}</div></div>
            <div className="form-group"><label>Status *</label><select value={form.status} onChange={e=>setForm(f=>({...f, status: e.target.value}))}><option value="paid">Paid</option><option value="partial">Partial</option><option value="pending">Pending</option></select><div className="error-message">{errors.status}</div></div>
            <div className="form-group full-width"><label>Notes</label><input value={form.notes} onChange={e=>setForm(f=>({...f, notes: e.target.value}))} /></div>

            <div className="form-group balance-display"><label>Balance</label><div className="balance-value">₹{balance().toFixed(2)}</div></div>
          </div>

          <div className="modal-footer"><button type="button" className="btn-cancel" onClick={onClose} disabled={loading}>Cancel</button><button type="submit" className="btn-submit" disabled={loading}>{loading? 'Saving...': (salaryData? 'Update':'Add Salary')}</button></div>
        </form>
      </div>
    </div>
  );
}

export default SalaryFormModal;

