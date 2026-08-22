// src/pages/Analytical.jsx
import React, { useState } from 'react';

const Analytical = () => {
  const [timeframe, setTimeframe] = useState('24h');
  const [selectedMetric, setSelectedMetric] = useState('handlingScore');
  const [selectedRegion, setSelectedRegion] = useState('all');

  // Agricultural Business Metrics
  const metrics = [
    { 
      title: 'Avg Handling Score', 
      value: '72/100', 
      icon: '📦', 
      color: 'from-green-500 to-emerald-500', 
      change: '+5%',
      status: 'Good'
    },
    { 
      title: 'Business Reliability', 
      value: '68/100', 
      icon: '📈', 
      color: 'from-blue-500 to-purple-500', 
      change: '+12%',
      status: 'Improving'
    },
    { 
      title: 'Finance Readiness', 
      value: '58/100', 
      icon: '💰', 
      color: 'from-orange-500 to-amber-500', 
      change: '+8%',
      status: 'Developing'
    },
    { 
      title: 'Shipment Success Rate', 
      value: '89%', 
      icon: '✅', 
      color: 'from-green-500 to-teal-500', 
      change: '+3%',
      status: 'Stable'
    },
  ];

  // Handling Risk Predictions
  const predictions = [
    { time: 'Now', handlingScore: 72, deliveryReliability: 89, financeReadiness: 58, confidence: 91 },
    { time: '1 Week', handlingScore: 68, deliveryReliability: 91, financeReadiness: 62, confidence: 88 },
    { time: '2 Weeks', handlingScore: 65, deliveryReliability: 87, financeReadiness: 67, confidence: 85 },
    { time: '3 Weeks', handlingScore: 70, deliveryReliability: 84, financeReadiness: 71, confidence: 82 },
    { time: '1 Month', handlingScore: 74, deliveryReliability: 82, financeReadiness: 76, confidence: 79 },
    { time: '2 Months', handlingScore: 78, deliveryReliability: 80, financeReadiness: 81, confidence: 76 },
  ];

  // Top Handling Risk Factors
  const topRisks = [
    { 
      route: 'Chitwan → Kathmandu', 
      risk: 'Vibration/Shock Events', 
      score: 82, 
      segment: 'Mugling - Narayanghat',
      incidents: 7,
      severity: 'High',
      icon: '⚠️'
    },
    { 
      route: 'Pokhara → Kathmandu', 
      risk: 'Handling Instability', 
      score: 78, 
      segment: 'Pokhara - Mugling',
      incidents: 4,
      severity: 'High',
      icon: '🔄'
    },
    { 
      route: 'Birgunj → Kathmandu', 
      risk: 'Temperature Fluctuation', 
      score: 65, 
      segment: 'Birgunj - Hetauda',
      incidents: 6,
      severity: 'Medium',
      icon: '🌡️'
    },
    { 
      route: 'Hetauda → Kathmandu', 
      risk: 'Route Deviation', 
      score: 58, 
      segment: 'Hetauda - Kathmandu',
      incidents: 9,
      severity: 'Medium',
      icon: '📍'
    },
    { 
      route: 'Nepalgunj → Kathmandu', 
      risk: 'Loading Pattern', 
      score: 43, 
      segment: 'Nepalgunj - Surkhet',
      incidents: 3,
      severity: 'Low',
      icon: '📦'
    },
  ];

  // Regional Agricultural Corridors
  const routeRegions = [
    { name: 'Central Corridor', routes: ['Chitwan', 'Kathmandu'], score: 68, trend: 'down' },
    { name: 'Western Corridor', routes: ['Pokhara', 'Kathmandu'], score: 72, trend: 'stable' },
    { name: 'Terai Corridor', routes: ['Bardiya', 'Nepalgunj'], score: 81, trend: 'up' },
    { name: 'Mountain Corridor', routes: ['Dhading', 'Kathmandu'], score: 54, trend: 'down' },
    { name: 'Mid-Western Corridor', routes: ['Surkhet', 'Jumla'], score: 76, trend: 'up' },
  ];

  const getSeverityColor = (severity) => {
    switch(severity) {
      case 'High': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'Medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Low': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    }
  };

  const getTrendIcon = (trend) => {
    switch(trend) {
      case 'up': return '📈';
      case 'down': return '📉';
      default: return '➡️';
    }
  };

  const getTrendColor = (trend) => {
    switch(trend) {
      case 'up': return 'text-green-400';
      case 'down': return 'text-red-400';
      default: return 'text-blue-400';
    }
  };

  return (
    <div className="p-4 md:p-6 min-h-screen bg-[#020617]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-white flex items-center gap-3">
            <span>📊</span> Business Intelligence
            <span className="text-xs bg-green-500/20 px-3 py-1 rounded-full text-green-400 ml-2">AI-Powered</span>
          </h1>
          <p className="text-gray-400 mt-2 text-sm md:text-lg">Agricultural handling, reliability & finance readiness analytics</p>
        </div>
        <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
          <select 
            className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-sm"
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
          >
            <option value="all">All Corridors</option>
            <option value="central">Central Corridor</option>
            <option value="western">Western Corridor</option>
            <option value="terai">Terai Corridor</option>
            <option value="mountain">Mountain Corridor</option>
          </select>
          <button
            onClick={() => setTimeframe('24h')}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
              timeframe === '24h' 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' 
                : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            24 Hours
          </button>
          <button
            onClick={() => setTimeframe('7d')}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
              timeframe === '7d' 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' 
                : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            7 Days
          </button>
          <button
            onClick={() => setTimeframe('30d')}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
              timeframe === '30d' 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' 
                : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            30 Days
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 md:p-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-white/10 cursor-pointer overflow-hidden"
          >
            <div className={`absolute inset-0 bg-gradient-to-r ${metric.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-2xl`}></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl md:text-3xl">{metric.icon}</span>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                  metric.change.includes('+') 
                    ? 'bg-green-500/20 text-green-400' 
                    : 'bg-red-500/20 text-red-400'
                }`}>
                  {metric.change}
                </span>
              </div>
              <h3 className="text-gray-400 text-xs md:text-sm font-medium uppercase tracking-wider">{metric.title}</h3>
              <p className="text-xl md:text-2xl font-bold text-white mt-1">{metric.value}</p>
              <span className="text-xs text-gray-400 mt-1 block">{metric.status}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Prediction Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Business Performance Forecast */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">📈 Business Performance Forecast</h2>
            <span className="text-xs text-gray-400">AI Prediction Model v1.0</span>
          </div>
          <div className="space-y-3">
            {predictions.map((pred, index) => (
              <div key={index}>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">{pred.time}</span>
                  <div className="flex items-center gap-3">
                    <span className={`${pred.handlingScore > 70 ? 'text-green-400' : pred.handlingScore > 50 ? 'text-yellow-400' : 'text-red-400'}`}>
                      Handling: {pred.handlingScore}
                    </span>
                    <span className="text-gray-500 text-xs">|</span>
                    <span className="text-blue-400 text-xs">
                      Readiness: {pred.financeReadiness}
                    </span>
                  </div>
                </div>
                <div className="mt-1 w-full bg-white/10 rounded-full h-2 overflow-hidden">
                  <div 
                    className={`h-2 rounded-full transition-all duration-500 ${
                      pred.handlingScore > 70 ? 'bg-gradient-to-r from-green-400 to-emerald-400' : 
                      pred.handlingScore > 50 ? 'bg-gradient-to-r from-yellow-400 to-orange-400' : 
                      'bg-gradient-to-r from-red-400 to-orange-400'
                    }`}
                    style={{ width: `${pred.handlingScore}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Handling Risk Factors */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">⚠️ Top Handling Risk Factors</h2>
            <span className="text-xs text-gray-400">Real-time Monitoring</span>
          </div>
          <div className="space-y-3">
            {topRisks.map((risk, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-[#0d1117] rounded-xl border border-white/5 hover:border-white/10 transition-all">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{risk.icon}</span>
                  <div>
                    <div className="text-white font-medium text-sm">{risk.route}</div>
                    <div className="text-gray-400 text-xs">{risk.segment} • {risk.incidents} events</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs px-2 py-1 rounded-full border ${getSeverityColor(risk.severity)}`}>
                    {risk.severity}
                  </span>
                  <span className="text-white font-bold text-sm">{risk.score}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Regional Agricultural Corridor Analysis */}
      <div className="grid grid-cols-1 gap-6 mb-6">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">🏞️ Agricultural Corridor Analysis</h2>
            <span className="text-xs text-gray-400">Last 24 hours</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {routeRegions.map((region, index) => (
              <div key={index} className="p-4 bg-[#0d1117] rounded-xl border border-white/5 hover:border-white/10 transition-all">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-white font-medium">{region.name}</h3>
                  <span className={`text-sm font-bold ${getTrendColor(region.trend)}`}>
                    {getTrendIcon(region.trend)} {region.score}%
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {region.routes.map((route, idx) => (
                    <span key={idx} className="text-xs px-2 py-1 bg-white/5 rounded-full text-gray-300">
                      {route}
                    </span>
                  ))}
                </div>
                <div className="mt-3 w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${
                      region.score > 75 ? 'bg-green-400' : 
                      region.score > 60 ? 'bg-yellow-400' : 'bg-red-400'
                    }`}
                    style={{ width: `${region.score}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Business Intelligence Report */}
      <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
        <div className="flex flex-col md:flex-row items-start gap-4">
          <div className="text-3xl md:text-4xl">🤖</div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <h2 className="text-xl font-semibold text-white">AI Business Intelligence Report</h2>
              <span className="text-xs bg-blue-500/20 px-3 py-1 rounded-full text-blue-400">Updated: {new Date().toLocaleTimeString()}</span>
            </div>
            <p className="text-gray-300 leading-relaxed text-sm md:text-base">
              Based on sensor data from 12 active shipments, the system indicates a 
              <span className="text-green-400 font-semibold"> 5% improvement in handling scores</span> over the past 24 hours. 
              Business reliability is trending upward at 68/100, with finance readiness showing steady progress at 58/100. 
              The central corridor shows the most improvement with a 12% increase in delivery consistency.
              {selectedRegion !== 'all' && ` Analysis focused on ${selectedRegion} corridor.`}
            </p>
            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="p-3 bg-[#0d1117] rounded-lg border border-white/5">
                <div className="text-xs text-gray-400">Data Points</div>
                <div className="text-white font-bold">12,847</div>
              </div>
              <div className="p-3 bg-[#0d1117] rounded-lg border border-white/5">
                <div className="text-xs text-gray-400">Prediction Accuracy</div>
                <div className="text-green-400 font-bold">89.4%</div>
              </div>
              <div className="p-3 bg-[#0d1117] rounded-lg border border-white/5">
                <div className="text-xs text-gray-400">Model Version</div>
                <div className="text-blue-400 font-bold">KrishiTrust AI v1.0</div>
              </div>
              <div className="p-3 bg-[#0d1117] rounded-lg border border-white/5">
                <div className="text-xs text-gray-400">Active Shipments</div>
                <div className="text-white font-bold">12</div>
              </div>
            </div>
            <div className="mt-3 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
              <p className="text-green-400 text-sm flex items-center gap-2">
                <i className="fas fa-lightbulb"></i>
                <span>🌾 Recommendation: Consider financial literacy training to improve finance readiness score. 
                Current profile shows strong handling performance with opportunity for better business documentation. 
                Learn more through the KrishiTrust Education module.</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Hardware Integration Status */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-blue-400">📡</span>
            <span className="text-white text-sm">GPS Tracking</span>
          </div>
          <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">Active</span>
        </div>
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-purple-400">📊</span>
            <span className="text-white text-sm">MPU6050 Sensors</span>
          </div>
          <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">Online</span>
        </div>
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-yellow-400">🌡️</span>
            <span className="text-white text-sm">Environmental</span>
          </div>
          <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">Online</span>
        </div>
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-red-400">⚡</span>
            <span className="text-white text-sm">ESP32 Link</span>
          </div>
          <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full">Connected</span>
        </div>
      </div>
    </div>
  );
};

export default Analytical;