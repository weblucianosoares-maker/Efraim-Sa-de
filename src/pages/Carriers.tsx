import React from "react";
import { motion } from "framer-motion";
import { Icons } from "../components/Icons";
import { cn } from "../lib/utils";

export default function Carriers() {
  return (
    <div className="p-8 max-w-7xl mx-auto w-full space-y-10">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <h3 className="text-5xl font-extrabold tracking-tight text-blue-900">Produtos & Carriers</h3>
          <p className="text-slate-500 max-w-xl">Gerencie operadoras de seguros, produtos vinculados e tabelas de preços oficiais.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center px-4 py-2.5 bg-slate-100 text-slate-700 rounded-lg font-semibold text-sm transition-all hover:bg-slate-200">
            <Icons.Carriers className="w-5 h-5 mr-2" /> Nova Operadora
          </button>
          <button className="flex items-center px-6 py-2.5 bg-blue-600 text-white rounded-lg font-semibold text-sm transition-all hover:bg-blue-700 shadow-sm">
            <Icons.Plus className="w-5 h-5 mr-2" /> Novo Produto
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Sidebar */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
            <div className="flex items-center justify-between mb-6">
              <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-slate-400">Operadoras Ativas</span>
              <Icons.Filter className="w-4 h-4 text-slate-400" />
            </div>
            <div className="space-y-2">
              {[
                { name: "Bradesco Saúde", products: 8, active: true },
                { name: "SulAmérica", products: 12, active: false },
                { name: "Amil Assistência", products: 5, active: false },
                { name: "Porto Seguro", products: 15, active: false },
              ].map((carrier) => (
                <div 
                  key={carrier.name}
                  className={cn(
                    "p-4 rounded-lg flex items-center justify-between group cursor-pointer transition-all",
                    carrier.active ? "bg-white shadow-sm border-l-4 border-blue-600" : "bg-white/50 hover:bg-white"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center font-bold text-blue-700">
                      {carrier.name[0]}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{carrier.name}</h4>
                      <p className="text-[10px] text-slate-400 uppercase font-medium">{carrier.products} Produtos Ativos</p>
                    </div>
                  </div>
                  <Icons.ChevronRight className={cn("w-4 h-4 transition-colors", carrier.active ? "text-blue-600" : "text-slate-300")} />
                </div>
              ))}
            </div>
          </div>

          <div className="bg-blue-600 text-white p-6 rounded-xl relative overflow-hidden shadow-lg">
            <div className="relative z-10">
              <p className="text-[0.6875rem] uppercase tracking-widest opacity-80 mb-1">Total de Segurados</p>
              <h4 className="text-4xl font-extrabold">12.4k</h4>
              <div className="mt-4 flex items-center text-[11px] bg-white/10 w-fit px-2 py-1 rounded">
                <Icons.TrendingUp className="w-3 h-3 mr-1" /> +8.4% este mês
              </div>
            </div>
            <Icons.Dashboard className="w-32 h-32 absolute -right-4 -bottom-4 opacity-10 rotate-12" />
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-slate-50 rounded-xl overflow-hidden flex flex-col md:flex-row border border-slate-100">
            <div className="md:w-1/3 h-48 md:h-auto bg-slate-200 relative">
              <img 
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Headquarters" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 p-8 flex flex-col justify-center">
              <div className="mb-2">
                <span className="text-xs font-bold text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full uppercase tracking-tighter">Premium Partner</span>
              </div>
              <h3 className="text-2xl font-bold text-blue-900 mb-2">Bradesco Saúde S.A.</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                A Bradesco Saúde é líder no mercado de saúde suplementar brasileiro, focada na excelência do atendimento e na ampla rede referenciada.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <Icons.Dashboard className="w-4 h-4 text-blue-600" />
                  <span className="text-xs font-medium text-slate-500">Sede: Osasco, SP</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icons.CheckCircle className="w-4 h-4 text-blue-600" />
                  <span className="text-xs font-medium text-slate-500">ANS: 359017</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: "Bradesco Nacional", tags: ["Acomodação Apartamento", "Abrangência Nacional", "Reembolso Disponível"] },
              { title: "Bradesco Preferencial Plus", tags: ["Rede Exclusiva", "Abrangência Regional", "Coparticipação Opcional"] },
            ].map((product, i) => (
              <div key={i} className="bg-white p-5 rounded-lg border border-slate-100 hover:border-blue-600 transition-all shadow-sm group">
                <div className="flex justify-between items-start mb-3">
                  <h5 className="font-bold text-slate-900">{product.title}</h5>
                  <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded uppercase">Ativo</span>
                </div>
                <div className="space-y-2 mb-4">
                  {product.tags.map((tag, j) => (
                    <div key={j} className="flex items-center text-xs text-slate-500 gap-2">
                      <Icons.CheckCircle className="w-3 h-3 text-blue-600" /> {tag}
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-center border-t border-slate-50 pt-4">
                  <span className="text-[10px] font-bold text-slate-300 uppercase">Cod: BR-0{i+1}</span>
                  <button className="text-blue-600 text-xs font-bold hover:underline">Gerenciar</button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h4 className="text-lg font-bold text-blue-900">Tabelas de Preços (PDF)</h4>
                <p className="text-xs text-slate-500">Arquivos oficiais para consulta rápida.</p>
              </div>
              <button className="bg-white text-blue-600 text-xs font-bold py-2 px-4 rounded-lg shadow-sm flex items-center gap-2 border border-slate-100">
                <Icons.Upload className="w-4 h-4" /> Atualizar
              </button>
            </div>
            <div className="space-y-3">
              {[
                { name: "Tabela Bradesco Saúde - PME (03 a 29 vidas)", size: "2.4 MB" },
                { name: "Tabela Bradesco Empresarial (30+ vidas)", size: "1.8 MB" },
              ].map((pdf, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-white rounded-lg hover:shadow-md transition-shadow border border-slate-100">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center text-red-600">
                      <Icons.FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h5 className="text-sm font-semibold text-slate-900">{pdf.name}</h5>
                      <p className="text-[10px] text-slate-400 uppercase font-medium">Vigência: Mai 2024 • {pdf.size}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Icons.Info className="w-5 h-5 text-slate-300 cursor-pointer hover:text-blue-600" />
                    <Icons.Upload className="w-5 h-5 text-slate-300 cursor-pointer hover:text-blue-600 rotate-180" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
