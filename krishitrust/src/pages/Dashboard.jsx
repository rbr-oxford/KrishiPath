// src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AIAssistant from '../components/AIAssistant';

const Dashboard = () => {
  const [time, setTime] = useState('');
  const [activeAlerts, setActiveAlerts] = useState(7);
  const [activeShipments] = useState(12);
  const [aiStatus] = useState('Online');
  const [totalShipments] = useState(48);
  const [handlingScore, setHandlingScore] = useState('72');
  const [businessReliability, setBusinessReliability] = useState('68');
  const [financeReadiness, setFinanceReadiness] = useState('58');
  const [aiConfidence, setAiConfidence] = useState('89%');
  const [recentAlerts, setRecentAlerts] = useState([
    { type: '⚠️ High Handling Risk', location: 'Shipment #KT-2024-0842 - Tomatoes', time: '2 min ago', severity: 'High' },
    { type: '📦 Moderate Handling Risk', location: 'Shipment #KT-2024-0845 - Cauliflower', time: '15 min ago', severity: 'Medium' },
    { type: '📈 Business Profile Update', location: 'Farm Account #F-2024-0082', time: '28 min ago', severity: 'Low' },
    { type: '🚛 Shipment Completed', location: 'Shipment #KT-2024-0839 - Mangoes', time: '1 hour ago', severity: 'Info' },
  ]);
  const [systemHealth, setSystemHealth] = useState([
    { name: 'GPS Tracking', status: 'Operational', uptime: '99.9%' },
    { name: 'Handling Risk Models', status: 'Active', uptime: '100%' },
    { name: 'Sensor Network', status: 'Running', uptime: '99.8%' },
    { name: 'Business Profile Engine', status: 'Connected', uptime: '98.5%' },
    { name: 'Finance Readiness Analyzer', status: 'Active', uptime: '99.2%' },
  ]);

  // Real-time clock
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString('en-US', { 
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Real-time updates - Agricultural Business Focus
  useEffect(() => {
    const updateInterval = setInterval(() => {
      // Update metrics based on time of day (shipment patterns)
      const hours = new Date().getHours();
      if (hours >= 6 && hours <= 10) {
        setHandlingScore('76');
        setBusinessReliability('72');
        setFinanceReadiness('62');
      } else if (hours >= 11 && hours <= 15) {
        setHandlingScore('68');
        setBusinessReliability('65');
        setFinanceReadiness('55');
      } else if (hours >= 16 && hours <= 19) {
        setHandlingScore('80');
        setBusinessReliability('75');
        setFinanceReadiness('65');
      } else {
        setHandlingScore('72');
        setBusinessReliability('68');
        setFinanceReadiness('58');
      }

      // Update AI confidence
      const confidence = Math.floor(Math.random() * 10 + 85);
      setAiConfidence(`${confidence}%`);

      // Update alerts with agricultural business scenarios
      const alertTypes = [
        '⚠️ High Handling Risk',
        '📦 Moderate Handling Risk',
        '📈 Business Profile Update',
        '🚛 Shipment Completed',
        '🌾 Shipment Delayed',
        '📊 Finance Readiness Change',
        '🎯 Business Milestone'
      ];
      const locations = [
        'Shipment #KT-2024-0842 - Tomatoes',
        'Shipment #KT-2024-0845 - Cauliflower',
        'Farm Account #F-2024-0082',
        'Shipment #KT-2024-0839 - Mangoes',
        'Shipment #KT-2024-0847 - Potatoes',
        'Farm Account #F-2024-0091'
      ];
      const severities = ['High', 'Medium', 'Low', 'Info'];
      
      setRecentAlerts(prev => {
        const newAlert = {
          type: alertTypes[Math.floor(Math.random() * alertTypes.length)],
          location: locations[Math.floor(Math.random() * locations.length)],
          time: 'Just now',
          severity: severities[Math.floor(Math.random() * severities.length)]
        };
        return [newAlert, ...prev.slice(0, 3)];
      });

      // Update system health
      setSystemHealth(prev => prev.map(item => ({
        ...item,
        uptime: `${(Math.random() * 0.5 + 99.3).toFixed(1)}%`,
        status: Math.random() > 0.92 ? 'Degraded' : 
                Math.random() > 0.96 ? 'Recalibrating' : 
                ['Operational', 'Active', 'Running', 'Connected'][Math.floor(Math.random() * 4)]
      })));

      // Update active alerts count
      setActiveAlerts(Math.floor(Math.random() * 6 + 2));

    }, 10000);
    return () => clearInterval(updateInterval);
  }, []);

  // Agricultural Business Statistics
  const stats = [
    { 
      title: 'Active Alerts', 
      value: activeAlerts, 
      icon: '🚨', 
      color: 'from-red-500 to-orange-500', 
      change: '+2', 
      bgColor: 'bg-red-500/10', 
      borderColor: 'border-red-500/20' 
    },
    { 
      title: 'Total Shipments', 
      value: totalShipments, 
      icon: '🌾', 
      color: 'from-green-500 to-emerald-500', 
      change: '+8', 
      bgColor: 'bg-green-500/10', 
      borderColor: 'border-green-500/20' 
    },
    { 
      title: 'Active Shipments', 
      value: activeShipments, 
      icon: '🚛', 
      color: 'from-blue-500 to-cyan-500', 
      change: '+3', 
      bgColor: 'bg-blue-500/10', 
      borderColor: 'border-blue-500/20' 
    },
    { 
      title: 'Handling Score', 
      value: `${handlingScore}/100`, 
      icon: '📦', 
      color: 'from-green-500 to-teal-500', 
      change: '+5%', 
      bgColor: 'bg-green-500/10', 
      borderColor: 'border-green-500/20' 
    },
  ];

  // Quick Stats for Agricultural Business
  const quickStats = [
    { label: 'Business Reliability', value: `${businessReliability}/100`, color: 'text-blue-400' },
    { label: 'Finance Readiness', value: `${financeReadiness}/100`, color: 'text-orange-400' },
    { label: 'System Uptime', value: '99.9%', color: 'text-green-400' },
    { label: 'AI Accuracy', value: aiConfidence, color: 'text-yellow-400' },
    { label: 'Shipment Success', value: '89%', color: 'text-emerald-400' },
    { label: 'Active Farms', value: '24', color: 'text-purple-400' },
  ];

  // Shipment Status Data
  const routeStatus = [
    { name: 'Tomatoes', route: 'Chitwan → Kathmandu', risk: 'High', score: 78, icon: '🍅', status: 'In Transit' },
    { name: 'Cauliflower', route: 'Pokhara → Kathmandu', risk: 'Medium', score: 55, icon: '🥦', status: 'In Transit' },
    { name: 'Mangoes', route: 'Birgunj → Kathmandu', risk: 'Low', score: 32, icon: '🥭', status: 'Delivered' },
    { name: 'Potatoes', route: 'Hetauda → Kathmandu', risk: 'Critical', score: 89, icon: '🥔', status: 'Warning' },
  ];

  return (
    <div className="p-4 md:p-8 min-h-screen bg-[#020617]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-white flex items-center gap-3">
            <span>🌾</span> KrishiTrust Command Center
            <span className="text-xs bg-green-500/20 px-3 py-1 rounded-full text-green-400">v1.0</span>
          </h1>
          <p className="text-gray-400 text-sm md:text-base">Agricultural Value & Finance Intelligence Dashboard</p>
        </div>
        <div className="flex items-center gap-3 mt-4 md:mt-0">
          <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/30 px-3 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
            <span className="text-green-400 text-xs font-mono">SYSTEM ACTIVE</span>
          </div>
          <div className="text-gray-400 font-mono text-xs bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
            🕐 {time}
          </div>
        </div>
      </div>

      {/* Stats Grid - 4 Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`group relative ${stat.bgColor} backdrop-blur-xl border ${stat.borderColor} rounded-2xl p-5 transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer overflow-hidden`}
          >
            <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-2xl`}></div>
            <div className="relative">
              <div className="flex items-center justify-between">
                <span className="text-3xl md:text-4xl">{stat.icon}</span>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                  stat.change.includes('+') ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'
                }`}>
                  {stat.change}
                </span>
              </div>
              <h3 className="text-gray-400 text-xs font-medium uppercase tracking-wider mt-2">{stat.title}</h3>
              <p className="text-2xl md:text-3xl font-bold text-white mt-0.5">{stat.value}</p>
              <div className="mt-2 h-0.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div className={`h-full bg-gradient-to-r ${stat.color} transition-all duration-1000`} style={{ width: '70%' }}></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Grid - 3 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Operations Map Card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 hover:border-green-500/30 transition-all duration-300">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-white">🗺️ Operations Overview</h2>
            <Link to="/map" className="text-xs text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1">
              View Full <span className="text-sm">→</span>
            </Link>
          </div>
          <div className="h-[170px] bg-[#0d1117] rounded-xl overflow-hidden border border-white/5 relative flex items-center justify-center">
            <div className="text-center">
              <div className="text-5xl mb-2">🌾</div>
              <div className="text-white font-semibold text-sm">Nepal Agricultural Network</div>
              <div className="text-gray-400 text-xs mt-1">48 Total Shipments Monitored</div>
              <div className="mt-3 flex items-center justify-center gap-3 text-xs">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-400"></span> Healthy
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-yellow-400"></span> Moderate
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-red-400"></span> High Risk
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Business Intelligence Card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 hover:border-blue-500/30 transition-all duration-300">
          <h2 className="text-lg font-semibold text-white mb-3">🤖 Business Intelligence</h2>
          <div className="space-y-3">
            <div className="p-3 bg-[#0d1117] rounded-xl border border-white/5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-400">Handling Score</span>
                <span className={`text-xs ${
                  parseInt(handlingScore) < 50 ? 'text-red-400' : 
                  parseInt(handlingScore) < 70 ? 'text-yellow-400' : 'text-green-400'
                }`}>
                  {handlingScore}/100
                </span>
              </div>
              <div className="mt-1.5 w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                <div className={`h-1.5 rounded-full ${
                  parseInt(handlingScore) < 50 ? 'bg-gradient-to-r from-red-400 to-orange-400' : 
                  parseInt(handlingScore) < 70 ? 'bg-gradient-to-r from-yellow-400 to-orange-400' : 
                  'bg-gradient-to-r from-green-400 to-emerald-400'
                }`} style={{ width: handlingScore }}></div>
              </div>
            </div>
            <div className="p-3 bg-[#0d1117] rounded-xl border border-white/5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-400">Business Reliability</span>
                <span className={`text-xs ${
                  parseInt(businessReliability) < 50 ? 'text-red-400' : 
                  parseInt(businessReliability) < 70 ? 'text-yellow-400' : 'text-green-400'
                }`}>
                  {businessReliability}/100
                </span>
              </div>
              <div className="mt-1.5 w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                <div className={`h-1.5 rounded-full ${
                  parseInt(businessReliability) < 50 ? 'bg-gradient-to-r from-red-400 to-orange-400' : 
                  parseInt(businessReliability) < 70 ? 'bg-gradient-to-r from-yellow-400 to-orange-400' : 
                  'bg-gradient-to-r from-blue-400 to-purple-400'
                }`} style={{ width: businessReliability }}></div>
              </div>
            </div>
            <div className="p-3 bg-[#0d1117] rounded-xl border border-white/5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-400">Finance Readiness</span>
                <span className={`text-xs ${
                  parseInt(financeReadiness) < 50 ? 'text-red-400' : 
                  parseInt(financeReadiness) < 70 ? 'text-yellow-400' : 'text-green-400'
                }`}>
                  {financeReadiness}/100
                </span>
              </div>
              <div className="mt-1.5 w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                <div className={`h-1.5 rounded-full ${
                  parseInt(financeReadiness) < 50 ? 'bg-gradient-to-r from-red-400 to-orange-400' : 
                  parseInt(financeReadiness) < 70 ? 'bg-gradient-to-r from-yellow-400 to-orange-400' : 
                  'bg-gradient-to-r from-purple-400 to-pink-400'
                }`} style={{ width: financeReadiness }}></div>
              </div>
            </div>
            <div className="p-3 bg-[#0d1117] rounded-xl border border-white/5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-400">AI Confidence</span>
                <span className="text-blue-400 text-xs">{aiConfidence}</span>
              </div>
              <div className="mt-1.5 w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-400 to-cyan-400 h-1.5 rounded-full" style={{ width: aiConfidence.replace('%', '') }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Assistant */}
        <div>
          <AIAssistant />
        </div>
      </div>

      {/* Shipment Status & System Health */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 hover:border-green-500/30 transition-all duration-300">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-white">🚛 Active Shipment Status</h2>
            <Link to="/analysis" className="text-xs text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1">
              View All <span className="text-sm">→</span>
            </Link>
          </div>
          <div className="space-y-2">
            {routeStatus.map((shipment, index) => (
              <div key={index} className="flex items-center justify-between p-2.5 bg-[#0d1117] rounded-xl border border-white/5 hover:bg-white/5 transition-all duration-300">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{shipment.icon}</span>
                    <div>
                      <div className="text-white text-sm font-medium">{shipment.name}</div>
                      <div className="text-gray-400 text-xs">{shipment.route}</div>
                    </div>
                  </div>
                </div>
                <div className="text-right ml-3 flex-shrink-0">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    shipment.risk === 'Low' ? 'bg-green-500/20 text-green-400' :
                    shipment.risk === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                    shipment.risk === 'High' ? 'bg-orange-500/20 text-orange-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {shipment.risk}
                  </span>
                  <div className={`text-xs mt-0.5 ${
                    shipment.status === 'Delivered' ? 'text-green-400' :
                    shipment.status === 'In Transit' ? 'text-blue-400' :
                    'text-red-400'
                  }`}>
                    {shipment.status} • {shipment.score}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Health */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 hover:border-blue-500/30 transition-all duration-300">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-white">🛡️ System Health</h2>
            <span className="text-xs text-green-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
              Live
            </span>
          </div>
          <div className="space-y-2">
            {systemHealth.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-2.5 bg-[#0d1117] rounded-xl border border-white/5 hover:bg-white/5 transition-all duration-300">
                <div className="flex items-center gap-2">
                  <span className={`w-1.5 h-1.5 rounded-full ${
                    item.status === 'Operational' || item.status === 'Active' || item.status === 'Running' || item.status === 'Connected'
                      ? 'bg-green-400'
                      : item.status === 'Recalibrating' ? 'bg-yellow-400' : 'bg-red-400'
                  }`}></span>
                  <div>
                    <div className="text-white text-sm font-medium">{item.name}</div>
                    <div className="text-gray-400 text-xs">{item.uptime} uptime</div>
                  </div>
                </div>
                <span className={`text-xs px-3 py-0.5 rounded-full ${
                  item.status === 'Operational' || item.status === 'Active' || item.status === 'Running' || item.status === 'Connected'
                    ? 'bg-green-500/20 text-green-400'
                    : item.status === 'Recalibrating' ? 'bg-yellow-500/20 text-yellow-400'
                    : 'bg-red-500/20 text-red-400'
                }`}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Alerts & Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 hover:border-red-500/30 transition-all duration-300">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-white">🔔 Real-Time Alerts</h2>
            <Link to="/alerts" className="text-xs text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1">
              View All <span className="text-sm">→</span>
            </Link>
          </div>
          <div className="space-y-2 max-h-[240px] overflow-y-auto">
            {recentAlerts.map((alert, index) => (
              <div key={index} className="flex items-center justify-between p-2.5 bg-[#0d1117] rounded-xl border border-white/5 hover:bg-white/5 transition-all duration-300">
                <div className="flex-1 min-w-0">
                  <div className="text-white text-sm font-medium truncate">{alert.type}</div>
                  <div className="text-gray-400 text-xs truncate">📍 {alert.location}</div>
                </div>
                <div className="text-right ml-3 flex-shrink-0">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    alert.severity === 'High' ? 'bg-red-500/20 text-red-400' :
                    alert.severity === 'Medium' ? 'bg-orange-500/20 text-orange-400' :
                    alert.severity === 'Low' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-green-500/20 text-green-400'
                  }`}>
                    {alert.severity}
                  </span>
                  <div className="text-xs text-gray-500 mt-0.5">{alert.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 hover:border-purple-500/30 transition-all duration-300">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-white">📊 Business Metrics</h2>
            <span className="text-xs text-gray-400">Updated: {time}</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {quickStats.map((stat, index) => (
              <div key={index} className="p-3 bg-[#0d1117] rounded-xl border border-white/5 text-center hover:border-white/10 transition-all duration-300">
                <div className={`text-lg font-bold ${stat.color}`}>{stat.value}</div>
                <div className="text-xs text-gray-400 truncate">{stat.label}</div>
              </div>
            ))}
          </div>
          {/* Hardware Status - Agricultural Focus */}
          <div className="mt-4 p-3 bg-[#0d1117] rounded-xl border border-white/5">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400">Sensor Telemetry</span>
              <div className="flex items-center gap-3">
                <span className="text-xs flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
                  GPS
                </span>
                <span className="text-xs flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
                  MPU6050
                </span>
                <span className="text-xs flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-400"></span>
                  Temp/Humidity
                </span>
                <span className="text-xs flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
                  ESP32 Link
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Environmental Conditions - In-Transit Monitoring */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mt-6">
        {[
          { label: 'Avg Temp', value: '28°C', icon: '🌡️', color: 'text-orange-400' },
          { label: 'In-Transit Humidity', value: '62%', icon: '💧', color: 'text-blue-400' },
          { label: 'Vibration Avg', value: '1.8G', icon: '📊', color: 'text-cyan-400' },
          { label: 'Produce Condition', value: 'Good', icon: '📦', color: 'text-green-400' },
        ].map((item, index) => (
          <div key={index} className="p-3 md:p-4 bg-white/5 rounded-xl border border-white/5 text-center hover:border-white/10 transition-all duration-300">
            <div className="text-lg md:text-xl mb-1">{item.icon}</div>
            <div className={`text-lg md:text-xl font-bold ${item.color}`}>{item.value}</div>
            <div className="text-xs text-gray-400">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;