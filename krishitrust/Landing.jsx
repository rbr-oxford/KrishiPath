import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Bell,
  Leaf,
  Users,
  Truck,
  Building2,
  Shield,
  Handshake,
  Star,
  TrendingUp,
  ArrowRight,
  BarChart3,
  AlertTriangle,
  Wallet,
  Sprout
} from "lucide-react";

const Landing = () => {

  const navigate = useNavigate();
  const canvasRef = useRef(null);

  const [time, setTime] = useState("");
  const [mouse, setMouse] = useState({
    x: 0,
    y: 0
  });

  // CLOCK
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(
        new Date().toLocaleTimeString(
          "en-US",
          {
            hour12: false
          }
        )
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // MOUSE PARALLAX
  useEffect(() => {
    const move = (e) => {
      setMouse({
        x: (e.clientX / window.innerWidth - 0.5) * 25,
        y: (e.clientY / window.innerHeight - 0.5) * 25
      });
    };

    window.addEventListener("mousemove", move);
    return () => {
      window.removeEventListener("mousemove", move);
    };
  }, []);

  // PARTICLES
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    const particles = Array.from(
      { length: 80 },
      () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        size: Math.random() * 2,
        opacity: Math.random() * 0.5
      })
    );

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(74,222,128,${p.opacity})`;
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  // HANDLE NAVIGATION
  const handleExplorePlatform = () => {
    navigate("/dashboard");
  };

  const handleViewAnalytics = () => {
    navigate("/analysis");
  };

  const stats = [
    {
      icon: <Leaf size={18} />,
      value: "48",
      title: "Total Shipments",
      trend: "+12%"
    },
    {
      icon: <Users size={18} />,
      value: "24",
      title: "Active Farmers",
      trend: "+8%"
    },
    {
      icon: <Truck size={18} />,
      value: "18",
      title: "Active Drivers",
      trend: "+5%"
    },
    {
      icon: <Handshake size={18} />,
      value: "8",
      title: "Sponsors",
      trend: "+15%"
    },
    {
      icon: <AlertTriangle size={18} />,
      value: "127",
      title: "Handling Alerts",
      trend: "-20%"
    },
    {
      icon: <Wallet size={18} />,
      value: "58%",
      title: "Financial Readiness",
      trend: "+10%"
    }
  ];

  const features = [
    {
      icon: <Users size={20} />,
      title: "Farmers",
      desc: "Track shipments and build verified reputation"
    },
    {
      icon: <Truck size={20} />,
      title: "Drivers",
      desc: "Monitor trips and delivery performance"
    },
    {
      icon: <Building2 size={20} />,
      title: "Companies",
      desc: "Discover trusted agricultural partners"
    },
    {
      icon: <Star size={20} />,
      title: "Reputation",
      desc: "Verified trust and reliability scores"
    },
    {
      icon: <Handshake size={20} />,
      title: "Sponsorships",
      desc: "Connect opportunities"
    },
    {
      icon: <Shield size={20} />,
      title: "Insurance Intelligence",
      desc: "Cargo protection insights"
    }
  ];

  return (
    <div className="min-h-screen bg-[#030712] text-white overflow-hidden relative font-sans">

      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" />

      <div
        className="absolute w-[900px] h-[900px] rounded-full bg-green-500/10 blur-[150px]"
        style={{
          left: "50%",
          top: "40%",
          transform: `translate(-50%,-50%) translate(${mouse.x}px,${mouse.y}px)`
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">

        {/* NAVBAR */}
        <div className="flex justify-between items-center mb-16">
          <div className="flex items-center gap-3">
            <div className="bg-green-500/20 p-2 rounded-xl">
              <Leaf className="text-green-400" size={24} />
            </div>
            <div className="text-2xl font-bold">
              Krishi<span className="text-green-400">Trust</span>
            </div>
          </div>

          <div className="hidden md:flex gap-8 text-gray-400 text-sm items-center">
            <span>Dashboard</span>
            <span>Farmers</span>
            <span>Drivers</span>
            <span>Marketplace</span>
            <span>Analytics</span>
            <span>Reports</span>
            <Search size={18} />
            <Bell size={18} />
          </div>
        </div>

        {/* HERO SECTION */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* LEFT SIDE */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-green-400 text-xs tracking-[0.3em] font-mono">
                LIVE SYSTEM
              </span>
              <span className="text-gray-500 text-xs">
                {time}
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Agriculture.
              <br />
              <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                Powered by Trust.
              </span>
            </h1>

            <p className="mt-6 text-gray-300 text-lg max-w-xl leading-relaxed">
              KrishiTrust creates financial intelligence for Nepal's agricultural ecosystem by
              connecting farmers, drivers, companies, and institutions through verified trust.
            </p>

            <div className="flex gap-4 mt-8">
              <button
                onClick={handleExplorePlatform}
                className="px-7 py-3 rounded-2xl bg-gradient-to-r from-green-600 to-emerald-500 font-semibold flex items-center gap-2 hover:scale-105 transition shadow-lg shadow-green-500/20"
              >
                Explore Platform
                <ArrowRight size={18} />
              </button>

              <button
                onClick={handleViewAnalytics}
                className="px-7 py-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition"
              >
                View Analytics
              </button>
            </div>

            {/* TRUST BADGES */}
            <div className="flex gap-8 mt-10 text-sm text-gray-400">
              <div>
                <p className="text-white font-bold text-xl">77+</p>
                Districts
              </div>
              <div>
                <p className="text-white font-bold text-xl">1000+</p>
                Farmers
              </div>
              <div>
                <p className="text-white font-bold text-xl">AI</p>
                Insights
              </div>
            </div>
          </div>

          {/* RIGHT SIDE HERO VISUAL */}
          <div className="relative flex justify-center">
            <div className="absolute w-72 h-72 bg-green-400/20 rounded-full blur-3xl animate-pulse" />

            <div
              className="relative w-80 h-80 rounded-[40px] bg-white/5 border border-white/10 backdrop-blur-xl flex items-center justify-center shadow-2xl"
              style={{
                transform: `translate(${mouse.x / 2}px,${mouse.y / 2}px)`
              }}
            >
              <div className="absolute inset-6 rounded-[30px] border border-green-400/20 animate-spin [animation-duration:20s]" />

              <div className="text-center">
                <div className="mx-auto w-28 h-28 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center shadow-xl shadow-green-500/40 animate-bounce">
                  <Sprout size={55} />
                </div>

                <h3 className="mt-6 text-xl font-bold">AI Agriculture Core</h3>
                <p className="text-gray-400 text-sm mt-2">Real-time ecosystem intelligence</p>
              </div>
            </div>

            {/* FLOATING CARDS */}
            <div className="absolute -top-5 left-0 bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl px-5 py-3 animate-pulse">
              <div className="text-green-400 text-xs">RISK MONITORING</div>
              <div className="font-bold">98.4%</div>
            </div>

            <div className="absolute bottom-5 right-0 bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl px-5 py-3">
              <div className="text-blue-400 text-xs">TRUST SCORE</div>
              <div className="font-bold">9.7/10</div>
            </div>
          </div>
        </div>

        {/* STATISTICS */}
        <div className="mb-20">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-semibold tracking-wider">SYSTEM OVERVIEW</h2>
            <span className="text-xs text-gray-500">Updated {time}</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-green-400/40 hover:-translate-y-2 transition backdrop-blur-xl"
              >
                <div className="text-green-400 mb-4">{stat.icon}</div>
                <div className="text-3xl font-bold">{stat.value}</div>
                <div className="text-xs text-gray-400 mt-1">{stat.title}</div>
                <div className="text-green-400 text-xs mt-3">
                  <TrendingUp size={12} className="inline" /> {stat.trend}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PLATFORM FEATURES */}
        <div className="mb-20">
          <h2 className="text-sm font-semibold tracking-[0.25em] text-gray-300 mb-6">
            PLATFORM ECOSYSTEM
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-xl hover:bg-white/10 hover:border-green-400/40 transition hover:-translate-y-2"
              >
                <div className="w-12 h-12 rounded-xl bg-green-400/10 flex items-center justify-center text-green-400 mb-4 group-hover:scale-110 transition">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-sm">{feature.title}</h3>
                <p className="text-xs text-gray-400 mt-2 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* AI REPORT SECTION */}
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-green-500/10 via-emerald-500/5 to-transparent p-10 mb-10">
          <div className="absolute right-0 top-0 w-72 h-72 bg-green-400/20 blur-3xl rounded-full" />

          <div className="relative z-10 max-w-2xl">
            <div className="flex items-center gap-2 text-green-400 text-xs mb-4">
              <BarChart3 size={16} />
              AI AGRICULTURAL INTELLIGENCE
            </div>

            <h2 className="text-3xl md:text-4xl font-bold">
              Building Nepal's transparent agricultural future.
            </h2>

            <p className="text-gray-400 mt-4 leading-relaxed">
              Data-driven insights, verified relationships, and intelligent financial pathways
              for every participant in the agricultural supply chain.
            </p>

            <button className="mt-7 px-7 py-3 rounded-xl bg-white text-black font-semibold hover:scale-105 transition flex items-center gap-2">
              View Full Report
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* FOOTER */}
        <footer className="border-t border-white/10 pt-8 pb-5 flex flex-col md:flex-row justify-between gap-4 text-xs text-gray-500">
          <div className="flex gap-5">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Network Active
            </span>
            <span>🌱 48 Shipments</span>
            <span>👨‍🌾 24 Farmers</span>
          </div>

          <div className="flex gap-5">
            <span>🇳🇵 Nepal</span>
            <span>© 2026 KrishiTrust</span>
          </div>
        </footer>

      </div>
    </div>
  );
};

export default Landing;