// src/pages/FarmerPlatform.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const FarmerPlatform = () => {
  const [selectedMonth, setSelectedMonth] = useState('August 2026');
  const [selectedShipment, setSelectedShipment] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Farmer profile data
  const farmerProfile = {
    name: 'Sita Vegetable Supply',
    id: 'F-2024-0082',
    location: 'Chitwan, Nepal',
    joinDate: 'January 2024',
    reliability: 92,
    verifiedActivity: 96,
    consistency: 89,
    performance: 94
  };

  // Monthly summary
  const monthlySummary = {
    totalSupplied: '1,240 kg',
    shipments: 18,
    successfulDeliveries: '96%',
    estimatedValue: 'NPR 186,000',
    activeTransporters: 4,
    incidents: 1
  };

  // Historical shipments
  const shipments = [
    {
      id: 'KT-2024-0842',
      crop: 'Tomatoes',
      quantity: '520 kg',
      origin: 'Chitwan',
      destination: 'Kathmandu',
      transporter: 'Ram Transport',
      date: 'Aug 15, 2026',
      status: 'Delivered',
      risk: 'Low',
      handlingScore: 92,
      events: 3
    },
    {
      id: 'KT-2024-0845',
      crop: 'Potatoes',
      quantity: '410 kg',
      origin: 'Chitwan',
      destination: 'Kathmandu',
      transporter: 'Shyam Transport',
      date: 'Aug 12, 2026',
      status: 'Delivered',
      risk: 'Medium',
      handlingScore: 78,
      events: 7
    },
    {
      id: 'KT-2024-0839',
      crop: 'Vegetables',
      quantity: '310 kg',
      origin: 'Chitwan',
      destination: 'Pokhara',
      transporter: 'Ram Transport',
      date: 'Aug 10, 2026',
      status: 'Delivered',
      risk: 'Low',
      handlingScore: 95,
      events: 1
    },
    {
      id: 'KT-2024-0847',
      crop: 'Tomatoes',
      quantity: '480 kg',
      origin: 'Chitwan',
      destination: 'Kathmandu',
      transporter: 'Hari Transport',
      date: 'Aug 8, 2026',
      status: 'Delivered',
      risk: 'High',
      handlingScore: 65,
      events: 12
    },
    {
      id: 'KT-2024-0850',
      crop: 'Cauliflower',
      quantity: '280 kg',
      origin: 'Chitwan',
      destination: 'Pokhara',
      transporter: 'Shyam Transport',
      date: 'Aug 5, 2026',
      status: 'Delivered',
      risk: 'Low',
      handlingScore: 94,
      events: 2
    }
  ];

  // Activity timeline
  const timeline = [
    { time: 'Today, 10:42 AM', event: 'Shipment started', detail: 'Kavre → Banepa' },
    { time: 'Today, 11:03 AM', event: '⚠️ Potential handling-risk event', detail: 'Location recorded' },
    { time: 'Today, 11:28 AM', event: 'Shipment delivered', detail: 'Successfully completed' },
    { time: 'Today, 11:29 AM', event: 'Delivery verified', detail: 'Status confirmed' },
    { time: 'Yesterday, 4:15 PM', event: 'Shipment completed', detail: 'KT-2024-0845' }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'Delivered': return 'bg-green-500/20 text-green-400';
      case 'In Transit': return 'bg-blue-500/20 text-blue-400';
      case 'Warning': return 'bg-yellow-500/20 text-yellow-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getRiskColor = (risk) => {
    switch(risk) {
      case 'Low': return 'text-green-400';
      case 'Medium': return 'text-yellow-400';
      case 'High': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  // Filter shipments by search
  const filteredShipments = shipments.filter(s =>
    s.crop.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.transporter.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4 md:p-6 min-h-screen bg-[#020617]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-white flex items-center gap-3">
            <span>👨‍🌾</span> Farmer Platform
            <span className="text-xs bg-green-500/20 px-3 py-1 rounded-full text-green-400">Verified Activity</span>
          </h1>
          <p className="text-gray-400 text-sm mt-1">Track your agricultural activity, shipments, and verified reputation</p>
        </div>
        <div className="flex items-center gap-3 mt-3 md:mt-0">
          <span className="text-xs text-green-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
            {farmerProfile.name}
          </span>
        </div>
      </div>

      {/* Farmer Profile Card */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">{farmerProfile.name}</h2>
            <p className="text-gray-400 text-sm">📍 {farmerProfile.location} • Member since {farmerProfile.joinDate}</p>
            <p className="text-gray-500 text-xs mt-1">ID: {farmerProfile.id}</p>
          </div>
          <div className="flex items-center gap-6 mt-4 md:mt-0">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">{farmerProfile.reliability}/100</div>
              <div className="text-xs text-gray-400">Reliability Score</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400">{farmerProfile.verifiedActivity}/100</div>
              <div className="text-xs text-gray-400">Verified Activity</div>
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Summary */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4 mb-6">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-white">{monthlySummary.totalSupplied}</div>
          <div className="text-xs text-gray-400">Goods Supplied</div>
        </div>
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-white">{monthlySummary.shipments}</div>
          <div className="text-xs text-gray-400">Shipments</div>
        </div>
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-green-400">{monthlySummary.successfulDeliveries}</div>
          <div className="text-xs text-gray-400">Successful Deliveries</div>
        </div>
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-emerald-400">{monthlySummary.estimatedValue}</div>
          <div className="text-xs text-gray-400">Estimated Trade Value</div>
        </div>
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-white">{monthlySummary.activeTransporters}</div>
          <div className="text-xs text-gray-400">Active Transporters</div>
        </div>
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-red-400">{monthlySummary.incidents}</div>
          <div className="text-xs text-gray-400">Transport Incidents</div>
        </div>
      </div>

      {/* Why Your Score Section */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-6">
        <h3 className="text-white font-semibold mb-3">📊 Why Your Score Is {farmerProfile.reliability}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="bg-[#0d1117] rounded-xl p-3 border border-green-500/20">
            <div className="flex items-center gap-2 text-green-400 text-sm">
              <span>+3</span> <span>12 successful deliveries</span>
            </div>
          </div>
          <div className="bg-[#0d1117] rounded-xl p-3 border border-green-500/20">
            <div className="flex items-center gap-2 text-green-400 text-sm">
              <span>+2</span> <span>Consistent transport activity</span>
            </div>
          </div>
          <div className="bg-[#0d1117] rounded-xl p-3 border border-green-500/20">
            <div className="flex items-center gap-2 text-green-400 text-sm">
              <span>+1</span> <span>Low impact frequency</span>
            </div>
          </div>
          <div className="bg-[#0d1117] rounded-xl p-3 border border-red-500/20">
            <div className="flex items-center gap-2 text-red-400 text-sm">
              <span>-1</span> <span>2 route deviations</span>
            </div>
          </div>
          <div className="bg-[#0d1117] rounded-xl p-3 border border-red-500/20 col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 text-red-400 text-sm">
              <span>-2</span> <span>Higher-than-average impact events on one shipment</span>
            </div>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-2">Score generated from verified platform activity • Updated in real-time</p>
      </div>

      {/* Activity Timeline */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-semibold">📋 Activity Timeline</h3>
          <span className="text-xs text-gray-400">Real-time</span>
        </div>
        <div className="space-y-3">
          {timeline.map((item, index) => (
            <div key={index} className="flex items-start gap-3 p-2 bg-[#0d1117] rounded-lg border border-white/5">
              <div className="w-20 text-xs text-gray-500 flex-shrink-0">{item.time}</div>
              <div className="flex-1">
                <div className="text-white text-sm">{item.event}</div>
                <div className="text-gray-400 text-xs">{item.detail}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Search & Historical Shipments */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
          <h3 className="text-white font-semibold">📦 Historical Shipments</h3>
          <div className="flex flex-wrap gap-2">
            <input
              type="text"
              placeholder="🔍 Search shipments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-[#0d1117] border border-white/10 rounded-lg px-3 py-1.5 text-white text-sm placeholder-gray-400 focus:outline-none focus:border-green-500/50 transition-all duration-300 w-full md:w-48"
            />
            <select 
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="bg-[#0d1117] border border-white/10 rounded-lg px-3 py-1.5 text-white text-sm focus:outline-none focus:border-green-500/50"
            >
              <option>August 2026</option>
              <option>July 2026</option>
              <option>June 2026</option>
            </select>
          </div>
        </div>
        <div className="space-y-3">
          {filteredShipments.map((shipment) => (
            <div
              key={shipment.id}
              className={`p-4 bg-[#0d1117] rounded-xl border border-white/5 hover:border-white/10 transition-all duration-300 cursor-pointer ${
                selectedShipment === shipment.id ? 'border-green-500/30' : ''
              }`}
              onClick={() => setSelectedShipment(selectedShipment === shipment.id ? null : shipment.id)}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🌾</span>
                    <span className="text-white font-medium">{shipment.crop}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(shipment.status)}`}>
                      {shipment.status}
                    </span>
                    <span className={`text-xs font-medium ${getRiskColor(shipment.risk)}`}>
                      • {shipment.risk} Risk
                    </span>
                  </div>
                  <div className="text-gray-400 text-xs mt-1">
                    📍 {shipment.origin} → {shipment.destination} • {shipment.quantity} • {shipment.date}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-white text-sm font-medium">Score: {shipment.handlingScore}/100</div>
                  <div className="text-gray-400 text-xs">{shipment.events} events recorded</div>
                </div>
              </div>

              {selectedShipment === shipment.id && (
                <div className="mt-3 pt-3 border-t border-white/10">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div>
                      <div className="text-xs text-gray-400">Transporter</div>
                      <div className="text-white text-sm">{shipment.transporter}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-400">Handling Score</div>
                      <div className={`text-sm font-bold ${
                        shipment.handlingScore > 80 ? 'text-green-400' :
                        shipment.handlingScore > 60 ? 'text-yellow-400' :
                        'text-red-400'
                      }`}>{shipment.handlingScore}/100</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-400">Risk Level</div>
                      <div className={`text-sm font-bold ${getRiskColor(shipment.risk)}`}>{shipment.risk}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-400">Events</div>
                      <div className="text-white text-sm">{shipment.events} recorded</div>
                    </div>
                  </div>
                  <div className="mt-2 flex gap-2">
                    <button className="px-3 py-1 bg-blue-600/20 border border-blue-500/30 rounded-lg text-blue-400 hover:bg-blue-600/30 text-xs transition-all duration-300">
                      View Details
                    </button>
                    <button className="px-3 py-1 bg-green-600/20 border border-green-500/30 rounded-lg text-green-400 hover:bg-green-600/30 text-xs transition-all duration-300">
                      View Route
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        {filteredShipments.length === 0 && (
          <div className="text-center py-8">
            <div className="text-4xl mb-2">🌾</div>
            <p className="text-gray-400 text-sm">No shipments found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FarmerPlatform;