// src/pages/Reputation.jsx
import React, { useState } from 'react';

const Reputation = () => {
  const [activeUserType, setActiveUserType] = useState('farmer');

  const farmerReputation = {
    name: 'Sita Vegetable Supply',
    id: 'F-2024-0082',
    type: 'Farmer',
    reliability: 92,
    verifiedActivity: 96,
    consistency: 89,
    performance: 94,
    shipments: 38,
    goodsSupplied: '4.8 tonnes',
    deliveryCompletion: '95%',
    activeSince: 'January 2024'
  };

  const driverReputation = {
    name: 'Ram Transport',
    id: 'D-2024-0047',
    type: 'Transporter',
    reliability: 94,
    verifiedActivity: 95,
    consistency: 92,
    performance: 96,
    trips: 142,
    goodsTransported: '31.2 tonnes',
    deliveryCompletion: '97%',
    activeSince: 'March 2024'
  };

  const currentData = activeUserType === 'farmer' ? farmerReputation : driverReputation;

  const scoreBreakdown = {
    farmer: {
      positive: [
        { score: '+3', reason: '12 successful deliveries' },
        { score: '+2', reason: 'Consistent transport activity' },
        { score: '+1', reason: 'Low impact frequency' }
      ],
      negative: [
        { score: '-1', reason: '2 route deviations' },
        { score: '-2', reason: 'Higher-than-average impact events' }
      ]
    },
    driver: {
      positive: [
        { score: '+4', reason: '42 completed trips this month' },
        { score: '+3', reason: '94% route compliance' },
        { score: '+2', reason: 'Low impact frequency overall' }
      ],
      negative: [
        { score: '-2', reason: '7 impact events on TR-2024-0845' },
        { score: '-1', reason: '12 impact events on TR-2024-0847' }
      ]
    }
  };

  const breakdown = activeUserType === 'farmer' ? scoreBreakdown.farmer : scoreBreakdown.driver;

  return (
    <div className="p-4 md:p-6 min-h-screen bg-[#020617]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-white flex items-center gap-3">
            <span>⭐</span> Verified Reputation
            <span className="text-xs bg-green-500/20 px-3 py-1 rounded-full text-green-400">Operational Reliability</span>
          </h1>
          <p className="text-gray-400 text-sm mt-1">Verified platform activity converted into measurable reliability</p>
        </div>
        <div className="flex items-center gap-3 mt-3 md:mt-0">
          <span className="text-xs text-gray-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
            Score generated from verified platform activity
          </span>
        </div>
      </div>

      {/* User Type Toggle */}
      <div className="flex flex-wrap gap-2 mb-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-1">
        <button onClick={() => setActiveUserType('farmer')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${activeUserType === 'farmer' ? 'bg-green-600 text-white shadow-lg shadow-green-500/20' : 'text-gray-400 hover:text-white hover:bg-white/10'}`}>
          👨‍🌾 Farmer View
        </button>
        <button onClick={() => setActiveUserType('driver')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${activeUserType === 'driver' ? 'bg-green-600 text-white shadow-lg shadow-green-500/20' : 'text-gray-400 hover:text-white hover:bg-white/10'}`}>
          🚛 Transporter View
        </button>
      </div>

      {/* Reputation Score Card */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">{currentData.name}</h2>
            <p className="text-gray-400 text-sm">{currentData.type} • ID: {currentData.id}</p>
            <p className="text-gray-500 text-xs">Active since {currentData.activeSince}</p>
          </div>
          <div className="text-center mt-4 md:mt-0">
            <div className="text-5xl font-bold text-green-400">{currentData.reliability}/100</div>
            <div className="text-xs text-gray-400">VERIFIED REPUTATION</div>
          </div>
        </div>
      </div>

      {/* Score Components */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-blue-400">{currentData.verifiedActivity}/100</div>
          <div className="text-xs text-gray-400">Verified Activity</div>
        </div>
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-emerald-400">{currentData.consistency}/100</div>
          <div className="text-xs text-gray-400">Consistency</div>
        </div>
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-purple-400">{currentData.performance}/100</div>
          <div className="text-xs text-gray-400">Performance</div>
        </div>
      </div>

      {/* Activity Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 text-center">
          <div className="text-xl font-bold text-white">{currentData.shipments || currentData.trips}</div>
          <div className="text-xs text-gray-400">{activeUserType === 'farmer' ? 'Shipments' : 'Trips'}</div>
        </div>
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 text-center">
          <div className="text-xl font-bold text-white">{currentData.goodsSupplied || currentData.goodsTransported}</div>
          <div className="text-xs text-gray-400">{activeUserType === 'farmer' ? 'Goods Supplied' : 'Goods Transported'}</div>
        </div>
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 text-center">
          <div className="text-xl font-bold text-green-400">{currentData.deliveryCompletion}</div>
          <div className="text-xs text-gray-400">Delivery Completion</div>
        </div>
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 text-center">
          <div className="text-xl font-bold text-emerald-400">{currentData.reliability}/100</div>
          <div className="text-xs text-gray-400">Reliability</div>
        </div>
      </div>

      {/* Why Your Score Section */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-6">
        <h3 className="text-white font-semibold mb-4">📊 Why Your Score Is {currentData.reliability}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="space-y-2">
            <p className="text-green-400 text-sm font-medium">Positive Factors</p>
            {breakdown.positive.map((item, index) => (
              <div key={index} className="bg-[#0d1117] rounded-xl p-2.5 border border-green-500/20">
                <div className="flex items-center gap-2 text-green-400 text-sm">
                  <span className="font-bold">{item.score}</span>
                  <span>{item.reason}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="space-y-2">
            <p className="text-red-400 text-sm font-medium">Factors to Improve</p>
            {breakdown.negative.map((item, index) => (
              <div key={index} className="bg-[#0d1117] rounded-xl p-2.5 border border-red-500/20">
                <div className="flex items-center gap-2 text-red-400 text-sm">
                  <span className="font-bold">{item.score}</span>
                  <span>{item.reason}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-3">Score generated from verified platform activity • Updated in real-time</p>
      </div>

      {/* Sponsorship Readiness */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
        <h3 className="text-white font-semibold mb-3">🎯 Sponsorship Readiness</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          <div className="bg-[#0d1117] rounded-xl p-3 text-center border border-white/5">
            <div className="text-lg font-bold text-green-400">{currentData.reliability}</div>
            <div className="text-xs text-gray-400">Reliability</div>
          </div>
          <div className="bg-[#0d1117] rounded-xl p-3 text-center border border-white/5">
            <div className="text-lg font-bold text-blue-400">{currentData.verifiedActivity}</div>
            <div className="text-xs text-gray-400">Activity</div>
          </div>
          <div className="bg-[#0d1117] rounded-xl p-3 text-center border border-white/5">
            <div className="text-lg font-bold text-emerald-400">{currentData.consistency}</div>
            <div className="text-xs text-gray-400">Consistency</div>
          </div>
          <div className="bg-[#0d1117] rounded-xl p-3 text-center border border-white/5">
            <div className="text-lg font-bold text-purple-400">{currentData.performance}</div>
            <div className="text-xs text-gray-400">Performance</div>
          </div>
        </div>
        <div className="p-4 bg-[#0d1117] rounded-xl border border-white/5 text-center">
          <span className="text-emerald-400 font-semibold text-sm">🟢 STATUS: Highly suitable for sponsorship</span>
          <p className="text-gray-400 text-xs mt-1">Score generated from verified platform activity</p>
        </div>
      </div>
    </div>
  );
};

export default Reputation;