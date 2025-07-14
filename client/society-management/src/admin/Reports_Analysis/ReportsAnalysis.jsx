import React, { useState, useEffect } from 'react';
import './ReportsAnalysis.css';
import '../AdminTheme.css';

const ReportsAnalysis = () => {
  const [selectedReport, setSelectedReport] = useState('financial');
  const [dateRange, setDateRange] = useState('thisMonth');
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');
  const [reportData, setReportData] = useState({});

  const reportTypes = [
    { id: 'financial', name: 'Financial Report', icon: '💰', description: 'Income, expenses, and financial trends' },
    { id: 'maintenance', name: 'Maintenance Report', icon: '🔧', description: 'Maintenance requests and completion rates' },
    { id: 'occupancy', name: 'Occupancy Report', icon: '🏠', description: 'Unit occupancy and resident statistics' },
    { id: 'complaints', name: 'Complaints Report', icon: '📋', description: 'Complaint resolution and satisfaction metrics' }
  ];

  const dateRanges = [
    { value: 'thisMonth', label: 'This Month' },
    { value: 'lastMonth', label: 'Last Month' },
    { value: 'thisQuarter', label: 'This Quarter' },
    { value: 'thisYear', label: 'This Year' },
    { value: 'custom', label: 'Custom Range' }
  ];

  useEffect(() => {
    // Mock data for different reports
    const mockData = {
      financial: {
        totalIncome: 245000,
        totalExpenses: 180000,
        netProfit: 65000,
        maintenanceCollected: 195000,
        outstandingDues: 35000,
        monthlyTrend: [
          { month: 'Jan', income: 220000, expenses: 165000 },
          { month: 'Feb', income: 235000, expenses: 175000 },
          { month: 'Mar', income: 245000, expenses: 180000 }
        ],
        expenseBreakdown: [
          { category: 'Maintenance', amount: 65000, percentage: 36 },
          { category: 'Security', amount: 45000, percentage: 25 },
          { category: 'Utilities', amount: 35000, percentage: 19 },
          { category: 'Cleaning', amount: 25000, percentage: 14 },
          { category: 'Others', amount: 10000, percentage: 6 }
        ]
      },
      maintenance: {
        totalRequests: 156,
        completedRequests: 142,
        pendingRequests: 14,
        averageResolutionTime: 2.5,
        requestsByCategory: [
          { category: 'Plumbing', count: 45, percentage: 29 },
          { category: 'Electrical', count: 38, percentage: 24 },
          { category: 'Cleaning', count: 32, percentage: 21 },
          { category: 'Common Area', count: 28, percentage: 18 },
          { category: 'Others', count: 13, percentage: 8 }
        ],
        monthlyTrend: [
          { month: 'Jan', total: 48, completed: 46 },
          { month: 'Feb', total: 52, completed: 50 },
          { month: 'Mar', total: 56, completed: 46 }
        ]
      },
      occupancy: {
        totalUnits: 120,
        occupiedUnits: 108,
        vacantUnits: 12,
        occupancyRate: 90,
        ownerOccupied: 75,
        tenantOccupied: 33,
        unitsByType: [
          { type: '1BHK', total: 30, occupied: 28 },
          { type: '2BHK', total: 60, occupied: 54 },
          { type: '3BHK', total: 30, occupied: 26 }
        ],
        movementTrend: [
          { month: 'Jan', moveIns: 5, moveOuts: 3 },
          { month: 'Feb', moveIns: 3, moveOuts: 2 },
          { month: 'Mar', moveIns: 4, moveOuts: 1 }
        ]
      },
      complaints: {
        totalComplaints: 89,
        resolvedComplaints: 76,
        pendingComplaints: 13,
        averageResolutionTime: 3.2,
        complaintsByCategory: [
          { category: 'Noise', count: 25, percentage: 28 },
          { category: 'Parking', count: 20, percentage: 22 },
          { category: 'Common Area', count: 18, percentage: 20 },
          { category: 'Security', count: 15, percentage: 17 },
          { category: 'Others', count: 11, percentage: 13 }
        ],
        satisfactionRating: 4.2
      }
    };
    
    // Simulate data loading
    setReportData(mockData);
  }, [selectedReport, dateRange]);

  const renderFinancialReport = () => {
    const data = reportData.financial;
    if (!data) return null;

    return (
      <div className="report-content">
        <div className="metrics-grid">
          <div className="metric-card income">
            <div className="metric-icon">💰</div>
            <div className="metric-info">
              <h3>Total Income</h3>
              <p className="metric-value">₹{data.totalIncome.toLocaleString()}</p>
              <span className="metric-change positive">+12% from last month</span>
            </div>
          </div>
          <div className="metric-card expenses">
            <div className="metric-icon">💸</div>
            <div className="metric-info">
              <h3>Total Expenses</h3>
              <p className="metric-value">₹{data.totalExpenses.toLocaleString()}</p>
              <span className="metric-change negative">+8% from last month</span>
            </div>
          </div>
          <div className="metric-card profit">
            <div className="metric-icon">📈</div>
            <div className="metric-info">
              <h3>Net Profit</h3>
              <p className="metric-value">₹{data.netProfit.toLocaleString()}</p>
              <span className="metric-change positive">+18% from last month</span>
            </div>
          </div>
          <div className="metric-card dues">
            <div className="metric-icon">⏰</div>
            <div className="metric-info">
              <h3>Outstanding Dues</h3>
              <p className="metric-value">₹{data.outstandingDues.toLocaleString()}</p>
              <span className="metric-change negative">-5% from last month</span>
            </div>
          </div>
        </div>

        <div className="charts-grid">
          <div className="chart-container">
            <h3 className="chart-title">Monthly Income vs Expenses</h3>
            <div className="trend-chart">
              {data.monthlyTrend.map((item, index) => (
                <div key={index} className="trend-item">
                  <div className="trend-month">{item.month}</div>
                  <div className="trend-bars">
                    <div 
                      className="trend-bar income-bar" 
                      style={{ height: `${(item.income / 250000) * 100}%` }}
                      title={`Income: ₹${item.income.toLocaleString()}`}
                    ></div>
                    <div 
                      className="trend-bar expense-bar" 
                      style={{ height: `${(item.expenses / 250000) * 100}%` }}
                      title={`Expenses: ₹${item.expenses.toLocaleString()}`}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="chart-legend">
              <div className="legend-item">
                <div className="legend-color income"></div>
                <span>Income</span>
              </div>
              <div className="legend-item">
                <div className="legend-color expense"></div>
                <span>Expenses</span>
              </div>
            </div>
          </div>

          <div className="chart-container">
            <h3 className="chart-title">Expense Breakdown</h3>
            <div className="pie-chart-container">
              <div className="expense-breakdown">
                {data.expenseBreakdown.map((item, index) => (
                  <div key={index} className="expense-item">
                    <div className="expense-info">
                      <span className="expense-category">{item.category}</span>
                      <span className="expense-amount">₹{item.amount.toLocaleString()}</span>
                    </div>
                    <div className="expense-bar">
                      <div 
                        className="expense-fill" 
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                    <span className="expense-percentage">{item.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderMaintenanceReport = () => {
    const data = reportData.maintenance;
    if (!data) return null;

    return (
      <div className="report-content">
        <div className="metrics-grid">
          <div className="metric-card total">
            <div className="metric-icon">📊</div>
            <div className="metric-info">
              <h3>Total Requests</h3>
              <p className="metric-value">{data.totalRequests}</p>
              <span className="metric-change positive">+15% from last month</span>
            </div>
          </div>
          <div className="metric-card completed">
            <div className="metric-icon">✅</div>
            <div className="metric-info">
              <h3>Completed</h3>
              <p className="metric-value">{data.completedRequests}</p>
              <span className="metric-change positive">91% completion rate</span>
            </div>
          </div>
          <div className="metric-card pending">
            <div className="metric-icon">⏳</div>
            <div className="metric-info">
              <h3>Pending</h3>
              <p className="metric-value">{data.pendingRequests}</p>
              <span className="metric-change neutral">9% of total</span>
            </div>
          </div>
          <div className="metric-card resolution">
            <div className="metric-icon">⚡</div>
            <div className="metric-info">
              <h3>Avg. Resolution Time</h3>
              <p className="metric-value">{data.averageResolutionTime} days</p>
              <span className="metric-change positive">-0.5 days improvement</span>
            </div>
          </div>
        </div>

        <div className="charts-grid">
          <div className="chart-container">
            <h3 className="chart-title">Requests by Category</h3>
            <div className="category-chart">
              {data.requestsByCategory.map((item, index) => (
                <div key={index} className="category-item">
                  <div className="category-info">
                    <span className="category-name">{item.category}</span>
                    <span className="category-count">{item.count} requests</span>
                  </div>
                  <div className="category-bar">
                    <div 
                      className="category-fill" 
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                  <span className="category-percentage">{item.percentage}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="chart-container">
            <h3 className="chart-title">Monthly Trend</h3>
            <div className="trend-chart">
              {data.monthlyTrend.map((item, index) => (
                <div key={index} className="trend-item">
                  <div className="trend-month">{item.month}</div>
                  <div className="trend-bars">
                    <div 
                      className="trend-bar total-bar" 
                      style={{ height: `${(item.total / 60) * 100}%` }}
                      title={`Total: ${item.total}`}
                    ></div>
                    <div 
                      className="trend-bar completed-bar" 
                      style={{ height: `${(item.completed / 60) * 100}%` }}
                      title={`Completed: ${item.completed}`}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="chart-legend">
              <div className="legend-item">
                <div className="legend-color total"></div>
                <span>Total Requests</span>
              </div>
              <div className="legend-item">
                <div className="legend-color completed"></div>
                <span>Completed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderOccupancyReport = () => {
    const data = reportData.occupancy;
    if (!data) return null;

    return (
      <div className="report-content">
        <div className="metrics-grid">
          <div className="metric-card total-units">
            <div className="metric-icon">🏠</div>
            <div className="metric-info">
              <h3>Total Units</h3>
              <p className="metric-value">{data.totalUnits}</p>
              <span className="metric-change neutral">Across all blocks</span>
            </div>
          </div>
          <div className="metric-card occupied">
            <div className="metric-icon">✅</div>
            <div className="metric-info">
              <h3>Occupied Units</h3>
              <p className="metric-value">{data.occupiedUnits}</p>
              <span className="metric-change positive">{data.occupancyRate}% occupancy</span>
            </div>
          </div>
          <div className="metric-card vacant">
            <div className="metric-icon">🏢</div>
            <div className="metric-info">
              <h3>Vacant Units</h3>
              <p className="metric-value">{data.vacantUnits}</p>
              <span className="metric-change neutral">{100 - data.occupancyRate}% vacancy</span>
            </div>
          </div>
          <div className="metric-card owners">
            <div className="metric-icon">👥</div>
            <div className="metric-info">
              <h3>Owner vs Tenant</h3>
              <p className="metric-value">{data.ownerOccupied}:{data.tenantOccupied}</p>
              <span className="metric-change positive">Healthy mix</span>
            </div>
          </div>
        </div>

        <div className="charts-grid">
          <div className="chart-container">
            <h3 className="chart-title">Units by Type</h3>
            <div className="unit-type-chart">
              {data.unitsByType.map((item, index) => (
                <div key={index} className="unit-type-item">
                  <div className="unit-type-header">
                    <span className="unit-type-name">{item.type}</span>
                    <span className="unit-type-ratio">{item.occupied}/{item.total}</span>
                  </div>
                  <div className="unit-type-bar">
                    <div 
                      className="unit-type-fill" 
                      style={{ width: `${(item.occupied / item.total) * 100}%` }}
                    ></div>
                  </div>
                  <span className="unit-type-percentage">
                    {Math.round((item.occupied / item.total) * 100)}% occupied
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="chart-container">
            <h3 className="chart-title">Move-in/Move-out Trend</h3>
            <div className="movement-chart">
              {data.movementTrend.map((item, index) => (
                <div key={index} className="movement-item">
                  <div className="movement-month">{item.month}</div>
                  <div className="movement-bars">
                    <div className="movement-bar move-in">
                      <span className="movement-label">In: {item.moveIns}</span>
                      <div 
                        className="movement-fill move-in-fill" 
                        style={{ height: `${(item.moveIns / 6) * 100}%` }}
                      ></div>
                    </div>
                    <div className="movement-bar move-out">
                      <span className="movement-label">Out: {item.moveOuts}</span>
                      <div 
                        className="movement-fill move-out-fill" 
                        style={{ height: `${(item.moveOuts / 6) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="chart-legend">
              <div className="legend-item">
                <div className="legend-color move-in"></div>
                <span>Move-ins</span>
              </div>
              <div className="legend-item">
                <div className="legend-color move-out"></div>
                <span>Move-outs</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderComplaintsReport = () => {
    const data = reportData.complaints;
    if (!data) return null;

    return (
      <div className="report-content">
        <div className="metrics-grid">
          <div className="metric-card total-complaints">
            <div className="metric-icon">📋</div>
            <div className="metric-info">
              <h3>Total Complaints</h3>
              <p className="metric-value">{data.totalComplaints}</p>
              <span className="metric-change positive">-8% from last month</span>
            </div>
          </div>
          <div className="metric-card resolved">
            <div className="metric-icon">✅</div>
            <div className="metric-info">
              <h3>Resolved</h3>
              <p className="metric-value">{data.resolvedComplaints}</p>
              <span className="metric-change positive">85% resolution rate</span>
            </div>
          </div>
          <div className="metric-card pending-complaints">
            <div className="metric-icon">⏳</div>
            <div className="metric-info">
              <h3>Pending</h3>
              <p className="metric-value">{data.pendingComplaints}</p>
              <span className="metric-change neutral">15% of total</span>
            </div>
          </div>
          <div className="metric-card satisfaction">
            <div className="metric-icon">⭐</div>
            <div className="metric-info">
              <h3>Satisfaction Rating</h3>
              <p className="metric-value">{data.satisfactionRating}/5</p>
              <span className="metric-change positive">+0.3 improvement</span>
            </div>
          </div>
        </div>

        <div className="charts-grid">
          <div className="chart-container">
            <h3 className="chart-title">Complaints by Category</h3>
            <div className="complaints-chart">
              {data.complaintsByCategory.map((item, index) => (
                <div key={index} className="complaint-category-item">
                  <div className="complaint-category-info">
                    <span className="complaint-category-name">{item.category}</span>
                    <span className="complaint-category-count">{item.count} complaints</span>
                  </div>
                  <div className="complaint-category-bar">
                    <div 
                      className="complaint-category-fill" 
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                  <span className="complaint-category-percentage">{item.percentage}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="chart-container">
            <h3 className="chart-title">Resolution Performance</h3>
            <div className="resolution-stats">
              <div className="resolution-item">
                <div className="resolution-circle">
                  <div className="resolution-fill" style={{ transform: `rotate(${(data.resolvedComplaints / data.totalComplaints) * 360}deg)` }}></div>
                  <div className="resolution-center">
                    <span className="resolution-percentage">
                      {Math.round((data.resolvedComplaints / data.totalComplaints) * 100)}%
                    </span>
                    <span className="resolution-label">Resolved</span>
                  </div>
                </div>
              </div>
              <div className="resolution-details">
                <div className="resolution-stat">
                  <span className="stat-label">Average Resolution Time:</span>
                  <span className="stat-value">{data.averageResolutionTime} days</span>
                </div>
                <div className="resolution-stat">
                  <span className="stat-label">Total Complaints:</span>
                  <span className="stat-value">{data.totalComplaints}</span>
                </div>
                <div className="resolution-stat">
                  <span className="stat-label">Resolved:</span>
                  <span className="stat-value">{data.resolvedComplaints}</span>
                </div>
                <div className="resolution-stat">
                  <span className="stat-label">Pending:</span>
                  <span className="stat-value">{data.pendingComplaints}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const exportReport = () => {
    // Mock export functionality
    alert(`Exporting ${reportTypes.find(r => r.id === selectedReport)?.name} for ${dateRange === 'custom' ? `${customStartDate} to ${customEndDate}` : dateRange}`);
  };

  const printReport = () => {
    window.print();
  };

  return (
    <div className="admin-container">
      <div className="admin-bg-elements"></div>
      <div className="admin-content">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="transform hover:scale-[1.02] transition-transform duration-200 mb-8">
          <h1 className="text-3xl sm:text-4xl rounded-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Reports & Analysis
          </h1>
          <p className="text-gray-400 mt-2">Comprehensive insights and analytics for society management</p>
        </div>

        {/* Report Controls */}
        <div className="report-controls">
          <div className="report-type-selector">
            <h3 className="selector-title">Report Type</h3>
            <div className="report-types-grid">
              {reportTypes.map(type => (
                <button
                  key={type.id}
                  onClick={() => setSelectedReport(type.id)}
                  className={`report-type-btn ${selectedReport === type.id ? 'active' : ''}`}
                >
                  <div className="report-type-icon">{type.icon}</div>
                  <div className="report-type-info">
                    <h4 className="report-type-name">{type.name}</h4>
                    <p className="report-type-description">{type.description}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="date-range-selector">
            <h3 className="selector-title">Date Range</h3>
            <div className="date-controls">
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="date-range-select"
              >
                {dateRanges.map(range => (
                  <option key={range.value} value={range.value}>{range.label}</option>
                ))}
              </select>
              
              {dateRange === 'custom' && (
                <div className="custom-date-inputs">
                  <input
                    type="date"
                    value={customStartDate}
                    onChange={(e) => setCustomStartDate(e.target.value)}
                    className="custom-date-input"
                    placeholder="Start Date"
                  />
                  <span className="date-separator">to</span>
                  <input
                    type="date"
                    value={customEndDate}
                    onChange={(e) => setCustomEndDate(e.target.value)}
                    className="custom-date-input"
                    placeholder="End Date"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="report-actions">
            <button onClick={exportReport} className="action-btn export-btn">
              📊 Export
            </button>
            <button onClick={printReport} className="action-btn print-btn">
              🖨️ Print
            </button>
          </div>
        </div>

        {/* Report Content */}
        <div className="report-container">
          <div className="report-header">
            <h2 className="report-title">
              {reportTypes.find(r => r.id === selectedReport)?.name}
            </h2>
            <div className="report-meta">
              <span className="report-period">
                Period: {dateRange === 'custom' ? `${customStartDate} to ${customEndDate}` : dateRange}
              </span>
              <span className="report-generated">
                Generated: {new Date().toLocaleDateString('en-IN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
            </div>
          </div>

          {selectedReport === 'financial' && renderFinancialReport()}
          {selectedReport === 'maintenance' && renderMaintenanceReport()}
          {selectedReport === 'occupancy' && renderOccupancyReport()}
          {selectedReport === 'complaints' && renderComplaintsReport()}
        </div>
      </div>
      </div>
    </div>
  );
};

export default ReportsAnalysis;
