// src/pages/CompanyPlatform.jsx
import React, { useState } from 'react';

const CompanyPlatform = () => {
  const [activeTab, setActiveTab] = useState('farmers');
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [sponsorModal, setSponsorModal] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Farmers list
  const farmers = [
    {
      id: 'F-2024-0082',
      name: 'Sita Vegetable Supply',
      location: 'Chitwan, Nepal',
      shipments: 38,
      goodsSupplied: '4.8 tonnes',
      deliveryCompletion: '95%',
      reliability: 92,
      active: true,
      crops: ['Tomatoes', 'Vegetables']
    },
    {
      id: 'F-2024-0091',
      name: 'Krishna Farm',
      location: 'Pokhara, Nepal',
      shipments: 42,
      goodsSupplied: '6.2 tonnes',
      deliveryCompletion: '93%',
      reliability: 88,
      active: true,
      crops: ['Potatoes', 'Cauliflower']
    },
    {
      id: 'F-2024-0075',
      name: 'Hari Organic Produce',
      location: 'Birgunj, Nepal',
      shipments: 29,
      goodsSupplied: '3.5 tonnes',
      deliveryCompletion: '97%',
      reliability: 94,
      active: true,
      crops: ['Mangoes', 'Organic Vegetables']
    },
    {
      id: 'F-2024-0102',
      name: 'Ganga Vegetable Supply',
      location: 'Hetauda, Nepal',
      shipments: 22,
      goodsSupplied: '2.8 tonnes',
      deliveryCompletion: '91%',
      reliability: 84,
      active: true,
      crops: ['Vegetables', 'Rice']
    }
  ];

  // Drivers list
  const drivers = [
    {
      id: 'D-2024-0047',
      name: 'Ram Transport',
      vehicle: 'Tata Ace (BA 1 KHA 1234)',
      location: 'Chitwan, Nepal',
      trips: 142,
      goodsTransported: '31.2 tonnes',
      deliveryCompletion: '97%',
      reliability: 94,
      active: true
    },
    {
      id: 'D-2024-0053',
      name: 'Shyam Logistics',
      vehicle: 'Ashok Leyland (BA 2 KHA 5678)',
      location: 'Pokhara, Nepal',
      trips: 118,
      goodsTransported: '24.8 tonnes',
      deliveryCompletion: '95%',
      reliability: 90,
      active: true
    },
    {
      id: 'D-2024-0061',
      name: 'Hari Transport Services',
      vehicle: 'Tata 407 (BA 3 KHA 9012)',
      location: 'Kathmandu, Nepal',
      trips: 96,
      goodsTransported: '19.4 tonnes',
      deliveryCompletion: '98%',
      reliability: 96,
      active: true
    }
  ];

  // Sponsorship statuses
  const statuses = {
    available: { label: 'Available', color: 'bg-green-500/20 text-green-400' },
    shortlisted: { label: 'Shortlisted', color: 'bg-blue-500/20 text-blue-400' },
    offerSent: { label: 'Offer Sent', color: 'bg-yellow-500/20 text-yellow-400' },
    accepted: { label: 'Accepted', color: 'bg-purple-500/20 text-purple-400' },
    active: { label: 'Active', color: 'bg-emerald-500/20 text-emerald-400' },
    completed: { label: 'Completed', color: 'bg-gray-500/20 text-gray-400' }
  };

  const [sponsorships, setSponsorships] = useState([
    { id: 1, type: 'Farmer', name: 'Sita Vegetable Supply', status: 'active', date: 'Aug 1, 2026', typeLabel: 'Equipment Support' },
    { id: 2, type: 'Driver', name: 'Ram Transport', status: 'accepted', date: 'Jul 28, 2026', typeLabel: 'Fuel Support' },
    { id: 3, type: 'Farmer', name: 'Hari Organic Produce', status: 'shortlisted', date: 'Aug 10, 2026', typeLabel: 'Agricultural Inputs' }
  ]);

  const getStatusBadge = (statusKey) => {
    const status = statuses[statusKey] || statuses.available;
    return <span className={`text-xs px-2 py-0.5 rounded-full ${status.color}`}>{status.label}</span>;
  };

  const handleSponsor = (profile, type) => {
    setSponsorModal({ profile, type });
  };

  const handleSendOffer = () => {
    setSponsorModal(null);
    setSelectedProfile(null);
  };

  // Filter farmers by search
  const filteredFarmers = farmers.filter(f => 
    f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.crops.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredDrivers = drivers.filter(d =>
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.vehicle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4 md:p-6 min-h-screen bg-[#020617]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-white flex items-center gap-3">
            <span>🏢</span> Company Platform
            <span className="text-xs bg-green-500/20 px-3 py-1 rounded-full text-green-400">Sponsorship Discovery</span>
          </h1>
          <p className="text-gray-400 text-sm mt-1">Discover reliable farmers and transporters for sponsorship and partnerships</p>
        </div>
        <div className="flex items-center gap-3 mt-3 md:mt-0">
          <span className="text-xs text-green-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
            Platform Active
          </span>
          <span className="text-xs text-gray-400">{sponsorships.length} active sponsorships</span>
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-6">
        <p className="text-gray-300 text-sm md:text-base">
          🏆 <span className="text-white font-medium">Discover agricultural businesses and transporters</span> based on verified 
          real-world activity and operational reliability. Find reliable partners for sponsorship, 
          equipment support, and business partnerships.
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="🔍 Search by name, location, crop, or vehicle..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-gray-400 focus:outline-none focus:border-green-500/50 transition-all duration-300"
        />
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-1">
        <button
          onClick={() => setActiveTab('farmers')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
            activeTab === 'farmers'
              ? 'bg-green-600 text-white shadow-lg shadow-green-500/20'
              : 'text-gray-400 hover:text-white hover:bg-white/10'
          }`}
        >
          👨‍🌾 Reliable Farmers ({filteredFarmers.length})
        </button>
        <button
          onClick={() => setActiveTab('drivers')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
            activeTab === 'drivers'
              ? 'bg-green-600 text-white shadow-lg shadow-green-500/20'
              : 'text-gray-400 hover:text-white hover:bg-white/10'
          }`}
        >
          🚛 Reliable Transporters ({filteredDrivers.length})
        </button>
        <button
          onClick={() => setActiveTab('sponsorships')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
            activeTab === 'sponsorships'
              ? 'bg-green-600 text-white shadow-lg shadow-green-500/20'
              : 'text-gray-400 hover:text-white hover:bg-white/10'
          }`}
        >
          📋 My Sponsorships ({sponsorships.length})
        </button>
      </div>

      {/* Farmers Tab */}
      {activeTab === 'farmers' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredFarmers.map((farmer) => (
            <div
              key={farmer.id}
              className={`bg-white/5 backdrop-blur-xl border rounded-2xl p-5 transition-all duration-300 ${
                selectedProfile === farmer.id ? 'border-green-500/30' : 'border-white/10 hover:border-white/20'
              }`}
              onClick={() => setSelectedProfile(selectedProfile === farmer.id ? null : farmer.id)}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-white font-semibold">{farmer.name}</h3>
                  <p className="text-gray-400 text-sm">📍 {farmer.location}</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {farmer.crops.map((crop, i) => (
                      <span key={i} className="text-[8px] px-1.5 py-0.5 bg-green-500/10 border border-green-500/30 rounded-full text-green-400">
                        {crop}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-400">{farmer.reliability}/100</div>
                  <div className="text-xs text-gray-400">Reliability</div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 mt-3 p-3 bg-[#0d1117] rounded-xl border border-white/5">
                <div className="text-center">
                  <div className="text-white text-sm font-bold">{farmer.shipments}</div>
                  <div className="text-gray-500 text-[8px] uppercase">Shipments</div>
                </div>
                <div className="text-center">
                  <div className="text-white text-sm font-bold">{farmer.goodsSupplied}</div>
                  <div className="text-gray-500 text-[8px] uppercase">Goods Supplied</div>
                </div>
                <div className="text-center">
                  <div className="text-green-400 text-sm font-bold">{farmer.deliveryCompletion}</div>
                  <div className="text-gray-500 text-[8px] uppercase">Completion</div>
                </div>
              </div>

              {selectedProfile === farmer.id && (
                <div className="mt-3 pt-3 border-t border-white/10">
                  <div className="flex gap-2">
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleSponsor(farmer, 'farmer'); }}
                      className="flex-1 px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <span>🤝</span> Sponsor
                    </button>
                    <button 
                      onClick={(e) => e.stopPropagation()}
                      className="flex-1 px-3 py-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 rounded-lg text-sm font-medium transition-all duration-300 border border-blue-500/20 flex items-center justify-center gap-2"
                    >
                      <span>👤</span> View Profile
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Drivers Tab */}
      {activeTab === 'drivers' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredDrivers.map((driver) => (
            <div
              key={driver.id}
              className={`bg-white/5 backdrop-blur-xl border rounded-2xl p-5 transition-all duration-300 ${
                selectedProfile === driver.id ? 'border-green-500/30' : 'border-white/10 hover:border-white/20'
              }`}
              onClick={() => setSelectedProfile(selectedProfile === driver.id ? null : driver.id)}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-white font-semibold">{driver.name}</h3>
                  <p className="text-gray-400 text-sm">🚗 {driver.vehicle}</p>
                  <p className="text-gray-500 text-xs">📍 {driver.location}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-400">{driver.reliability}/100</div>
                  <div className="text-xs text-gray-400">Reliability</div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 mt-3 p-3 bg-[#0d1117] rounded-xl border border-white/5">
                <div className="text-center">
                  <div className="text-white text-sm font-bold">{driver.trips}</div>
                  <div className="text-gray-500 text-[8px] uppercase">Trips</div>
                </div>
                <div className="text-center">
                  <div className="text-white text-sm font-bold">{driver.goodsTransported}</div>
                  <div className="text-gray-500 text-[8px] uppercase">Goods</div>
                </div>
                <div className="text-center">
                  <div className="text-green-400 text-sm font-bold">{driver.deliveryCompletion}</div>
                  <div className="text-gray-500 text-[8px] uppercase">Completion</div>
                </div>
              </div>

              {selectedProfile === driver.id && (
                <div className="mt-3 pt-3 border-t border-white/10">
                  <div className="flex gap-2">
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleSponsor(driver, 'driver'); }}
                      className="flex-1 px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <span>🤝</span> Sponsor
                    </button>
                    <button 
                      onClick={(e) => e.stopPropagation()}
                      className="flex-1 px-3 py-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 rounded-lg text-sm font-medium transition-all duration-300 border border-blue-500/20 flex items-center justify-center gap-2"
                    >
                      <span>👤</span> View Profile
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Sponsorships Tab */}
      {activeTab === 'sponsorships' && (
        <div>
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <h3 className="text-white font-semibold mb-4">📋 Your Sponsorships</h3>
            <div className="space-y-3">
              {sponsorships.map((sponsorship) => (
                <div key={sponsorship.id} className="p-4 bg-[#0d1117] rounded-xl border border-white/5 hover:border-white/10 transition-all duration-300">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{sponsorship.type === 'Farmer' ? '👨‍🌾' : '🚛'}</span>
                        <span className="text-white font-medium">{sponsorship.name}</span>
                        <span className="text-xs text-gray-400">• {sponsorship.type}</span>
                      </div>
                      <div className="text-gray-400 text-xs mt-1">
                        📅 {sponsorship.date} • {sponsorship.typeLabel}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {getStatusBadge(sponsorship.status)}
                      <button className="text-xs text-blue-400 hover:text-blue-300 transition-colors">
                        Details →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-[#0d1117] rounded-xl border border-white/5">
              <p className="text-gray-400 text-sm text-center">
                💡 <span className="text-white">Sponsorship offers</span> help farmers and transporters access 
                equipment, fuel, inputs, and business opportunities.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Sponsor Modal */}
      {sponsorModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setSponsorModal(null)}>
          <div className="bg-[#0d1117] border border-white/10 rounded-2xl p-6 max-w-lg w-full" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white">🤝 Sponsor</h3>
              <button onClick={() => setSponsorModal(null)} className="text-gray-400 hover:text-white text-2xl">×</button>
            </div>
            
            <div className="p-4 bg-white/5 rounded-xl border border-white/10 mb-4">
              <p className="text-white font-semibold">{sponsorModal.profile.name}</p>
              <p className="text-gray-400 text-sm">{sponsorModal.type === 'farmer' ? '👨‍🌾 Farmer' : '🚛 Transporter'}</p>
              <p className="text-gray-500 text-xs mt-1">Reliability: {sponsorModal.profile.reliability}/100</p>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-gray-400 text-sm mb-1">Sponsorship Type</p>
                <select className="w-full bg-[#0d1117] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-green-500/50">
                  <option>Equipment Support</option>
                  <option>Vehicle Support</option>
                  <option>Fuel Support</option>
                  <option>Agricultural Inputs</option>
                  <option>Technology/Equipment</option>
                  <option>Business Partnership</option>
                  <option>Financial Incentives</option>
                </select>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">Offer Details</p>
                <textarea 
                  className="w-full bg-[#0d1117] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-green-500/50 min-h-[80px]"
                  placeholder="Describe your sponsorship offer..."
                ></textarea>
              </div>
            </div>

            <div className="flex gap-3 mt-4">
              <button 
                onClick={handleSendOffer}
                className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2"
              >
                <span>📤</span> Send Offer
              </button>
              <button 
                onClick={() => setSponsorModal(null)}
                className="flex-1 px-4 py-2 bg-white/5 hover:bg-white/10 text-gray-300 rounded-lg text-sm font-medium transition-all duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyPlatform;