import React, { useState, useEffect, useCallback } from "react";
// import { useAuth } from "../../hooks/useAuth";
// import apiService from "../../services/apiService";
import './Accounts.css';
import '../AdminTheme.css';

export default function Accounts() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [showTransactionDetail, setShowTransactionDetail] = useState(false);
  const [transactions, setTransactions] = useState([]);


  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Invalid Date";
    return date.toLocaleDateString();
  };

  const handleSummaryCardClick = (type) => {
    // For now, just log the click - can be extended later
    console.log("Summary card clicked:", type);
  };

  const tableHeaderStyle = {
    padding: '12px 24px',
    textAlign: 'left',
    fontSize: '12px',
    fontWeight: '500',
    color: '#6b7280',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    borderBottom: '1px solid #e5e7eb'
  };

  const tableCellStyle = {
    padding: '16px 24px',
    fontSize: '14px',
    color: '#1f2937',
    borderBottom: '1px solid #f3f4f6'
  };

  const tableRowStyle = {
    transition: 'background-color 0.2s ease',
    cursor: 'pointer'
  };

const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
    thisMonthIncome: 0,
    thisMonthExpense: 0
  });

// useEffect(() => {
//   // Fetch summary from backend (disabled for demo)
// }, []);


 const filteredTransactions = transactions.filter(transaction => {
    if (!transaction) return false;
    
    const matchesSearch = 
      (transaction.description || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (transaction.transactionId || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (transaction.vendorName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (transaction.flatNumber || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (transaction.receiptNumber || '').toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === 'all' || transaction.type === filterType;
    const matchesCategory = filterCategory === 'all' || transaction.category === filterCategory;
    
    return matchesSearch && matchesType && matchesCategory;
  });


  // useEffect(() => {
  //   // Fetch transactions from backend (disabled for demo)
  // }, []);


const [newTransaction, setNewTransaction] = useState({
    type: 'income',
    category: 'maintenance',
    amount: '',
    description: '',
    paymentMethod: 'cash',
    buildingNumber: '',
    blockNumber: '',
    flatNumber: '',
    receiptNumber: '',
    invoiceNumber: '',
    vendorName: '',
    vendorContact: '',
    remarks: ''
  });

  // validateForm already defined above, so remove this duplicate.




  useEffect(() => {
    const calculateSummary = () => {
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();
      
      let totalIncome = 0;
      let totalExpense = 0;
      let thisMonthIncome = 0;
      let thisMonthExpense = 0;

      transactions.forEach(transaction => {
        if (!transaction || !transaction.date || !transaction.amount) return;
        
        const transactionDate = new Date(transaction.date);
        if (isNaN(transactionDate.getTime())) return; // Skip invalid dates
        
        const amount = parseFloat(transaction.amount) || 0;

        if (transaction.type === 'income') {
          totalIncome += amount;
          if (transactionDate.getMonth() === currentMonth && transactionDate.getFullYear() === currentYear) {
            thisMonthIncome += amount;
          }
        } else {
          totalExpense += amount;
          if (transactionDate.getMonth() === currentMonth && transactionDate.getFullYear() === currentYear) {
            thisMonthExpense += amount;
          }
        }
      });

      setSummary({
        totalIncome,
        totalExpense,
        balance: totalIncome - totalExpense,
        thisMonthIncome,
        thisMonthExpense
      });
    };

    calculateSummary();
  }, [transactions]);

  // Add sample data for demo (no backend)
  useEffect(() => {
    if (transactions.length === 0) {
      const sampleTransactions = [
        {
          id: 'TXN2024010001',
          transactionId: 'TXN2024010001',
          type: 'income',
          category: 'maintenance',
          description: 'Monthly maintenance fee - Block A',
          amount: 15000.00,
          date: '2024-01-15',
          paymentMethod: 'bank_transfer',
          buildingNumber: '1',
          blockNumber: 'A',
          flatNumber: 'A101',
          status: 'completed'
        },
        {
          id: 'TXN2024010002',
          transactionId: 'TXN2024010002',
          type: 'expense',
          category: 'utility',
          description: 'Electricity bill payment',
          amount: 5000.00,
          date: '2024-01-20',
          paymentMethod: 'online',
          vendorName: 'MSEB',
          status: 'completed'
        },
        {
          id: 'TXN2024010003',
          transactionId: 'TXN2024010003',
          type: 'income',
          category: 'maintenance',
          description: 'Monthly maintenance fee - Block B',
          amount: 12000.00,
          date: '2024-01-25',
          paymentMethod: 'cash',
          buildingNumber: '1',
          blockNumber: 'B',
          flatNumber: 'B205',
          status: 'completed'
        },
        {
          id: 'TXN2024010004',
          transactionId: 'TXN2024010004',
          type: 'expense',
          category: 'repair',
          description: 'Plumbing repair - Common area',
          amount: 8000.00,
          date: '2024-01-25',
          paymentMethod: 'cheque',
          vendorName: 'ABC Plumbers',
          status: 'completed'
        }
      ];
      setTransactions(sampleTransactions);
    }
  }, [transactions.length]);

  // const fetchTransactions = useCallback(async () => {
  //   // Fetch from backend (disabled for demo)
  // }, []);

  const validateForm = () => {
    const requiredFields = {
      type: 'Transaction Type',
      category: 'Category',
      amount: 'Amount',
      description: 'Description',
      paymentMethod: 'Payment Method'
    };
    // Add conditional required fields based on transaction type
    if (newTransaction.type === 'expense') {
      if (["utility", "repair", "purchase"].includes(newTransaction.category)) {
        requiredFields.vendorName = 'Vendor Name';
      }
    }
    // For income transactions, building/flat info is usually required
    if (newTransaction.type === 'income' && newTransaction.category === 'maintenance') {
      requiredFields.buildingNumber = 'Building Number';
      requiredFields.blockNumber = 'Block Number';
      requiredFields.flatNumber = 'Flat Number';
    }
    const missingFields = [];
    Object.keys(requiredFields).forEach(field => {
      if (!newTransaction[field] || newTransaction[field].toString().trim() === '') {
        missingFields.push(requiredFields[field]);
      }
    });
    // Validate amount is a positive number
    if (newTransaction.amount && (isNaN(newTransaction.amount) || parseFloat(newTransaction.amount) <= 0)) {
      missingFields.push('Amount (must be a positive number)');
    }
    return missingFields;
  };

  const handleAddTransaction = (e) => {
    e.preventDefault();
    // Validate required fields
    const missingFields = validateForm();
    if (missingFields.length > 0) {
      alert(`Please fill in the following required fields:\n\n${missingFields.join('\n')}`);
      return;
    }
    const transactionData = {
      ...newTransaction,
      amount: parseFloat(newTransaction.amount),
      date: new Date().toISOString().split('T')[0],
      transactionId: `TXN${Date.now()}`,
      status: 'completed'
    };
    setTransactions(prev => [transactionData, ...prev]);
    setShowAddModal(false);
    setNewTransaction({
      type: 'income',
      category: 'maintenance',
      amount: '',
      description: '',
      paymentMethod: 'cash',
      buildingNumber: '',
      blockNumber: '',
      flatNumber: '',
      receiptNumber: '',
      invoiceNumber: '',
      vendorName: '',
      vendorContact: '',
      remarks: ''
    });
    alert('Transaction added successfully!');
  };

  <form onSubmit={handleAddTransaction} style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
  <div>
    <label>Type:</label>
    <select
      value={newTransaction.type}
      onChange={e => setNewTransaction({ ...newTransaction, type: e.target.value })}
      required
    >
      <option value="income">Income</option>
      <option value="expense">Expense</option>
    </select>
  </div>
  <div>
    <label>Category:</label>
    <select
      value={newTransaction.category}
      onChange={e => setNewTransaction({ ...newTransaction, category: e.target.value })}
      required
    >
      <option value="maintenance">Maintenance</option>
      <option value="utility">Utility</option>
      <option value="repair">Repair</option>
      <option value="salary">Salary</option>
      <option value="purchase">Purchase</option>
      <option value="security">Security</option>
      <option value="cleaning">Cleaning</option>
      <option value="gardening">Gardening</option>
      <option value="festive">Festive</option>
      <option value="donation">Donation</option>
      <option value="penalty">Penalty</option>
      <option value="other">Other</option>
    </select>
  </div>
  <div>
    <label>Amount:</label>
    <input
      type="number"
      value={newTransaction.amount}
      onChange={e => setNewTransaction({ ...newTransaction, amount: e.target.value })}
      required
      min="0"
      step="0.01"
    />
  </div>
  <div>
    <label>Description:</label>
    <input
      type="text"
      value={newTransaction.description}
      onChange={e => setNewTransaction({ ...newTransaction, description: e.target.value })}
      required
    />
  </div>
  <div>
    <label>Payment Method:</label>
    <select
      value={newTransaction.paymentMethod}
      onChange={e => setNewTransaction({ ...newTransaction, paymentMethod: e.target.value })}
      required
    >
      <option value="cash">Cash</option>
      <option value="cheque">Cheque</option>
      <option value="online">Online</option>
      <option value="bank_transfer">Bank Transfer</option>
      <option value="upi">UPI</option>
    </select>
  </div>
  {/* Optional fields for income/maintenance */}
  {newTransaction.type === 'income' && newTransaction.category === 'maintenance' && (
    <>
      <div>
        <label>Building Number:</label>
        <input
          type="text"
          value={newTransaction.buildingNumber}
          onChange={e => setNewTransaction({ ...newTransaction, buildingNumber: e.target.value })}
          required
        />
      </div>
      <div>
        <label>Block Number:</label>
        <input
          type="text"
          value={newTransaction.blockNumber}
          onChange={e => setNewTransaction({ ...newTransaction, blockNumber: e.target.value })}
          required
        />
      </div>
      <div>
        <label>Flat Number:</label>
        <input
          type="text"
          value={newTransaction.flatNumber}
          onChange={e => setNewTransaction({ ...newTransaction, flatNumber: e.target.value })}
          required
        />
      </div>
    </>
  )}
  {/* Optional fields for expense/vendor */}
  {newTransaction.type === 'expense' && ['utility', 'repair', 'purchase'].includes(newTransaction.category) && (
    <>
      <div>
        <label>Vendor Name:</label>
        <input
          type="text"
          value={newTransaction.vendorName}
          onChange={e => setNewTransaction({ ...newTransaction, vendorName: e.target.value })}
          required
        />
      </div>
      <div>
        <label>Vendor Contact:</label>
        <input
          type="text"
          value={newTransaction.vendorContact}
          onChange={e => setNewTransaction({ ...newTransaction, vendorContact: e.target.value })}
        />
      </div>
    </>
  )}
  <div>
    <label>Receipt Number:</label>
    <input
      type="text"
      value={newTransaction.receiptNumber}
      onChange={e => setNewTransaction({ ...newTransaction, receiptNumber: e.target.value })}
    />
  </div>
  <div>
    <label>Invoice Number:</label>
    <input
      type="text"
      value={newTransaction.invoiceNumber}
      onChange={e => setNewTransaction({ ...newTransaction, invoiceNumber: e.target.value })}
    />
  </div>
  <div>
    <label>Remarks:</label>
    <input
      type="text"
      value={newTransaction.remarks}
      onChange={e => setNewTransaction({ ...newTransaction, remarks: e.target.value })}
    />
  </div>
  <button type="submit" style={{ background: '#3b82f6', color: 'white', padding: '10px', borderRadius: '8px', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>
    Add Transaction
  </button>
</form>

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        padding: "20px",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "12px",
            padding: "20px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            marginBottom: "20px",
          }}
        >
          {/* Header */}
          <div style={{ marginBottom: "30px" }}>
            <h1
              style={{
                fontSize: "2.5rem",
                fontWeight: "bold",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                marginBottom: "10px",
              }}
            >
              Accounts & Finance
            </h1>
            <p style={{ color: "#666", fontSize: "1rem" }}>
              Manage society finances and track all transactions
            </p>
          </div>

          {/* Summary Cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "20px",
              marginBottom: "30px",
            }}
          >
            <div
              style={{
                backgroundColor: "white",
                borderRadius: "12px",
                padding: "20px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                borderLeft: "4px solid #10b981",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <div
                  style={{
                    padding: "10px",
                    backgroundColor: "#d1fae5",
                    borderRadius: "10px",
                    marginRight: "15px",
                  }}
                >
                  <svg
                    style={{ height: "32px", width: "32px", color: "#10b981" }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </div>
                <div>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "#666",
                      margin: "0 0 5px 0",
                    }}
                  >
                    Total Income
                  </p>
                  <p
                    style={{
                      fontSize: "24px",
                      fontWeight: "bold",
                      color: "#10b981",
                      margin: 0,
                    }}
                  >
                    {formatCurrency(summary.totalIncome)}
                  </p>
                </div>
              </div>
            </div>

            <div
              style={{
                backgroundColor: "white",
                borderRadius: "12px",
                padding: "20px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                borderLeft: "4px solid #ef4444",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <div
                  style={{
                    padding: "10px",
                    backgroundColor: "#fee2e2",
                    borderRadius: "10px",
                    marginRight: "15px",
                  }}
                >
                  <svg
                    style={{ height: "32px", width: "32px", color: "#ef4444" }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 12H4"
                    />
                  </svg>
                </div>
                <div>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "#666",
                      margin: "0 0 5px 0",
                    }}
                  >
                    Total Expense
                  </p>
                  <p
                    style={{
                      fontSize: "24px",
                      fontWeight: "bold",
                      color: "#ef4444",
                      margin: 0,
                    }}
                  >
                    {formatCurrency(summary.totalExpense)}
                  </p>
                </div>
              </div>
            </div>

            <div
              style={{
                backgroundColor: "white",
                borderRadius: "12px",
                padding: "20px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                borderLeft: "4px solid #3b82f6",
                cursor: "pointer",
                transition: "transform 0.2s ease",
              }}
              onClick={() => handleSummaryCardClick("balance")}
              onMouseEnter={(e) => (e.target.style.transform = "scale(1.02)")}
              onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <div
                  style={{
                    padding: "10px",
                    backgroundColor: "#dbeafe",
                    borderRadius: "10px",
                    marginRight: "15px",
                  }}
                >
                  <svg
                    style={{ height: "32px", width: "32px", color: "#3b82f6" }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <div>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "#666",
                      margin: "0 0 5px 0",
                    }}
                  >
                    Current Balance
                  </p>
                  <p
                    style={{
                      fontSize: "24px",
                      fontWeight: "bold",
                      color: summary.balance >= 0 ? "#10b981" : "#ef4444",
                      margin: 0,
                    }}
                  >
                    {formatCurrency(summary.balance)}
                  </p>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#3b82f6",
                      margin: "5px 0 0 0",
                    }}
                  >
                    Click to add money
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons and Filters */}
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "12px",
              padding: "20px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: window.innerWidth < 768 ? "column" : "row",
                gap: "15px",
                marginBottom: "20px",
              }}
            >
              <div style={{ flex: 1 }}>
                <input
                  type="text"
                  placeholder="Search transactions..."
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    border: "1px solid #d1d5db",
                    borderRadius: "8px",
                    fontSize: "14px",
                    outline: "none",
                    backgroundColor: "white",
                    color: "#1f2937",
                  }}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={(e) => (e.target.style.borderColor = "#3b82f6")}
                  onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
                />
              </div>
              <select
                style={{
                  padding: "12px 16px",
                  border: "1px solid #d1d5db",
                  borderRadius: "8px",
                  fontSize: "14px",
                  outline: "none",
                  backgroundColor: "white",
                  color: "#1f2937",
                  minWidth: "150px",
                }}
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                onFocus={(e) => (e.target.style.borderColor = "#3b82f6")}
                onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
              >
                <option value="all">All Types</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>

              <select
                style={{
                  padding: "12px 16px",
                  border: "1px solid #d1d5db",
                  borderRadius: "8px",
                  fontSize: "14px",
                  outline: "none",
                  backgroundColor: "white",
                  color: "#1f2937",
                  minWidth: "150px",
                }}
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                onFocus={(e) => (e.target.style.borderColor = "#3b82f6")}
                onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
              >
                <option value="all">All Categories</option>
                <option value="maintenance">Maintenance</option>
                <option value="utility">Utility</option>
                <option value="repair">Repair</option>
                <option value="salary">Salary</option>
                <option value="purchase">Purchase</option>
                <option value="security">Security</option>
                <option value="cleaning">Cleaning</option>
                <option value="gardening">Gardening</option>
                <option value="festive">Festive</option>
                <option value="donation">Donation</option>
                <option value="penalty">Penalty</option>
                <option value="other">Other</option>
              </select>

              <button
                type="button"
                onClick={() => setShowAddModal(true)}
                style={{
                  background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                  color: 'white',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  border: 'none',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={e => e.target.style.background = 'linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%)'}
                onMouseLeave={e => e.target.style.background = 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)'}
              >
                <svg style={{ height: '20px', width: '20px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Transaction
              </button>

              {showAddModal && (
                <div className="modal-overlay">
                  <div className="modal-content" style={{
                    position: 'relative',
                    width: '100%',
                    maxWidth: 820, // increased from 700
                    minWidth: 500, // increased from 420
                    minHeight: 600, // increased from 520
                    background: '#fff',
                    borderRadius: '28px', // slightly more rounded
                    boxShadow: '0 8px 32px rgba(0,0,0,0.14)',
                    padding: 0,
                    overflow: 'hidden',
                    border: '1px solid #e5e7eb'
                  }}>
                    <div style={{
                      background: '#f9fafb',
                      borderBottom: '1px solid #e5e7eb',
                      borderTopLeftRadius: '32px',
                      borderTopRightRadius: '32px',
                      padding: '40px 40px 16px 40px',
                      textAlign: 'center',
                    }}>
                      <button
                        type="button"
                        aria-label="Close"
                        onClick={() => setShowAddModal(false)}
                        style={{
                          position: 'absolute',
                          top: 18,
                          right: 24,
                          background: 'transparent',
                          border: 'none',
                          fontSize: 28,
                          fontWeight: 'bold',
                          color: '#888',
                          cursor: 'pointer',
                          zIndex: 2
                        }}
                      >
                        &times;
                      </button>
                      <h2 style={{
                        fontSize: '2.1rem',
                        fontWeight: 800,
                        margin: 0,
                        letterSpacing: 0.5,
                        color: '#2563eb', // blue-600
                        lineHeight: 1.15,
                        fontFamily: 'Inter, sans-serif',
                        textShadow: '0 1px 2px rgba(37,99,235,0.08)'
                      }}>Add Transaction</h2>
                      <div style={{
                        color: '#64748b', // slate-500
                        fontSize: '1.08rem',
                        marginTop: 8,
                        fontWeight: 500,
                        opacity: 0.95,
                        fontFamily: 'Inter, sans-serif'
                      }}>
                        Complete transaction details below
                      </div>
                    </div>
                    <form className="accounts-form" onSubmit={handleAddTransaction} style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 24, // slightly more gap
                      padding: '40px 40px 44px 40px', // more padding
                      background: 'transparent',
                      maxWidth: 600, // increased from 480
                      margin: '0 auto',
                      overflowY: 'auto',
                      maxHeight: '520px', // increased from 420
                      minHeight: '380px',
                      scrollbarWidth: 'thin',
                      scrollbarColor: '#cbd5e1 #f1f5f9'
                    }}>
                      <div className="form-group">
                        <label className="required-field">Type:</label>
                        <select
                          className="input"
                          style={{ fontSize: '1.18rem', height: 52, padding: '0 18px', borderRadius: '14px' }}
                          value={newTransaction.type}
                          onChange={e => setNewTransaction({ ...newTransaction, type: e.target.value })}
                          required
                        >
                          <option value="income">Income</option>
                          <option value="expense">Expense</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label className="required-field">Category:</label>
                        <select
                          className="input"
                          style={{ fontSize: '1.18rem', height: 52, padding: '0 18px', borderRadius: '14px' }}
                          value={newTransaction.category}
                          onChange={e => setNewTransaction({ ...newTransaction, category: e.target.value })}
                          required
                        >
                          <option value="maintenance">Maintenance</option>
                          <option value="utility">Utility</option>
                          <option value="repair">Repair</option>
                          <option value="salary">Salary</option>
                          <option value="purchase">Purchase</option>
                          <option value="security">Security</option>
                          <option value="cleaning">Cleaning</option>
                          <option value="gardening">Gardening</option>
                          <option value="festive">Festive</option>
                          <option value="donation">Donation</option>
                          <option value="penalty">Penalty</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label className="required-field">Amount:</label>
                        <input
                          className="input"
                          type="number"
                          style={{ fontSize: '1.18rem', height: 52, padding: '0 18px', borderRadius: '14px' }}
                          placeholder="Enter amount"
                          value={newTransaction.amount}
                          onChange={e => setNewTransaction({ ...newTransaction, amount: e.target.value })}
                          required
                          min="0"
                          step="0.01"
                        />
                      </div>
                      <div className="form-group">
                        <label className="required-field">Description:</label>
                        <textarea
                          className="input"
                          style={{ fontSize: '1.18rem', minHeight: 52, maxHeight: 140, padding: '14px 18px', borderRadius: '14px', resize: 'vertical', lineHeight: 1.5, overflowY: 'auto' }}
                          placeholder="Enter description"
                          value={newTransaction.description}
                          onChange={e => setNewTransaction({ ...newTransaction, description: e.target.value })}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label className="required-field">Payment Method:</label>
                        <select
                          className="input"
                          style={{ fontSize: '1.18rem', height: 52, padding: '0 18px', borderRadius: '14px' }}
                          value={newTransaction.paymentMethod}
                          onChange={e => setNewTransaction({ ...newTransaction, paymentMethod: e.target.value })}
                          required
                        >
                          <option value="cash">Cash</option>
                          <option value="cheque">Cheque</option>
                          <option value="online">Online</option>
                          <option value="bank_transfer">Bank Transfer</option>
                          <option value="upi">UPI</option>
                        </select>
                      </div>
                      {newTransaction.type === 'income' && newTransaction.category === 'maintenance' && (
                        <>
                          <div className="form-group">
                            <label className="required-field">Building Number:</label>
                            <input
                              className="input"
                              type="text"
                              style={{ fontSize: '1.18rem', height: 52, padding: '0 18px', borderRadius: '14px' }}
                              placeholder="Enter building number"
                              value={newTransaction.buildingNumber}
                              onChange={e => setNewTransaction({ ...newTransaction, buildingNumber: e.target.value })}
                              required
                            />
                          </div>
                          <div className="form-group">
                            <label className="required-field">Block Number:</label>
                            <input
                              className="input"
                              type="text"
                              style={{ fontSize: '1.18rem', height: 52, padding: '0 18px', borderRadius: '14px' }}
                              placeholder="Enter block number"
                              value={newTransaction.blockNumber}
                              onChange={e => setNewTransaction({ ...newTransaction, blockNumber: e.target.value })}
                              required
                            />
                          </div>
                          <div className="form-group">
                            <label className="required-field">Flat Number:</label>
                            <input
                              className="input"
                              type="text"
                              style={{ fontSize: '1.18rem', height: 52, padding: '0 18px', borderRadius: '14px' }}
                              placeholder="Enter flat number"
                              value={newTransaction.flatNumber}
                              onChange={e => setNewTransaction({ ...newTransaction, flatNumber: e.target.value })}
                              required
                            />
                          </div>
                        </>
                      )}
                      {newTransaction.type === 'expense' && ['utility', 'repair', 'purchase'].includes(newTransaction.category) && (
                        <>
                          <div className="form-group">
                            <label className="required-field">Vendor Name:</label>
                            <input
                              className="input"
                              type="text"
                              style={{ fontSize: '1.18rem', height: 52, padding: '0 18px', borderRadius: '14px' }}
                              placeholder="Enter vendor name"
                              value={newTransaction.vendorName}
                              onChange={e => setNewTransaction({ ...newTransaction, vendorName: e.target.value })}
                              required
                            />
                          </div>
                          <div className="form-group">
                            <label>Vendor Contact:</label>
                            <input
                              className="input"
                              type="text"
                              style={{ fontSize: '1.18rem', height: 52, padding: '0 18px', borderRadius: '14px' }}
                              placeholder="Enter vendor contact"
                              value={newTransaction.vendorContact}
                              onChange={e => setNewTransaction({ ...newTransaction, vendorContact: e.target.value })}
                            />
                          </div>
                        </>
                      )}
                      <div className="form-group">
                        <label>Receipt Number:</label>
                        <input
                        className="input"
                        type="text"
                        style={{ fontSize: '1.18rem', height: 52, padding: '0 18px', borderRadius: '14px' }}
                        placeholder="Enter receipt number"
                          value={newTransaction.receiptNumber}
                          onChange={e => setNewTransaction({ ...newTransaction, receiptNumber: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label>Invoice Number:</label>
                        <input
                        className="input"
                        type="text"
                        style={{ fontSize: '1.18rem', height: 52, padding: '0 18px', borderRadius: '14px' }}
                        placeholder="Enter invoice number"
                          value={newTransaction.invoiceNumber}
                          onChange={e => setNewTransaction({ ...newTransaction, invoiceNumber: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label>Remarks:</label>
                        <input
                        className="input"
                        type="text"
                        style={{ fontSize: '1.18rem', height: 52, padding: '0 18px', borderRadius: '14px' }}
                        placeholder="Enter remarks"
                          value={newTransaction.remarks}
                          onChange={e => setNewTransaction({ ...newTransaction, remarks: e.target.value })}
                        />
                      </div>
                      <div className="form-actions" style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px', marginTop: 8 }}>
                        <button
                          type="button"
                          className="btn-gradient"
                          style={{
                            background: '#ef4444',
                            fontSize: '1.15rem',
                            padding: '16px 40px',
                            borderRadius: '16px',
                            minWidth: 160,
                            fontWeight: 700,
                            letterSpacing: 0.5,
                            boxShadow: '0 2px 8px rgba(239,68,68,0.08)',
                            transition: 'background 0.2s, box-shadow 0.2s',
                          }}
                          onClick={() => setShowAddModal(false)}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="btn-gradient"
                          style={{
                            background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                            fontSize: '1.15rem',
                            padding: '16px 40px',
                            borderRadius: '16px',
                            minWidth: 200,
                            fontWeight: 700,
                            letterSpacing: 0.5,
                            boxShadow: '0 2px 8px rgba(59,130,246,0.08)',
                            transition: 'background 0.2s, box-shadow 0.2s',
                          }}
                        >
                          Add Transaction
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Transactions Table */}
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div style={{ overflowX: "auto", maxHeight: "600px" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead
                  style={{
                    backgroundColor: "#f9fafb",
                    position: "sticky",
                    top: 0,
                  }}
                >
                  <tr>
                    <th style={tableHeaderStyle}>Transaction ID</th>
                    <th style={tableHeaderStyle}>Type</th>
                    <th style={tableHeaderStyle}>Category</th>
                    <th style={tableHeaderStyle}>Description</th>
                    <th style={tableHeaderStyle}>Amount</th>
                    <th style={tableHeaderStyle}>Date</th>
                    <th style={tableHeaderStyle}>Payment Method</th>
                    <th style={tableHeaderStyle}>Status</th>
                    <th style={tableHeaderStyle}>Actions</th>
                  </tr>
                </thead>
                <tbody style={{ backgroundColor: "white" }}>
                  {filteredTransactions
                    .filter((transaction) => transaction && transaction.id)
                    .map((transaction) => (
                      <tr
                        key={transaction.id || transaction._id}
                        style={tableRowStyle}
                      >
                        <td style={tableCellStyle}>
                          <span style={{ fontWeight: "500", color: "#1f2937" }}>
                            {transaction.transactionId}
                          </span>
                        </td>
                        <td style={tableCellStyle}>
                          <span
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              padding: "4px 10px",
                              borderRadius: "20px",
                              fontSize: "12px",
                              fontWeight: "500",
                              color:
                                transaction.type === "income"
                                  ? "#059669"
                                  : "#dc2626",
                              backgroundColor:
                                transaction.type === "income"
                                  ? "#d1fae5"
                                  : "#fee2e2",
                            }}
                          >
                            {transaction.type === "income" ? "↑" : "↓"}{" "}
                            {transaction.type.toUpperCase()}
                          </span>
                        </td>
                        <td style={tableCellStyle}>
                          <span
                            style={{
                              textTransform: "capitalize",
                              color: "#1f2937",
                            }}
                          >
                            {transaction.category}
                          </span>
                        </td>
                        <td style={tableCellStyle}>
                          <div style={{ maxWidth: "200px" }}>
                            <div
                              style={{
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                                color: "#1f2937",
                              }}
                              title={transaction.description}
                            >
                              {transaction.description}
                            </div>
                            {transaction.vendorName && (
                              <div
                                style={{
                                  fontSize: "12px",
                                  color: "#6b7280",
                                  marginTop: "4px",
                                }}
                              >
                                Vendor: {transaction.vendorName}
                              </div>
                            )}
                          </div>
                        </td>
                        <td
                          style={{
                            ...tableCellStyle,
                            fontWeight: "600",
                            color:
                              transaction.type === "income"
                                ? "#059669"
                                : "#dc2626",
                          }}
                        >
                          {formatCurrency(transaction.amount)}
                        </td>
                        <td style={tableCellStyle}>
                          <span style={{ color: "#1f2937" }}>
                            {formatDate(transaction.date)}
                          </span>
                        </td>
                        <td style={tableCellStyle}>
                          <div>
                            <span
                              style={{
                                textTransform: "capitalize",
                                color: "#1f2937",
                              }}
                            >
                              {transaction.paymentMethod?.replace("_", " ")}
                            </span>
                            {transaction.receiptNumber && (
                              <div
                                style={{ fontSize: "12px", color: "#6b7280" }}
                              >
                                Receipt: {transaction.receiptNumber}
                              </div>
                            )}
                          </div>
                        </td>
                        <td style={tableCellStyle}>
                          <span
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              padding: "4px 10px",
                              borderRadius: "20px",
                              fontSize: "12px",
                              fontWeight: "500",
                              color: "#059669",
                              backgroundColor: "#d1fae5",
                            }}
                          >
                            {transaction.status?.toUpperCase() || "COMPLETED"}
                          </span>
                        </td>
                        <td style={tableCellStyle}>
                          <div style={{ display: "flex", gap: "8px" }}>
                            {showTransactionDetail && selectedTransaction && (
                              <div
                                style={{
                                  position: "fixed",
                                  top: 0,
                                  left: 0,
                                  right: 0,
                                  bottom: 0,
                                  background: "rgba(0,0,0,0.3)",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  zIndex: 1000,
                                }}
                              >
                                <div
                                  style={{
                                    background: "white",
                                    borderRadius: "12px",
                                    padding: "32px",
                                    minWidth: "350px",
                                    boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
                                  }}
                                >
                                  <h2>Transaction Details</h2>
                                  <p>
                                    <b>ID:</b>{" "}
                                    {selectedTransaction.transactionId}
                                  </p>
                                  <p>
                                    <b>Type:</b> {selectedTransaction.type}
                                  </p>
                                  <p>
                                    <b>Amount:</b>{" "}
                                    {formatCurrency(selectedTransaction.amount)}
                                  </p>
                                  {/* Add more fields as needed */}
                                  <button
                                    onClick={() =>
                                      setShowTransactionDetail(false)
                                    }
                                  >
                                    Close
                                  </button>
                                </div>
                              </div>
                            )}
                            <button
                              onClick={() => {
                                setSelectedTransaction(transaction);
                                setShowTransactionDetail(true);
                              }}
                              style={{
                                color: "#3b82f6",
                                backgroundColor: "transparent",
                                border: "none",
                                cursor: "pointer",
                                fontWeight: "500",
                                fontSize: "14px",
                              }}
                              onMouseEnter={(e) =>
                                (e.target.style.color = "#1d4ed8")
                              }
                              onMouseLeave={(e) =>
                                (e.target.style.color = "#3b82f6")
                              }
                            >
                              View
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            {filteredTransactions.length === 0 && (
              <div style={{ textAlign: "center", padding: "48px 20px" }}>
                <svg
                  style={{
                    margin: "0 auto 16px auto",
                    height: "48px",
                    width: "48px",
                    color: "#9ca3af",
                  }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                <h3
                  style={{
                    marginBottom: "8px",
                    fontSize: "16px",
                    fontWeight: "500",
                    color: "#1f2937",
                  }}
                >
                  No transactions found
                </h3>
                <p style={{ fontSize: "14px", color: "#6b7280" }}>
                  Get started by adding a new transaction.
                </p>
              </div>
            )}
          </div>

          {/* Add Transaction Modal and Transaction Detail Modal would go here */}
          {/* For brevity, modals are simplified but can be added with inline styles similar to above */}
        </div>
      </div>
    </div>
  );
}
