//,, Vercel GitHub connection test
// src/App.jsx
import { Routes, Route } from "react-router-dom";

// Layout Component
import Layout from "./components/Layout";

// KrishiTrust Pages
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import LiveMap from "./pages/LiveMap";
import Analytical from "./pages/Analytical";
import Alerts from "./pages/Alerts";
import SensorData from "./pages/SensorData";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";

function App() {
  return (
    <Routes>
      {/* Landing Page - No Layout */}
      <Route path="/" element={<Landing />} />
      
      {/* Protected Routes with Layout */}
      <Route element={<Layout />}>
        {/* Main Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* Core Agricultural Operations Features */}
        <Route path="/map" element={<LiveMap />} />
        <Route path="/analysis" element={<Analytical />} />
        <Route path="/alerts" element={<Alerts />} />
        
        {/* Sensor & Hardware Integration */}
        <Route path="/sensors" element={<SensorData />} />
        
        {/* Reports & Business Intelligence */}
        <Route path="/reports" element={<Reports />} />
        
        {/* Settings & Configuration */}
        <Route path="/settings" element={<Settings />} />
        
        {/* Fallback Route - Redirect to Dashboard */}
        <Route path="*" element={<Dashboard />} />
      </Route>
    </Routes>
  );
}

export default App;
