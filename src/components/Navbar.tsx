import React from 'react';
import { NavigationTab } from '../types';
import {
  ShieldCheck,
  Cpu,
  Workflow,
  Scale,
  Sparkles,
  Server,
  Key,
  Database,
  Building2,
  Activity
} from 'lucide-react';

interface NavbarProps {
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    {
      id: 'problem_model' as NavigationTab,
      label: '1. Mô tả bài toán',
      subLabel: 'Mô hình & Quy trình',
      icon: Building2,
    },
    {
      id: 'architecture_tech' as NavigationTab,
      label: '2. Kiến trúc & Stack',
      subLabel: 'Web2 + Web3 & Core Banking',
      icon: Cpu,
    },
    {
      id: 'workflow_simulator' as NavigationTab,
      label: '3. Mô phỏng Workflow',
      subLabel: 'eKYC → Mint → Custody → Trade',
      icon: Workflow,
    },
    {
      id: 'reconciliation_ledger' as NavigationTab,
      label: '4. Quy trình Đối soát',
      subLabel: 'On-chain vs Off-chain',
      icon: Scale,
    },
    {
      id: 'ai_advisor' as NavigationTab,
      label: '5. AI RWA Advisor',
      subLabel: 'Phân tích & Sandbox AI',
      icon: Sparkles,
    },
  ];

  return (
    <header className="bg-slate-950 text-slate-100 border-b border-slate-800 sticky top-0 z-50 shadow-xl">
      {/* Top Banner & Status Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between py-3 border-b border-slate-800/80 gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-sky-500 rounded-lg flex items-center justify-center font-bold text-slate-950 text-lg shadow-lg shadow-sky-500/20">
              R
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold tracking-tight text-white font-mono">
                  DEMO RWA <span className="text-sky-400 font-sans font-extrabold">TOKENIZATION BOND</span>
                </h1>
                <span className="px-2 py-0.5 text-[11px] font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20 rounded flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  SBV Sandbox Active
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Institutional-grade Digital Asset Infrastructure & Banking Bond Tokenization Protocol
              </p>
            </div>
          </div>

          {/* Integrated Services Live Status */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
              <Server className="w-3.5 h-3.5 text-blue-400" />
              <span>Network: <strong className="text-blue-300 font-mono">Stellar Soroban Testnet</strong></span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
              <Key className="w-3.5 h-3.5 text-indigo-400" />
              <span>Custody: <strong className="text-indigo-300 font-mono">Fireblocks MPC (2/3)</strong></span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
              <Database className="w-3.5 h-3.5 text-emerald-400" />
              <span>Core Banking: <strong className="text-emerald-300 font-mono">ISO 20022 Sync</strong></span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex space-x-1 overflow-x-auto py-2 scrollbar-none" aria-label="Tabs">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-md text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-slate-800 text-sky-400 font-medium border border-sky-500/40 shadow-lg shadow-sky-500/10'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-sky-400' : 'text-slate-400'}`} />
                <div className="text-left">
                  <div className="font-semibold leading-tight">{tab.label}</div>
                  <div className={`text-[10px] ${isActive ? 'text-sky-200/80' : 'text-slate-500'}`}>
                    {tab.subLabel}
                  </div>
                </div>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
