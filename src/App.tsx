import React, { useState } from 'react';
import { NavigationTab, RwaAsset, InvestorProfile } from './types';
import { INITIAL_RWA_ASSETS, INITIAL_INVESTOR } from './data/mockRwaData';
import { Navbar } from './components/Navbar';
import { ProblemOverview } from './components/ProblemOverview';
import { ArchitectureTech } from './components/ArchitectureTech';
import { WorkflowSimulator } from './components/WorkflowSimulator';
import { SmartContractsModule } from './components/SmartContractsModule';
import { ReconciliationModule } from './components/ReconciliationModule';
import { AiRwaAdvisor } from './components/AiRwaAdvisor';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavigationTab>('problem_model');
  const [assets, setAssets] = useState<RwaAsset[]>(INITIAL_RWA_ASSETS);
  const [investor, setInvestor] = useState<InvestorProfile>(INITIAL_INVESTOR);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-600 selection:text-white flex flex-col">
      {/* Top Fixed Header with Status and Navigation Tabs */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {activeTab === 'problem_model' && <ProblemOverview />}

        {activeTab === 'architecture_tech' && <ArchitectureTech />}

        {activeTab === 'workflow_simulator' && (
          <WorkflowSimulator
            assets={assets}
            investor={investor}
            onUpdateInvestor={setInvestor}
            onUpdateAssets={setAssets}
          />
        )}

        {activeTab === 'smart_contracts' && <SmartContractsModule />}

        {activeTab === 'reconciliation_ledger' && <ReconciliationModule assets={assets} />}

        {activeTab === 'ai_advisor' && <AiRwaAdvisor />}
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-900 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            DEMO RWA TOKENIZATION BOND &copy; 2026. Institutional Digital Asset Infrastructure & Banking Bond Protocol.
          </div>
          <div className="flex items-center gap-3 font-mono text-[11px]">
            <span>Stellar Soroban Smart Contracts</span>
            <span>&bull;</span>
            <span>Fireblocks MPC Custody</span>
            <span>&bull;</span>
            <span>Core Banking ISO 20022</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
