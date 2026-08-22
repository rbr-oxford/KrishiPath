// src/pages/LiveMap.jsx
import React, { useState, useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, Polyline, useMap, useMapEvents } from "react-leaflet";
import L from 'leaflet';
import "leaflet/dist/leaflet.css";

// Agricultural Shipment Route Data with realistic Nepal locations
const routeData = [
  { 
    id: 1,
    name: 'Central Agri Corridor', 
    from: 'Chitwan', 
    to: 'Kathmandu',
    crop: 'Tomatoes',
    waypoints: [
      [27.7000, 84.4500],
      [27.7500, 84.5500],
      [27.8000, 84.6500],
      [27.8500, 84.7500],
      [27.9000, 84.8500],
      [27.9500, 84.9500],
      [28.0000, 85.0500],
      [28.0500, 85.1500],
      [28.1000, 85.2500],
      [28.1500, 85.3500],
    ],
    handlingRisk: 'High',
    handlingScore: 78,
    distance: '165 km',
    travelTime: '6.5 hrs',
    shipments: 12,
    incidents: 7,
    vehicles: 4,
    status: 'Active',
    icon: '🍅'
  },
  { 
    id: 2,
    name: 'Western Agri Corridor', 
    from: 'Pokhara', 
    to: 'Kathmandu',
    crop: 'Cauliflower',
    waypoints: [
      [28.2000, 83.9800],
      [28.2500, 84.0800],
      [28.3000, 84.1800],
      [28.3500, 84.2800],
      [28.4000, 84.3800],
      [28.4500, 84.4800],
      [28.5000, 84.5800],
      [28.5500, 84.6800],
      [28.6000, 84.7800],
      [28.6500, 84.8800],
    ],
    handlingRisk: 'Medium',
    handlingScore: 55,
    distance: '200 km',
    travelTime: '7.2 hrs',
    shipments: 8,
    incidents: 4,
    vehicles: 3,
    status: 'Active',
    icon: '🥦'
  },
  { 
    id: 3,
    name: 'Terai Agri Corridor', 
    from: 'Birgunj', 
    to: 'Kathmandu',
    crop: 'Mangoes',
    waypoints: [
      [27.0000, 84.8500],
      [27.0500, 84.9500],
      [27.1000, 85.0500],
      [27.1500, 85.1500],
      [27.2000, 85.2500],
      [27.2500, 85.3500],
      [27.3000, 85.4500],
      [27.3500, 85.5500],
    ],
    handlingRisk: 'Low',
    handlingScore: 32,
    distance: '90 km',
    travelTime: '3.0 hrs',
    shipments: 6,
    incidents: 2,
    vehicles: 2,
    status: 'Optimal',
    icon: '🥭'
  },
  { 
    id: 4,
    name: 'Mountain Agri Corridor', 
    from: 'Dhading', 
    to: 'Kathmandu',
    crop: 'Potatoes',
    waypoints: [
      [27.9500, 84.9000],
      [28.0000, 85.0000],
      [28.0500, 85.1000],
      [28.1000, 85.2000],
      [28.1500, 85.3000],
    ],
    handlingRisk: 'Critical',
    handlingScore: 89,
    distance: '45 km',
    travelTime: '2.5 hrs',
    shipments: 4,
    incidents: 9,
    vehicles: 1,
    status: 'Warning',
    icon: '🥔'
  },
  { 
    id: 5,
    name: 'Mid-Western Agri Corridor', 
    from: 'Surkhet', 
    to: 'Jumla',
    crop: 'Apples',
    waypoints: [
      [28.6000, 81.6000],
      [28.6500, 81.7000],
      [28.7000, 81.8000],
      [28.7500, 81.9000],
      [28.8000, 82.0000],
      [28.8500, 82.1000],
    ],
    handlingRisk: 'Medium',
    handlingScore: 64,
    distance: '120 km',
    travelTime: '4.5 hrs',
    shipments: 5,
    incidents: 5,
    vehicles: 2,
    status: 'Active',
    icon: '🍎'
  }
];

