// src/pages/SensorData.jsx
import React, { useState, useEffect } from 'react';

const SensorData = () => {
  const [sensorData, setSensorData] = useState({
    esp32: { status: 'Connected', signal: '94%', dataRate: '115200 bps' },
    gps: { status: 'Active', satellites: 8, accuracy: '2.5m', lat: '28.3949', lng: '84.1240' },
    mpu6050: { status: 'Active', gyro: 'OK', accelerometer: 'OK' },
    environmental: { status: 'Online', temp: '28.4°C', humidity: '62%' }
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setSensorData(prev => ({
        ...prev,
        environmental: {
          ...prev.environmental,
          temp: `${(Math.random() * 10 + 24).toFixed(1)}°C`,
          humidity: `${Math.floor(Math.random() * 20 + 50)}%`
        },
        gps: {
          ...prev.gps,
          satellites: Math.floor(Math.random() * 4 + 6)
        },
        mpu6050: {
          ...prev.mpu6050,
          status: Math.random() > 0.15 ? 'Active' : 'Calibrating'
        }
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4 md:p-6 min-h-screen bg-[#020617]">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-white flex items-center gap-3">
            <span>📡</span> Sensor Data
            <span className="text-xs bg-green-500/20 px-3 py-1 rounded-full text-green-400">Live</span>
          </h1>
          <p className="text-gray-400 text-sm mt-1">Real-time monitoring of agricultural shipment sensors</p>
        </div>
        <div className="flex items-center gap-3 mt-3 md:mt-0">
          <span className="text-xs text-green-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
            ESP32 hardware ready for integration
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.entries(sensorData).map(([key, data]) => (
          <div key={key} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 hover:border-white/20 transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl">
                {key === 'esp32' && '📡'}
                {key === 'gps' && '🛰️'}
                {key === 'mpu6050' && '🧭'}
                {key === 'environmental' && '🌡️'}
              </span>
              <span className={`text-xs px-2 py-1 rounded-full ${
                data.status === 'Connected' || data.status === 'Active' || data.status === 'Online'
                  ? 'bg-green-500/20 text-green-400'
                  : 'bg-yellow-500/20 text-yellow-400'
              }`}>
                {data.status}
              </span>
            </div>
            <h3 className="text-white font-semibold text-sm capitalize">
              {key === 'esp32' ? 'ESP32 Controller' :
               key === 'gps' ? 'GPS Module' :
               key === 'mpu6050' ? 'MPU6050 IMU' :
               'Environmental Sensor'}
            </h3>
            <div className="mt-2 space-y-1">
              {Object.entries(data).filter(([k]) => k !== 'status').map(([k, v]) => (
                <div key={k} className="flex justify-between text-xs">
                  <span className="text-gray-400 capitalize">{k}</span>
                  <span className="text-gray-200">{v}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Handling Risk Indicators */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5">
          <h4 className="text-white font-semibold text-sm mb-3">📊 Current Handling Conditions</h4>
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-gray-400">Vibration Level</span>
              <span className="text-yellow-400">Moderate (1.8G)</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-400">Shock Events</span>
              <span className="text-red-400">3 detected</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-400">Movement Stability</span>
              <span className="text-green-400">Stable</span>
            </div>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5">
          <h4 className="text-white font-semibold text-sm mb-3">🌾 Produce Condition</h4>
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-gray-400">Estimated Quality</span>
              <span className="text-green-400">Good</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-400">Handling Risk</span>
              <span className="text-yellow-400">Moderate</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-400">Recommendation</span>
              <span className="text-blue-400">Monitor closely</span>
            </div>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5">
          <h4 className="text-white font-semibold text-sm mb-3">🔧 Hardware Status</h4>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-[#0d1117] rounded-lg p-2 text-center border border-white/5">
              <div className="text-green-400 text-lg mb-0.5">●</div>
              <div className="text-white text-xs">ESP32</div>
              <div className="text-gray-400 text-[10px]">Connected</div>
            </div>
            <div className="bg-[#0d1117] rounded-lg p-2 text-center border border-white/5">
              <div className="text-green-400 text-lg mb-0.5">●</div>
              <div className="text-white text-xs">GPS</div>
              <div className="text-gray-400 text-[10px]">8 Satellites</div>
            </div>
            <div className="bg-[#0d1117] rounded-lg p-2 text-center border border-white/5">
              <div className="text-green-400 text-lg mb-0.5">●</div>
              <div className="text-white text-xs">MPU6050</div>
              <div className="text-gray-400 text-[10px]">Active</div>
            </div>
            <div className="bg-[#0d1117] rounded-lg p-2 text-center border border-white/5">
              <div className="text-green-400 text-lg mb-0.5">●</div>
              <div className="text-white text-xs">Environmental</div>
              <div className="text-gray-400 text-[10px]">Online</div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
        <h3 className="text-white font-semibold mb-4">📋 Sensor Data Interpretation</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#0d1117] rounded-xl p-4 border border-white/5">
            <p className="text-gray-300 text-sm">
              <span className="text-yellow-400 font-medium">Note:</span> Sensor readings indicate potential handling conditions during transport. 
              The system detects vibration, shock events, and movement patterns that may affect produce quality. 
              This data is used to generate handling risk scores and business reliability indicators.
            </p>
          </div>
          <div className="bg-[#0d1117] rounded-xl p-4 border border-white/5">
            <p className="text-gray-300 text-sm">
              <span className="text-blue-400 font-medium">Education:</span> Learn how to interpret sensor data 
              and improve your handling practices. Visit the 
              <span className="text-green-400 cursor-pointer hover:underline"> AI Assistant</span> for 
              personalized recommendations on improving your handling practices and business profile.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SensorData;