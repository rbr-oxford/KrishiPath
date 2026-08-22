// src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AIAssistant from '../components/AIAssistant';

const Dashboard = () => {
  const [time, setTime] = useState('');
  const [activeAlerts, setActiveAlerts] = useState(7);
  const [activeShipments] = useState(12);
  const [totalShipments] = useState(48);
  const [handlingScore, setHandlingScore] = useState('72');
  const [businessReliability, setBusinessReliability] = useState('68');
  const [financeReadiness, setFinanceReadiness] = useState('58');
  const [recentAlerts, setRecentAlerts] = useState([
    { type: '⚠️ High Handling Risk', location: 'Tomatoes • Chitwan → Kathmandu', time: '2 min ago' },
    { type: '📦 Shipment Delayed', location: 'Cauliflower • Pokhara → Kathmandu', time: '15 min ago' },
    { type: '📈 Profile Updated', location: 'Farm #F-2024-0082', time: '28 min ago' },
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

  // Update metrics every 10 seconds
  useEffect(() => {
    const updateInterval = setInterval(() => {
      // Update handling score
      const newScore = Math.floor(Math.random() * 15 + 65);
      setHandlingScore(String(newScore));
      
      // Update business reliability
      const newReliability = Math.floor(Math.random() * 15 + 60);
      setBusinessReliability(String(newReliability));
      
      // Update finance readiness
      const newReadiness = Math.floor(Math.random() * 15 + 50);
      setFinanceReadiness(String(newReadiness));

      // Update alerts
      const alertTypes = [
        '⚠️ High Handling Risk',
        '📦 Shipment Delayed',
        '📈 Profile Updated',
        '✅ Delivery Verified',
        '🔔 New Alert'
      ];
      const locations = [
        'Tomatoes • Chitwan → Kathmandu',
        'Cauliflower • Pokhara → Kathmandu',
        'Mangoes • Birgunj → Kathmandu',
        'Potatoes • Hetauda → Kathmandu'
      ];
      
      setRecentAlerts(prev => {
        const newAlert = {
          type: alertTypes[Math.floor(Math.random() * alertTypes.length)],
          location: locations[Math.floor(Math.random() * locations.length)],
          time: 'Just now'
        };
        return [newAlert, ...prev.slice(0, 2)];
      });

      setActiveAlerts(Math.floor(Math.random() * 6 + 2));
    }, 10000);
    return () => clearInterval(updateInterval);
  }, []);

  // Quick access cards
  const quickAccess = [
    { path: '/farmers', label: 'Farmers', icon: '👨‍🌾' },
    { path: '/drivers', label: 'Drivers', icon: '🚛' },
    { path: '/companies', label: 'Companies', icon: '🏢' },
    { path: '/sponsorships', label: 'Sponsorships', icon: '🤝' },
  ];

  // Shipment data
  const shipments = [
    { name: 'Tomatoes', route: 'Chitwan → Kathmandu', risk: 'High', icon: '🍅' },
    { name: 'Cauliflower', route: 'Pokhara → Kathmandu', risk: 'Medium', icon: '🥦' },
    { name: 'Mangoes', route: 'Birgunj → Kathmandu', risk: 'Low', icon: '🥭' },
    { name: 'Potatoes', route: 'Hetauda → Kathmandu', risk: 'Critical', icon: '🥔' },
  ];

  const getRiskColor = (risk) => {
    switch(risk) {
      case 'Critical': return 'bg-red-500/20 text-red-400';
      case 'High': return 'bg-orange-500/20 text-orange-400';
      case 'Medium': return 'bg-yellow-500/20 text-yellow-400';
      case 'Low': return 'bg-green-500/20 text-green-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="p-4 md:p-6 min-h-screen bg-[#020617]">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            🌾 KrishiTrust
            <span className="text-xs bg-green-500/20 px-2 py-0.5 rounded-full text-green-400 ml-2">LIVE</span>
          </h1>
          <p className="text-gray-400 text-sm">Agricultural Value & Finance Intelligence</p>
        </div>
        <div className="text-gray-400 text-sm bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
          {time}
        </div>
      </div>

      {/* Quick Access - 4 Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {quickAccess.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="bg-white/5 border border-white/10 rounded-xl p-4 text-center hover:border-green-500/30 hover:bg-white/10 transition-all duration-300"
          >
            <div className="text-2xl mb-1">{item.icon}</div>
            <div className="text-white text-sm font-medium">{item.label}</div>
          </Link>
        ))}
      </div>

      {/* 3 Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 text-center">
          <div className="text-3xl font-bold text-green-400">{handlingScore}/100</div>
          <div className="text-xs text-gray-400 mt-1">Handling Score</div>
        </div>
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 text-center">
          <div className="text-3xl font-bold text-blue-400">{businessReliability}/100</div>
          <div className="text-xs text-gray-400 mt-1">Business Reliability</div>
        </div>
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 text-center">
          <div className="text-3xl font-bold text-yellow-400">{financeReadiness}/100</div>
          <div className="text-xs text-gray-400 mt-1">Finance Readiness</div>
        </div>
      </div>

      {/* Main Grid - 2 Columns + AI Assistant */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Alerts & Shipments */}
        <div className="lg:col-span-2 space-y-6">
          {/* Recent Alerts */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-white font-semibold">🔔 Recent Alerts</h2>
              <Link to="/alerts" className="text-xs text-blue-400 hover:text-blue-300">View All →</Link>
            </div>
            <div className="space-y-2">
              {recentAlerts.map((alert, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-[#0d1117] rounded-xl border border-white/5 hover:border-white/10 transition-all duration-300">
                  <div>
                    <div className="text-white text-sm font-medium">{alert.type}</div>
                    <div className="text-gray-400 text-xs">{alert.location}</div>
                  </div>
                  <div className="text-xs text-gray-500">{alert.time}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Active Shipments */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-white font-semibold">🚛 Active Shipments</h2>
              <Link to="/map" className="text-xs text-blue-400 hover:text-blue-300">View Map →</Link>
            </div>
            <div className="space-y-2">
              {shipments.map((shipment, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-[#0d1117] rounded-xl border border-white/5 hover:border-white/10 transition-all duration-300">
                  <div>
                    <div className="text-white text-sm font-medium">{shipment.icon} {shipment.name}</div>
                    <div className="text-gray-400 text-xs">{shipment.route}</div>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${getRiskColor(shipment.risk)}`}>
                    {shipment.risk} Risk
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - AI Assistant */}
        <div className="lg:col-span-1">
          <AIAssistant />
        </div>
      </div>

      {/* Status Bar */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-center justify-between">
          <span className="text-gray-400 text-xs">System</span>
          <span className="text-xs text-green-400">● Online</span>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-center justify-between">
          <span className="text-gray-400 text-xs">Shipments</span>
          <span className="text-xs text-white">{totalShipments} total</span>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-center justify-between">
          <span className="text-gray-400 text-xs">Active Alerts</span>
          <span className="text-xs text-red-400">{activeAlerts}</span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;