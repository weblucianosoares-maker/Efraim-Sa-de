import React from "react";
import { motion } from "framer-motion";
import { Icons } from "../components/Icons";
import { formatCurrency, cn } from "../lib/utils";

export default function Contracts() {
  return (
    <div className="p-8 space-y-8">
      {/* Bento Stats Grid & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Upcoming Renewals */}
        <div className="lg:col-span-8 bg-slate-50 p-6 rounded-xl flex flex-col border border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Icons.TrendingUp className="w-5 h-5 text-blue-600" />
              Alertas de Renovação (60 dias)
            </h3>
            <span className="text-[0.6875rem] font-bold uppercase tracking-widest text-blue-600 bg-blue-100 px-3 py-1 rounded-full">3 Urgentes</span>
          </div>
          <div className="space-y-3">
            <div className="flex items-center bg-white p-4 rounded-lg shadow-sm border-l-4 border-red-500">
              <div className="flex-1">
                <p className="text-sm font-bold text-slate-900">TechSolutions LTDA</p>
                <p className="text-xs text-slate-500">Plano: Bradesco Saúde Top Nacional</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-red-500 font-bold">Expira em 42 dias</p>
                <p className="text-[0.6875rem] text-slate-400 uppercase">25 Out 2024</p>
              </div>
            </div>
            <div className="flex items-center bg-white p-4 rounded-lg shadow-sm border-l-4 border-blue-600">
              <div className="flex-1">
                <p className="text-sm font-bold text-slate-900">Logística Norte-Sul</p>
                <p className="text-xs text-slate-500">Plano: SulAmérica Direto Curitiba</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-blue-600 font-bold">Expira em 58 dias</p>
                <p className="text-[0.6875rem] text-slate-400 uppercase">10 Nov 2024</p>
              </div>
            </div>
          </div>
        </div>

        {/* Commission Summary */}
        <div className="lg:col-span-4 bg-blue-700 text-white p-6 rounded-xl flex flex-col justify-between overflow-hidden relative shadow-xl shadow-blue-200">
          <div className="relative z-10">
            <p className="text-[0.6875rem] uppercase tracking-widest text-blue-200 mb-2">Comissões Acumuladas</p>
            <h3 className="text-4xl font-extrabold tracking-tight">R$ 14.280,<span className="text-xl">50</span></h3>
          </div>
          <div className="mt-8 relative z-10">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs">Meta Mensal</span>
              <span className="text-xs font-bold">85%</span>
            </div>
            <div className="w-full h-1.5 bg-blue-800 rounded-full overflow-hidden">
              <div className="bg-green-400 h-full w-[85%]"></div>
            </div>
          </div>
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-blue-600 rounded-full blur-3xl opacity-50"></div>
        </div>
      </div>

      {/* Contracts Table */}
      <section className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-100">
        <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h3 className="text-lg font-bold text-blue-900">Contratos Ativos</h3>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Icons.Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input 
                className="pl-10 pr-4 py-2 bg-slate-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-blue-100 w-64" 
                placeholder="Buscar cliente..." 
              />
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2">
              <Icons.Plus className="w-4 h-4" /> Novo Contrato
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-[0.6875rem] uppercase tracking-widest font-bold text-slate-400">Cliente</th>
                <th className="px-6 py-4 text-[0.6875rem] uppercase tracking-widest font-bold text-slate-400">Operadora</th>
                <th className="px-6 py-4 text-[0.6875rem] uppercase tracking-widest font-bold text-slate-400 text-center">Vidas</th>
                <th className="px-6 py-4 text-[0.6875rem] uppercase tracking-widest font-bold text-slate-400">Vigência</th>
                <th className="px-6 py-4 text-[0.6875rem] uppercase tracking-widest font-bold text-slate-400">Status</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr className="bg-blue-50/30 hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <p className="text-sm font-bold text-slate-900">Indústria Alvorada S.A.</p>
                  <p className="text-xs text-slate-400">CNPJ: 12.345.678/0001-90</p>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-[10px] font-bold text-blue-700">AM</div>
                    <span className="text-sm text-slate-700">Amil Assistência</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-center font-bold text-slate-700">142</td>
                <td className="px-6 py-4">
                  <p className="text-sm text-slate-700">12 Jan 2025</p>
                  <p className="text-[10px] text-slate-400 uppercase font-bold">Aniversário: Jan</p>
                </td>
                <td className="px-6 py-4">
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-[10px] font-bold uppercase">Ativo</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-blue-600 hover:bg-blue-100 p-2 rounded-full transition-colors">
                    <Icons.Info className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-8">
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
            <h3 className="text-md font-bold text-blue-900 mb-6">Histórico Financeiro & Reajustes</h3>
            <div className="bg-white rounded-lg overflow-hidden border border-slate-100">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                    <th className="px-4 py-3 font-bold text-slate-500">Referência</th>
                    <th className="px-4 py-3 font-bold text-right text-slate-500">Mensalidade</th>
                    <th className="px-4 py-3 font-bold text-center text-slate-500">Reajuste</th>
                    <th className="px-4 py-3 font-bold text-slate-500">Sinistralidade</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="px-4 py-3 text-slate-700">Jan 2024</td>
                    <td className="px-4 py-3 text-right text-slate-700">R$ 42.500,00</td>
                    <td className="px-4 py-3 text-center text-red-500 font-bold">12.4%</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1 bg-slate-100 rounded-full">
                          <div className="bg-blue-600 h-full w-[72%]"></div>
                        </div>
                        <span className="text-[10px] text-slate-500">72%</span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-md font-bold text-blue-900">Beneficiários (Vidas)</h3>
              <p className="text-xs text-slate-400">Contrato: Indústria Alvorada S.A.</p>
            </div>
            <span className="text-[0.6875rem] font-bold px-2 py-1 bg-slate-100 text-slate-600 rounded">142 Total</span>
          </div>
          <div className="space-y-4 overflow-y-auto max-h-[300px] pr-2">
            {[
              { initials: "RM", name: "Ricardo Mendonça", type: "Titular • Plano Gold" },
              { initials: "AM", name: "Ana Maria Mendonça", type: "Dependente • Cônjuge" },
              { initials: "LM", name: "Lucas Mendonça", type: "Dependente • Filho(a)" },
            ].map((beneficiary, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors group">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">{beneficiary.initials}</div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{beneficiary.name}</p>
                    <p className="text-[10px] text-slate-400 uppercase font-medium">{beneficiary.type}</p>
                  </div>
                </div>
                <Icons.Info className="w-4 h-4 text-slate-300 group-hover:text-blue-600 opacity-0 group-hover:opacity-100 transition-all" />
              </div>
            ))}
          </div>
          <button className="mt-6 w-full py-3 border border-dashed border-slate-300 rounded-lg text-xs font-bold text-slate-400 hover:bg-slate-50 transition-colors">
            + Adicionar Vidas ao Contrato
          </button>
        </div>
      </div>
    </div>
  );
}
