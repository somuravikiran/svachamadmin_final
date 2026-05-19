import { useEffect, useState } from 'react';
import clientAPI from '../services/clientAPI';
import bankDetailsAPI from '../services/bankDetailsAPI';
import gstbillAPI from '../services/gstbillAPI';
import orderAPI from '../services/orderAPI';
import salaryAPI from '../services/salaryAPI';
import spendingAPI from '../services/spendingAPI';
import stockAPI from '../services/stockAPI';
import stockItemAPI from '../services/stockItemAPI';
import '../styles/Dashboard.css';

function Dashboard({ onNavigate }){
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(()=>{
    let mounted = true;
    // schedule to avoid setState-in-effect lint
    setTimeout(()=>{
      if(!mounted) return;
      setLoading(true);
      setError('');
    },0);

    const tasks = [
      { key: 'clients', fn: async ()=> { const all = await clientAPI.getAllClients(); return { count: Array.isArray(all)? all.length : (all?.totalClients || 0), raw: all }; } },
      { key: 'bankdetails', fn: async ()=> { try{ const s = await bankDetailsAPI.getSummary(); return { summary: s }; }catch{ const all = await bankDetailsAPI.getAllBankDetails(); return { count: Array.isArray(all)?all.length:0 }; } } },
      { key: 'gstbill', fn: async ()=> { try{ const s = await gstbillAPI.getSummary(); return { summary: s }; }catch{ const all = await gstbillAPI.getAllGstBills?.() || await gstbillAPI.getAll?.(); return { count: Array.isArray(all)?all.length: (all?.length||0) }; } } },
      { key: 'orders', fn: async ()=> { try{ const s = await orderAPI.getSummary(); return { summary: s }; }catch{ const all = await orderAPI.getAllOrders?.() || []; return { count: Array.isArray(all)?all.length:0 }; } } },
      { key: 'salary', fn: async ()=> { try{ const s = await salaryAPI.getSummary(); return { summary: s }; }catch{ const all = await salaryAPI.getAllSalaries?.() || []; return { count: Array.isArray(all)?all.length:0 }; } } },
      { key: 'spending', fn: async ()=> { try{ const s = await spendingAPI.getSummary(); return { summary: s }; }catch{ const all = await spendingAPI.getAllSpendings?.() || []; return { count: Array.isArray(all)?all.length:0 }; } } },
      { key: 'stock', fn: async ()=> { try{ const s = await stockAPI.getSummary(); return { summary: s }; }catch{ const all = await stockAPI.getAllStocks?.() || []; return { count: Array.isArray(all)?all.length:0 }; } } },
      { key: 'stockitem', fn: async ()=> { try{ const s = await stockItemAPI.getSummary(); return { summary: s }; }catch{ const all = await stockItemAPI.getAllStockItems?.() || []; return { count: Array.isArray(all)?all.length:0 }; } } },
    ];

    Promise.all(tasks.map(t=> t.fn().then(res => ({ key: t.key, res })).catch(()=> ({ key: t.key, err:true }))))
      .then(results=>{
        if(!mounted) return;
        const out = {};
        results.forEach(r=>{ out[r.key] = r.err? { error:true } : r.res; });
        setData(out);
      })
      .catch(()=>{ if(mounted) setError('Failed to load dashboard'); })
      .finally(()=>{ if(mounted) setLoading(false); });

    return ()=>{ mounted = false; }
  },[]);

  const icons = {
    clients: '👥',
    bankdetails: '🏦',
    gstbill: '🧾',
    orders: '📦',
    salary: '💰',
    spending: '💸',
    stock: '📊',
    stockitem: '📇'
  };

  const card = (title, key, value, subtitle) => (
    <div className="dash-card" onClick={()=> onNavigate && onNavigate(key)}>
      <div className="card-top">
        <div className="card-icon">{icons[key]}</div>
        <div className="card-title">{title}</div>
      </div>
      <div className="card-value">{value}</div>
      {subtitle && <div className="card-sub">{subtitle}</div>}
    </div>
  );

  return (
    <div className="dashboard-root">
      <h1>Dashboard</h1>
      {loading && <div className="loading">Loading...</div>}
      {error && <div className="alert error">{error}</div>}
      <div className="dashboard-grid">
        {card('Clients','clients', data.clients?.count ?? (data.clients?.raw?.length ?? '-'), 'Total clients')}
        {card('Bank Accounts','bankdetails', data.bankdetails?.summary?.totalAccounts ?? data.bankdetails?.count ?? '-', 'Accounts')}
        {card('GST Bills','gstbill', data.gstbill?.summary?.totalCount ?? data.gstbill?.count ?? '-', 'Invoices')}
        {card('Orders','order', data.orders?.summary?.totalOrders ?? data.orders?.count ?? '-', 'Orders')}
        {card('Salary','salary', data.salary?.summary?.totalRecords ?? data.salary?.count ?? '-', 'Records')}
        {card('Spending','spending', data.spending?.summary?.totalRecords ?? data.spending?.count ?? '-', 'Expenses')}
        {card('Stock','stock', data.stock?.summary?.totalRecords ?? data.stock?.count ?? '-', 'Entries')}
        {card('Stock Items','stockitem', data.stockitem?.summary?.totalItems ?? data.stockitem?.count ?? '-', 'Items')}
      </div>
    </div>
  );
}

export default Dashboard;

