import React, { useState } from 'react';
import {
  RwaAsset,
  InvestorProfile,
  OnChainLog,
  OffChainLog
} from '../types';
import { SIMULATION_STEPS } from '../data/mockRwaData';
import {
  UserCheck,
  Coins,
  ShieldCheck,
  ArrowRightLeft,
  Flame,
  CheckCircle2,
  AlertCircle,
  Play,
  RotateCcw,
  Terminal,
  Database,
  Globe,
  Key,
  Layers,
  Search,
  Building2
} from 'lucide-react';

interface WorkflowSimulatorProps {
  assets: RwaAsset[];
  investor: InvestorProfile;
  onUpdateInvestor: (updated: InvestorProfile) => void;
  onUpdateAssets: (updated: RwaAsset[]) => void;
}

export const WorkflowSimulator: React.FC<WorkflowSimulatorProps> = ({
  assets,
  investor,
  onUpdateInvestor,
  onUpdateAssets,
}) => {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [selectedAsset, setSelectedAsset] = useState<RwaAsset>(assets[0]);
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(false);

  // Auto-play complete workflow cycle simulation
  const handleAutoPlayWorkflow = () => {
    if (isAutoPlaying) return;
    setIsAutoPlaying(true);
    setActiveStepIndex(0);

    let current = 0;
    const interval = setInterval(() => {
      current++;
      if (current < SIMULATION_STEPS.length) {
        setActiveStepIndex(current);

        const timestamp = new Date().toLocaleTimeString();
        const stepName = SIMULATION_STEPS[current].title;

        setOnChainLogs((prev) => [
          {
            id: `tx-autoplay-${Date.now()}`,
            timestamp,
            txHash: `0x${Math.random().toString(16).substring(2, 10)}...STELLAR_FLOW`,
            ledgerIndex: 4928105 + prev.length,
            action: `AUTOPLAY_STEP_${current + 1}`,
            contractMethod: `soroban::exec_workflow_step(${current + 1})`,
            payload: { stepName, status: 'EXECUTED_AUTOMATICALLY' },
            gasUsed: '0.000015 XLM',
            status: 'SUCCESS',
          },
          ...prev,
        ]);

        setOffChainLogs((prev) => [
          {
            id: `gl-autoplay-${Date.now()}`,
            timestamp,
            journalId: `AUTO-GL-${Math.floor(Math.random() * 90000 + 10000)}`,
            system: 'Core Banking',
            accountNo: 'GL-99201-COLLATERAL',
            action: `WORKFLOW_STEP_${current + 1}_SYNC`,
            amountVnd: selectedAsset.tokenPriceVnd * 10,
            referenceDoc: `AUTO_ISO20022_STEP_${current + 1}`,
            status: 'COMPLETED',
          },
          ...prev,
        ]);
      } else {
        clearInterval(interval);
        setIsAutoPlaying(false);
      }
    }, 2200);
  };

  // Form Inputs for simulation
  const [mintAmount, setMintAmount] = useState<number>(100);
  const [tradeAmount, setTradeAmount] = useState<number>(10);
  const [tradeType, setTradeType] = useState<'BUY' | 'SELL'>('BUY');
  const [redeemAmount, setRedeemAmount] = useState<number>(10);

  // Logs state
  const [onChainLogs, setOnChainLogs] = useState<OnChainLog[]>([
    {
      id: 'tx-init-001',
      timestamp: new Date().toLocaleTimeString(),
      txHash: '0x8f2a93c41b83e...STELLAR_TX',
      ledgerIndex: 4928102,
      action: 'SYSTEM_BOOT',
      contractMethod: 'soroban::init_rwa_vault()',
      payload: { status: 'CONTRACT_DEPLOYED', network: 'Stellar Testnet' },
      gasUsed: '0.00001 XLM',
      status: 'SUCCESS',
    },
  ]);

  const [offChainLogs, setOffChainLogs] = useState<OffChainLog[]>([
    {
      id: 'gl-init-001',
      timestamp: new Date().toLocaleTimeString(),
      journalId: 'GL-JOURNAL-00192',
      system: 'Core Banking',
      accountNo: 'GL-99201-COLLATERAL',
      action: 'SYSTEM_AUDIT_CHECK',
      amountVnd: 0,
      referenceDoc: 'ISO20022_CAMT_053',
      status: 'COMPLETED',
    },
  ]);

  const currentStep = SIMULATION_STEPS[activeStepIndex];

  // Action Step 1: eKYC Execution
  const handleExecuteEkyc = () => {
    setIsExecuting(true);
    setTimeout(() => {
      const updatedInvestor: InvestorProfile = {
        ...investor,
        ekycStatus: 'VERIFIED',
        amlRiskScore: 'LOW',
      };
      onUpdateInvestor(updatedInvestor);

      const timestamp = new Date().toLocaleTimeString();
      const txHash = `0x${Math.random().toString(16).substring(2, 10)}...STELLAR_KYC`;

      setOnChainLogs((prev) => [
        {
          id: `tx-kyc-${Date.now()}`,
          timestamp,
          txHash,
          ledgerIndex: 4928103 + prev.length,
          action: 'EKYC_WHITELIST_REGISTERED',
          contractMethod: 'soroban::add_to_whitelist(address)',
          payload: {
            wallet: investor.fireblocksWalletAddress,
            nationalId: investor.nationalId,
            amlRisk: 'LOW',
          },
          gasUsed: '0.000012 XLM',
          status: 'SUCCESS',
        },
        ...prev,
      ]);

      setOffChainLogs((prev) => [
        {
          id: `gl-kyc-${Date.now()}`,
          timestamp,
          journalId: `EKYC-DOC-${Math.floor(Math.random() * 80000 + 10000)}`,
          system: 'Core Banking',
          accountNo: 'ACC-INVESTOR-8821',
          action: 'EKYC_VERIFIED_DATABASE_SYNC',
          amountVnd: 0,
          referenceDoc: `CCCD_CHIP_${investor.nationalId}`,
          status: 'COMPLETED',
        },
        ...prev,
      ]);

      setIsExecuting(false);
    }, 800);
  };

  // Action Step 2: Mint RWA Tokens
  const handleExecuteMint = () => {
    if (mintAmount <= 0) return;
    setIsExecuting(true);

    setTimeout(() => {
      const totalVndValue = mintAmount * selectedAsset.tokenPriceVnd;

      // Update Asset supply
      const updatedAssets = assets.map((a) =>
        a.id === selectedAsset.id
          ? {
              ...a,
              totalSupply: a.totalSupply + mintAmount,
              valuationVnd: a.valuationVnd + totalVndValue,
            }
          : a
      );
      onUpdateAssets(updatedAssets);

      // Update Investor token balance
      const updatedBalances = {
        ...investor.tokenBalances,
        [selectedAsset.ticker]: (investor.tokenBalances[selectedAsset.ticker] || 0) + mintAmount,
      };
      onUpdateInvestor({ ...investor, tokenBalances: updatedBalances });

      const timestamp = new Date().toLocaleTimeString();
      const txHash = `0x${Math.random().toString(16).substring(2, 10)}...STELLAR_MINT`;

      setOnChainLogs((prev) => [
        {
          id: `tx-mint-${Date.now()}`,
          timestamp,
          txHash,
          ledgerIndex: 4928103 + prev.length,
          action: 'RWA_TOKEN_MINTED',
          contractMethod: `soroban::mint_rwa('${selectedAsset.ticker}', ${mintAmount})`,
          payload: {
            ticker: selectedAsset.ticker,
            mintedAmount: mintAmount,
            fireblocksVault: selectedAsset.fireblocksVaultId,
            recipient: investor.fireblocksWalletAddress,
          },
          gasUsed: '0.000025 XLM',
          status: 'SUCCESS',
        },
        ...prev,
      ]);

      setOffChainLogs((prev) => [
        {
          id: `gl-mint-${Date.now()}`,
          timestamp,
          journalId: `GL-HOLD-${Math.floor(Math.random() * 80000 + 10000)}`,
          system: 'Core Banking',
          accountNo: 'GL-99201-COLLATERAL',
          action: 'COLLATERAL_HOLD_LOCKED',
          amountVnd: totalVndValue,
          referenceDoc: `ISO20022_CAMT_053_MINT_${selectedAsset.ticker}`,
          status: 'HOLD',
        },
        ...prev,
      ]);

      setIsExecuting(false);
    }, 1000);
  };

  // Action Step 4: DEX Trade Execution
  const handleExecuteTrade = () => {
    if (tradeAmount <= 0) return;
    setIsExecuting(true);

    setTimeout(() => {
      const tradeValueVnd = tradeAmount * selectedAsset.tokenPriceVnd;
      const currentBalance = investor.tokenBalances[selectedAsset.ticker] || 0;

      if (tradeType === 'SELL' && currentBalance < tradeAmount) {
        alert(`Số dư Token ${selectedAsset.ticker} không đủ để Bán!`);
        setIsExecuting(false);
        return;
      }

      if (tradeType === 'BUY' && investor.fiatBalanceVnd < tradeValueVnd) {
        alert('Số dư Fiat VND không đủ để Mua!');
        setIsExecuting(false);
        return;
      }

      const newBalance =
        tradeType === 'BUY' ? currentBalance + tradeAmount : currentBalance - tradeAmount;
      const newFiat =
        tradeType === 'BUY'
          ? investor.fiatBalanceVnd - tradeValueVnd
          : investor.fiatBalanceVnd + tradeValueVnd;

      onUpdateInvestor({
        ...investor,
        fiatBalanceVnd: newFiat,
        tokenBalances: {
          ...investor.tokenBalances,
          [selectedAsset.ticker]: newBalance,
        },
      });

      const timestamp = new Date().toLocaleTimeString();
      const txHash = `0x${Math.random().toString(16).substring(2, 10)}...STELLAR_SWAP`;

      setOnChainLogs((prev) => [
        {
          id: `tx-trade-${Date.now()}`,
          timestamp,
          txHash,
          ledgerIndex: 4928103 + prev.length,
          action: `DEX_ATOMIC_SWAP_${tradeType}`,
          contractMethod: `soroban::atomic_swap('${selectedAsset.ticker}', ${tradeAmount})`,
          payload: {
            tradeType,
            asset: selectedAsset.ticker,
            amount: tradeAmount,
            fiatSettledVnd: tradeValueVnd,
            whitelistVerified: true,
          },
          gasUsed: '0.000018 XLM',
          status: 'SUCCESS',
        },
        ...prev,
      ]);

      setOffChainLogs((prev) => [
        {
          id: `gl-trade-${Date.now()}`,
          timestamp,
          journalId: `GL-SETTLE-${Math.floor(Math.random() * 80000 + 10000)}`,
          system: 'Core Banking',
          accountNo: 'ACC-INVESTOR-8821',
          action: tradeType === 'BUY' ? 'FIAT_DEBIT_SETTLEMENT' : 'FIAT_CREDIT_SETTLEMENT',
          amountVnd: tradeValueVnd,
          referenceDoc: `DEX_SWAP_MATCH_${selectedAsset.ticker}`,
          status: 'COMPLETED',
        },
        ...prev,
      ]);

      setIsExecuting(false);
    }, 900);
  };

  // Action Step 5: Redeem Execution
  const handleExecuteRedeem = () => {
    const currentBalance = investor.tokenBalances[selectedAsset.ticker] || 0;
    if (redeemAmount <= 0 || redeemAmount > currentBalance) {
      alert(`Số dư Token ${selectedAsset.ticker} không đủ để Redeem!`);
      return;
    }

    setIsExecuting(true);

    setTimeout(() => {
      const redeemValueVnd = redeemAmount * selectedAsset.tokenPriceVnd;

      // Update investor balance
      onUpdateInvestor({
        ...investor,
        fiatBalanceVnd: investor.fiatBalanceVnd + redeemValueVnd,
        tokenBalances: {
          ...investor.tokenBalances,
          [selectedAsset.ticker]: currentBalance - redeemAmount,
        },
      });

      // Update asset total supply
      const updatedAssets = assets.map((a) =>
        a.id === selectedAsset.id
          ? {
              ...a,
              totalSupply: Math.max(0, a.totalSupply - redeemAmount),
              valuationVnd: Math.max(0, a.valuationVnd - redeemValueVnd),
            }
          : a
      );
      onUpdateAssets(updatedAssets);

      const timestamp = new Date().toLocaleTimeString();
      const txHash = `0x${Math.random().toString(16).substring(2, 10)}...STELLAR_BURN`;

      setOnChainLogs((prev) => [
        {
          id: `tx-burn-${Date.now()}`,
          timestamp,
          txHash,
          ledgerIndex: 4928103 + prev.length,
          action: 'RWA_TOKEN_BURNED_REDEEM',
          contractMethod: `soroban::burn_rwa('${selectedAsset.ticker}', ${redeemAmount})`,
          payload: {
            asset: selectedAsset.ticker,
            burnedAmount: redeemAmount,
            fiatPayoutVnd: redeemValueVnd,
            fireblocksVault: selectedAsset.fireblocksVaultId,
          },
          gasUsed: '0.000022 XLM',
          status: 'SUCCESS',
        },
        ...prev,
      ]);

      setOffChainLogs((prev) => [
        {
          id: `gl-burn-${Date.now()}`,
          timestamp,
          journalId: `GL-RELEASE-${Math.floor(Math.random() * 80000 + 10000)}`,
          system: 'Core Banking',
          accountNo: 'GL-99201-COLLATERAL',
          action: 'COLLATERAL_HOLD_RELEASED',
          amountVnd: redeemValueVnd,
          referenceDoc: `REDEEM_PAYOUT_${selectedAsset.ticker}`,
          status: 'RELEASED',
        },
        ...prev,
      ]);

      setIsExecuting(false);
    }, 1000);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                Interactive Live Workflow Simulator
              </span>
              <span className="text-xs text-slate-400">Trình mô phỏng quy trình RWA thực tế</span>
            </div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Play className="w-6 h-6 text-emerald-400" />
              Mô Phỏng Trực Quan Quy Trình Token Hóa RWA (5 Bước)
            </h2>
            <p className="text-xs text-slate-400 max-w-3xl mt-1">
              Thực thi từng bước trong vòng đời tài sản RWA từ eKYC, Mint Token, Custody Fireblocks, Giao dịch thứ cấp tới Redeem và theo dõi nhật ký On-chain / Off-chain trực tiếp.
            </p>
          </div>

          {/* Asset Selection Dropdown & Auto-Play Action */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
              <label className="text-[11px] text-slate-400 font-semibold block">Chọn Tài sản RWA Mô phỏng:</label>
              <select
                value={selectedAsset.id}
                onChange={(e) => {
                  const found = assets.find((a) => a.id === e.target.value);
                  if (found) setSelectedAsset(found);
                }}
                className="bg-slate-900 text-white text-xs font-semibold rounded-lg px-3 py-1.5 border border-slate-700 focus:outline-none focus:border-sky-500 w-full"
              >
                {assets.map((asset) => (
                  <option key={asset.id} value={asset.id}>
                    {asset.ticker} - {asset.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleAutoPlayWorkflow}
              disabled={isAutoPlaying}
              className={`px-4 py-3 rounded-xl font-bold text-xs shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all ${
                isAutoPlaying
                  ? 'bg-amber-600 text-white animate-pulse'
                  : 'bg-sky-600 hover:bg-sky-500 text-white shadow-sky-600/20'
              }`}
            >
              <Play className={`w-4 h-4 ${isAutoPlaying ? 'animate-spin' : ''}`} />
              {isAutoPlaying ? 'Đang Chạy Auto-Play All Steps...' : 'Chạy Auto-Play Vòng Đời RWA'}
            </button>
          </div>
        </div>

        {/* Dynamic Visual Workflow Map */}
        <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4 text-sky-400" />
              Sơ Đồ Dynamic Workflow Map & Luồng Chuyển Token Real-Time
            </span>
            <span className="text-[11px] font-mono text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20">
              Active Step: {activeStepIndex + 1} / 5
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative">
            {SIMULATION_STEPS.map((step, idx) => {
              const isActive = idx === activeStepIndex;
              const isPassed = idx < activeStepIndex;
              return (
                <div
                  key={step.id}
                  onClick={() => setActiveStepIndex(idx)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer relative overflow-hidden ${
                    isActive
                      ? 'bg-slate-900 border-sky-500 shadow-lg shadow-sky-500/20 scale-105 z-10'
                      : isPassed
                      ? 'bg-slate-900/80 border-emerald-500/40 opacity-90'
                      : 'bg-slate-900/40 border-slate-800 opacity-60 hover:opacity-100'
                  }`}
                >
                  {/* Top Status & Badge */}
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                        isActive
                          ? 'bg-sky-500 text-slate-950 shadow-md shadow-sky-400/50'
                          : isPassed
                          ? 'bg-emerald-500 text-slate-950'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {step.id}
                    </span>

                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping"></span>
                    )}
                    {isPassed && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    )}
                  </div>

                  <div className="font-bold text-xs text-white truncate">{step.title.split('.')[1]}</div>
                  <div className="text-[10px] text-slate-400 line-clamp-2 mt-1">{step.shortDesc}</div>

                  {/* Visual connector pulse line */}
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-500 via-indigo-500 to-emerald-400 animate-pulse"></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Step Navigation Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2">
          {SIMULATION_STEPS.map((step, idx) => {
            const isActive = idx === activeStepIndex;
            return (
              <button
                key={step.id}
                onClick={() => setActiveStepIndex(idx)}
                className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white border-blue-400 shadow-md shadow-blue-600/30'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <div className="text-[11px] font-bold opacity-80">Bước {step.id}</div>
                <div className="text-xs font-bold truncate mt-0.5">{step.title.split('.')[1]}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Interactive Step Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-600/20 text-blue-400 rounded-xl border border-blue-500/30 font-bold text-lg">
              {currentStep.id}
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">{currentStep.title}</h3>
              <p className="text-xs text-slate-400">{currentStep.shortDesc}</p>
            </div>
          </div>

          <span className="px-3 py-1 bg-slate-950 text-blue-400 text-xs font-mono rounded-full border border-slate-800">
            Step Mode: Active
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-xl border border-slate-800/80">
          {currentStep.details}
        </p>

        {/* Dynamic Controls Based on Active Step */}
        <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
          {/* STEP 1: eKYC */}
          {currentStep.key === 'ekyc' && (
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-emerald-400" />
                Hồ Sơ Định Danh eKYC Nhà Đầu Tư (Investor Onboarding Profile)
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                  <div className="text-slate-400 text-[11px]">Họ & Tên:</div>
                  <div className="font-bold text-white">{investor.fullName}</div>
                </div>

                <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                  <div className="text-slate-400 text-[11px]">Số CCCD:</div>
                  <div className="font-mono font-bold text-white">{investor.nationalId}</div>
                </div>

                <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                  <div className="text-slate-400 text-[11px]">Trạng thái eKYC:</div>
                  <div className="font-bold text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {investor.ekycStatus}
                  </div>
                </div>

                <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                  <div className="text-slate-400 text-[11px]">AML Risk Score:</div>
                  <div className="font-bold text-emerald-400">{investor.amlRiskScore}</div>
                </div>
              </div>

              <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 text-xs">
                <div className="text-slate-400 text-[11px]">Địa chỉ Ví Fireblocks MPC Whitelisted:</div>
                <div className="font-mono text-indigo-300 font-semibold truncate mt-0.5">
                  {investor.fireblocksWalletAddress}
                </div>
              </div>

              <button
                onClick={handleExecuteEkyc}
                disabled={isExecuting}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-600/20 flex items-center gap-2 cursor-pointer transition-all disabled:opacity-50"
              >
                {isExecuting ? 'Đang xác thực eKYC & Re-whitelist...' : 'Chạy Lại Quy Trình eKYC & Fireblocks Whitelist'}
              </button>
            </div>
          )}

          {/* STEP 2: Mint */}
          {currentStep.key === 'mint' && (
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Coins className="w-4 h-4 text-blue-400" />
                Khóa Thế Chấp Off-Chain & Mint RWA Token
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                  <div className="text-slate-400 text-[11px]">Tài sản chọn:</div>
                  <div className="font-bold text-blue-400">{selectedAsset.name} ({selectedAsset.ticker})</div>
                </div>

                <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                  <div className="text-slate-400 text-[11px]">Đơn giá 1 Token:</div>
                  <div className="font-bold text-emerald-400">{selectedAsset.tokenPriceVnd.toLocaleString('vi-VN')} VNĐ</div>
                </div>

                <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                  <div className="text-slate-400 text-[11px]">Tổng cung hiện tại:</div>
                  <div className="font-mono font-bold text-white">{selectedAsset.totalSupply.toLocaleString('vi-VN')} Tokens</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-end gap-3">
                <div className="space-y-1 flex-1 w-full">
                  <label className="text-xs text-slate-300 font-semibold">Số lượng Token muốn Mint thêm:</label>
                  <input
                    type="number"
                    value={mintAmount}
                    onChange={(e) => setMintAmount(Number(e.target.value))}
                    className="w-full bg-slate-900 text-white text-xs font-mono p-2.5 rounded-lg border border-slate-700 focus:outline-none focus:border-blue-500"
                    placeholder="Nhập số lượng token..."
                  />
                </div>

                <div className="space-y-1 flex-1 w-full">
                  <label className="text-xs text-slate-400 font-semibold">Giá trị Thế chấp tương ứng Core Banking:</label>
                  <div className="bg-slate-900 text-emerald-400 font-mono font-bold text-xs p-2.5 rounded-lg border border-slate-800">
                    {(mintAmount * selectedAsset.tokenPriceVnd).toLocaleString('vi-VN')} VNĐ
                  </div>
                </div>

                <button
                  onClick={handleExecuteMint}
                  disabled={isExecuting}
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-600/20 flex items-center gap-2 cursor-pointer transition-all disabled:opacity-50 h-10"
                >
                  {isExecuting ? 'Đang thực thi Mint...' : 'Thực Thi Mint RWA Token'}
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Custody */}
          {currentStep.key === 'custody' && (
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-indigo-400" />
                Fireblocks Institutional Custody & Policy Status
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="bg-slate-900 p-3 rounded-lg border border-indigo-900/50">
                  <div className="text-slate-400 text-[11px]">Vault Container ID:</div>
                  <div className="font-mono font-bold text-indigo-300">{selectedAsset.fireblocksVaultId}</div>
                </div>

                <div className="bg-slate-900 p-3 rounded-lg border border-indigo-900/50">
                  <div className="text-slate-400 text-[11px]">MPC Signature Threshold:</div>
                  <div className="font-bold text-emerald-400">2 of 3 Active Shards</div>
                </div>

                <div className="bg-slate-900 p-3 rounded-lg border border-indigo-900/50">
                  <div className="text-slate-400 text-[11px]">Policy Rule Check:</div>
                  <div className="font-bold text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> PASSED (KYC Whitelist Only)
                  </div>
                </div>
              </div>

              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
                <div className="font-bold text-slate-200">Phân bố MPC Key Shares (3 Node Độc lập):</div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px]">
                  <div className="bg-slate-950 p-2 rounded border border-slate-800 text-slate-300">
                    <strong>Node 1:</strong> VietRWA Bank HSM Vault (Signed)
                  </div>
                  <div className="bg-slate-950 p-2 rounded border border-slate-800 text-slate-300">
                    <strong>Node 2:</strong> SBV Trustee Audit Node (Signed)
                  </div>
                  <div className="bg-slate-950 p-2 rounded border border-slate-800 text-slate-300">
                    <strong>Node 3:</strong> Fireblocks Co-sign Cloud (Standby)
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Trading */}
          {currentStep.key === 'trading' && (
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <ArrowRightLeft className="w-4 h-4 text-emerald-400" />
                Sàn Giao Dịch Thứ Cấp Mô Phỏng (Simulated Orderbook / DEX)
              </h4>

              {/* Investor Balances Summary */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-slate-900 p-3 rounded-xl border border-slate-800">
                <div>
                  <div className="text-slate-400 text-[11px]">Ví Fiat VND:</div>
                  <div className="font-bold text-emerald-400 font-mono">
                    {investor.fiatBalanceVnd.toLocaleString('vi-VN')} VNĐ
                  </div>
                </div>

                <div>
                  <div className="text-slate-400 text-[11px]">Số dư Token ({selectedAsset.ticker}):</div>
                  <div className="font-bold text-blue-400 font-mono">
                    {investor.tokenBalances[selectedAsset.ticker] || 0} Tokens
                  </div>
                </div>

                <div>
                  <div className="text-slate-400 text-[11px]">Giá niêm yết:</div>
                  <div className="font-bold text-white font-mono">
                    {selectedAsset.tokenPriceVnd.toLocaleString('vi-VN')} VNĐ
                  </div>
                </div>
              </div>

              {/* Trade execution controls */}
              <div className="flex flex-col sm:flex-row items-end gap-3">
                <div className="space-y-1 w-full sm:w-32">
                  <label className="text-xs text-slate-300 font-semibold">Loại lệnh:</label>
                  <select
                    value={tradeType}
                    onChange={(e) => setTradeType(e.target.value as 'BUY' | 'SELL')}
                    className="w-full bg-slate-900 text-white text-xs font-bold p-2.5 rounded-lg border border-slate-700 focus:outline-none"
                  >
                    <option value="BUY">MUA (Buy)</option>
                    <option value="SELL">BÁN (Sell)</option>
                  </select>
                </div>

                <div className="space-y-1 flex-1 w-full">
                  <label className="text-xs text-slate-300 font-semibold">Số lượng Token giao dịch:</label>
                  <input
                    type="number"
                    value={tradeAmount}
                    onChange={(e) => setTradeAmount(Number(e.target.value))}
                    className="w-full bg-slate-900 text-white text-xs font-mono p-2.5 rounded-lg border border-slate-700 focus:outline-none"
                    placeholder="Nhập số lượng..."
                  />
                </div>

                <div className="space-y-1 flex-1 w-full">
                  <label className="text-xs text-slate-400 font-semibold">Tổng giá trị thanh toán:</label>
                  <div className="bg-slate-900 text-emerald-400 font-mono font-bold text-xs p-2.5 rounded-lg border border-slate-800">
                    {(tradeAmount * selectedAsset.tokenPriceVnd).toLocaleString('vi-VN')} VNĐ
                  </div>
                </div>

                <button
                  onClick={handleExecuteTrade}
                  disabled={isExecuting}
                  className={`px-6 py-2.5 font-bold text-xs rounded-xl shadow-lg flex items-center gap-2 cursor-pointer transition-all disabled:opacity-50 h-10 ${
                    tradeType === 'BUY'
                      ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/20'
                      : 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-600/20'
                  }`}
                >
                  {isExecuting ? 'Đang khớp lệnh...' : `Thực Thi Khớp Lệnh ${tradeType}`}
                </button>
              </div>
            </div>
          )}

          {/* STEP 5: Redeem */}
          {currentStep.key === 'redeem' && (
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Flame className="w-4 h-4 text-rose-400" />
                Rút Gốc (Redemption) & Giải Chấp Core Banking Fiat
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-slate-900 p-3 rounded-xl border border-slate-800">
                <div>
                  <div className="text-slate-400 text-[11px]">Sở hữu Token hiện tại ({selectedAsset.ticker}):</div>
                  <div className="font-bold text-blue-400 font-mono">
                    {investor.tokenBalances[selectedAsset.ticker] || 0} Tokens
                  </div>
                </div>

                <div>
                  <div className="text-slate-400 text-[11px]">Tài khoản Fiat VND nhận về:</div>
                  <div className="font-bold text-emerald-400 font-mono">
                    {investor.fiatBalanceVnd.toLocaleString('vi-VN')} VNĐ
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-end gap-3">
                <div className="space-y-1 flex-1 w-full">
                  <label className="text-xs text-slate-300 font-semibold">Số lượng Token muốn Redeem (Đốt Token):</label>
                  <input
                    type="number"
                    value={redeemAmount}
                    onChange={(e) => setRedeemAmount(Number(e.target.value))}
                    className="w-full bg-slate-900 text-white text-xs font-mono p-2.5 rounded-lg border border-slate-700 focus:outline-none"
                    placeholder="Nhập số lượng..."
                  />
                </div>

                <div className="space-y-1 flex-1 w-full">
                  <label className="text-xs text-slate-400 font-semibold">Giá trị Fiat nhận về off-chain:</label>
                  <div className="bg-slate-900 text-emerald-400 font-mono font-bold text-xs p-2.5 rounded-lg border border-slate-800">
                    {(redeemAmount * selectedAsset.tokenPriceVnd).toLocaleString('vi-VN')} VNĐ
                  </div>
                </div>

                <button
                  onClick={handleExecuteRedeem}
                  disabled={isExecuting}
                  className="px-6 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-rose-600/20 flex items-center gap-2 cursor-pointer transition-all disabled:opacity-50 h-10"
                >
                  {isExecuting ? 'Đang giải chấp...' : 'Thực Thi Burn Token & Payout Fiat'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Terminal Live Logs Split (On-Chain vs Off-Chain) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* On-Chain Stellar Logs */}
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2 text-purple-400 font-bold text-xs">
              <Globe className="w-4 h-4" />
              STELLAR SOROBAN ON-CHAIN EXPLORER LOGS
            </div>
            <span className="text-[10px] font-mono text-slate-400">{onChainLogs.length} Events Logged</span>
          </div>

          <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
            {onChainLogs.map((log) => (
              <div key={log.id} className="p-3 bg-slate-900 rounded-lg border border-slate-800/80 font-mono text-[11px] space-y-1">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-purple-300 font-bold">{log.action}</span>
                  <span className="text-[10px]">{log.timestamp}</span>
                </div>
                <div className="text-slate-300 truncate">
                  TxHash: <span className="text-blue-400">{log.txHash}</span>
                </div>
                <div className="text-slate-400 text-[10px]">
                  Method: <span className="text-emerald-400">{log.contractMethod}</span> | Gas: {log.gasUsed}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Off-Chain Core Banking Logs */}
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
              <Database className="w-4 h-4" />
              CORE BANKING GL OFF-CHAIN JOURNAL LOGS
            </div>
            <span className="text-[10px] font-mono text-slate-400">{offChainLogs.length} Entries Logged</span>
          </div>

          <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
            {offChainLogs.map((log) => (
              <div key={log.id} className="p-3 bg-slate-900 rounded-lg border border-slate-800/80 font-mono text-[11px] space-y-1">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-emerald-400 font-bold">{log.action}</span>
                  <span className="text-[10px]">{log.timestamp}</span>
                </div>
                <div className="text-slate-300">
                  Journal ID: <span className="text-amber-300">{log.journalId}</span> | Acc: {log.accountNo}
                </div>
                <div className="text-slate-400 text-[10px]">
                  Amount: <span className="text-white font-bold">{log.amountVnd.toLocaleString('vi-VN')} VNĐ</span> | Ref: {log.referenceDoc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
