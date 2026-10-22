import React, { useState } from 'react';
import { Theme } from '../types';
import { Plus, ArrowRight, IndianRupee, CheckCircle2, Clock, Activity, Zap, RefreshCw, BarChart3, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface DealItem {
  id: string;
  client: string;
  value: number;
  stage: 'discovery' | 'figma' | 'architecture' | 'won';
  contact: string;
  source: string;
  priority: 'High' | 'Urgent' | 'Standard';
}

interface InteractiveCrmSandboxProps {
  theme: Theme;
}

export const InteractiveCrmSandbox: React.FC<InteractiveCrmSandboxProps> = ({ theme }) => {
  const [deals, setDeals] = useState<DealItem[]>([
    { id: 'd-1', client: 'Aura Logistics OS', value: 85000, stage: 'discovery', contact: 'Marcus Vance', source: 'Inbound Web', priority: 'High' },
    { id: 'd-2', client: 'Nexus Health SaaS', value: 120000, stage: 'figma', contact: 'Dr. Sarah Lin', source: 'Figma Community', priority: 'Urgent' },
    { id: 'd-3', client: 'OmniPay Crypto Wallet', value: 95000, stage: 'architecture', contact: 'Siddharth Patel', source: 'Referral', priority: 'Standard' },
    { id: 'd-4', client: 'Vanguard Aerospace', value: 240000, stage: 'won', contact: 'Elena Rostova', source: 'Enterprise RFP', priority: 'Urgent' },
    { id: 'd-5', client: 'Starlight E-Commerce', value: 65000, stage: 'figma', contact: 'David Thorne', source: 'Direct Lead', priority: 'Standard' }
  ]);

  const [newClientName, setNewClientName] = useState('');
  const [newValue, setNewValue] = useState('75000');
  const [showAddModal, setShowAddModal] = useState(false);
  const [logs, setLogs] = useState<string[]>([
    'System Initialized: Custom CRM WebSocket Connected',
    'Pipeline Metric Calculated: Total ₹6,05,000 ARR in Engine'
  ]);

  const moveDeal = (id: string, nextStage: DealItem['stage']) => {
    setDeals(prev =>
      prev.map(d => (d.id === id ? { ...d, stage: nextStage } : d))
    );
    const moved = deals.find(d => d.id === id);
    if (moved) {
      const stageName = nextStage === 'won' ? 'Closed Won 🎉' : nextStage;
      setLogs(prev => [
        `Webhook Triggered: "${moved.client}" moved to ${stageName.toUpperCase()} stage`,
        ...prev.slice(0, 4)
      ]);
    }
  };

  const handleAddDeal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClientName.trim()) return;

    const newDeal: DealItem = {
      id: `d-${Date.now()}`,
      client: newClientName,
      value: parseInt(newValue) || 50000,
      stage: 'discovery',
      contact: 'Inbound Inquiry',
      source: 'Interactive Sandbox',
      priority: 'High'
    };

    setDeals([newDeal, ...deals]);
    setLogs(prev => [
      `New Lead Created: "${newClientName}" (₹${parseInt(newValue).toLocaleString()}) added to Inbound Discovery`,
      ...prev.slice(0, 4)
    ]);
    setNewClientName('');
    setShowAddModal(false);
  };

  const totalValue = deals.reduce((sum, d) => sum + d.value, 0);

  const stages: { id: DealItem['stage']; label: string; color: string }[] = [
    { id: 'discovery', label: '01. Inbound Discovery', color: 'border-amber-500/50 text-amber-500' },
    { id: 'figma', label: '02. Figma Design System', color: 'border-rose-800/50 text-rose-800' },
    { id: 'architecture', label: '03. Custom CRM Eng', color: 'border-rose-500/50 text-rose-500' },
    { id: 'won', label: '04. Closed Won', color: 'border-emerald-500/50 text-emerald-500' }
  ];

  const [activeMobileStage, setActiveMobileStage] = useState<'all' | DealItem['stage']>('all');

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`p-4 sm:p-6 lg:p-8 rounded-2xl border transition-all shadow-2xl ${
        theme === 'dark'
          ? 'bg-[#0F0F12] border-neutral-800 text-white shadow-rose-950/20'
          : 'bg-white border-neutral-200 text-neutral-900 shadow-xl'
      }`}
    >
      
      {/* Sandbox Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-800/20">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-900">
            <Zap className="w-4 h-4" />
            <span>Interactive Demo: Bespoke CRM Pipeline Engine</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight mt-1">
            Test Our Custom Sales Pipeline Architecture
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <div className={`px-3 sm:px-4 py-2 rounded-xl border text-xs font-mono font-bold ${
            theme === 'dark' ? 'bg-neutral-900 border-neutral-800 text-rose-700' : 'bg-neutral-100 border-neutral-200 text-rose-900'
          }`}>
            Pipeline: ${totalValue.toLocaleString()}
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 px-3 sm:px-4 py-2 text-xs font-bold uppercase rounded-xl text-white bg-rose-900 hover:bg-rose-950 transition-all shadow-md shadow-rose-900/30 cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Add Lead</span>
          </motion.button>
        </div>
      </div>

      {/* Mobile Stage Selector Tabs (Visible only on screens < md) */}
      <div className="md:hidden flex items-center gap-1.5 overflow-x-auto py-3 no-scrollbar border-b border-neutral-800/20">
        <button
          onClick={() => setActiveMobileStage('all')}
          className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
            activeMobileStage === 'all'
              ? 'bg-rose-900 text-white'
              : theme === 'dark' ? 'bg-neutral-900 text-neutral-400' : 'bg-neutral-100 text-neutral-700'
          }`}
        >
          All Stages ({deals.length})
        </button>
        {stages.map(st => (
          <button
            key={st.id}
            onClick={() => setActiveMobileStage(st.id)}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
              activeMobileStage === st.id
                ? 'bg-rose-900 text-white'
                : theme === 'dark' ? 'bg-neutral-900 text-neutral-400' : 'bg-neutral-100 text-neutral-700'
            }`}
          >
            {st.label.split('. ')[1]} ({deals.filter(d => d.stage === st.id).length})
          </button>
        ))}
      </div>

      {/* Pipeline Columns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-6">
        {stages
          .filter(st => activeMobileStage === 'all' || activeMobileStage === st.id)
          .map(stage => {
          const stageDeals = deals.filter(d => d.stage === stage.id);
          const stageTotal = stageDeals.reduce((sum, d) => sum + d.value, 0);

          return (
            <div
              key={stage.id}
              className={`p-4 rounded-xl border flex flex-col justify-between ${
                theme === 'dark' ? 'bg-neutral-950/80 border-neutral-800' : 'bg-neutral-50 border-neutral-200'
              }`}
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-neutral-800/20">
                  <span className={`text-xs font-bold uppercase tracking-wider ${stage.color}`}>
                    {stage.label}
                  </span>
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-neutral-800/40 text-neutral-400">
                    {stageDeals.length}
                  </span>
                </div>

                <div className="text-xs font-mono font-semibold text-neutral-500 mt-2 mb-3">
                  Value: ₹{stageTotal.toLocaleString()}
                </div>

                {/* Cards List with Layout Animation */}
                <div className="space-y-3 min-h-[160px]">
                  {stageDeals.length === 0 ? (
                    <div className="text-xs text-neutral-500 italic py-6 text-center">
                      No deals in this stage
                    </div>
                  ) : (
                    <AnimatePresence>
                      {stageDeals.map(deal => (
                        <motion.div
                          key={deal.id}
                          layout
                          initial={{ opacity: 0, scale: 0.9, y: 10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.9, y: -10 }}
                          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                          className={`p-3.5 rounded-xl border transition-all duration-200 shadow-sm ${
                            theme === 'dark'
                              ? 'bg-neutral-900 border-neutral-800 hover:border-rose-800/50'
                              : 'bg-white border-neutral-200 hover:border-rose-800/50'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <h4 className="text-xs font-bold text-neutral-100 dark:text-white truncate">
                              {deal.client}
                            </h4>
                            <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                              deal.priority === 'Urgent'
                                ? 'bg-rose-950 text-rose-700 border border-red-800/50'
                                : 'bg-neutral-800 text-neutral-300'
                            }`}>
                              {deal.priority}
                            </span>
                          </div>

                          <div className="text-sm font-mono font-bold text-rose-800 mt-2">
                            ₹{deal.value.toLocaleString()}
                          </div>

                          <div className="text-[11px] text-neutral-400 mt-1 flex items-center justify-between">
                            <span>{deal.contact}</span>
                            <span className="text-neutral-500">{deal.source}</span>
                          </div>

                          {/* Move Actions */}
                          <div className="pt-2 mt-2 border-t border-neutral-800/30 flex items-center justify-end gap-1">
                            {stage.id === 'discovery' && (
                              <button
                                onClick={() => moveDeal(deal.id, 'figma')}
                                className="px-2 py-1 text-[10px] font-bold rounded bg-rose-900/30 text-rose-700 hover:bg-rose-900 hover:text-white transition-colors cursor-pointer flex items-center gap-1"
                              >
                                <span>Next: Figma</span>
                                <ArrowRight className="w-3 h-3" />
                              </button>
                            )}
                            {stage.id === 'figma' && (
                              <button
                                onClick={() => moveDeal(deal.id, 'architecture')}
                                className="px-2 py-1 text-[10px] font-bold rounded bg-rose-600/30 text-rose-400 hover:bg-rose-600 hover:text-white transition-colors cursor-pointer flex items-center gap-1"
                              >
                                <span>Next: Dev</span>
                                <ArrowRight className="w-3 h-3" />
                              </button>
                            )}
                            {stage.id === 'architecture' && (
                              <button
                                onClick={() => moveDeal(deal.id, 'won')}
                                className="px-2 py-1 text-[10px] font-bold rounded bg-emerald-600/30 text-emerald-400 hover:bg-emerald-600 hover:text-white transition-colors cursor-pointer flex items-center gap-1"
                              >
                                <span>Close Deal 🎉</span>
                              </button>
                            )}
                            {stage.id === 'won' && (
                              <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3" /> Synced
                              </span>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Real-Time Webhook Activity Console */}
      <div className={`mt-4 p-4 rounded-xl border font-mono text-xs ${
        theme === 'dark' ? 'bg-neutral-950 border-neutral-800 text-neutral-300' : 'bg-neutral-900 border-neutral-800 text-neutral-200'
      }`}>
        <div className="flex items-center gap-2 pb-2 mb-2 border-b border-neutral-800 text-rose-700 font-bold">
          <Activity className="w-3.5 h-3.5 animate-pulse" />
          <span>Real-Time Webhook Activity Stream</span>
        </div>
        <div className="space-y-1">
          {logs.map((log, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-neutral-400 flex items-center gap-2"
            >
              <span className="text-neutral-600">&gt;</span>
              <span>{log}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Add Lead Modal Overlay */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`p-6 rounded-2xl border max-w-md w-full ${
                theme === 'dark' ? 'bg-[#0F0F12] border-neutral-800 text-white' : 'bg-white border-neutral-200 text-neutral-900'
              }`}
            >
              <h4 className="text-lg font-bold">Add Lead to CRM Sandbox</h4>
              <p className="text-xs text-neutral-400 mt-1">Test creating custom CRM records with immediate WebSocket pipeline updates.</p>

              <form onSubmit={handleAddDeal} className="space-y-4 mt-4">
                <div>
                  <label className="block text-xs font-medium mb-1">Company / Project Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Apex Financial Portal"
                    value={newClientName}
                    onChange={(e) => setNewClientName(e.target.value)}
                    className={`w-full px-3 py-2 text-sm rounded-lg border outline-none ${
                      theme === 'dark'
                        ? 'bg-neutral-900 border-neutral-800 text-white focus:border-rose-800'
                        : 'bg-neutral-100 border-neutral-300 text-neutral-900 focus:border-rose-800'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium mb-1">Estimated Annual Deal Value (₹)</label>
                  <input
                    type="number"
                    required
                    placeholder="75000"
                    value={newValue}
                    onChange={(e) => setNewValue(e.target.value)}
                    className={`w-full px-3 py-2 text-sm rounded-lg border outline-none ${
                      theme === 'dark'
                        ? 'bg-neutral-900 border-neutral-800 text-white focus:border-rose-800'
                        : 'bg-neutral-100 border-neutral-300 text-neutral-900 focus:border-rose-800'
                    }`}
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 text-xs font-semibold rounded-lg bg-neutral-800 text-neutral-300 hover:bg-neutral-700 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-xs font-bold rounded-lg text-white bg-rose-900 hover:bg-rose-950 cursor-pointer"
                  >
                    Add Lead to Pipeline
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
};
