// src/pages/Sponsorships.jsx
import React, { useState } from 'react';

const Sponsorships = () => {
  const [activeTab, setActiveTab] = useState('available');
  const [selectedSponsorship, setSelectedSponsorship] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const availableSponsorships = [
    {
      id: 1,
      type: 'Farmer',
      name: 'Sita Vegetable Supply',
      location: 'Chitwan, Nepal',
      reliability: 92,
      shipments: 38,
      goodsSupplied: '4.8 tonnes',
      completion: '95%',
      status: 'available',
      potential: 'High'
    },
    {
      id: 2,
      type: 'Farmer',
      name: 'Hari Organic Produce',
      location: 'Birgunj, Nepal',
      reliability: 94,
      shipments: 29,
      goodsSupplied: '3.5 tonnes',
      completion: '97%',
      status: 'available',
      potential: 'High'
    },
    {
      id: 3,
      type: 'Transporter',
      name: 'Ram Transport',
      location: 'Chitwan, Nepal',
      reliability: 94,
      trips: 142,
      goodsTransported: '31.2 tonnes',
      completion: '97%',
      status: 'available',
      potential: 'High'
    },
    {
      id: 4,
      type: 'Farmer',
      name: 'Krishna Farm',
      location: 'Pokhara, Nepal',
      reliability: 88,
      shipments: 42,
      goodsSupplied: '6.2 tonnes',
      completion: '93%',
      status: 'available',
      potential: 'Medium'
    },
    {
      id: 5,
      type: 'Transporter',
      name: 'Hari Transport Services',
      location: 'Kathmandu, Nepal',
      reliability: 96,
      trips: 96,
      goodsTransported: '19.4 tonnes',
      completion: '98%',
      status: 'available',
      potential: 'High'
    }
  ];

  const activeSponsorships = [
    {
      id: 6,
      type: 'Farmer',
      name: 'Sita Vegetable Supply',
      sponsorType: 'Equipment Support',
      status: 'active',
      startDate: 'Aug 1, 2026',
      nextReview: 'Oct 1, 2026'
    },
    {
      id: 7,
      type: 'Transporter',
      name: 'Ram Transport',
      sponsorType: 'Fuel Support',
      status: 'accepted',
      startDate: 'Jul 28, 2026',
      nextReview: 'Sep 28, 2026'
    },
    {
      id: 8,
      type: 'Farmer',
      name: 'Hari Organic Produce',
      sponsorType: 'Agricultural Inputs',
      status: 'shortlisted',
      startDate: 'Aug 10, 2026',
      nextReview: 'Pending'
    }
  ];

  const getStatusBadge = (status) => {
    const statuses = {
      available: { label: 'Available', color: 'bg-green-500/20 text-green-400' },
      shortlisted: { label: 'Shortlisted', color: 'bg-blue-500/20 text-blue-400' },
      offerSent: { label: 'Offer Sent', color: 'bg-yellow-500/20 text-yellow-400' },
      accepted: { label: 'Accepted', color: 'bg-purple-500/20 text-purple-400' },
      active: { label: 'Active', color: 'bg-emerald-500/20 text-emerald-400' },
      completed: { label: 'Completed', color: 'bg-gray-500/20 text-gray-400' }
    };
    const s = statuses[status] || statuses.available;
    return <span className={`text-xs px-2 py-0.5 rounded-full ${s.color}`}>{s.label}</span>;
  };

  const getPotentialBadge = (potential) => {
    if (potential === 'High') {
      return <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400">High Potential</span>;
    }
    return <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-400">Medium Potential</span>;
  };

  const handleSponsor = (item) => {
    alert(`Starting sponsorship process for ${item.name}`);
  };

  // Filter available sponsorships
  const filteredAvailable = availableSponsorships.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4 md:p-6 min-h-screen bg-[#020617]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-white flex items-center gap-3">
            <span>🤝</span> Sponsorships
            <span className="text-xs bg-green-500/20 px-3 py-1 rounded-full text-green-400">Partnership Opportunities</span>
          </h1>
          <p className="text-gray-400 text-sm mt-1">Discover and manage sponsorship opportunities with verified farmers and transporters</p>
        </div>
        <div className="flex items-center gap-3 mt-3 md:mt-0">
          <span className="text-xs text-green-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
            {activeSponsorships.length} active sponsorships
          </span>
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-6">
        <p className="text-gray-300 text-sm md:text-base">
          💡 <span className="text-white font-medium">Sponsorship Opportunities</span> — Support verified farmers and transporters 
          with equipment, vehicle support, fuel, agricultural inputs, technology, and business partnerships.
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="🔍 Search sponsorships by name, location, or type..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-gray-400 focus:outline-none focus:border-green-500/50 transition-all duration-300"
        />
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-1">
        <button onClick={() => setActiveTab('available')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${activeTab === 'available' ? 'bg-green-600 text-white shadow-lg shadow-green-500/20' : 'text-gray-400 hover:text-white hover:bg-white/10'}`}>
          🔍 Available ({filteredAvailable.length})
        </button>
        <button onClick={() => setActiveTab('active')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${activeTab === 'active' ? 'bg-green-600 text-white shadow-lg shadow-green-500/20' : 'text-gray-400 hover:text-white hover:bg-white/10'}`}>
          📋 My Sponsorships ({activeSponsorships.length})
        </button>
        <button onClick={() => setActiveTab('history')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${activeTab === 'history' ? 'bg-green-600 text-white shadow-lg shadow-green-500/20' : 'text-gray-400 hover:text-white hover:bg-white/10'}`}>
          📊 History
        </button>
      </div>

      {/* Available Sponsorships */}
      {activeTab === 'available' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAvailable.map((item) => (
            <div key={item.id} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 hover:border-green-500/30 transition-all duration-300">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{item.type === 'Farmer' ? '👨‍🌾' : '🚛'}</span>
                    <h3 className="text-white font-semibold">{item.name}</h3>
                  </div>
                  <p className="text-gray-400 text-sm">📍 {item.location}</p>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-green-400">{item.reliability}/100</div>
                  <div className="text-xs text-gray-400">Reliability</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-3 p-3 bg-[#0d1117] rounded-xl border border-white/5">
                <div className="text-center">
                  <div className="text-white text-sm font-bold">{item.shipments || item.trips}</div>
                  <div className="text-gray-500 text-[8px] uppercase">{item.type === 'Farmer' ? 'Shipments' : 'Trips'}</div>
                </div>
                <div className="text-center">
                  <div className="text-white text-sm font-bold">{item.goodsSupplied || item.goodsTransported}</div>
                  <div className="text-gray-500 text-[8px] uppercase">{item.type === 'Farmer' ? 'Supplied' : 'Transported'}</div>
                </div>
              </div>
              <div className="flex items-center justify-between mt-3">
                {getPotentialBadge(item.potential)}
                {getStatusBadge(item.status)}
              </div>
              <button onClick={() => handleSponsor(item)} className="w-full mt-3 px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2">
                <span>🤝</span> Sponsor
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Active Sponsorships */}
      {activeTab === 'active' && (
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <div className="space-y-3">
            {activeSponsorships.map((item) => (
              <div key={item.id} className="p-4 bg-[#0d1117] rounded-xl border border-white/5 hover:border-white/10 transition-all duration-300">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{item.type === 'Farmer' ? '👨‍🌾' : '🚛'}</span>
                      <span className="text-white font-medium">{item.name}</span>
                    </div>
                    <div className="text-gray-400 text-xs mt-1">📦 {item.sponsorType} • Started {item.startDate}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    {getStatusBadge(item.status)}
                    <button className="text-xs text-blue-400 hover:text-blue-300 transition-colors">View →</button>
                  </div>
                </div>
                <div className="mt-2 pt-2 border-t border-white/5">
                  <div className="flex items-center gap-4 text-xs text-gray-400">
                    <span>Next Review: {item.nextReview}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* History Tab */}
      {activeTab === 'history' && (
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <div className="text-center py-8">
            <div className="text-4xl mb-3">📊</div>
            <h3 className="text-white font-semibold">Sponsorship History</h3>
            <p className="text-gray-400 text-sm mt-1">View completed and historical sponsorships</p>
            <p className="text-gray-500 text-xs mt-2">5 completed sponsorships • 12 total partnerships</p>
            <button className="mt-4 px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg text-sm transition-all duration-300">
              Load History →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sponsorships;