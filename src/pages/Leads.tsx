import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Icons } from "../components/Icons";
import { cn } from "../lib/utils";

export default function Leads() {
  const [leads, setLeads] = useState<any[]>([]);
  const [filter, setFilter] = useState("Todos");

  useEffect(() => {
    fetch("/api/leads").then(res => res.json()).then(setLeads);
  }, []);

  const filteredLeads = filter === "Todos" ? leads : leads.filter(l => l.source === filter);

  return (
    <div className="p-8 space-y-10">
      {/* Hero Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-6">
        <div>
          <span className="text-[0.6875rem] uppercase tracking-[0.1em] text-blue-600 font-bold mb-2 block">CRM & Prospecção</span>
          <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 leading-none">
            {leads.length * 1000} <span className="text-2xl font-light text-slate-400">Leads Ativos</span>
          </h1>
        </div>
        <div className="flex gap-4">
          <div className="bg-slate-50 p-6 rounded-xl flex items-center space-x-6 min-w-[240px] border border-slate-100">
            <div className="p-3 bg-white rounded-lg shadow-sm">
              <Icons.Upload className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <p className="text-[0.6875rem] uppercase tracking-wider text-slate-400 mb-1">Processamento</p>
              <p className="font-bold text-slate-900">Import Spreadsheet</p>
              <div className="w-32 h-1 bg-slate-200 rounded-full mt-2 overflow-hidden">
                <div className="w-3/4 h-full bg-blue-600"></div>
              </div>
              <p className="text-[10px] text-blue-600 mt-1 font-medium">4.000 leads processados</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tonal Layered Workspace */}
      <div className="grid grid-cols-12 gap-8">
        {/* Filters Sidebar */}
        <div className="col-span-12 lg:col-span-3 space-y-6">
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-6">Filtrar por Origem</h3>
            <div className="space-y-3">
              {["Todos", "Grupo RH", "Ex-colegas", "Leads Eventos"].map((f) => (
                <label 
                  key={f}
                  onClick={() => setFilter(f)}
                  className={cn(
                    "flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all",
                    filter === f ? "bg-white border-b-2 border-blue-600 shadow-sm" : "hover:bg-white"
                  )}
                >
                  <span className={cn("text-sm font-medium", filter === f ? "text-blue-600" : "text-slate-600")}>{f}</span>
                  <span className={cn(
                    "text-xs px-2 py-0.5 rounded-full",
                    filter === f ? "bg-blue-100 text-blue-700" : "bg-slate-200 text-slate-600"
                  )}>
                    {f === "Todos" ? leads.length : leads.filter(l => l.source === f).length}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="bg-blue-600 p-6 rounded-xl text-white relative overflow-hidden">
            <div className="relative z-10">
              <p className="text-xs opacity-70 mb-1">Conversão média</p>
              <p className="text-3xl font-bold">12.4%</p>
              <div className="mt-4 flex items-center text-[10px] font-bold tracking-widest uppercase bg-white/10 w-fit px-2 py-1 rounded">
                <Icons.TrendingUp className="w-3 h-3 mr-1" /> +2.1% este mês
              </div>
            </div>
            <div className="absolute -right-4 -bottom-4 opacity-10">
              <Icons.Dashboard className="w-32 h-32" />
            </div>
          </div>
        </div>

        {/* Main Data Table */}
        <div className="col-span-12 lg:col-span-9 bg-white rounded-xl p-2 border border-slate-100 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-separate border-spacing-y-2">
              <thead>
                <tr className="text-[0.6875rem] uppercase tracking-[0.1em] text-slate-400">
                  <th className="px-6 py-4 font-semibold">Nome do Lead</th>
                  <th className="px-6 py-4 font-semibold">Origem</th>
                  <th className="px-6 py-4 font-semibold text-center">Último Contato</th>
                  <th className="px-6 py-4 font-semibold text-center">Status</th>
                  <th className="px-6 py-4 font-semibold text-right">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.map((lead, idx) => (
                  <motion.tr 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    key={lead.id} 
                    className="bg-slate-50 hover:bg-white transition-colors group"
                  >
                    <td className="px-6 py-5 rounded-l-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
                          {lead.initials}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">{lead.name}</p>
                          <p className="text-xs text-slate-500">{lead.email}</p>
                        </div>
                        {lead.birthday && (
                          <div className="ml-2 flex gap-1">
                            <span className="bg-green-100 text-green-700 text-[9px] font-bold uppercase px-2 py-0.5 rounded-full flex items-center">
                              <Icons.Cake className="w-3 h-3 mr-0.5" /> Birthday
                            </span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className="text-sm font-medium text-slate-600">{lead.source}</span>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <span className="text-sm text-slate-500">{lead.lastContact}</span>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <span className={cn(
                        "text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full",
                        lead.status === "Inativo" ? "bg-slate-200 text-slate-600" : "bg-blue-100 text-blue-700"
                      )}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-6 py-5 rounded-r-lg text-right">
                      <button className="text-slate-400 hover:text-blue-600 transition-colors">
                        <Icons.Mail className="w-5 h-5" />
                      </button>
                      <button className="ml-4 text-slate-400 hover:text-blue-600 transition-colors">
                        <Icons.FileText className="w-5 h-5" />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="mt-4 flex items-center justify-between px-6 py-4">
            <p className="text-xs text-slate-400">Mostrando 1-{filteredLeads.length} de 4.280 leads</p>
            <div className="flex gap-2">
              <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                <Icons.ChevronLeft className="w-4 h-4" />
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-lg">1</button>
              <button className="px-4 py-2 hover:bg-slate-50 text-xs font-bold rounded-lg transition-colors">2</button>
              <button className="px-4 py-2 hover:bg-slate-50 text-xs font-bold rounded-lg transition-colors">3</button>
              <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                <Icons.ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
