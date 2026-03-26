import React, { useEffect, useState } from "react";
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Cell,
  PieChart,
  Pie
} from "recharts";
import { motion } from "framer-motion";
import { Icons } from "../components/Icons";
import { formatCurrency, cn } from "../lib/utils";

export default function Dashboard() {
  const [stats, setStats] = useState<any>(null);
  const [funnel, setFunnel] = useState<any[]>([]);
  const [ranking, setRanking] = useState<any[]>([]);
  const [proposals, setProposals] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/dashboard/stats").then(res => res.json()).then(setStats);
    fetch("/api/dashboard/funnel").then(res => res.json()).then(setFunnel);
    fetch("/api/dashboard/ranking").then(res => res.json()).then(setRanking);
    fetch("/api/dashboard/proposals").then(res => res.json()).then(setProposals);
  }, []);

  if (!stats) return <div className="p-8">Carregando...</div>;

  return (
    <div className="p-8 space-y-10">
      {/* Summary Metrics */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-xl relative overflow-hidden group border border-slate-100 shadow-sm"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-110 duration-500"></div>
          <p className="text-[0.6875rem] uppercase tracking-widest text-slate-500 font-bold mb-2">Total de Leads</p>
          <h3 className="text-5xl font-extrabold text-blue-900 tracking-tight">{stats.totalLeads.toLocaleString()}</h3>
          <div className="mt-4 flex items-center text-green-600 text-xs font-bold">
            <Icons.TrendingUp className="w-4 h-4 mr-1" />
            +{stats.leadsGrowth}% vs mês anterior
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-8 rounded-xl relative overflow-hidden group border border-slate-100 shadow-sm"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-110 duration-500"></div>
          <p className="text-[0.6875rem] uppercase tracking-widest text-slate-500 font-bold mb-2">Vidas Vendidas (Mês)</p>
          <h3 className="text-5xl font-extrabold text-blue-900 tracking-tight">{stats.vidasVendidas}</h3>
          <div className="mt-4 flex items-center text-green-600 text-xs font-bold">
            <Icons.TrendingUp className="w-4 h-4 mr-1" />
            {stats.metaMensal}% da meta mensal
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-blue-700 text-white p-8 rounded-xl shadow-xl shadow-blue-200 relative overflow-hidden group"
        >
          <div className="absolute -right-4 -bottom-4 opacity-10">
            <Icons.Dashboard className="w-32 h-32" />
          </div>
          <p className="text-[0.6875rem] uppercase tracking-widest text-blue-200 font-bold mb-2">Receita em Risco (Stake)</p>
          <h3 className="text-4xl font-extrabold tracking-tight">{formatCurrency(stats.receitaEmRisco)}</h3>
          <p className="mt-4 text-xs opacity-80 font-medium">Contratos pendentes de assinatura</p>
        </motion.div>
      </section>

      {/* Main Content Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sales Funnel */}
        <div className="lg:col-span-8 bg-slate-50 rounded-2xl p-8 border border-slate-100">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h4 className="text-2xl font-bold text-blue-900">Funil de Vendas</h4>
              <p className="text-sm text-slate-500 mt-1">Fluxo de conversão em tempo real</p>
            </div>
            <button className="text-xs font-bold uppercase tracking-wider text-blue-600 py-2 px-4 hover:bg-white rounded-lg transition-colors">Ver Detalhes</button>
          </div>
          
          <div className="space-y-4">
            {funnel.map((item, idx) => (
              <div key={item.stage} className="flex items-center">
                <span className="w-24 text-[0.6875rem] font-bold uppercase text-slate-500">{item.stage}</span>
                <div className="flex-1 h-10 bg-white rounded-lg flex items-center pr-4 overflow-hidden border border-slate-100">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(item.value / funnel[0].value) * 100}%` }}
                    transition={{ duration: 1, delay: idx * 0.1 }}
                    className={cn(
                      "h-full bg-gradient-to-r from-blue-600 to-blue-400",
                      item.stage === "Pago" && "from-green-600 to-green-400"
                    )}
                  />
                  <span className="ml-auto text-sm font-bold text-blue-900">{item.value}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <h4 className="text-lg font-bold text-blue-900 mb-6">Ranking de Operadoras</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {ranking.map((item) => (
                <div key={item.name} className="bg-white p-4 rounded-xl border-l-4 border-blue-600 shadow-sm">
                  <p className="text-[0.625rem] font-bold text-slate-400 uppercase">{item.name}</p>
                  <p className="text-xl font-bold text-blue-900 mt-1">{formatCurrency(item.value).replace(",00", "")}</p>
                  <div className="w-full h-1 bg-slate-100 mt-2 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600" style={{ width: `${item.percentage}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Section */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center">
            <h4 className="text-[0.6875rem] font-bold text-slate-500 uppercase tracking-widest mb-6">Vendas vs. Meta</h4>
            <div className="relative inline-flex items-center justify-center">
              <ResponsiveContainer width={200} height={200}>
                <PieChart>
                  <Pie
                    data={[
                      { name: "Concluído", value: 75 },
                      { name: "Restante", value: 25 }
                    ]}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    startAngle={90}
                    endAngle={-270}
                    dataKey="value"
                  >
                    <Cell fill="#2563eb" />
                    <Cell fill="#f1f5f9" />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-black text-blue-900">75%</span>
                <span className="text-[0.625rem] font-bold text-slate-400 uppercase tracking-tighter">Concluído</span>
              </div>
            </div>
            <div className="mt-6">
              <p className="text-sm font-medium text-slate-600">Faltam <span className="text-blue-600 font-bold">108 vidas</span> para bater a meta</p>
            </div>
          </div>

          <div className="bg-slate-100 rounded-2xl p-8">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-lg font-bold text-blue-900">Alertas Diários</h4>
              <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full">4 NOVOS</span>
            </div>
            <div className="space-y-4">
              {[
                { icon: Icons.Cake, color: "text-pink-600", bg: "bg-pink-100", title: "Aniversariante: Maria Silva", desc: "Enviar mensagem de parabéns hoje." },
                { icon: Icons.TrendingUp, color: "text-orange-600", bg: "bg-orange-100", title: "Renovação: TechCorp Ltda", desc: "Aviso de 60 dias. Iniciar renegociação." },
                { icon: Icons.TrendingUp, color: "text-orange-600", bg: "bg-orange-100", title: "Renovação: João de Barro", desc: "Aviso de 60 dias. Contrato SulAmérica." },
                { icon: Icons.Cake, color: "text-pink-600", bg: "bg-pink-100", title: "Aniversariante: Carlos Eduardo", desc: "Enviar e-mail personalizado." },
              ].map((alert, i) => (
                <div key={i} className="bg-white/60 p-4 rounded-xl flex items-start gap-4 hover:bg-white transition-colors cursor-pointer border border-transparent hover:border-blue-100">
                  <div className={cn("w-10 h-10 rounded-full flex items-center justify-center", alert.bg, alert.color)}>
                    <alert.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-blue-900">{alert.title}</p>
                    <p className="text-xs text-slate-500">{alert.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-3 bg-white text-slate-600 text-[0.6875rem] font-bold uppercase tracking-widest rounded-xl hover:bg-blue-600 hover:text-white transition-all">Ver todos os alertas</button>
          </div>
        </div>
      </section>

      {/* Recent Proposals */}
      <section className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100">
        <div className="px-8 py-6 border-b border-slate-50 flex justify-between items-center">
          <h4 className="text-lg font-bold text-blue-900">Últimas Propostas Geradas</h4>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-slate-100 text-[10px] font-bold uppercase text-slate-500 rounded-full cursor-pointer hover:bg-slate-200">Filtrar</span>
            <span className="px-3 py-1 bg-slate-100 text-[10px] font-bold uppercase text-slate-500 rounded-full cursor-pointer hover:bg-slate-200">Exportar</span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-8 py-4 text-[0.625rem] font-bold uppercase tracking-widest text-slate-400">Cliente</th>
                <th className="px-8 py-4 text-[0.625rem] font-bold uppercase tracking-widest text-slate-400">Operadora</th>
                <th className="px-8 py-4 text-[0.625rem] font-bold uppercase tracking-widest text-slate-400">Vidas</th>
                <th className="px-8 py-4 text-[0.625rem] font-bold uppercase tracking-widest text-slate-400">Prêmio Mensal</th>
                <th className="px-8 py-4 text-[0.625rem] font-bold uppercase tracking-widest text-slate-400">Status</th>
                <th className="px-8 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {proposals.map((prop) => (
                <tr key={prop.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded text-blue-700 flex items-center justify-center font-bold text-xs">{prop.initials}</div>
                      <span className="text-sm font-semibold text-slate-900">{prop.client}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-sm text-slate-600">{prop.carrier}</td>
                  <td className="px-8 py-5 text-sm font-bold">{prop.lives}</td>
                  <td className="px-8 py-5 text-sm font-bold text-blue-900">{formatCurrency(prop.value)}</td>
                  <td className="px-8 py-5">
                    <span className={cn(
                      "px-2 py-1 text-[10px] font-bold rounded uppercase",
                      prop.status === "Pago" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                    )}>
                      {prop.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <Icons.More className="w-5 h-5 text-slate-400 cursor-pointer hover:text-blue-600" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
