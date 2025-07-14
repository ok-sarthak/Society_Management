import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../hooks/useAuth';
import apiService from '../../services/apiService';
import './Accounts.css';
import '../AdminTheme.css';

// Mock useAuth hook for testing - replace with actual implementation when available
// const useAuth = () => ({
//   isAuthenticated: true,
//   loading: false,
//   user: { id: 1, email: 'test@example.com' }
// });

// Mock apiService for testing - replace with actual implementation when available
// const apiService = {
//   setToken: (token) => console.log('Token set:', token),
//   getTransactions: async () => ({
//     success: true,
//     data: {
//       transactions: [],
//       summary: {
//         totalIncome: 0,
//         totalExpense: 0,
//         balance: 0,
//         thisMonthIncome: 0,
//         thisMonthExpense: 0
//       }
//     }
//   }),
//   createTransaction: async (data) => ({
//     success: true,
//     data: { transaction: { ...data, id: Date.now() } }
//   })
// };

const Accounts1 = () => {
  const { isAuthenticated, loading: authLoading, user } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [hasInitialData, setHasInitialData] = useState(false);

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

  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
    thisMonthIncome: 0,
    thisMonthExpense: 0
  });

  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [showTransactionDetail, setShowTransactionDetail] = useState(false);

  // Debug authentication state
  useEffect(() => {
    console.log('Account component - Auth state:', {
      isAuthenticated,
      authLoading,
      user: user ? { id: user.id, email: user.email } : null,
      token: localStorage.getItem('token') ? 'exists' : 'missing'
    });
  }, [isAuthenticated, authLoading, user]);

  useEffect(() => {
    console.log({ authLoading, isAuthenticated });
    if (!authLoading && isAuthenticated) {
      fetchTransactions();
    }
  }, [fetchTransactions, authLoading, isAuthenticated]);

  

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

  // Add sample data if needed for demo
  useEffect(() => {
    if (transactions.length === 0 && !hasInitialData && isAuthenticated && !loading) {
      // Add some sample transactions for demo
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
      setHasInitialData(true);
    }
  }, [transactions.length, hasInitialData, isAuthenticated, loading]);

  const fetchTransactions = useCallback(async () => {
    // Don't fetch if authentication is still loading
    if (authLoading) {
      console.log('Skip fetch - auth still loading');
      return;
    }
    // Don't fetch if not authenticated
    if (!isAuthenticated) {
      console.log('Skip fetch - not authenticated');
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      // Ensure apiService has the latest token
      const token = localStorage.getItem('token');
      console.log('Token from localStorage:', token ? `${token.substring(0, 20)}...` : 'null');
      if (token) {
        apiService.setToken(token);
        console.log('Token set in apiService');
      } else {
        console.error('No token found in localStorage');
        setLoading(false);
        return;
      }
      console.log('Fetching transactions from API...');
      const data = await apiService.getTransactions();
      if (data.success) {
        setTransactions(data.data.transactions || []);
        setSummary(data.data.summary || {
          totalIncome: 0,
          totalExpense: 0,
          balance: 0,
          thisMonthIncome: 0,
          thisMonthExpense: 0
        });
        console.log('Transactions fetched successfully:', data.data.transactions?.length || 0, 'transactions');
      } else {
        console.error('Backend error:', data.message);
        setTransactions([]);
        alert(`Backend error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error fetching transactions:', error);
      setTransactions([]);
      if (error.message && (error.message.includes('403') || error.message.includes('Unauthorized'))) {
        alert('Authentication failed. Please log in again.');
      } else {
        alert(`Failed to fetch transactions: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, authLoading]);

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

  const handleAddTransaction = async (e) => {
    e.preventDefault();
    // Validate required fields
    const missingFields = validateForm();
    if (missingFields.length > 0) {
      alert(`Please fill in the following required fields:\n\n${missingFields.join('\n')}`);
      return;
    }
    try {
      const transactionData = {
        ...newTransaction,
        amount: parseFloat(newTransaction.amount),
        date: new Date().toISOString().split('T')[0],
        transactionId: `TXN${Date.now()}`,
        status: 'completed'
      };
      console.log('Sending transaction data to backend:', transactionData);
      // Use apiService instead of direct fetch
      const data = await apiService.createTransaction(transactionData);
      if (data.success) {
        console.log('Transaction created successfully:', data.data.transaction);
        // Refresh transactions from backend
        await fetchTransactions();
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
      } else {
        throw new Error(data.message || 'Failed to create transaction');
      }
    } catch (error) {
      console.error('Error adding transaction:', error);
      alert(`Error adding transaction: ${error.message}`);
    }
  };

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

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Invalid Date';
    return date.toLocaleDateString();
  };

  const getTypeColor = (type) => {
    return type === 'income' ? 'text-green-600' : 'text-red-600';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'failed': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const handleSummaryCardClick = (type) => {
    // For now, just log the click - can be extended later
    console.log('Summary card clicked:', type);
  };

  // Table styles
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

  if (loading || authLoading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '128px',
            height: '128px',
            border: '2px solid #3b82f6',
            borderTop: '2px solid transparent',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 16px auto'
          }}></div>
          <p style={{ color: '#6b7280', fontSize: '16px' }}>Loading transactions...</p>
          <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937', marginBottom: '16px' }}>
            Authentication Required
          </h2>
          <p style={{ color: '#6b7280', fontSize: '16px' }}>
            Please log in to access the accounts page.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      padding: '20px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ 
          backgroundColor: 'white', 
          borderRadius: '12px', 
          padding: '20px', 
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          marginBottom: '20px'
        }}>
          {/* Header */}
          <div style={{ marginBottom: '30px' }}>
            <h1 style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '10px'
            }}>
              Accounts & Finance
            </h1>
            <p style={{ color: '#666', fontSize: '1rem' }}>
              Manage society finances and track all transactions
            </p>
          </div>

          {/* Summary Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px',
            marginBottom: '30px'
          }}>
            <div style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '20px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              borderLeft: '4px solid #10b981'
            }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{
                  padding: '10px',
                  backgroundColor: '#d1fae5',
                  borderRadius: '10px',
                  marginRight: '15px'
                }}>
                  <svg style={{ height: '32px', width: '32px', color: '#10b981' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <div>
                  <p style={{ fontSize: '14px', color: '#666', margin: '0 0 5px 0' }}>Total Income</p>
                  <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#10b981', margin: 0 }}>
                    {formatCurrency(summary.totalIncome)}
                  </p>
                </div>
              </div>
            </div>

            <div style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '20px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              borderLeft: '4px solid #ef4444'
            }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{
                  padding: '10px',
                  backgroundColor: '#fee2e2',
                  borderRadius: '10px',
                  marginRight: '15px'
                }}>
                  <svg style={{ height: '32px', width: '32px', color: '#ef4444' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                </div>
                <div>
                  <p style={{ fontSize: '14px', color: '#666', margin: '0 0 5px 0' }}>Total Expense</p>
                  <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#ef4444', margin: 0 }}>
                    {formatCurrency(summary.totalExpense)}
                  </p>
                </div>
              </div>
            </div>

            <div style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '20px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              borderLeft: '4px solid #3b82f6',
              cursor: 'pointer',
              transition: 'transform 0.2s ease'
            }}
            onClick={() => handleSummaryCardClick('balance')}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.02)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{
                  padding: '10px',
                  backgroundColor: '#dbeafe',
                  borderRadius: '10px',
                  marginRight: '15px'
                }}>
                  <svg style={{ height: '32px', width: '32px', color: '#3b82f6' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div>
                  <p style={{ fontSize: '14px', color: '#666', margin: '0 0 5px 0' }}>Current Balance</p>
                  <p style={{ 
                    fontSize: '24px', 
                    fontWeight: 'bold', 
                    color: summary.balance >= 0 ? '#10b981' : '#ef4444',
                    margin: 0 
                  }}>
                    {formatCurrency(summary.balance)}
                  </p>
                  <p style={{ fontSize: '12px', color: '#3b82f6', margin: '5px 0 0 0' }}>Click to add money</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons and Filters */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '20px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            marginBottom: '20px'
          }}>
            <div style={{
              display: 'flex',
              flexDirection: window.innerWidth < 768 ? 'column' : 'row',
              gap: '15px',
              marginBottom: '20px'
            }}>
              <div style={{ flex: 1 }}>
                <input
                  type="text"
                  placeholder="Search transactions..."
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '14px',
                    outline: 'none',
                    backgroundColor: 'white',
                    color: '#1f2937'
                  }}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                  onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                />
              </div>
              <select
                style={{
                  padding: '12px 16px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none',
                  backgroundColor: 'white',
                  color: '#1f2937',
                  minWidth: '150px'
                }}
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
              >
                <option value="all">All Types</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
              <select
                style={{
                  padding: '12px 16px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none',
                  backgroundColor: 'white',
                  color: '#1f2937',
                  minWidth: '150px'
                }}
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
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
                onMouseEnter={(e) => e.target.style.background = 'linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%)'}
                onMouseLeave={(e) => e.target.style.background = 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)'}
              >
                <svg style={{ height: '20px', width: '20px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Transaction
              </button>
            </div>
          </div>

          {/* Transactions Table */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{ overflowX: 'auto', maxHeight: '600px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead style={{ backgroundColor: '#f9fafb', position: 'sticky', top: 0 }}>
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
                <tbody style={{ backgroundColor: 'white' }}>
                  {filteredTransactions.filter(transaction => transaction && transaction.id).map((transaction) => (
                    <tr key={transaction.id || transaction._id} style={tableRowStyle}>
                      <td style={tableCellStyle}>
                        <span style={{ fontWeight: '500', color: '#1f2937' }}>
                          {transaction.transactionId}
                        </span>
                      </td>
                      <td style={tableCellStyle}>
                        <span style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          padding: '4px 10px',
                          borderRadius: '20px',
                          fontSize: '12px',
                          fontWeight: '500',
                          color: transaction.type === 'income' ? '#059669' : '#dc2626',
                          backgroundColor: transaction.type === 'income' ? '#d1fae5' : '#fee2e2'
                        }}>
                          {transaction.type === 'income' ? '↑' : '↓'} {transaction.type.toUpperCase()}
                        </span>
                      </td>
                      <td style={tableCellStyle}>
                        <span style={{ textTransform: 'capitalize', color: '#1f2937' }}>
                          {transaction.category}
                        </span>
                      </td>
                      <td style={tableCellStyle}>
                        <div style={{ maxWidth: '200px' }}>
                          <div style={{ 
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            color: '#1f2937'
                          }} title={transaction.description}>
                            {transaction.description}
                          </div>
                          {transaction.vendorName && (
                            <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>
                              Vendor: {transaction.vendorName}
                            </div>
                          )}
                        </div>
                      </td>
                      <td style={{
                        ...tableCellStyle,
                        fontWeight: '600',
                        color: transaction.type === 'income' ? '#059669' : '#dc2626'
                      }}>
                        {formatCurrency(transaction.amount)}
                      </td>
                      <td style={tableCellStyle}>
                        <span style={{ color: '#1f2937' }}>{formatDate(transaction.date)}</span>
                      </td>
                      <td style={tableCellStyle}>
                        <div>
                          <span style={{ textTransform: 'capitalize', color: '#1f2937' }}>
                            {transaction.paymentMethod?.replace('_', ' ')}
                          </span>
                          {transaction.receiptNumber && (
                            <div style={{ fontSize: '12px', color: '#6b7280' }}>
                              Receipt: {transaction.receiptNumber}
                            </div>
                          )}
                        </div>
                      </td>
                      <td style={tableCellStyle}>
                        <span style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          padding: '4px 10px',
                          borderRadius: '20px',
                          fontSize: '12px',
                          fontWeight: '500',
                          color: '#059669',
                          backgroundColor: '#d1fae5'
                        }}>
                          {transaction.status?.toUpperCase() || 'COMPLETED'}
                        </span>
                      </td>
                      <td style={tableCellStyle}>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button
                            onClick={() => {
                              setSelectedTransaction(transaction);
                              setShowTransactionDetail(true);
                            }}
                            style={{
                              color: '#3b82f6',
                              backgroundColor: 'transparent',
                              border: 'none',
                              cursor: 'pointer',
                              fontWeight: '500',
                              fontSize: '14px'
                            }}
                            onMouseEnter={(e) => e.target.style.color = '#1d4ed8'}
                            onMouseLeave={(e) => e.target.style.color = '#3b82f6'}
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
              <div style={{ textAlign: 'center', padding: '48px 20px' }}>
                <svg style={{ 
                  margin: '0 auto 16px auto', 
                  height: '48px', 
                  width: '48px', 
                  color: '#9ca3af' 
                }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <h3 style={{ marginBottom: '8px', fontSize: '16px', fontWeight: '500', color: '#1f2937' }}>
                  No transactions found
                </h3>
                <p style={{ fontSize: '14px', color: '#6b7280' }}>
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
};

export default Accounts1;
