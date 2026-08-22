// src/components/Layout.jsx
import { Outlet, NavLink, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const Layout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const location = useLocation();

  // Real-time clock
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('en-US', { 
        hour12: false,
        hour: '2-digit',
        minute: '2-digit'
      }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/map', label: 'Operations Map', icon: '🗺️' },
    { path: '/analysis', label: 'Business Intelligence', icon: '📈' },
    { path: '/alerts', label: 'Risk & Alerts', icon: '🔔' },
    { path: '/sensors', label: 'Sensor Data', icon: '📡' },
    { path: '/reports', label: 'Reports', icon: '📋' },
    { path: '/settings', label: 'Settings', icon: '⚙️' },
  ];

  return (
    <div className="min-h-screen bg-[#020617] flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex md:flex-col md:w-64 bg-[#0d1117] border-r border-white/10 p-6 fixed h-full overflow-y-auto">
        {/* Brand */}
        <div className="mb-8">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🌾</span>
            <div>
              <h1 className="text-xl font-bold text-white">KrishiTrust</h1>
              <span className="text-xs text-green-400">AI</span>
              <span className="text-xs text-gray-400 ml-1">v1.0</span>
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-1">Agricultural Value & Finance Intelligence</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`
              }
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Bottom Status */}
        <div className="mt-auto pt-6 border-t border-white/10">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
            <span>System Online</span>
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {currentTime} • Nepal
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
          <div className="md:hidden bg-[#0d1117] border-b border-white/10 p-4 space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                <span className="text-lg">{item.icon}</span>
                {item.label}
              </NavLink>
            ))}
            <div className="pt-4 border-t border-white/10">
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