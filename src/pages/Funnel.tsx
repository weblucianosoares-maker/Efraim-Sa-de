import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icons } from "../components/Icons";
import { cn, formatCurrency } from "../lib/utils";

const columns = [
  { id: "interesse", label: "Interesse", color: "bg-blue-600", count: 4 },
  { id: "cotacao", label: "Cotação", color: "bg-blue-400", count: 2 },
  { id: "documentacao", label: "Documentação", color: "bg-slate-500", count: 1 },
  { id: "proposta", label: "Proposta", color: "bg-green-600", count: 3 },
  { id: "assinatura", label: "Assinatura", color: "bg-blue-800", count: 5 },
  { id: "pago", label: "Pago", color: "bg-green-700", count: 8 },
];

const mockCards = [
  { id: 1, column: "interesse", value: 4500, title: "Clínica Santa Luzia", carrier: "SulAmérica Saúde" },
  { id: 2, column: "interesse", value: 1250, title: "Marcos Oliveira", carrier: "Porto Seguro" },
  { id: 3, column: "cotacao", value: 8900, title: "Engenharia Vale S.A.", carrier: "Bradesco Seguros" },
  { id: 4, column: "documentacao", value: 3200, title: "Ana Paula Ferreira", carrier: "Bradesco Saúde", progress: 75 },
];

export default function Funnel() {
  const [selectedLead, setSelectedLead] = useState<any>(mockCards[3]);

  return (
    <div className="flex h-[calc(100vh-64px)] w-full overflow-hidden">
      {/* Kanban Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-white">
        <header className="flex justify-between items-center w-full px-8 py-3 bg-white border-b shrink-0">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold text-blue-900">Funil de Vendas</h2>
            <div className="bg-slate-100 h-6 w-px"></div>
            <span className="text-slate-500 text-sm font-medium">24 Leads Ativos</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-lg">
              <Icons.Plus className="w-4 h-4" /> Novo Lead
            </button>
          </div>
        </header>

        <section className="flex-1 overflow-x-auto p-8 flex gap-6 bg-slate-50">
          {columns.map((col) => (
            <div key={col.id} className="min-w-[300px] max-w-[300px] flex flex-col h-full bg-slate-100/50 rounded-xl p-4">
              <div className="flex items-center justify-between mb-6 px-1">
                <div className="flex items-center gap-2">
                  <div className={cn("w-2 h-2 rounded-full", col.color)}></div>
                  <h3 className={cn("font-bold text-sm uppercase tracking-wider", `text-${col.id === 'documentacao' ? 'slate-600' : 'blue-600'}`)}>{col.label}</h3>
                </div>
                <span className="text-xs font-bold text-slate-400">{col.count.toString().padStart(2, '0')}</span>
              </div>

              <div className="flex flex-col gap-4 overflow-y-auto pr-1">
                {mockCards.filter(c => c.column === col.id).map((card) => (
                  <motion.div 
                    layoutId={`card-${card.id}`}
                    key={card.id}
                    onClick={() => setSelectedLead(card)}
                    className={cn(
                      "bg-white rounded-lg p-4 shadow-sm border-l-4 group cursor-pointer hover:bg-slate-50 transition-all",
                      col.id === "interesse" ? "border-blue-600" : 
                      col.id === "cotacao" ? "border-blue-400" : 
                      col.id === "documentacao" ? "border-slate-500" : "border-green-600"
                    )}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[10px] uppercase tracking-widest font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                        {formatCurrency(card.value)}
                      </span>
                      <Icons.More className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
                    </div>
                    <p className="font-bold text-slate-900 mb-1">{card.title}</p>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <Icons.Carriers className="w-3 h-3" />
                      <span>{card.carrier}</span>
                    </div>

                    {card.progress && (
                      <div className="mt-3 space-y-2 border-t pt-3 border-slate-50">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Progresso</p>
                        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-blue-600 h-full" style={{ width: `${card.progress}%` }}></div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </section>
      </main>

      {/* Contextual Sidebar */}
      <AnimatePresence>
        {selectedLead && (
          <motion.aside 
            initial={{ x: 400 }}
            animate={{ x: 0 }}
            exit={{ x: 400 }}
            className="w-96 bg-white shadow-2xl z-20 flex flex-col border-l border-slate-100"
          >
            <div className="p-8 bg-slate-50">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-2 py-1 rounded">Lead em Destaque</span>
                  <h2 className="text-2xl font-black mt-2 text-slate-900">{selectedLead.title}</h2>
                  <p className="text-sm text-slate-500 font-medium">ana.ferreira@email.com</p>
                </div>
                <button onClick={() => setSelectedLead(null)} className="text-slate-400 hover:text-red-500 transition-colors">
                  <Icons.X className="w-6 h-6" />
                </button>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 py-2 px-4 bg-blue-600 text-white text-xs font-bold rounded-lg flex items-center justify-center gap-2">
                  <Icons.Phone className="w-4 h-4" /> Ligar
                </button>
                <button className="flex-1 py-2 px-4 bg-slate-200 text-slate-700 text-xs font-bold rounded-lg flex items-center justify-center gap-2">
                  <Icons.Mail className="w-4 h-4" /> Email
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-8">
              <div className="mb-10">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">Histórico de Interações</h3>
                  <button className="text-[11px] font-bold text-blue-600">Ver Tudo</button>
                </div>
                <div className="space-y-6 relative before:absolute before:left-[11px] before:top-2 before:bottom-0 before:w-px before:bg-slate-200">
                  <div className="relative pl-8">
                    <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-700">
                      <Icons.Check className="w-3 h-3" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">Documento Recebido: RG</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">Hoje, 09:15 • via WhatsApp</p>
                    </div>
                  </div>
                  <div className="relative pl-8">
                    <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-700">
                      <Icons.Phone className="w-3 h-3" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">Ligação de Acompanhamento</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">Ontem, 16:45 • Duração: 05:12</p>
                      <div className="mt-2 p-3 bg-slate-50 rounded-lg italic text-[11px] text-slate-600 border-l-2 border-blue-600">
                        "Cliente confirmou que enviará o comprovante de residência até o final do dia."
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">Notas Internas</h3>
                  <Icons.Plus className="w-4 h-4 text-slate-400 cursor-pointer hover:text-blue-600" />
                </div>
                <textarea 
                  className="w-full bg-slate-50 border-none rounded-xl text-xs text-slate-600 p-4 focus:ring-2 focus:ring-blue-100 min-h-[120px] resize-none" 
                  placeholder="Adicione uma observação..."
                />
              </div>
            </div>

            <div className="p-6 border-t border-slate-100">
              <button className="w-full py-3 bg-blue-700 text-white font-bold text-sm rounded-xl hover:bg-blue-800 transition-all flex items-center justify-center gap-2">
                <Icons.CheckCircle className="w-5 h-5" /> Salvar Alterações
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
}