// Active shipment vehicles with produce
const activeVehicles = [
  { id: 1, route: 'Central Agri Corridor', position: [27.8500, 84.7000], speed: '45 km/h', cargo: 'Tomatoes', status: 'In Transit', handling: 'Moderate' },
  { id: 2, route: 'Western Agri Corridor', position: [28.3500, 84.2800], speed: '52 km/h', cargo: 'Cauliflower', status: 'In Transit', handling: 'Good' },
  { id: 3, route: 'Terai Agri Corridor', position: [27.1500, 85.1500], speed: '68 km/h', cargo: 'Mangoes', status: 'In Transit', handling: 'Optimal' },
  { id: 4, route: 'Central Agri Corridor', position: [28.0000, 85.0500], speed: '38 km/h', cargo: 'Dairy', status: 'Delayed', handling: 'Poor' },
  { id: 5, route: 'Western Agri Corridor', position: [28.5000, 84.5800], speed: '55 km/h', cargo: 'Vegetables', status: 'In Transit', handling: 'Good' },
];

// Fix marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Nepal bounds
const NEPAL_BOUNDS = {
  southwest: [26.3, 80.0],
  northeast: [30.5, 88.2]
};

// Get route color based on handling risk
const getRouteColor = (handlingRisk) => {
  if (handlingRisk === 'Critical') return '#ef4444';
  if (handlingRisk === 'High') return '#f97316';
  if (handlingRisk === 'Medium') return '#eab308';
  if (handlingRisk === 'Low') return '#22c55e';
  return '#8b5cf6';
};

// Get risk emoji
const getRiskEmoji = (handlingRisk) => {
  if (handlingRisk === 'Critical') return '🔴';
  if (handlingRisk === 'High') return '🟠';
  if (handlingRisk === 'Medium') return '🟡';
  if (handlingRisk === 'Low') return '🟢';
  return '❓';
};

// Map Controller
function MapController({ selectedRoute, setMapReady }) {
  const map = useMap();

  useEffect(() => {
    setMapReady(true);
    
    map.fitBounds([
      NEPAL_BOUNDS.southwest,
      NEPAL_BOUNDS.northeast
    ], {
      padding: [30, 30],
      maxZoom: 8
    });

    map.setMaxBounds([
      [25.5, 79.0],
      [31.5, 89.0]
    ]);
    
  }, [map, setMapReady]);

  useEffect(() => {
    if (selectedRoute && selectedRoute.waypoints && selectedRoute.waypoints.length > 0) {
      const center = selectedRoute.waypoints[Math.floor(selectedRoute.waypoints.length / 2)];
      map.flyTo(center, 10, {
        duration: 1.5,
        easeLinearity: 0.25
      });
    }
  }, [selectedRoute, map]);

  return null;
}

// Zoom Control
function ZoomControl({ onZoomChange }) {
  const map = useMap();
  
  useEffect(() => {
    map.setMinZoom(6);
    map.setMaxZoom(18);
  }, [map]);

  useEffect(() => {
    const handleZoom = () => {
      const zoom = map.getZoom();
      if (onZoomChange) onZoomChange(zoom);
    };
    
    map.on('zoomend', handleZoom);
    return () => {
      map.off('zoomend', handleZoom);
    };
  }, [map, onZoomChange]);

  return null;
}

