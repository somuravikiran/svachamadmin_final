import { useState } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import ClientList from './components/ClientList'
import GstBillList from './components/GstBillList'
import OrderList from './components/OrderList'
import SalaryList from './components/SalaryList'
import SpendingList from './components/SpendingList'
import StockList from './components/StockList'
import StockItemList from './components/StockItemList'
import BankDetailsList from './components/BankDetailsList'
import Dashboard from './components/Dashboard'
import './App.css'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState('dashboard')

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const handleCloseSidebar = () => {
    setSidebarOpen(false)
  }

  const handleNavigate = (page) => {
    setCurrentPage(page)
    setSidebarOpen(false)
  }

  return (
    <div className="app-container">
      <Navbar onToggleSidebar={handleToggleSidebar} />
      <Sidebar isOpen={sidebarOpen} onClose={handleCloseSidebar} onNavigate={handleNavigate} />
      <main className="main-content">
        {currentPage === 'dashboard' && <Dashboard onNavigate={handleNavigate} />}

        {currentPage === 'clients' && <ClientList />}
        {currentPage === 'gstbill' && <GstBillList />}
        {currentPage === 'order' && <OrderList />}
        {currentPage === 'salary' && <SalaryList />}
        {currentPage === 'spending' && <SpendingList />}
        {currentPage === 'stock' && <StockList />}
        {currentPage === 'stockitem' && <StockItemList />}
        {currentPage === 'bankdetails' && <BankDetailsList />}
      </main>
    </div>
  )
}

export default App
