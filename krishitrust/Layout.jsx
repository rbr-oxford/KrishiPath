// src/components/Layout.jsx
import { Outlet, NavLink, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const Layout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const [expandedSections, setExpandedSections] = useState({
    platform: true,
    analytics: true,
  });
  const location = useLocation();

  // Real-time clock
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('en-US', { 
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Navigation sections
  const navSections = [
    {
      id: 'main',
      label: '📊 Dashboard',
      items: [
        { path: '/dashboard', label: 'Command Center', icon: '📊' },
        { path: '/map', label: 'Operations Map', icon: '🗺️' },
      ]
    },
    {
      id: 'platform',
      label: '👥 Platform',
      icon: '👥',
      items: [
        { path: '/farmers', label: 'Farmers', icon: '👨‍🌾' },
        { path: '/drivers', label: 'Drivers / Transporters', icon: '🚛' },
        { path: '/companies', label: 'Companies', icon: '🏢' },
        { path: '/reputation', label: 'Reputation', icon: '⭐' },
        { path: '/sponsorships', label: 'Sponsorships', icon: '🤝' },
      ]
    },
    {
      id: 'analytics',
      label: '📈 Analytics & Intelligence',
      icon: '📈',
      items: [
        { path: '/analysis', label: 'Business Intelligence', icon: '📈' },
        { path: '/alerts', label: 'Risk & Alerts', icon: '🔔' },
        { path: '/sensors', label: 'Sensor Data', icon: '📡' },
        { path: '/reports', label: 'Reports', icon: '📋' },
      ]
    },
    {
      id: 'settings',
      label: '⚙️ Settings',
      items: [
        { path: '/settings', label: 'Configuration', icon: '⚙️' },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#020617] flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex md:flex-col md:w-64 bg-[#0d1117] border-r border-white/10 p-4 fixed h-full overflow-y-auto">
        {/* Brand */}
        <div className="mb-4 pb-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🌾</span>
            <div>
              <h1 className="text-xl font-bold text-white">KrishiTrust</h1>
              <span className="text-xs text-green-400">AI</span>
              <span className="text-xs text-gray-400 ml-1">v1.0</span>
            </div>
          </div>
          <p className="text-[10px] text-gray-500 mt-0.5">Agricultural Value & Finance Intelligence</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-3 overflow-y-auto">
          {navSections.map((section) => (
            <div key={section.id}>
              {/* Section Header */}
              <div 
                className="flex items-center justify-between cursor-pointer hover:bg-white/5 rounded-lg px-2 py-1.5 transition-colors"
                onClick={() => section.id !== 'main' && section.id !== 'settings' && toggleSection(section.id)}
              >
                <span className="text-[10px] text-gray-500 uppercase tracking-wider font-medium">
                  {section.label}
                </span>
                {section.id !== 'main' && section.id !== 'settings' && (
                  <span className="text-gray-500 text-xs">
                    {expandedSections[section.id] ? '▼' : '►'}
                  </span>
                )}
              </div>

              {/* Section Items */}
              {(section.id === 'main' || section.id === 'settings' || expandedSections[section.id]) && (
                <div className="space-y-0.5 mt-1">
                  {section.items.map((item) => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                          isActive
                            ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                        }`
                      }
                    >
                      <span className="text-base">{item.icon}</span>
                      {item.label}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Bottom Status */}
        <div className="mt-auto pt-3 border-t border-white/10">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
            <span>System Online</span>
          </div>
          <div className="text-xs text-gray-500 mt-0.5">
            {currentTime} • Nepal
          </div>
          <div className="text-[10px] text-gray-600 mt-0.5">
            Prototype v1.0
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64">
        {/* Mobile Header */}
        <header className="md:hidden flex items-center justify-between p-4 bg-[#0d1117] border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🌾</span>
            <div>
              <h1 className="text-lg font-bold text-white">KrishiTrust</h1>
              <span className="text-xs text-green-400">AI</span>
            </div>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white text-2xl"
          >
            {isMobileMenuOpen ? '✕' : '☰'}
          </button>
        </header>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#0d1117] border-b border-white/10 p-4 space-y-2 max-h-[70vh] overflow-y-auto">
            {navSections.map((section) => (
              <div key={section.id}>
                <div className="text-[10px] text-gray-500 uppercase tracking-wider font-medium px-2 py-1">
                  {section.label}
                </div>
                {section.items.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                        isActive
                          ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                          : 'text-gray-400 hover:text-white hover:bg-white/5'
                      }`
                    }
                  >
                    <span className="text-base">{item.icon}</span>
                    {item.label}
                  </NavLink>
                ))}
              </div>
            ))}
            <div className="pt-3 border-t border-white/10">
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                <span>System Online</span>
              </div>
            </div>
          </div>
        )}

        {/* Page Content */}
        <div className="p-4 md:p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;