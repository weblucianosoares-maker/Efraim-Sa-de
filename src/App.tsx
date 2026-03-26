import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Sidebar, TopBar } from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Leads from "./pages/Leads";
import Funnel from "./pages/Funnel";
import Contracts from "./pages/Contracts";
import Carriers from "./pages/Carriers";

function AppContent() {
  const location = useLocation();
  
  const getTitle = (path: string) => {
    switch (path) {
      case "/": return "Visão Geral";
      case "/leads": return "Intelligence de Leads";
      case "/funnel": return "Funil de Vendas";
      case "/contracts": return "Gestão de Contratos";
      case "/carriers": return "Catálogo de Operadoras";
      default: return "Efraim";
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <div className="flex-1 md:ml-64 flex flex-col">
        <TopBar title={getTitle(location.pathname)} />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/leads" element={<Leads />} />
            <Route path="/funnel" element={<Funnel />} />
            <Route path="/contracts" element={<Contracts />} />
            <Route path="/carriers" element={<Carriers />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
