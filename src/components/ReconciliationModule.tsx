import React, { useState } from 'react';
import { ReconciliationItem, RwaAsset } from '../types';
import { INITIAL_RECONCILIATION_ITEMS } from '../data/mockRwaData';
import {
  Scale,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  FileSpreadsheet,
  ShieldCheck,
  Building2,
  Clock,
  Download,
  AlertCircle,
  Zap,
  Lock,
  ArrowDownUp
} from 'lucide-react';

interface ReconciliationModuleProps {
  assets: RwaAsset[];
}

export const ReconciliationModule: React.FC<ReconciliationModuleProps> = ({ assets }) => {
  const [items, setItems] = useState<ReconciliationItem[]>(INITIAL_RECONCILIATION_ITEMS);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [auditLog, setAuditLog] = useState<string[]>([
    '2026-07-31 08:00:00 - Quét tự động hoàn tất: 3/3 Tài sản đạt cân bằng tuyệt đối (0.00% Discrepancy).',
  ]);

  // Sync assets state into items
  const handleRefreshSync = () => {
    setIsScanning(true);
    setTimeout(() => {
      const updatedItems = items.map((item) => {
        const foundAsset = assets.find((a) => a.ticker === item.assetTicker);
        if (foundAsset) {
          const onChainMarketCap = foundAsset.totalSupply * foundAsset.tokenPriceVnd;
          const offChainCollateral = foundAsset.valuationVnd;
          const diff = offChainCollateral - onChainMarketCap;

          return {
            ...item,
            offChainCollateralVnd: offChainCollateral,
            onChainTotalSupplyTokens: foundAsset.totalSupply,
            onChainMarketCapVnd: onChainMarketCap,
            discrepancyVnd: diff,
            status: diff === 0 ? 'BALANCED' : 'DISCREPANCY_ALERT',
            lastReconciledAt: new Date().toLocaleString('vi-VN'),
            auditNotes:
              diff === 0
                ? 'Khớp 100% giữa Core Banking GL và Stellar On-Chain Supply.'
                : `CẢNH BÁO: Phát hiện chênh lệch ${diff.toLocaleString('vi-VN')} VNĐ!`,
          } as ReconciliationItem;
        }
        return item;
      });

      setItems(updatedItems);
      setIsScanning(false);
      setAuditLog((prev) => [
        `${new Date().toLocaleTimeString()} - Thực hiện quét đối soát thời gian thực thành công. Tình trạng hệ thống: ${
          updatedItems.some((i) => i.status === 'DISCREPANCY_ALERT') ? 'CÓ LỖI LỆCH SỔ' : 'HOÀN TOÀN CÂN BẰNG'
        }`,
        ...prev,
      ]);
    }, 700);
  };

  // Discrepancy Injector Simulation
  const handleInjectDiscrepancy = (type: 'OVER_MINT' | 'PENDING_FIAT') => {
    setIsScanning(true);
    setTimeout(() => {
      const updated = items.map((item, idx) => {
        if (idx === 0) {
          const fakeDiff = type === 'OVER_MINT' ? -5_000_000_000 : 10_000_000_000;
          return {
            ...item,
            discrepancyVnd: fakeDiff,
            status: 'DISCREPANCY_ALERT' as const,
            lastReconciledAt: new Date().toLocaleString('vi-VN'),
            auditNotes:
              type === 'OVER_MINT'
                ? 'CẢNH BÁO NGHIÊM TRỌNG: Phát hành vBOND26 vượt quá tài sản bảo đảm off-chain 5 Tỷ VNĐ!'
                : 'THÔNG BÁO: Tiền thế chấp off-chain đã ghi nhận 10 Tỷ VNĐ nhưng lệnh Mint Token đang chờ xử lý.',
          };
        }
        return item;
      });

      setItems(updated);
      setIsScanning(false);
      setAuditLog((prev) => [
        `${new Date().toLocaleTimeString()} - [SỰ CỐ GIẢ LẬP] Phát hiện lệch sổ tại ${updated[0].assetTicker}: Chênh lệch ${updated[0].discrepancyVnd.toLocaleString('vi-VN')} VNĐ. Kích hoạt cơ chế Tự động Phong tỏa (Auto-Freeze Policy).`,
        ...prev,
      ]);
    }, 600);
  };

  // Auto Resolve Discrepancy
  const handleAutoResolve = () => {
    setIsScanning(true);
    setTimeout(() => {
      const resolved = items.map((item) => {
        const foundAsset = assets.find((a) => a.ticker === item.assetTicker);
        const correctValuation = (foundAsset?.totalSupply || 1) * item.tokenUnitPriceVnd;
        return {
          ...item,
          offChainCollateralVnd: correctValuation,
          discrepancyVnd: 0,
          status: 'BALANCED' as const,
          lastReconciledAt: new Date().toLocaleString('vi-VN'),
          auditNotes: 'Tự động cân bằng tài sản qua Smart Contract Rebalance Event.',
        };
      });

      setItems(resolved);
      setIsScanning(false);
      setAuditLog((prev) => [
        `${new Date().toLocaleTimeString()} - [AUTO-RESOLVE] Đã khớp lại sổ cái thành công! Hạn mức Thế chấp = Tổng cung Token On-chain.`,
        ...prev,
      ]);
    }, 800);
  };

  // Download Audit Report JSON
  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(items, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `Bao_Cao_Doi_Soat_RWA_DEMO_BOND_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Download Audit Report CSV
  const handleExportCsv = () => {
    const headers = [
      'Mã Ticker',
      'Tên Tài Sản',
      'Thế Chấp Off-Chain (VND)',
      'Tổng Cung Token On-Chain',
      'Giá Trị On-Chain (VND)',
      'Chênh Lệch (VND)',
      'Trạng Thái',
      'Lần Đối Soát Cuối',
      'Ghi Chú Kiểm Toán'
    ];

    const rows = items.map(item => [
      `"${item.assetTicker}"`,
      `"${item.assetName.replace(/"/g, '""')}"`,
      item.offChainCollateralVnd,
      item.onChainTotalSupplyTokens,
      item.onChainMarketCapVnd,
      item.discrepancyVnd,
      `"${item.status}"`,
      `"${item.lastReconciledAt}"`,
      `"${item.auditNotes.replace(/"/g, '""')}"`
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Bao_Cao_Doi_Soat_RWA_DEMO_BOND_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                Automated Reconciliation Module
              </span>
              <span className="text-xs text-slate-400">Đối soát Thời gian thực Core Banking vs Stellar Ledger</span>
            </div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Scale className="w-6 h-6 text-indigo-400" />
              Quy Trình Đối Soát Giữa Hệ Thống On-Chain và Off-Chain
            </h2>
            <p className="text-xs text-slate-400 max-w-3xl mt-1">
              Đảm bảo nguyên tắc bảo chứng 1:1 tuyệt đối giữa tài sản thực / Fiat thế chấp tại Ngân hàng và số lượng Token RWA lưu hành trên Blockchain.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleRefreshSync}
              disabled={isScanning}
              className="px-3.5 py-2 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs rounded-xl shadow-lg flex items-center gap-1.5 cursor-pointer transition-all disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin' : ''}`} />
              Quét Đối Soát Ngay
            </button>

            <button
              onClick={handleExportCsv}
              className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-emerald-400 font-bold text-xs rounded-xl border border-slate-700 flex items-center gap-1.5 cursor-pointer transition-all hover:border-emerald-500/50"
            >
              <Download className="w-3.5 h-3.5 text-emerald-400" />
              Xuất Báo Cáo CSV
            </button>

            <button
              onClick={handleExportJson}
              className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-sky-300 font-bold text-xs rounded-xl border border-slate-700 flex items-center gap-1.5 cursor-pointer transition-all hover:border-sky-500/50"
            >
              <Download className="w-3.5 h-3.5 text-sky-400" />
              Xuất Báo Cáo JSON
            </button>
          </div>
        </div>
      </div>

      {/* Main Reconciliation Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="font-bold text-white text-sm flex items-center gap-2">
            <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
            Bảng Cân Đối Sổ Cái RWA Real-Time (Core Banking GL vs Stellar Ledger)
          </h3>
          <span className="text-xs text-slate-400 font-mono">Status: Live Sync</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950 text-slate-300 font-bold">
                <th className="p-3">Mã Ticker & Tài sản</th>
                <th className="p-3">Tài sản Thế chấp Off-Chain (Core Banking GL)</th>
                <th className="p-3">Tổng cung Token On-Chain (Stellar)</th>
                <th className="p-3">Giá trị Niêm yết On-Chain</th>
                <th className="p-3">Chênh lệch (Discrepancy)</th>
                <th className="p-3">Trạng thái Đối soát</th>
                <th className="p-3">Ghi chú Kiểm toán</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-slate-800/30">
                  <td className="p-3 font-bold text-white">
                    <div className="text-blue-400 font-mono">{item.assetTicker}</div>
                    <div className="text-[11px] text-slate-400 font-normal">{item.assetName}</div>
                  </td>
                  <td className="p-3 font-mono font-bold text-emerald-400">
                    {item.offChainCollateralVnd.toLocaleString('vi-VN')} VNĐ
                  </td>
                  <td className="p-3 font-mono font-bold text-purple-300">
                    {item.onChainTotalSupplyTokens.toLocaleString('vi-VN')} Tokens
                  </td>
                  <td className="p-3 font-mono font-bold text-white">
                    {item.onChainMarketCapVnd.toLocaleString('vi-VN')} VNĐ
                  </td>
                  <td className="p-3 font-mono font-bold">
                    <span
                      className={
                        item.discrepancyVnd === 0
                          ? 'text-emerald-400'
                          : item.discrepancyVnd > 0
                          ? 'text-amber-400'
                          : 'text-rose-400'
                      }
                    >
                      {item.discrepancyVnd.toLocaleString('vi-VN')} VNĐ
                    </span>
                  </td>
                  <td className="p-3 font-bold">
                    {item.status === 'BALANCED' ? (
                      <span className="inline-flex items-center gap-1 text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded-md border border-emerald-800">
                        <CheckCircle2 className="w-3.5 h-3.5" /> BALANCED
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-rose-400 bg-rose-950 px-2.5 py-1 rounded-md border border-rose-800">
                        <AlertTriangle className="w-3.5 h-3.5" /> DISCREPANCY
                      </span>
                    )}
                  </td>
                  <td className="p-3 text-[11px] text-slate-400 max-w-xs">{item.auditNotes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Discrepancy Injector & Auto-Resolve Controls */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="font-bold text-white text-sm flex items-center gap-2">
          <Zap className="w-4 h-4 text-amber-400" />
          Mô Phỏng Xử Lý Sự Cố Lệch Sổ (Discrepancy Injector & Auto-Fix)
        </h3>
        <p className="text-xs text-slate-400">
          Thử nghiệm khả năng phát hiện lỗi chênh lệch sổ sách giữa Core Banking và On-chain Blockchain:
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => handleInjectDiscrepancy('OVER_MINT')}
            className="px-4 py-2 bg-rose-950/80 hover:bg-rose-900 text-rose-300 font-bold text-xs rounded-xl border border-rose-800 flex items-center gap-1.5 cursor-pointer transition-all"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            Giả Lập Lỗi Mint Token Vượt Hạn Mức (+5 Tỷ VNĐ)
          </button>

          <button
            onClick={() => handleInjectDiscrepancy('PENDING_FIAT')}
            className="px-4 py-2 bg-amber-950/80 hover:bg-amber-900 text-amber-300 font-bold text-xs rounded-xl border border-amber-800 flex items-center gap-1.5 cursor-pointer transition-all"
          >
            <Clock className="w-3.5 h-3.5" />
            Giả Lập Lỗi Tiền Fiat Về Nhưng Chưa Mint Token
          </button>

          <button
            onClick={handleAutoResolve}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg flex items-center gap-1.5 cursor-pointer transition-all ml-auto"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            Kích Hoạt Auto-Rebalance & Khớp Lại Sổ Cái
          </button>
        </div>
      </div>

      {/* Real-time Audit Trail Console */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-blue-400 font-bold text-xs">
            <Clock className="w-4 h-4" />
            NHẬT KÝ KIỂM TOÁN TỰ ĐỘNG (REAL-TIME AUDIT TRAIL LOGS)
          </div>
          <span className="text-[10px] font-mono text-slate-400">Auditor: SBV Compliance Node</span>
        </div>

        <div className="space-y-1.5 max-h-48 overflow-y-auto font-mono text-[11px]">
          {auditLog.map((log, idx) => (
            <div key={idx} className="text-slate-300 bg-slate-900/60 p-2 rounded border border-slate-800/60">
              {log}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
