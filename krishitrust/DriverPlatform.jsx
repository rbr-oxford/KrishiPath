// src/pages/DriverPlatform.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const DriverPlatform = () => {
  const [selectedMonth, setSelectedMonth] = useState('August 2026');
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Driver profile data
  const driverProfile = {
    name: 'Ram Transport',
    id: 'D-2024-0047',
    vehicle: 'Tata Ace (BA 1 KHA 1234)',
    joinDate: 'March 2024',
    reliability: 94,
    verifiedTrips: 142,
    goodsTransported: '31,200 kg',
    deliveryCompletion: '97%',
    handlingPerformance: '94%'
  };

  // Monthly summary
  const monthlySummary = {
    trips: 42,
    goodsTransported: '8,450 kg',
    successfulDeliveries: 40,
    incidents: 2,
    avgTripTime: '47 min',
    routeCompliance: '94%'
  };

  // Historical trips
  const trips = [
    {
      id: 'TR-2024-0842',
      from: 'Chitwan',
      to: 'Kathmandu',
      farmer: 'Sita Vegetable Supply',
      goods: 'Tomatoes',
      quantity: '520 kg',
      date: 'Aug 15, 2026',
      status: 'Completed',
      duration: '6.5 hrs',
      handlingScore: 92,
      impacts: 3,
      vibration: 'Moderate',
      routeCompliance: '98%'
    },
    {
      id: 'TR-2024-0845',
      from: 'Chitwan',
      to: 'Kathmandu',
      farmer: 'Krishna Farm',
      goods: 'Potatoes',
      quantity: '410 kg',
      date: 'Aug 12, 2026',
      status: 'Completed',
      duration: '7.2 hrs',
      handlingScore: 78,
      impacts: 7,
      vibration: 'High',
      routeCompliance: '92%'
    },
    {
      id: 'TR-2024-0839',
      from: 'Chitwan',
      to: 'Pokhara',
      farmer: 'Sita Vegetable Supply',
      goods: 'Vegetables',
      quantity: '310 kg',
      date: 'Aug 10, 2026',
      status: 'Completed',
      duration: '5.0 hrs',
      handlingScore: 95,
      impacts: 1,
      vibration: 'Low',
      routeCompliance: '100%'
    },
    {
      id: 'TR-2024-0847',
      from: 'Hetauda',
      to: 'Kathmandu',
      farmer: 'Hari Farm',
      goods: 'Potatoes',
      quantity: '650 kg',
      date: 'Aug 8, 2026',
      status: 'Completed',
      duration: '5.8 hrs',
      handlingScore: 65,
      impacts: 12,
      vibration: 'High',
      routeCompliance: '85%'
    }
  ];

  // Activity timeline
  const timeline = [
    { time: 'Today, 10:42 AM', event: 'Trip started', detail: 'Chitwan → Kathmandu' },
    { time: 'Today, 11:03 AM', event: '⚠️ Potential handling-risk event', detail: 'Impact detected' },
    { time: 'Today, 11:28 AM', event: 'Trip completed', detail: 'Successfully delivered' },
    { time: 'Today, 11:29 AM', event: 'Delivery verified', detail: 'Farmer confirmed' },
    { time: 'Yesterday, 4:15 PM', event: 'Trip completed', detail: 'TR-2024-0845' }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'Completed': return 'bg-green-500/20 text-green-400';
      case 'In Transit': return 'bg-blue-500/20 text-blue-400';
      case 'Warning': return 'bg-yellow-500/20 text-yellow-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  // Filter trips by search
  const filteredTrips = trips.filter(t =>
    t.goods.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.to.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.farmer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4 md:p-6 min-h-screen bg-[#020617]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-white flex items-center gap-3">
            <span>🚛</span> Driver Platform
            <span className="text-xs bg-green-500/20 px-3 py-1 rounded-full text-green-400">Verified Activity</span>
          </h1>
          <p className="text-gray-400 text-sm mt-1">Track your transport activity, trips, and verified reputation</p>
        </div>
        <div className="flex items-center gap-3 mt-3 md:mt-0">
          <span className="text-xs text-green-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
            {driverProfile.name}
          </span>
        </div>
      </div>

      {/* Driver Profile Card */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">{driverProfile.name}</h2>
            <p className="text-gray-400 text-sm">🚗 {driverProfile.vehicle}</p>
            <p className="text-gray-500 text-xs mt-1">ID: {driverProfile.id} • Member since {driverProfile.joinDate}</p>
          </div>
          <div className="flex items-center gap-6 mt-4 md:mt-0">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">{driverProfile.reliability}/100</div>
              <div className="text-xs text-gray-400">Transporter Reliability</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400">{driverProfile.verifiedTrips}</div>
              <div className="text-xs text-gray-400">Verified Trips</div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4 pt-4 border-t border-white/10">
          <div className="text-center">
            <div className="text-sm font-bold text-white">{driverProfile.goodsTransported}</div>
            <div className="text-xs text-gray-400">Goods Transported</div>
          </div>
          <div className="text-center">
            <div className="text-sm font-bold text-green-400">{driverProfile.deliveryCompletion}</div>
            <div className="text-xs text-gray-400">Delivery Completion</div>
          </div>
          <div className="text-center">
            <div className="text-sm font-bold text-emerald-400">{driverProfile.handlingPerformance}</div>
            <div className="text-xs text-gray-400">Handling Performance</div>
          </div>
        </div>
      </div>

      {/* Monthly Summary */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4 mb-6">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-white">{monthlySummary.trips}</div>
          <div className="text-xs text-gray-400">Trips</div>
        </div>
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-white">{monthlySummary.goodsTransported}</div>
          <div className="text-xs text-gray-400">Goods Transported</div>
        </div>
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-green-400">{monthlySummary.successfulDeliveries}</div>
          <div className="text-xs text-gray-400">Successful Deliveries</div>
        </div>
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-red-400">{monthlySummary.incidents}</div>
          <div className="text-xs text-gray-400">Incidents</div>
        </div>
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-white">{monthlySummary.avgTripTime}</div>
          <div className="text-xs text-gray-400">Avg Trip Time</div>
        </div>
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-emerald-400">{monthlySummary.routeCompliance}</div>
          <div className="text-xs text-gray-400">Route Compliance</div>
        </div>
      </div>

      {/* Why Your Score Section */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-6">
        <h3 className="text-white font-semibold mb-3">📊 Why Your Score Is {driverProfile.reliability}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="bg-[#0d1117] rounded-xl p-3 border border-green-500/20">
            <div className="flex items-center gap-2 text-green-400 text-sm">
              <span>+4</span> <span>42 completed trips this month</span>
            </div>
          </div>
          <div className="bg-[#0d1117] rounded-xl p-3 border border-green-500/20">
            <div className="flex items-center gap-2 text-green-400 text-sm">
              <span>+3</span> <span>94% route compliance</span>
            </div>
          </div>
          <div className="bg-[#0d1117] rounded-xl p-3 border border-green-500/20">
            <div className="flex items-center gap-2 text-green-400 text-sm">
              <span>+2</span> <span>Low impact frequency overall</span>
            </div>
          </div>
          <div className="bg-[#0d1117] rounded-xl p-3 border border-red-500/20">
            <div className="flex items-center gap-2 text-red-400 text-sm">
              <span>-2</span> <span>7 impact events on TR-2024-0845</span>
            </div>
          </div>
          <div className="bg-[#0d1117] rounded-xl p-3 border border-red-500/20 col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 text-red-400 text-sm">
              <span>-1</span> <span>12 impact events on TR-2024-0847</span>
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

      {/* Search & Historical Trips */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
          <h3 className="text-white font-semibold">🚛 Historical Trips</h3>
          <div className="flex flex-wrap gap-2">
            <input
              type="text"
              placeholder="🔍 Search trips..."
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
          {filteredTrips.map((trip) => (
            <div
              key={trip.id}
              className={`p-4 bg-[#0d1117] rounded-xl border border-white/5 hover:border-white/10 transition-all duration-300 cursor-pointer ${
                selectedTrip === trip.id ? 'border-green-500/30' : ''
              }`}
              onClick={() => setSelectedTrip(selectedTrip === trip.id ? null : trip.id)}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🚛</span>
                    <span className="text-white font-medium">{trip.from} → {trip.to}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(trip.status)}`}>
                      {trip.status}
                    </span>
                  </div>
                  <div className="text-gray-400 text-xs mt-1">
                    🌾 {trip.goods} • {trip.quantity} • {trip.date} • {trip.duration}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-white text-sm font-medium">Handling: {trip.handlingScore}/100</div>
                  <div className="text-gray-400 text-xs">{trip.impacts} impacts • {trip.vibration}</div>
                </div>
              </div>

              {selectedTrip === trip.id && (
                <div className="mt-3 pt-3 border-t border-white/10">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div>
                      <div className="text-xs text-gray-400">Farmer/Supplier</div>
                      <div className="text-white text-sm">{trip.farmer}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-400">Handling Score</div>
                      <div className={`text-sm font-bold ${
                        trip.handlingScore > 80 ? 'text-green-400' :
                        trip.handlingScore > 60 ? 'text-yellow-400' :
                        'text-red-400'
                      }`}>{trip.handlingScore}/100</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-400">Route Compliance</div>
                      <div className="text-white text-sm">{trip.routeCompliance}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-400">Impact Events</div>
                      <div className="text-white text-sm">{trip.impacts} detected</div>
                    </div>
                  </div>
                  <div className="mt-2 flex gap-2">
                    <button className="px-3 py-1 bg-blue-600/20 border border-blue-500/30 rounded-lg text-blue-400 hover:bg-blue-600/30 text-xs transition-all duration-300">
                      View GPS Route
                    </button>
                    <button className="px-3 py-1 bg-green-600/20 border border-green-500/30 rounded-lg text-green-400 hover:bg-green-600/30 text-xs transition-all duration-300">
                      View Details
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        {filteredTrips.length === 0 && (
          <div className="text-center py-8">
            <div className="text-4xl mb-2">🚛</div>
            <p className="text-gray-400 text-sm">No trips found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DriverPlatform;