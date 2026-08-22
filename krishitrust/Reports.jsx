// src/pages/Reports.jsx
import React, { useState } from 'react';

const Reports = () => {
  const [selectedReport, setSelectedReport] = useState('weekly');
  const [reportType, setReportType] = useState('all');

  const reports = [
    { 
      id: 'weekly', 
      title: 'Weekly Handling Performance Report', 
      date: 'Aug 9, 2026', 
      status: 'Generated', 
      icon: '📦',
      description: 'Shipment handling analysis across 12 active routes',
      metrics: { shipments: 48, handlingScore: 72, incidents: 34, readiness: '58/100' }
    },
    { 
      id: 'monthly', 
      title: 'Monthly Business Reliability Analysis', 
      date: 'Aug 1, 2026', 
      status: 'Generated', 
      icon: '📈',
      description: 'Business reliability trends & operational consistency',
      metrics: { shipments: 124, reliability: 68, consistency: '89%', readiness: '62/100' }
    },
    { 
      id: 'seasonal', 
      title: 'Seasonal Handling Risk Assessment', 
      date: 'Jul 15, 2026', 
      status: 'Ready', 
      icon: '🌾',
      description: 'Monsoon season produce transport handling analysis',
      metrics: { shipments: 89, handlingScore: 65, incidents: 45, readiness: '51/100' }
    },
    { 
      id: 'custom', 
      title: 'Finance Readiness Profile Report', 
      date: 'Jul 30, 2026', 
      status: 'Processing', 
      icon: '💰',
      description: 'Comprehensive finance readiness assessment for business review',
      metrics: { shipments: 67, reliability: 72, readiness: '76/100', recommendations: 8 }
    },
    { 
      id: 'vehicle', 
      title: 'Shipment Efficiency Report', 
      date: 'Aug 5, 2026', 
      status: 'Generated', 
      icon: '🚛',
      description: 'Shipment handling performance & delivery consistency analysis',
      metrics: { shipments: 112, handlingScore: 70, success: '87%', readiness: '59/100' }
    },
    { 
      id: 'predictive', 
      title: 'Predictive Readiness Forecast', 
      date: 'Aug 12, 2026', 
      status: 'Scheduled', 
      icon: '🔮',
      description: 'AI-driven finance readiness predictions for next 30 days',
      metrics: { shipments: 0, handlingScore: 0, readiness: '0', recommendations: 0 }
    },
  ];

  const filteredReports = reportType === 'all' 
    ? reports 
    : reports.filter(r => {
        if (reportType === 'handling') return r.title.includes('Handling') || r.title.includes('Risk');
        if (reportType === 'reliability') return r.title.includes('Reliability') || r.title.includes('Consistency');
        if (reportType === 'finance') return r.title.includes('Finance') || r.title.includes('Readiness');
        if (reportType === 'performance') return r.title.includes('Performance') || r.title.includes('Efficiency');
        return true;
      });

  const getStatusColor = (status) => {
    const colors = {
      Generated: 'bg-green-500/20 text-green-400 border-green-500/30',
      Ready: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      Processing: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      Scheduled: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    };
    return colors[status] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  };

  const getStatusIcon = (status) => {
    const icons = { Generated: '✅', Ready: '📄', Processing: '⏳', Scheduled: '📅' };
    return icons[status] || '📌';
  };

  const reportCategories = [
    { id: 'all', label: '📊 All Reports', count: reports.length },
    { id: 'handling', label: '📦 Handling Reports', count: reports.filter(r => r.title.includes('Handling') || r.title.includes('Risk')).length },
    { id: 'reliability', label: '📈 Reliability', count: reports.filter(r => r.title.includes('Reliability') || r.title.includes('Consistency')).length },
    { id: 'finance', label: '💰 Finance Readiness', count: reports.filter(r => r.title.includes('Finance') || r.title.includes('Readiness')).length },
    { id: 'performance', label: '🚛 Performance', count: reports.filter(r => r.title.includes('Performance') || r.title.includes('Efficiency')).length },
  ];

  const summaryStats = [
    { label: 'Total Reports', value: reports.length, icon: '📊', color: 'text-white' },
    { label: 'Generated', value: reports.filter(r => r.status === 'Generated').length, icon: '✅', color: 'text-green-400' },
    { label: 'Processing', value: reports.filter(r => r.status === 'Processing').length, icon: '⏳', color: 'text-yellow-400' },
    { label: 'Scheduled', value: reports.filter(r => r.status === 'Scheduled').length, icon: '📅', color: 'text-purple-400' },
  ];

  const quickStats = [
    { label: 'Shipments Analyzed', value: '48', icon: '🌾', color: 'text-green-400' },
    { label: 'Avg Handling Score', value: '72/100', icon: '📦', color: 'text-emerald-400' },
    { label: 'Business Reliability', value: '68/100', icon: '📈', color: 'text-blue-400' },
    { label: 'Finance Readiness', value: '58/100', icon: '💰', color: 'text-orange-400' },
  ];

  return (
    <div className="p-4 md:p-6 min-h-screen bg-[#020617]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-white flex items-center gap-3">
            <span>📊</span> KrishiTrust Reports
            <span className="text-xs bg-green-500/20 px-3 py-1 rounded-full text-green-400">Business Intelligence</span>
          </h1>
          <p className="text-gray-400 text-sm mt-1">Generate and analyze handling performance, business reliability, and finance readiness reports</p>
        </div>
        <button className="mt-3 md:mt-0 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-xl text-white text-sm transition-all duration-300 flex items-center gap-2 shadow-lg shadow-green-500/20">
          <span className="text-lg">+</span> Generate New Report
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
        {quickStats.map((stat, index) => (
          <div key={index} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-3 md:p-4 text-center hover:border-white/20 transition-all duration-300">
            <div className="text-2xl md:text-3xl mb-1">{stat.icon}</div>
            <div className={`text-lg md:text-xl font-bold ${stat.color}`}>{stat.value}</div>
            <div className="text-xs text-gray-400">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Report Categories */}
      <div className="flex flex-wrap gap-2 mb-4">
        {reportCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => setReportType(category.id)}
            className={`px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium transition-all duration-300 ${
              reportType === category.id
                ? 'bg-green-600 text-white shadow-lg shadow-green-500/20'
                : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/5'
            }`}
          >
            {category.label}
            <span className={`ml-1 px-1.5 py-0.5 rounded-full text-xs ${reportType === category.id ? 'bg-white/20' : 'bg-white/5'}`}>
              {category.count}
            </span>
          </button>
        ))}
      </div>

      {/* Report Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6">
        {filteredReports.map((report) => (
          <div key={report.id} className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 hover:border-green-500/30 transition-all duration-300 cursor-pointer hover:scale-[1.02] hover:shadow-2xl hover:shadow-green-500/5 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/0 to-green-500/0 group-hover:from-green-500/5 group-hover:to-green-500/0 transition-all duration-500"></div>
            <div className="relative">
              <div className="flex items-start justify-between mb-2">
                <div className="text-3xl">{report.icon}</div>
                <span className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(report.status)} flex items-center gap-1`}>
                  {getStatusIcon(report.status)} {report.status}
                </span>
              </div>
              <h3 className="text-white font-semibold text-base">{report.title}</h3>
              <p className="text-gray-400 text-xs mt-1">{report.description}</p>
              <p className="text-gray-500 text-xs mt-1">📅 {report.date}</p>
              <div className="mt-3 grid grid-cols-2 gap-1 p-2 bg-[#0d1117] rounded-lg border border-white/5">
                <div className="text-center"><div className="text-white text-sm font-bold">{report.metrics.shipments}</div><div className="text-gray-500 text-[8px] uppercase">Shipments</div></div>
                <div className="text-center"><div className={`text-sm font-bold ${report.metrics.handlingScore > 70 ? 'text-green-400' : report.metrics.handlingScore > 50 ? 'text-yellow-400' : 'text-red-400'}`}>{report.metrics.handlingScore}/100</div><div className="text-gray-500 text-[8px] uppercase">Handling Score</div></div>
                <div className="text-center"><div className="text-red-400 text-sm font-bold">{report.metrics.incidents}</div><div className="text-gray-500 text-[8px] uppercase">Events</div></div>
                <div className="text-center"><div className={`text-sm font-bold ${report.metrics.readiness > 70 ? 'text-green-400' : report.metrics.readiness > 50 ? 'text-yellow-400' : 'text-red-400'}`}>{report.metrics.readiness}</div><div className="text-gray-500 text-[8px] uppercase">Readiness</div></div>
              </div>
              <div className="mt-3 flex gap-2">
                <button className="flex-1 px-3 py-1.5 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 rounded-lg text-xs font-medium transition-all duration-300 border border-blue-500/20">📄 View</button>
                <button className="flex-1 px-3 py-1.5 bg-white/5 hover:bg-white/10 text-gray-300 rounded-lg text-xs font-medium transition-all duration-300 border border-white/5">⬇️ Export</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Report Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2"><span>📈</span> Report Summary</h3>
          <div className="grid grid-cols-2 gap-3">
            {summaryStats.map((stat, index) => (
              <div key={index} className="bg-[#0d1117] rounded-xl p-3 text-center border border-white/5 hover:border-white/10 transition-all duration-300">
                <div className="text-xl mb-0.5">{stat.icon}</div>
                <div className={`text-xl font-bold ${stat.color}`}>{stat.value}</div>
                <div className="text-xs text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2"><span>🔄</span> Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-2 bg-[#0d1117] rounded-lg border border-white/5">
              <span className="text-xl">✅</span>
              <div className="flex-1"><div className="text-white text-sm">Weekly Handling Performance Report</div><div className="text-gray-400 text-xs">Generated 2 hours ago</div></div>
              <span className="text-xs text-green-400">Complete</span>
            </div>
            <div className="flex items-center gap-3 p-2 bg-[#0d1117] rounded-lg border border-white/5">
              <span className="text-xl">⏳</span>
              <div className="flex-1"><div className="text-white text-sm">Finance Readiness Profile Report</div><div className="text-gray-400 text-xs">Processing - 65% complete</div></div>
              <span className="text-xs text-yellow-400">In Progress</span>
            </div>
            <div className="flex items-center gap-3 p-2 bg-[#0d1117] rounded-lg border border-white/5">
              <span className="text-xl">📅</span>
              <div className="flex-1"><div className="text-white text-sm">Predictive Readiness Forecast</div><div className="text-gray-400 text-xs">Scheduled for Aug 12, 2026</div></div>
              <span className="text-xs text-purple-400">Pending</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hardware Integration Status */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-3">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-3 flex items-center justify-between">
          <div className="flex items-center gap-2"><span className="text-blue-400">📡</span><span className="text-white text-sm">GPS Data</span></div>
          <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">Active</span>
        </div>
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-3 flex items-center justify-between">
          <div className="flex items-center gap-2"><span className="text-purple-400">📊</span><span className="text-white text-sm">MPU6050 Sensors</span></div>
          <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">Online</span>
        </div>
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-3 flex items-center justify-between">
          <div className="flex items-center gap-2"><span className="text-yellow-400">🌡️</span><span className="text-white text-sm">Environmental Sensors</span></div>
          <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">Online</span>
        </div>
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-3 flex items-center justify-between">
          <div className="flex items-center gap-2"><span className="text-red-400">⚡</span><span className="text-white text-sm">ESP32 Link</span></div>
          <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded-full">Connected</span>
        </div>
      </div>
    </div>
  );
};

export default Reports;