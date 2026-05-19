import { useState, useEffect } from 'react';
import salaryAPI from '../services/salaryAPI';
import SalaryFormModal from './SalaryFormModal';
import SalaryViewModal from './SalaryViewModal';
import '../styles/SalaryList.css';

function SalaryList(){
  const [records,setRecords]=useState([]);
  const [loading,setLoading]=useState(false);
  const [showForm,setShowForm]=useState(false);
  const [editing,setEditing]=useState(null);
  const [showView,setShowView]=useState(false);
  const [selected,setSelected]=useState(null);
  const [search,setSearch]=useState('');
  const [filterStatus,setFilterStatus]=useState('');
  const [summary,setSummary]=useState(null);
  const [error,setError]=useState('');
  const [success,setSuccess]=useState('');

  const fetchRecords=async()=>{
    setLoading(true); setError('');
    try{ const data = await salaryAPI.getAllSalaries(); setRecords(Array.isArray(data)?data:[]);}catch(err){ console.error(err); setError('Failed to fetch salaries'); }finally{ setLoading(false); }
  };
  const fetchSummary=async()=>{ try{ const s = await salaryAPI.getSummary(); setSummary(s);}catch(err){ console.error(err); } };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(()=>{ fetchRecords(); fetchSummary(); },[]);

  const handleAdd=()=>{ setEditing(null); setShowForm(true);}
  const handleEdit=(r)=>{ setEditing(r); setShowForm(true);}
  const handleView=async(r)=>{ setLoading(true); try{ const fresh = await salaryAPI.getSalaryById(r.id); setSelected(fresh || r);}catch(err){ console.error(err); setSelected(r);}finally{ setLoading(false); setShowView(true);} };
  const handleDelete=async(id)=>{ if(!window.confirm('Delete this record?')) return; try{ await salaryAPI.deleteSalary(id); setSuccess('Deleted'); fetchRecords(); fetchSummary(); setTimeout(()=>setSuccess(''),3000);}catch(err){ console.error(err); setError('Delete failed'); }};
  const handleSubmit=async(form,id)=>{ try{ if(id) await salaryAPI.updateSalary(id,form); else await salaryAPI.createSalary(form); fetchRecords(); fetchSummary(); setTimeout(()=>setSuccess('Saved'),2000);}catch(err){ console.error(err); setError('Save failed'); }};

  const filtered = records.filter(r=>{
    const matches = !search || (r.employeeName && r.employeeName.toLowerCase().includes(search.toLowerCase())) || (r.id && r.id.includes(search));
    const matchesStatus = !filterStatus || r.status===filterStatus;
    return matches && matchesStatus;
  });

  const fmt = v=> v? `₹${parseFloat(v).toLocaleString('en-IN',{minimumFractionDigits:2})}`:'₹0.00';
  const fmtDate = d=> d? new Date(d).toLocaleDateString('en-IN'):'-';

  return (
    <div className="salary-container">
      <div className="salary-header">
        <div><h1>Salaries</h1><p>Manage employee salary records</p></div>
        <div style={{display:'flex',gap:'0.5rem'}}>
          <button className="btn-add" onClick={handleAdd}>➕ Add Salary</button>
        </div>
      </div>

      {summary && <div className="salary-summary"><div className="card"><h4>Total Records</h4><p>{summary.totalRecords||0}</p></div><div className="card"><h4>Total Month Salary</h4><p>{fmt(summary.totalMonthSalary)}</p></div><div className="card"><h4>Total Paid</h4><p>{fmt(summary.totalPaid)}</p></div><div className="card"><h4>Total Balance</h4><p>{fmt(summary.totalBalance)}</p></div></div>}

      {error && <div className="alert error">{error}</div>}
      {success && <div className="alert success">{success}</div>}

      <div className="filters"><input placeholder="Search employee or id" value={search} onChange={e=>setSearch(e.target.value)} /><select value={filterStatus} onChange={e=>setFilterStatus(e.target.value)}><option value="">All Status</option><option value="paid">Paid</option><option value="partial">Partial</option><option value="pending">Pending</option></select></div>

      <div className="table-wrap">{loading? <div className="loading">Loading...</div> : (
        <table className="salary-table"><thead><tr><th>ID</th><th>Employee</th><th>Role</th><th>Salary Month</th><th>Payment Date</th><th>Month Salary</th><th>Paid</th><th>Balance</th><th>Status</th><th>Actions</th></tr></thead>
        <tbody>{filtered.map(r=> (
          <tr key={r.id}><td>{r.id}</td><td>{r.employeeName}</td><td>{r.employeeRole}</td><td>{r.salaryMonth}</td><td>{fmtDate(r.paymentDate)}</td><td>{fmt(r.monthSalary)}</td><td>{fmt(r.paidAmt)}</td><td>{fmt(r.balanceAmt)}</td><td><span className={`status ${r.status}`}>{r.status}</span></td><td className="actions"><button className="act view" onClick={()=>handleView(r)}>👁️ View</button><button className="act edit" onClick={()=>handleEdit(r)}>✏️ Edit</button><button className="act del" onClick={()=>handleDelete(r.id)}>🗑️ Delete</button></td></tr>
        ))}</tbody></table>)}</div>

      <SalaryFormModal isOpen={showForm} onClose={()=>setShowForm(false)} onSubmit={handleSubmit} salaryData={editing} />
      <SalaryViewModal isOpen={showView} onClose={()=>setShowView(false)} salary={selected} />
    </div>
  );
}

export default SalaryList;