const LiveMap = () => {
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [mapStyle, setMapStyle] = useState('road');
  const [filterRisk, setFilterRisk] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [mapError, setMapError] = useState(null);
  const [mapReady, setMapReady] = useState(false);
  const [currentZoom, setCurrentZoom] = useState(7);
  const [showVehicleData, setShowVehicleData] = useState(true);
  const [showRiskHeatmap, setShowRiskHeatmap] = useState(true);
  
  const searchInputRef = useRef(null);
  const timeoutRef = useRef(null);

  // Get unique risk levels and statuses for filters
  const riskLevels = ['all', ...new Set(routeData.map(r => r.handlingRisk))];
  const statuses = ['all', ...new Set(routeData.map(r => r.status))];

  const searchPlace = (value) => {
    setSearch(value);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (value.trim() === "") {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    const result = routeData.filter(route =>
      route.name.toLowerCase().includes(value.toLowerCase()) ||
      route.from.toLowerCase().includes(value.toLowerCase()) ||
      route.to.toLowerCase().includes(value.toLowerCase()) ||
      route.crop.toLowerCase().includes(value.toLowerCase()) ||
      route.handlingRisk.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(result);
    setShowSuggestions(result.length > 0);
  };

  const chooseRoute = (route) => {
    if (!route || !route.waypoints || route.waypoints.length === 0) {
      console.warn("⚠️ Selected route has no waypoints:", route);
      return;
    }
    setSelected(route);
    setSearch(route.name);
    setSuggestions([]);
    setShowSuggestions(false);
    setMapError(null);
  };

  const handleInputBlur = () => {
    timeoutRef.current = setTimeout(() => setShowSuggestions(false), 300);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Filter routes
  const filteredRoutes = routeData.filter(route => {
    const riskMatch = filterRisk === 'all' || route.handlingRisk === filterRisk;
    const statusMatch = filterStatus === 'all' || route.status === filterStatus;
    return riskMatch && statusMatch;
  });

  const validRoutes = filteredRoutes.filter(route => 
    route.waypoints && 
    Array.isArray(route.waypoints) && 
    route.waypoints.length > 0
  );

  const selectedRoute = selected || routeData[0];

  // Handling risk points (simulated)
  const riskPoints = [
    { position: [27.8000, 84.6500], risk: 85, type: 'Vibration/Shock Zone' },
    { position: [28.3000, 84.1800], risk: 78, type: 'Handling Instability' },
    { position: [28.0500, 85.1000], risk: 92, type: 'Temperature Fluctuation' },
    { position: [28.7000, 81.8000], risk: 70, type: 'Loading Pattern Issue' },
  ];

  // Collection centers (agricultural hubs)
  const collectionCenters = [
    { name: 'Chitwan Agri Hub', position: [27.7000, 84.4500], type: 'Collection Center' },
    { name: 'Pokhara Agri Hub', position: [28.2000, 83.9800], type: 'Collection Center' },
    { name: 'Birgunj Agri Hub', position: [27.0000, 84.8500], type: 'Collection Center' },
    { name: 'Kathmandu Market', position: [28.1500, 85.3500], type: 'Market Destination' },
  ];

  return (
    <div className="p-4 md:p-6 min-h-screen bg-[#020617]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-white flex items-center gap-3">
            <span>🗺️</span> KrishiTrust Operations Map
            <span className="text-xs bg-green-500/20 px-3 py-1 rounded-full text-green-400">Live</span>
          </h1>
          <p className="text-gray-400 text-sm md:text-base">
            {mapReady ? `✅ ${validRoutes.length} active shipment routes • ${activeVehicles.length} vehicles • Zoom: ${currentZoom.toFixed(1)}x` : '🔄 Loading map...'}
          </p>
        </div>
        <div className="flex flex-wrap gap-2 mt-3 md:mt-0">
          {/* Map Style Toggle */}
          <div className="flex bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-1">
            <button
              onClick={() => setMapStyle('road')}
              className={`px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium transition-all duration-300 ${
                mapStyle === 'road' 
                  ? 'bg-green-600 text-white' 
                  : 'text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              🗺️ Roads
            </button>
            <button
              onClick={() => setMapStyle('satellite')}
              className={`px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium transition-all duration-300 ${
                mapStyle === 'satellite' 
                  ? 'bg-green-600 text-white' 
                  : 'text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              🛰️ Satellite
            </button>
          </div>
          <button
            onClick={() => setShowVehicleData(!showVehicleData)}
            className={`px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium transition-all duration-300 ${
              showVehicleData 
                ? 'bg-blue-600 text-white' 
                : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            🚛 Vehicles
          </button>
          <button
            onClick={() => setShowRiskHeatmap(!showRiskHeatmap)}
            className={`px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium transition-all duration-300 ${
              showRiskHeatmap 
                ? 'bg-red-600 text-white' 
                : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            🔥 Handling Risk
          </button>
        </div>
      </div>

      {/* Map Style Indicator */}
      <div className="mb-3 flex flex-wrap items-center gap-2 text-xs">
        <span className="text-gray-400">Current View:</span>
        <span className={`px-2 py-0.5 rounded-full ${
          mapStyle === 'road' 
            ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
            : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
        }`}>
          {mapStyle === 'road' ? '🗺️ Road Network' : '🛰️ Satellite Imagery'}
        </span>
        <span className="text-gray-500">|</span>
        <span className="text-gray-400">Zoom: {currentZoom.toFixed(1)}x</span>
        <span className="text-gray-500">|</span>
        <span className="text-gray-400">🌾 {validRoutes.length} shipment routes</span>
        <span className="text-gray-500">|</span>
        <span className="text-gray-400">🚛 {activeVehicles.length} vehicles</span>
        <span className="text-gray-500">|</span>
        <span className="text-gray-400">Click route for details</span>
      </div>

      {/* Error Display */}
      {mapError && (
        <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-xl text-red-400 text-sm">
          ❌ {mapError}
        </div>
      )}

      {/* Search & Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
        <div className="relative z-[9999]">
          <input
            ref={searchInputRef}
            value={search}
            onChange={(e) => searchPlace(e.target.value)}
            onBlur={handleInputBlur}
            placeholder="🔍 Search routes, crops, cities..."
            className="w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-green-500/50 transition-all duration-300 text-sm"
          />
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-[#1a1f2e] backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-2xl max-h-60 overflow-y-auto z-[9999]">
              {suggestions.map((route, index) => (
                <div
                  key={index}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => chooseRoute(route)}
                  className="px-4 py-2.5 hover:bg-white/10 cursor-pointer transition-colors text-white flex items-center justify-between text-sm"
                >
                  <div className="flex items-center gap-2">
                    <span>{getRiskEmoji(route.handlingRisk)}</span>
                    <span>📍 {route.name}</span>
                  </div>
                  <span className="text-xs text-gray-400">{route.from} → {route.to} • {route.crop}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="relative z-[100]">
          <select
            value={filterRisk}
            onChange={(e) => setFilterRisk(e.target.value)}
            className="w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500/50 transition-all duration-300 appearance-none cursor-pointer text-sm"
          >
            {riskLevels.map(risk => (
              <option key={risk} value={risk} className="bg-[#1a1f2e]">
                {risk === 'all' ? '🌾 All Handling Risk Levels' : `${getRiskEmoji(risk)} ${risk} Handling Risk`}
              </option>
            ))}
          </select>
        </div>

        <div className="relative z-[100]">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500/50 transition-all duration-300 appearance-none cursor-pointer text-sm"
          >
            {statuses.map(status => (
              <option key={status} value={status} className="bg-[#1a1f2e]">
                {status === 'all' ? '📊 All Shipment Status' : `📊 ${status}`}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Map Container */}
      <div className="rounded-2xl overflow-hidden border border-white/10 relative z-[1] w-full" style={{ height: 'calc(100vh - 420px)', minHeight: '500px' }}>
        <MapContainer
          center={[28.3949, 84.1240]}
          zoom={7}
          minZoom={6}
          maxZoom={18}
          zoomControl={true}
          style={{ height: "100%", width: "100%" }}
          className="bg-[#05080f]"
        >
          <MapController 
            selectedRoute={selected} 
            setMapReady={setMapReady}
          />
          <ZoomControl onZoomChange={setCurrentZoom} />

          {/* Tile Layers */}
          {mapStyle === 'satellite' ? (
            <TileLayer
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              attribution='&copy; <a href="https://www.esri.com/">Esri</a>'
              maxZoom={18}
              minZoom={6}
            />
          ) : (
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              maxZoom={18}
            />
          )}

          {/* Collection Centers / Market Destinations */}
          {collectionCenters.map((center, index) => (
            <Marker
              key={`center-${index}`}
              position={center.position}
              icon={L.divIcon({
                className: 'custom-div-icon',
                html: `<div style="background-color: ${center.type === 'Collection Center' ? '#22c55e' : '#8b5cf6'}; width: 14px; height: 14px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 20px ${center.type === 'Collection Center' ? '#22c55e80' : '#8b5cf680'}; display:flex; align-items:center; justify-content:center; font-size: 8px;">
                  ${center.type === 'Collection Center' ? '🌾' : '🏪'}
                </div>`,
                iconSize: [14, 14],
                iconAnchor: [7, 7],
              })}
            >
              <Popup>
                <div className="text-black min-w-[180px]">
                  <h4 className="font-bold text-sm">{center.name}</h4>
                  <p className="text-xs text-gray-600">Type: {center.type}</p>
                </div>
              </Popup>
            </Marker>
          ))}

          {/* Route Polylines */}
          {validRoutes.map((route, index) => {
            const color = getRouteColor(route.handlingRisk);
            const isSelected = selected && selected.id === route.id;
            
            return (
              <Polyline
                key={index}
                positions={route.waypoints}
                pathOptions={{
                  color: color,
                  weight: isSelected ? 6 : 4,
                  opacity: isSelected ? 1 : 0.7,
                  dashArray: route.status === 'Warning' ? '10, 5' : null,
                  lineJoin: 'round',
                }}
                eventHandlers={{
                  click: () => {
                    chooseRoute(route);
                  }
                }}
              >
                <Popup>
                  <div className="text-black min-w-[220px]">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-2xl">{getRiskEmoji(route.handlingRisk)}</span>
                      <h3 className="font-bold text-lg">{route.name}</h3>
                    </div>
                    <p className="text-sm text-gray-600">🌾 {route.crop} • {route.from} → {route.to}</p>
                    <div className="mt-2 space-y-1 text-sm border-t border-gray-100 pt-2">
                      <div className="grid grid-cols-2 gap-1">
                        <span className="text-gray-500">Handling Risk:</span>
                        <span className={`font-medium ${
                          route.handlingRisk === 'Critical' ? 'text-red-500' :
                          route.handlingRisk === 'High' ? 'text-orange-500' :
                          route.handlingRisk === 'Medium' ? 'text-yellow-500' :
                          'text-green-500'
                        }`}>{route.handlingRisk}</span>
                        <span className="text-gray-500">Handling Score:</span>
                        <span className="font-medium">{route.handlingScore}/100</span>
                        <span className="text-gray-500">Distance:</span>
                        <span className="font-medium">{route.distance}</span>
                        <span className="text-gray-500">Travel Time:</span>
                        <span className="font-medium">{route.travelTime}</span>
                        <span className="text-gray-500">Shipments:</span>
                        <span className="font-medium">{route.shipments}</span>
                        <span className="text-gray-500">Events:</span>
                        <span className="font-medium">{route.incidents}</span>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">🕐 Updated: {new Date().toLocaleString()}</p>
                      <p className="text-xs text-purple-500 mt-1">🔍 Click to zoom in</p>
                    </div>
                  </div>
                </Popup>
              </Polyline>
            );
          })}

          {/* Handling Risk Heatmap Points */}
          {showRiskHeatmap && riskPoints.map((point, index) => (
            <Circle
              key={`risk-${index}`}
              center={point.position}
              radius={2000}
              pathOptions={{
                color: `rgba(239, 68, 68, ${point.risk / 100})`,
                fillColor: `rgba(239, 68, 68, ${point.risk / 150})`,
                fillOpacity: 0.3,
                weight: 1,
              }}
            >
              <Popup>
                <div className="text-black">
                  <h4 className="font-bold text-sm">⚠️ {point.type}</h4>
                  <p className="text-xs text-gray-600">Handling Risk Score: {point.risk}/100</p>
                </div>
              </Popup>
            </Circle>
          ))}

          {/* Active Vehicles */}
          {showVehicleData && activeVehicles.map((vehicle, index) => (
            <Marker
              key={`vehicle-${index}`}
              position={vehicle.position}
              icon={L.divIcon({
                className: 'custom-div-icon',
                html: `<div style="background-color: ${vehicle.status === 'Delayed' ? '#ef4444' : vehicle.handling === 'Poor' ? '#f97316' : '#3b82f6'}; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 20px ${vehicle.status === 'Delayed' ? '#ef444480' : '#3b82f680'}; display:flex; align-items:center; justify-content:center;">
                  🚛
                </div>`,
                iconSize: [12, 12],
                iconAnchor: [6, 6],
              })}
            >
              <Popup>
                <div className="text-black min-w-[180px]">
                  <h4 className="font-bold text-sm">🚛 Vehicle #{vehicle.id}</h4>
                  <p className="text-xs text-gray-600">Route: {vehicle.route}</p>
                  <p className="text-xs text-gray-600">Cargo: {vehicle.cargo}</p>
                  <p className="text-xs text-gray-600">Speed: {vehicle.speed}</p>
                  <p className="text-xs text-gray-600">Handling: {vehicle.handling}</p>
                  <p className={`text-xs font-medium ${vehicle.status === 'Delayed' ? 'text-red-500' : 'text-green-500'}`}>
                    Status: {vehicle.status}
                  </p>
                </div>
              </Popup>
            </Marker>
          ))}

          {/* Selected Route Highlight Circle */}
          {selected && selected.waypoints && selected.waypoints.length > 0 && (
            <Circle
              center={selected.waypoints[Math.floor(selected.waypoints.length / 2)]}
              radius={8000}
              pathOptions={{ color: "#8b5cf6", fillOpacity: 0.08 }}
            />
          )}
        </MapContainer>

        {/* Loading Overlay */}
        {!mapReady && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#05080f]/80 z-50">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mx-auto mb-4"></div>
              <p className="text-gray-400">Loading agricultural operations network...</p>
            </div>
          </div>
        )}

        {/* Zoom Level Indicator */}
        <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-xl border border-white/10 rounded-lg px-3 py-1.5 text-xs text-gray-300 z-[1000]">
          🔍 {currentZoom.toFixed(1)}x
        </div>

        {/* Legend Overlay */}
        <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-xl border border-white/10 rounded-lg px-3 py-2 text-xs z-[1000]">
          <div className="text-white font-semibold text-xs mb-1">Handling Risk Legend</div>
          <div className="space-y-0.5">
            <div className="flex items-center gap-2"><span className="w-3 h-0.5 bg-red-500"></span> Critical</div>
            <div className="flex items-center gap-2"><span className="w-3 h-0.5 bg-orange-500"></span> High</div>
            <div className="flex items-center gap-2"><span className="w-3 h-0.5 bg-yellow-500"></span> Medium</div>
            <div className="flex items-center gap-2"><span className="w-3 h-0.5 bg-green-500"></span> Low</div>
            <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-blue-400"></span> Vehicle</div>
            <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-red-400 animate-pulse"></span> Risk Point</div>
            <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-green-400"></span> Collection Center</div>
            <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-purple-400"></span> Market</div>
          </div>
        </div>
      </div>

      {/* Info Panel */}
      <div className="mt-4 p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              {getRiskEmoji(selectedRoute.handlingRisk)} {selectedRoute.name}
            </h2>
            <span className="px-3 py-1.5 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 font-medium text-sm">
              🌾 {selectedRoute.crop}
            </span>
            <span className="px-3 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 font-medium text-sm">
              📍 {selectedRoute.from} → {selectedRoute.to}
            </span>
            <span className={`px-3 py-1.5 rounded-full border font-medium text-sm ${
              selectedRoute.handlingRisk === 'Critical' ? 'border-red-500/30 bg-red-500/10 text-red-400' :
              selectedRoute.handlingRisk === 'High' ? 'border-orange-500/30 bg-orange-500/10 text-orange-400' :
              selectedRoute.handlingRisk === 'Medium' ? 'border-yellow-500/30 bg-yellow-500/10 text-yellow-400' :
              'border-green-500/30 bg-green-500/10 text-green-400'
            }`}>
              {selectedRoute.handlingRisk} Handling Risk
            </span>
            <span className="px-3 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 font-medium text-sm">
              🛣️ {validRoutes.length} routes
            </span>
            <span className="px-3 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 font-medium text-sm">
              🚛 {activeVehicles.length} vehicles
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-green-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
              Live
            </span>
            <span className="text-xs text-gray-400">
              🕐 {new Date().toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-3 flex flex-wrap items-center justify-center gap-4 text-xs text-gray-400">
        <span className="flex items-center gap-1">
          <span className="w-3 h-0.5 bg-red-500"></span> Critical Risk
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-0.5 bg-orange-500"></span> High Risk
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-0.5 bg-yellow-500"></span> Medium Risk
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-0.5 bg-green-500"></span> Low Risk
        </span>
        <span className="text-gray-600">|</span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-blue-400"></span> Active Vehicle
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse"></span> Risk Point
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-green-400"></span> Collection Center
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-purple-400"></span> Market
        </span>
        <span className="text-gray-600">|</span>
        <span className="text-gray-500">{validRoutes.length} shipment routes • Nepal agricultural network</span>
      </div>

      <style>{`
        .custom-div-icon {
          background: transparent;
          border: none;
        }
        .leaflet-control-container {
          z-index: 10 !important;
        }
        .leaflet-top, .leaflet-bottom {
          z-index: 10 !important;
        }
        .leaflet-popup-content {
          min-width: 220px !important;
        }
        .leaflet-popup-content-wrapper {
          border-radius: 12px !important;
          box-shadow: 0 8px 32px rgba(0,0,0,0.3) !important;
        }
        .leaflet-control-zoom {
          border: none !important;
          box-shadow: 0 2px 10px rgba(0,0,0,0.3) !important;
          border-radius: 8px !important;
          overflow: hidden !important;
        }
        .leaflet-control-zoom a {
          background: rgba(20, 30, 50, 0.9) !important;
          color: white !important;
          border-color: rgba(255,255,255,0.1) !important;
          backdrop-filter: blur(10px) !important;
        }
        .leaflet-control-zoom a:hover {
          background: rgba(34, 197, 94, 0.8) !important;
        }
      `}</style>
    </div>
  );
};

export default LiveMap;