// src/pages/Settings.jsx
import React, { useState } from 'react';

const Settings = () => {
  const [settings, setSettings] = useState({
    notifications: true,
    autoSync: true,
    darkMode: true,
    language: 'en',
    units: 'metric',
    businessAlerts: true,
    profileOptimization: true,
    financeReadinessTracking: true,
    readinessThreshold: 60,
    preferredCorridors: ['central', 'western'],
    shipmentTracking: true,
    cargoMonitoring: true,
    shockAlertThreshold: 2.5,
    tempAlertThreshold: 30,
    humidityAlertThreshold: 80,
    autoReportGeneration: true,
    reportFrequency: 'weekly',
    shareReports: false,
    financeProfileVisibility: 'private',
  });

  const [activeTab, setActiveTab] = useState('general');

  const toggleSetting = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const updateThreshold = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: parseFloat(value) }));
  };

  const tabs = [
    { id: 'general', label: '⚙️ General', icon: '⚙️' },
    { id: 'business', label: '📈 Business Profile', icon: '📈' },
    { id: 'shipments', label: '🚛 Shipments', icon: '🚛' },
    { id: 'hardware', label: '🔧 Hardware', icon: '🔧' },
    { id: 'api', label: '🌐 API & Integrations', icon: '🌐' },
  ];

  const corridors = [
    { id: 'central', label: 'Central Corridor', risk: 'High' },
    { id: 'western', label: 'Western Corridor', risk: 'Medium' },
    { id: 'terai', label: 'Terai Corridor', risk: 'Low' },
    { id: 'mountain', label: 'Mountain Corridor', risk: 'Critical' },
    { id: 'midwestern', label: 'Mid-Western Corridor', risk: 'Medium' },
  ];

  const toggleCorridor = (corridorId) => {
    setSettings(prev => {
      const current = prev.preferredCorridors;
      const updated = current.includes(corridorId)
        ? current.filter(id => id !== corridorId)
        : [...current, corridorId];
      return { ...prev, preferredCorridors: updated };
    });
  };

  return (
    <div className="p-4 md:p-6 min-h-screen bg-[#020617]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-white flex items-center gap-3">
            <span>⚙️</span> KrishiTrust Settings
            <span className="text-xs bg-green-500/20 px-3 py-1 rounded-full text-green-400">Configuration</span>
          </h1>
          <p className="text-gray-400 text-sm mt-1">Configure KrishiTrust agricultural intelligence platform</p>
        </div>
        <div className="mt-3 md:mt-0 flex items-center gap-2">
          <span className="text-xs text-green-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
            System Active
          </span>
          <button className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-xl text-white text-sm transition-all duration-300 flex items-center gap-2">
            <span>💾</span> Save Changes
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
              activeTab === tab.id
                ? 'bg-green-600 text-white shadow-lg shadow-green-500/20'
                : 'text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="space-y-6">
        {/* GENERAL SETTINGS */}
        {activeTab === 'general' && (
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">⚙️ General Settings</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div><p className="text-white font-medium">Real-time Notifications</p><p className="text-gray-400 text-sm">Receive shipment and business alerts</p></div>
                <button onClick={() => toggleSetting('notifications')} className={`w-12 h-6 rounded-full transition-all duration-300 ${settings.notifications ? 'bg-green-500' : 'bg-gray-600'}`}>
                  <div className={`w-4 h-4 bg-white rounded-full transition-all duration-300 transform ${settings.notifications ? 'translate-x-7' : 'translate-x-1'}`} />
                </button>
              </div>
              <div className="flex items-center justify-between border-t border-white/5 pt-4">
                <div><p className="text-white font-medium">Auto Sync</p><p className="text-gray-400 text-sm">Automatically sync sensor telemetry data</p></div>
                <button onClick={() => toggleSetting('autoSync')} className={`w-12 h-6 rounded-full transition-all duration-300 ${settings.autoSync ? 'bg-green-500' : 'bg-gray-600'}`}>
                  <div className={`w-4 h-4 bg-white rounded-full transition-all duration-300 transform ${settings.autoSync ? 'translate-x-7' : 'translate-x-1'}`} />
                </button>
              </div>
              <div className="flex items-center justify-between border-t border-white/5 pt-4">
                <div><p className="text-white font-medium">Dark Mode</p><p className="text-gray-400 text-sm">Display theme preference</p></div>
                <button onClick={() => toggleSetting('darkMode')} className={`w-12 h-6 rounded-full transition-all duration-300 ${settings.darkMode ? 'bg-green-500' : 'bg-gray-600'}`}>
                  <div className={`w-4 h-4 bg-white rounded-full transition-all duration-300 transform ${settings.darkMode ? 'translate-x-7' : 'translate-x-1'}`} />
                </button>
              </div>
              <div className="flex items-center justify-between border-t border-white/5 pt-4">
                <div><p className="text-white font-medium">Language</p><p className="text-gray-400 text-sm">Interface language preference</p></div>
                <select value={settings.language} onChange={(e) => setSettings(prev => ({ ...prev, language: e.target.value }))} className="bg-[#0d1117] border border-white/10 rounded-lg px-3 py-1.5 text-white text-sm focus:outline-none focus:border-green-500/50">
                  <option value="en">🇬🇧 English</option>
                  <option value="ne">🇳🇵 Nepali</option>
                  <option value="hi">🇮🇳 Hindi</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* BUSINESS PROFILE SETTINGS */}
        {activeTab === 'business' && (
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">📈 Business Profile Settings</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div><p className="text-white font-medium">Business Alerts</p><p className="text-gray-400 text-sm">Get notified about profile changes and milestones</p></div>
                <button onClick={() => toggleSetting('businessAlerts')} className={`w-12 h-6 rounded-full transition-all duration-300 ${settings.businessAlerts ? 'bg-green-500' : 'bg-gray-600'}`}>
                  <div className={`w-4 h-4 bg-white rounded-full transition-all duration-300 transform ${settings.businessAlerts ? 'translate-x-7' : 'translate-x-1'}`} />
                </button>
              </div>
              <div className="flex items-center justify-between border-t border-white/5 pt-4">
                <div><p className="text-white font-medium">Profile Optimization</p><p className="text-gray-400 text-sm">Automatically suggest business improvements</p></div>
                <button onClick={() => toggleSetting('profileOptimization')} className={`w-12 h-6 rounded-full transition-all duration-300 ${settings.profileOptimization ? 'bg-green-500' : 'bg-gray-600'}`}>
                  <div className={`w-4 h-4 bg-white rounded-full transition-all duration-300 transform ${settings.profileOptimization ? 'translate-x-7' : 'translate-x-1'}`} />
                </button>
              </div>
              <div className="flex items-center justify-between border-t border-white/5 pt-4">
                <div><p className="text-white font-medium">Finance Readiness Tracking</p><p className="text-gray-400 text-sm">Monitor and improve finance readiness score</p></div>
                <button onClick={() => toggleSetting('financeReadinessTracking')} className={`w-12 h-6 rounded-full transition-all duration-300 ${settings.financeReadinessTracking ? 'bg-green-500' : 'bg-gray-600'}`}>
                  <div className={`w-4 h-4 bg-white rounded-full transition-all duration-300 transform ${settings.financeReadinessTracking ? 'translate-x-7' : 'translate-x-1'}`} />
                </button>
              </div>
              <div className="border-t border-white/5 pt-4">
                <div className="mb-2"><p className="text-white font-medium">Readiness Threshold</p><p className="text-gray-400 text-sm">Score above this threshold triggers readiness alerts</p></div>
                <div className="flex items-center gap-4">
                  <input type="range" min="0" max="100" value={settings.readinessThreshold} onChange={(e) => updateThreshold('readinessThreshold', e.target.value)} className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-500" />
                  <span className="text-white font-bold text-lg min-w-[40px]">{settings.readinessThreshold}%</span>
                </div>
              </div>
              <div className="border-t border-white/5 pt-4">
                <div className="flex items-center justify-between">
                  <div><p className="text-white font-medium">Finance Profile Visibility</p><p className="text-gray-400 text-sm">Control who can view your finance readiness profile</p></div>
                  <select value={settings.financeProfileVisibility} onChange={(e) => setSettings(prev => ({ ...prev, financeProfileVisibility: e.target.value }))} className="bg-[#0d1117] border border-white/10 rounded-lg px-3 py-1.5 text-white text-sm focus:outline-none focus:border-green-500/50">
                    <option value="private">🔒 Private</option>
                    <option value="shared">👥 Shared with Partners</option>
                    <option value="public">🌐 Public</option>
                  </select>
                </div>
              </div>
              <div className="border-t border-white/5 pt-4">
                <p className="text-white font-medium mb-2">Preferred Agricultural Corridors</p>
                <p className="text-gray-400 text-sm mb-3">Select corridors to prioritize for shipments</p>
                <div className="flex flex-wrap gap-2">
                  {corridors.map((corridor) => (
                    <button key={corridor.id} onClick={() => toggleCorridor(corridor.id)} className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 ${settings.preferredCorridors.includes(corridor.id) ? 'bg-green-600 text-white shadow-lg shadow-green-500/20' : 'bg-[#0d1117] text-gray-400 hover:text-white hover:bg-white/10 border border-white/5'}`}>
                      {corridor.label}
                      <span className={`ml-1.5 text-xs ${corridor.risk === 'Critical' ? 'text-red-400' : corridor.risk === 'High' ? 'text-orange-400' : corridor.risk === 'Medium' ? 'text-yellow-400' : 'text-green-400'}`}>({corridor.risk})</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SHIPMENT SETTINGS */}
        {activeTab === 'shipments' && (
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">🚛 Shipment & Handling Settings</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div><p className="text-white font-medium">Shipment Tracking</p><p className="text-gray-400 text-sm">Monitor active shipment positions in real-time</p></div>
                <button onClick={() => toggleSetting('shipmentTracking')} className={`w-12 h-6 rounded-full transition-all duration-300 ${settings.shipmentTracking ? 'bg-green-500' : 'bg-gray-600'}`}>
                  <div className={`w-4 h-4 bg-white rounded-full transition-all duration-300 transform ${settings.shipmentTracking ? 'translate-x-7' : 'translate-x-1'}`} />
                </button>
              </div>
              <div className="flex items-center justify-between border-t border-white/5 pt-4">
                <div><p className="text-white font-medium">Cargo Monitoring</p><p className="text-gray-400 text-sm">Track produce conditions (temp, humidity, shock)</p></div>
                <button onClick={() => toggleSetting('cargoMonitoring')} className={`w-12 h-6 rounded-full transition-all duration-300 ${settings.cargoMonitoring ? 'bg-green-500' : 'bg-gray-600'}`}>
                  <div className={`w-4 h-4 bg-white rounded-full transition-all duration-300 transform ${settings.cargoMonitoring ? 'translate-x-7' : 'translate-x-1'}`} />
                </button>
              </div>
              <div className="border-t border-white/5 pt-4">
                <div className="mb-2"><p className="text-white font-medium">Shock Alert Threshold</p><p className="text-gray-400 text-sm">Alert when handling shock exceeds this G-force value</p></div>
                <div className="flex items-center gap-4">
                  <input type="range" min="0" max="5" step="0.1" value={settings.shockAlertThreshold} onChange={(e) => updateThreshold('shockAlertThreshold', e.target.value)} className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-red-500" />
                  <span className="text-white font-bold text-lg min-w-[40px]">{settings.shockAlertThreshold}G</span>
                </div>
              </div>
              <div className="border-t border-white/5 pt-4">
                <div className="mb-2"><p className="text-white font-medium">Temperature Alert Threshold</p><p className="text-gray-400 text-sm">Alert when produce temp exceeds this value</p></div>
                <div className="flex items-center gap-4">
                  <input type="range" min="15" max="45" step="0.5" value={settings.tempAlertThreshold} onChange={(e) => updateThreshold('tempAlertThreshold', e.target.value)} className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-orange-500" />
                  <span className="text-white font-bold text-lg min-w-[40px]">{settings.tempAlertThreshold}°C</span>
                </div>
              </div>
              <div className="border-t border-white/5 pt-4">
                <div className="mb-2"><p className="text-white font-medium">Humidity Alert Threshold</p><p className="text-gray-400 text-sm">Alert when produce humidity exceeds this value</p></div>
                <div className="flex items-center gap-4">
                  <input type="range" min="30" max="100" step="1" value={settings.humidityAlertThreshold} onChange={(e) => updateThreshold('humidityAlertThreshold', e.target.value)} className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500" />
                  <span className="text-white font-bold text-lg min-w-[40px]">{settings.humidityAlertThreshold}%</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* HARDWARE SETTINGS */}
        {activeTab === 'hardware' && (
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">🔧 Hardware Configuration</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#0d1117] rounded-xl p-4 border border-white/5 hover:border-green-500/30 transition-all duration-300">
                <p className="text-white font-medium flex items-center gap-2"><span>📡</span> GPS Module</p>
                <div className="mt-2 space-y-1 text-sm">
                  <div className="flex justify-between"><span className="text-gray-400">Protocol</span><span className="text-gray-200">NMEA 0183</span></div>
                  <div className="flex justify-between"><span className="text-gray-400">Baud Rate</span><span className="text-gray-200">9600</span></div>
                  <div className="flex justify-between"><span className="text-gray-400">Satellites</span><span className="text-green-400">8 active</span></div>
                  <div className="flex justify-between"><span className="text-gray-400">Accuracy</span><span className="text-gray-200">±2.5m</span></div>
                </div>
              </div>
              <div className="bg-[#0d1117] rounded-xl p-4 border border-white/5 hover:border-green-500/30 transition-all duration-300">
                <p className="text-white font-medium flex items-center gap-2"><span>📊</span> MPU6050 IMU</p>
                <div className="mt-2 space-y-1 text-sm">
                  <div className="flex justify-between"><span className="text-gray-400">Range</span><span className="text-gray-200">±8G</span></div>
                  <div className="flex justify-between"><span className="text-gray-400">Sampling</span><span className="text-gray-200">100 Hz</span></div>
                  <div className="flex justify-between"><span className="text-gray-400">Status</span><span className="text-green-400">Active</span></div>
                </div>
              </div>
              <div className="bg-[#0d1117] rounded-xl p-4 border border-white/5 hover:border-green-500/30 transition-all duration-300">
                <p className="text-white font-medium flex items-center gap-2"><span>🌡️</span> Environmental Sensor</p>
                <div className="mt-2 space-y-1 text-sm">
                  <div className="flex justify-between"><span className="text-gray-400">Temp Range</span><span className="text-gray-200">-40°C to 85°C</span></div>
                  <div className="flex justify-between"><span className="text-gray-400">Accuracy</span><span className="text-gray-200">±0.5°C</span></div>
                  <div className="flex justify-between"><span className="text-gray-400">Status</span><span className="text-green-400">Connected</span></div>
                </div>
              </div>
              <div className="bg-[#0d1117] rounded-xl p-4 border border-white/5 hover:border-green-500/30 transition-all duration-300">
                <p className="text-white font-medium flex items-center gap-2"><span>⚡</span> ESP32 Controller</p>
                <div className="mt-2 space-y-1 text-sm">
                  <div className="flex justify-between"><span className="text-gray-400">Port</span><span className="text-gray-200">COM3</span></div>
                  <div className="flex justify-between"><span className="text-gray-400">Baud Rate</span><span className="text-gray-200">115200</span></div>
                  <div className="flex justify-between"><span className="text-gray-400">Status</span><span className="text-green-400">Connected</span></div>
                </div>
              </div>
            </div>
            <div className="mt-4 p-3 bg-[#0d1117] rounded-xl border border-white/5">
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">System Status</span>
                <div className="flex items-center gap-3">
                  <span className="text-xs flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-400"></span> All Hardware Online</span>
                  <span className="text-xs text-gray-500">|</span>
                  <span className="text-xs text-gray-400">Uptime: 99.9%</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* API & INTEGRATIONS */}
        {activeTab === 'api' && (
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">🌐 API & Integrations</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-[#0d1117] rounded-xl p-4 border border-white/5">
                <div className="flex items-center gap-3"><span className="text-2xl">🧠</span><div><p className="text-white font-medium">Handling Risk AI</p><p className="text-gray-400 text-sm">Predictive handling risk scoring engine</p></div></div>
                <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span><span className="text-green-400 text-sm">Connected</span></div>
              </div>
              <div className="flex items-center justify-between bg-[#0d1117] rounded-xl p-4 border border-white/5">
                <div className="flex items-center gap-3"><span className="text-2xl">💰</span><div><p className="text-white font-medium">Finance Readiness Engine</p><p className="text-gray-400 text-sm">Business profile & finance readiness analysis</p></div></div>
                <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span><span className="text-green-400 text-sm">Connected</span></div>
              </div>
              <div className="flex items-center justify-between bg-[#0d1117] rounded-xl p-4 border border-white/5">
                <div className="flex items-center gap-3"><span className="text-2xl">🗺️</span><div><p className="text-white font-medium">Map Services</p><p className="text-gray-400 text-sm">OpenStreetMap / Satellite</p></div></div>
                <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span><span className="text-green-400 text-sm">Connected</span></div>
              </div>
              <div className="flex items-center justify-between bg-[#0d1117] rounded-xl p-4 border border-white/5">
                <div className="flex items-center gap-3"><span className="text-2xl">📱</span><div><p className="text-white font-medium">SMS Gateway</p><p className="text-gray-400 text-sm">Alert notifications to farmers and transporters</p></div></div>
                <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span><span className="text-green-400 text-sm">Connected</span></div>
              </div>
              <div className="border-t border-white/5 pt-4">
                <div className="flex items-center justify-between">
                  <div><p className="text-white font-medium">Auto Report Generation</p><p className="text-gray-400 text-sm">Automatically generate business intelligence reports</p></div>
                  <button onClick={() => toggleSetting('autoReportGeneration')} className={`w-12 h-6 rounded-full transition-all duration-300 ${settings.autoReportGeneration ? 'bg-green-500' : 'bg-gray-600'}`}>
                    <div className={`w-4 h-4 bg-white rounded-full transition-all duration-300 transform ${settings.autoReportGeneration ? 'translate-x-7' : 'translate-x-1'}`} />
                  </button>
                </div>
                <div className="mt-3 flex items-center gap-4">
                  <select value={settings.reportFrequency} onChange={(e) => setSettings(prev => ({ ...prev, reportFrequency: e.target.value }))} className="bg-[#0d1117] border border-white/10 rounded-lg px-3 py-1.5 text-white text-sm focus:outline-none focus:border-green-500/50">
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                  <span className="text-gray-400 text-sm">report frequency</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Status Footer */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-3">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-3 flex items-center justify-between">
          <div className="flex items-center gap-2"><span className="text-green-400">✅</span><span className="text-white text-sm">System Status</span></div>
          <span className="text-xs text-green-400">Operational</span>
        </div>
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-3 flex items-center justify-between">
          <div className="flex items-center gap-2"><span className="text-blue-400">📡</span><span className="text-white text-sm">Hardware</span></div>
          <span className="text-xs text-green-400">All Connected</span>
        </div>
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-3 flex items-center justify-between">
          <div className="flex items-center gap-2"><span className="text-yellow-400">🔄</span><span className="text-white text-sm">Last Sync</span></div>
          <span className="text-xs text-gray-400">2 min ago</span>
        </div>
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-3 flex items-center justify-between">
          <div className="flex items-center gap-2"><span className="text-purple-400">📊</span><span className="text-white text-sm">Data Points</span></div>
          <span className="text-xs text-gray-400">12,847</span>
        </div>
      </div>
    </div>
  );
};

export default Settings;