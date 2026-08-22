// src/pages/Landing.jsx
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();
  const [isOnline, setIsOnline] = useState(true);
  const [time, setTime] = useState('');
  const [glitchText, setGlitchText] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeStat, setActiveStat] = useState(null);
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);

  // Real-time clock
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString('en-US', { 
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Random glitch effect
  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchText(true);
      setTimeout(() => setGlitchText(false), 100);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Mouse tracking for parallax
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Particle System
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const particleCount = window.innerWidth < 768 ? 50 : 100;
    const particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.5 + 0.1
      });
    }
    particlesRef.current = particles;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(74, 222, 128, ${p.opacity})`;
        ctx.fill();
      });
      
      const connectionDistance = window.innerWidth < 768 ? 100 : 150;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(74, 222, 128, ${0.08 * (1 - dist / connectionDistance)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  const handleEnterCommand = () => {
    navigate('/dashboard');
  };

  // STATS for Agricultural Business Intelligence
  const stats = [
    { label: 'Total Shipments', value: '48', icon: '🌾', color: 'from-green-500 to-emerald-500' },
    { label: 'Active Farmers', value: '24', icon: '👨‍🌾', color: 'from-blue-500 to-cyan-500' },
    { label: 'Handling Alerts', value: '127', icon: '⚠️', color: 'from-red-500 to-orange-500' },
    { label: 'Finance Readiness', value: '58%', icon: '💰', color: 'from-amber-500 to-orange-500' }
  ];

  // Shipment Routes visualization data
  const routes = [
    { from: 'Chitwan', to: 'Kathmandu', risk: 'High', crop: 'Tomatoes', distance: '165km', time: '6.5hrs' },
    { from: 'Pokhara', to: 'Kathmandu', risk: 'Medium', crop: 'Cauliflower', distance: '200km', time: '7.2hrs' },
    { from: 'Birgunj', to: 'Kathmandu', risk: 'Low', crop: 'Mangoes', distance: '90km', time: '3.0hrs' }
  ];

  return (
    <div className="min-h-screen bg-[#05080f] flex items-center justify-center relative overflow-hidden font-['Inter',_system-ui,_sans-serif]">
      {/* Canvas for particles */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
      
      {/* Animated Background Gradients - Agricultural colors */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[800px] h-[400px] md:h-[800px] bg-green-500/20 rounded-full blur-3xl animate-pulse"
          style={{ 
            transform: `translate(-50%, -50%) translate(${mousePosition.x}px, ${mousePosition.y}px)`,
            transition: 'transform 0.3s ease-out'
          }}
        ></div>
        <div 
          className="absolute top-1/4 right-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-emerald-500/15 rounded-full blur-3xl animate-pulse delay-1000"
          style={{ 
            transform: `translate(${mousePosition.x * -0.5}px, ${mousePosition.y * -0.5}px)`,
            transition: 'transform 0.3s ease-out'
          }}
        ></div>
        <div 
          className="absolute bottom-1/4 left-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-amber-500/15 rounded-full blur-3xl animate-pulse delay-2000"
          style={{ 
            transform: `translate(${mousePosition.x * 0.3}px, ${mousePosition.y * 0.3}px)`,
            transition: 'transform 0.3s ease-out'
          }}
        ></div>
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: window.innerWidth < 768 ? '30px 30px' : '50px 50px'
        }}></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 text-center">
        {/* Top Bar */}
        <div className="flex flex-col xs:flex-row items-center justify-center xs:justify-between gap-3 md:gap-4 mb-8 md:mb-12">
          {/* System Status */}
          <div className="flex items-center gap-2 md:gap-3 bg-white/5 backdrop-blur-xl border border-white/10 px-3 md:px-5 py-2 md:py-2.5 rounded-full shadow-2xl shadow-green-500/5">
            <div className="relative flex-shrink-0">
              <span className={`w-2 h-2 md:w-3 md:h-3 rounded-full ${isOnline ? 'bg-green-400' : 'bg-red-400'} inline-block`}></span>
              <span className={`absolute inset-0 w-2 h-2 md:w-3 md:h-3 rounded-full ${isOnline ? 'bg-green-400' : 'bg-red-400'} animate-ping opacity-75`}></span>
            </div>
            <span className={`text-[10px] md:text-sm font-mono font-bold tracking-widest ${isOnline ? 'text-green-400' : 'text-red-400'}`}>
              {isOnline ? '● AGRICULTURAL NETWORK' : '● OFFLINE'}
            </span>
            <span className="w-px h-4 md:h-6 bg-white/10 hidden xs:block"></span>
            <span className="text-[8px] md:text-xs text-gray-400 font-mono hidden xs:block">v1.0.0</span>
          </div>

          {/* Time & Date */}
          <div className="flex items-center gap-2 md:gap-4 bg-white/5 backdrop-blur-xl border border-white/10 px-3 md:px-5 py-2 md:py-2.5 rounded-full shadow-2xl shadow-blue-500/5">
            <span className="text-[10px] md:text-sm font-mono text-gray-300 tracking-wider">
              {time || '--:--:--'}
            </span>
            <span className="w-px h-4 md:h-6 bg-white/10"></span>
            <span className="text-[8px] md:text-sm font-mono text-gray-400">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'short',
                month: 'short',
                day: 'numeric'
              })}
            </span>
          </div>
        </div>

        {/* Main Branding with Glitch Effect */}
        <div className="mb-6 md:mb-8 relative">
          <div className="inline-block relative">
            <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black tracking-tight leading-[1.1]">
              <span className="text-white relative block sm:inline">
                Krishi
                {glitchText && (
                  <>
                    <span className="absolute inset-0 text-green-400 blur-sm translate-x-0.5 opacity-70">Krishi</span>
                    <span className="absolute inset-0 text-emerald-400 blur-sm -translate-x-0.5 opacity-70">Krishi</span>
                  </>
                )}
              </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-400 to-amber-400 animate-gradient relative block sm:inline">
                Trust
                {glitchText && (
                  <>
                    <span className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-400 to-amber-400 blur-sm translate-x-0.5 opacity-70">Trust</span>
                    <span className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-400 to-amber-400 blur-sm -translate-x-0.5 opacity-70">Trust</span>
                  </>
                )}
              </span>
            </h1>
            <div className="absolute -bottom-2 md:-bottom-4 left-1/2 -translate-x-1/2 w-1/3 md:w-1/2 h-0.5 bg-gradient-to-r from-transparent via-green-400 to-transparent opacity-50"></div>
          </div>
        </div>

        {/* Tagline - Agricultural Value & Finance Focus */}
        <div className="max-w-3xl mx-auto mb-8 md:mb-12">
          <p className="text-lg sm:text-xl md:text-2xl font-light text-gray-200/80 tracking-wide">
            Protect the Harvest. Prove the Business. Unlock Opportunity.
          </p>
          <p className="text-sm sm:text-base md:text-lg text-gray-400 font-light mt-1 md:mt-2 flex items-center justify-center gap-2 flex-wrap">
            <span className="inline-block w-1.5 h-1.5 bg-green-400/50 rounded-full"></span>
            Agricultural Value & Finance Intelligence
            <span className="inline-block w-1.5 h-1.5 bg-emerald-400/50 rounded-full"></span>
          </p>
        </div>

        {/* STATISTICS CARDS */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4 max-w-4xl mx-auto mb-8 md:mb-14">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 transition-all duration-300 hover:scale-105 hover:bg-white/10 cursor-pointer overflow-hidden"
              onMouseEnter={() => setActiveStat(index)}
              onMouseLeave={() => setActiveStat(null)}
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-2xl`}></div>
              <div className="relative">
                <div className="text-2xl sm:text-3xl md:text-4xl mb-1 sm:mb-2">{stat.icon}</div>
                <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-tight">
                  {stat.value}
                </div>
                <div className="text-[10px] sm:text-xs md:text-sm text-gray-400 mt-0.5 sm:mt-1 font-light">{stat.label}</div>
                <div className="mt-2 sm:mt-3 h-0.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className={`h-full bg-gradient-to-r ${stat.color} transition-all duration-1000 ease-out ${
                    activeStat === index ? 'w-full' : 'w-0'
                  }`}></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Shipment Risk Preview Cards */}
        <div className="max-w-4xl mx-auto mb-8 md:mb-14">
          <p className="text-xs md:text-sm text-gray-400 font-mono tracking-wider mb-3 md:mb-4">
            🚛 ACTIVE SHIPMENT RISK MONITORING
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 md:gap-3">
            {routes.map((route, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg p-3 md:p-4 text-left hover:bg-white/10 transition-all duration-300">
                <div className="flex items-center justify-between mb-1 md:mb-2">
                  <span className="text-xs md:text-sm font-semibold text-white">
                    {route.from} → {route.to}
                  </span>
                  <span className={`text-[8px] md:text-xs font-bold px-1.5 md:px-2 py-0.5 rounded ${
                    route.risk === 'High' ? 'bg-red-500/20 text-red-400' :
                    route.risk === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-green-500/20 text-green-400'
                  }`}>
                    {route.risk} RISK
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-1 text-[8px] md:text-xs text-gray-400">
                  <span>🌾 {route.crop}</span>
                  <span>📏 {route.distance}</span>
                  <span>⏱️ {route.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* COMMAND CENTER ENTRY BUTTON */}
        <div className="relative inline-block w-full sm:w-auto">
          <button
            onClick={handleEnterCommand}
            className="group relative w-full sm:w-auto px-6 sm:px-8 md:px-10 py-3 sm:py-4 text-base sm:text-lg md:text-xl font-bold text-white rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-green-600 via-emerald-500 to-amber-500 animate-gradient bg-[length:200%_200%]"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-green-600 via-emerald-500 to-amber-500 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300"></div>
            <div className="absolute inset-0 rounded-xl sm:rounded-2xl border border-white/20 group-hover:border-white/40 transition-colors duration-300"></div>
            
            <span className="relative flex items-center justify-center gap-2 sm:gap-4">
              <span className="tracking-wider text-sm sm:text-base md:text-lg">🌾 LAUNCH KRISHITRUST PLATFORM</span>
              <span className="text-lg sm:text-xl group-hover:translate-x-2 group-hover:scale-110 transition-all duration-300">
                📈
              </span>
            </span>
          </button>
          
          <div className="mt-3 md:mt-4 flex flex-wrap items-center justify-center gap-2 md:gap-3 text-[8px] sm:text-[10px] md:text-xs text-gray-500 font-mono">
            <span>🌾 HANDLING SCORE</span>
            <span className="w-px h-3 bg-gray-700 hidden xs:inline-block"></span>
            <span>📊 BUSINESS RELIABILITY</span>
            <span className="w-px h-3 bg-gray-700 hidden xs:inline-block"></span>
            <span>💰 FINANCE READINESS</span>
            <span className="w-px h-3 bg-gray-700 hidden xs:inline-block"></span>
            <span>🇳🇵 NEPAL</span>
          </div>
        </div>

        {/* BOTTOM SYSTEM STATS */}
        <div className="mt-8 md:mt-16 flex flex-wrap items-center justify-center gap-3 md:gap-6 text-[8px] sm:text-[10px] md:text-xs text-gray-500 font-mono border-t border-white/5 pt-4 md:pt-6">
          <div className="flex items-center gap-1.5 md:gap-2">
            <span className="w-1 h-1 md:w-1.5 md:h-1.5 bg-green-400 rounded-full animate-pulse"></span>
            <span>Network: Active</span>
          </div>
          <div className="flex items-center gap-1.5 md:gap-2">
            <span>🌾</span>
            <span>Shipments: 48</span>
          </div>
          <div className="flex items-center gap-1.5 md:gap-2">
            <span>👨‍🌾</span>
            <span>Farmers: 24</span>
          </div>
          <div className="flex items-center gap-1.5 md:gap-2">
            <span>💰</span>
            <span>Finance Readiness: 58%</span>
          </div>
          <div className="flex items-center gap-1.5 md:gap-2">
            <span>🛡️</span>
            <span>Encrypted: AES-256</span>
          </div>
          <div className="flex items-center gap-1.5 md:gap-2">
            <span>🧠</span>
            <span>AI Models: 4</span>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap');
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradientMove 3s ease infinite;
        }
        
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @media (max-width: 480px) {
          .animate-gradient {
            animation-duration: 2s;
          }
        }
      `}</style>
    </div>
  );
};

export default Landing;