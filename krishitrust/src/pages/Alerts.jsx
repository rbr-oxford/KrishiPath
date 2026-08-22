// src/pages/Alerts.jsx
import React, { useState } from 'react';

const Alerts = () => {
  const [filter, setFilter] = useState('all');
  const [selectedAlert, setSelectedAlert] = useState(null);

  const alerts = [
    {
      id: 1,
      type: "High Handling Risk Detected",
      location: "Shipment #KT-2024-0842 - Tomatoes",
      status: "Critical",
      icon: "⚠️",
      severity: "High",
      time: "2 minutes ago",
      description: "Multiple high-impact movement events detected during transport. These may increase handling risk for produce quality. Review handling practices.",
      region: "Route: Chitwan → Kathmandu",
      cropType: "Tomatoes",
      affectedArea: "420 kg",
      confidence: "89%"
    },
    {
      id: 2,
      type: "Shipment Delay Alert",
      location: "Shipment #KT-2024-0845 - Cauliflower",
      status: "Moderate",
      icon: "⏰",
      severity: "Medium",
      time: "15 minutes ago",
      description: "Shipment is 23 minutes behind expected delivery time. Monitor for potential quality impact.",
      region: "Route: Pokhara → Kathmandu",
      cropType: "Cauliflower",
      affectedArea: "280 kg",
      confidence: "82%"
    },
    {
      id: 3,
      type: "Route Deviation Warning",
      location: "Shipment #KT-2024-0839 - Mangoes",
      status: "Moderate",
      icon: "🔄",
      severity: "Medium",
      time: "32 minutes ago",
      description: "Shipment has deviated from planned route by 3.7km. Review delivery status and route conditions.",
      region: "Route: Birgunj → Kathmandu",
      cropType: "Mangoes",
      affectedArea: "560 kg",
      confidence: "76%"
    },
    {
      id: 4,
      type: "Business Profile Improvement",
      location: "Farm Account #F-2024-0082",
      status: "Monitor",
      icon: "📈",
      severity: "Low",
      time: "1 hour ago",
      description: "Business reliability score increased by 5 points following 3 successful on-time deliveries. Consistent operations build business profile.",
      region: "Farm ID: F-2024-0082",
      cropType: "Mixed Produce",
      affectedArea: "N/A",
      confidence: "95%"
    },
    {
      id: 5,
      type: "High-Impact Handling Event",
      location: "Shipment #KT-2024-0847 - Potatoes",
      status: "High Risk",
      icon: "🚛",
      severity: "High",
      time: "2 hours ago",
      description: "Unstable movement pattern detected during transport. Potential rough handling may affect produce quality. Recommended: review handling practices.",
      region: "Route: Hetauda → Kathmandu",
      cropType: "Potatoes",
      affectedArea: "650 kg",
      confidence: "88%"
    },
    {
      id: 6,
      type: "Finance Readiness Milestone",
      location: "Farm Account #F-2024-0091",
      status: "Active",
      icon: "⭐",
      severity: "Low",
      time: "3 hours ago",
      description: "Finance readiness score reached threshold. Business profile now qualifies for finance readiness review.",
      region: "Farm ID: F-2024-0091",
      cropType: "Mixed Vegetables",
      affectedArea: "N/A",
      confidence: "92%"
    },
    {
      id: 7,
      type: "Learning Recommendation",
      location: "Shipment #KT-2024-0842 - Tomatoes",
      status: "Active",
      icon: "📚",
      severity: "Low",
      time: "45 minutes ago",
      description: "Recent handling events indicate that the safer produce-transport education module may be useful for this route.",
      region: "Route: Chitwan → Kathmandu",
      cropType: "Tomatoes",
      affectedArea: "420 kg",
      confidence: "87%"
    }
  ];

  const filteredAlerts = filter === 'all' 
    ? alerts 
    : alerts.filter(a => a.severity.toLowerCase() === filter);

  const stats = [
    { label: 'Active Alerts', value: alerts.length, color: 'text-blue-400' },
    { label: 'High Risk Shipments', value: alerts.filter(a => a.severity === 'High').length, color: 'text-red-400' },
    { label: 'Moderate Risk', value: alerts.filter(a => a.severity === 'Medium').length, color: 'text-yellow-400' },
    { label: 'Business Updates', value: alerts.filter(a => a.severity === 'Low').length, color: 'text-green-400' },
  ];

  const getSeverityColor = (severity) => {
    switch(severity) {
      case 'High': return 'bg-red-500/20 border-red-500/30 text-red-400';
      case 'Medium': return 'bg-yellow-500/20 border-yellow-500/30 text-yellow-400';
      case 'Low': return 'bg-green-500/20 border-green-500/30 text-green-400';
      default: return 'bg-blue-500/20 border-blue-500/30 text-blue-400';
    }
  };

  const getBorderColor = (severity) => {
    switch(severity) {
      case 'High': return 'border-red-500/30 hover:border-red-500/50';
      case 'Medium': return 'border-yellow-500/30 hover:border-yellow-500/50';
      case 'Low': return 'border-green-500/30 hover:border-green-500/50';
      default: return 'border-blue-500/30 hover:border-blue-500/50';
    }
  };

  const getGradientColor = (severity) => {
    switch(severity) {
      case 'High': return 'from-red-500 to-orange-500';
      case 'Medium': return 'from-yellow-500 to-orange-500';
      case 'Low': return 'from-green-500 to-emerald-500';
      default: return 'from-blue-500 to-purple-500';
    }
  };

  const getStatusIcon = (severity) => {
    switch(severity) {
      case 'High': return '🔴';
      case 'Medium': return '🟡';
      case 'Low': return '🟢';
      default: return '⚪';
    }
  };

  return (
    <div className="p-4 md:p-6 min-h-screen bg-[#020617]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-white flex items-center gap-3">
            <span>🚨</span> KrishiTrust Risk & Alerts
            <span className="text-xs bg-blue-500/20 px-3 py-1 rounded-full text-blue-400 ml-2">AI-Powered</span>
          </h1>
          <p className="text-gray-400 text-sm mt-1">Real-time shipment handling risk & business performance intelligence</p>
        </div>
        <div className="flex items-center gap-3 mt-3 md:mt-0">
          <span className="text-xs text-green-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
            Live Monitoring Active
          </span>
          <span className="text-xs text-gray-400 flex items-center gap-1">
            <i className="fas fa-microchip text-blue-400"></i>
            ESP32 Connected
          </span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
        {stats.map((stat, index) => (
          <div 
            key={index} 
            className="p-3 md:p-4 bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 text-center hover:border-white/20 transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            <div className={`text-xl md:text-2xl font-bold ${stat.color}`}>{stat.value}</div>
            <div className="text-xs text-gray-400 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
            filter === 'all' 
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' 
              : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
          }`}
        >
          All Alerts
        </button>
        {['High', 'Medium', 'Low'].map(level => (
          <button
            key={level}
            onClick={() => setFilter(level.toLowerCase())}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
              filter === level.toLowerCase() 
                ? level === 'High' ? 'bg-red-600 text-white shadow-lg shadow-red-500/20' :
                  level === 'Medium' ? 'bg-yellow-600 text-white shadow-lg shadow-yellow-500/20' :
                  'bg-green-600 text-white shadow-lg shadow-green-500/20'
                : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            {level} Risk
          </button>
        ))}
      </div>

      {/* Alerts List */}
      <div className="space-y-4">
        {filteredAlerts.map((alert) => (
          <div
            key={alert.id}
            className={`group relative bg-white/5 backdrop-blur-xl border rounded-2xl p-5 md:p-6 transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl cursor-pointer overflow-hidden ${getBorderColor(alert.severity)}`}
            onClick={() => setSelectedAlert(selectedAlert === alert.id ? null : alert.id)}
          >
            <div className={`absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-5 transition-opacity duration-500 blur-2xl ${getGradientColor(alert.severity)}`}></div>
            
            <div className="relative">
              <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                <div className="text-3xl md:text-4xl group-hover:scale-110 transition-transform duration-300">
                  {alert.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 md:gap-3">
                    <h2 className="text-lg md:text-xl font-bold text-white">{alert.type}</h2>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${getSeverityColor(alert.severity)}`}>
                      {alert.severity} Risk
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400">
                      {alert.region}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                      {alert.cropType}
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm mt-1">📍 {alert.location}</p>
                  <p className="text-gray-400 text-sm mt-1 hidden sm:block">{alert.description}</p>
                  <div className="flex flex-wrap items-center gap-3 md:gap-4 mt-2 text-xs text-gray-400">
                    <span>🕐 {alert.time}</span>
                    <span>•</span>
                    <span>📊 Confidence: {alert.confidence}</span>
                    <span>•</span>
                    <span>📦 {alert.affectedArea}</span>
                    <span>•</span>
                    <span className="text-blue-400 group-hover:text-blue-300 transition-colors">View Details →</span>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className={`text-2xl ${
                    alert.severity === 'High' ? 'text-red-400 animate-pulse' :
                    alert.severity === 'Medium' ? 'text-yellow-400' :
                    'text-green-400'
                  }`}>
                    {getStatusIcon(alert.severity)}
                  </span>
                </div>
              </div>

              {/* Expanded Details */}
              {selectedAlert === alert.id && (
                <div className="mt-4 p-4 bg-[#0d1117] rounded-xl border border-white/5">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div>
                      <div className="text-xs text-gray-400">Detection Time</div>
                      <div className="text-white text-sm">{alert.time}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-400">Route/Farm</div>
                      <div className="text-white text-sm">{alert.region}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-400">Status</div>
                      <div className="text-white text-sm">{alert.status}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-400">AI Confidence</div>
                      <div className="text-white text-sm">{alert.confidence}</div>
                    </div>
                  </div>
                  <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-2">
                    <button className="px-4 py-2 bg-blue-600/20 border border-blue-500/30 rounded-lg text-blue-400 hover:bg-blue-600/30 transition-all duration-300 text-sm flex items-center justify-center gap-2">
                      <i className="fas fa-map-marked-alt"></i> View Route
                    </button>
                    <button className="px-4 py-2 bg-green-600/20 border border-green-500/30 rounded-lg text-green-400 hover:bg-green-600/30 transition-all duration-300 text-sm flex items-center justify-center gap-2">
                      <i className="fas fa-check"></i> Acknowledge
                    </button>
                    <button className="px-4 py-2 bg-purple-600/20 border border-purple-500/30 rounded-lg text-purple-400 hover:bg-purple-600/30 transition-all duration-300 text-sm flex items-center justify-center gap-2">
                      <i className="fas fa-robot"></i> AI Assistant
                    </button>
                    <button className="px-4 py-2 bg-yellow-600/20 border border-yellow-500/30 rounded-lg text-yellow-400 hover:bg-yellow-600/30 transition-all duration-300 text-sm flex items-center justify-center gap-2">
                      <i className="fas fa-graduation-cap"></i> Learn More
                    </button>
                  </div>
                  <div className="mt-3 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                    <p className="text-yellow-400 text-sm flex items-center gap-2">
                      <i className="fas fa-lightbulb"></i>
                      <span>AI Recommendation: {alert.severity === 'High' ? 'Review handling practices. Consider safer produce transport training for this route.' : 
                        alert.severity === 'Medium' ? 'Monitor shipment closely. Check for potential quality impacts.' : 
                        alert.type.includes('Learning') ? 'This educational recommendation can help improve handling practices and build business reliability.' :
                        'Business profile improvement noted. Continue consistent operations.'}</span>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* No Alerts State */}
      {filteredAlerts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🌾</div>
          <h3 className="text-xl text-white font-semibold">No Active Alerts</h3>
          <p className="text-gray-400 text-sm mt-2">All shipments are within normal handling parameters.</p>
        </div>
      )}
    </div>
  );
};

export default Alerts;