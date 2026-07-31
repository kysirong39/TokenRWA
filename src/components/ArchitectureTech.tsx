import React, { useState } from 'react';
import {
  Cpu,
  Server,
  Database,
  Lock,
  Globe,
  ArrowRightLeft,
  Code2,
  CheckCircle2,
  Terminal,
  ShieldCheck,
  Zap,
  Key,
  ExternalLink
} from 'lucide-react';

export const ArchitectureTech: React.FC = () => {
  const [selectedStack, setSelectedStack] = useState<'all' | 'stellar' | 'fireblocks' | 'corebank'>('all');

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Overview Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                Hybrid Web2 + Web3 Architecture
              </span>
              <span className="text-xs text-slate-400">Core Banking & Stellar Public Blockchain</span>
            </div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Cpu className="w-6 h-6 text-blue-400" />
              Kiến Trúc Hệ Thống & Stack Công Nghệ Tích Hợp
            </h2>
            <p className="text-xs text-slate-400 max-w-3xl mt-1">
              Mô hình kiến trúc kết hợp tính an toàn pháp lý của hệ thống Ngân hàng lõi (Core Banking ISO 20022) với tốc độ, tính minh bạch của Stellar Soroban Blockchain và độ an toàn cấp định chế của Fireblocks MPC.
            </p>
          </div>

          {/* Filter buttons */}
          <div className="flex flex-wrap gap-1.5 text-xs">
            <button
              onClick={() => setSelectedStack('all')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                selectedStack === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              Tất cả Layers
            </button>
            <button
              onClick={() => setSelectedStack('corebank')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                selectedStack === 'corebank'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              1. Core Banking Web2
            </button>
            <button
              onClick={() => setSelectedStack('fireblocks')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                selectedStack === 'fireblocks'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              2. Fireblocks Custody
            </button>
            <button
              onClick={() => setSelectedStack('stellar')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                selectedStack === 'stellar'
                  ? 'bg-purple-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              3. Stellar Soroban Web3
            </button>
          </div>
        </div>
      </div>

      {/* Visual System Topology Diagram (Interactive Graphic) */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-sky-400 bg-sky-500/10 px-2.5 py-0.5 rounded border border-sky-500/20">
              Interactive Topology Map
            </span>
            <h3 className="text-base font-bold text-white mt-1 flex items-center gap-2">
              <LayersIcon className="w-5 h-5 text-sky-400" />
              Sơ Đồ Luồng Dữ Liệu & Kiến Trúc Tích Hợp Live
            </h3>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="flex items-center gap-1.5 text-slate-300 bg-slate-950 px-2.5 py-1 rounded-md border border-slate-800">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              2-of-3 MPC Key Active
            </span>
            <span className="flex items-center gap-1.5 text-slate-300 bg-slate-950 px-2.5 py-1 rounded-md border border-slate-800">
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse"></span>
              ISO 20022 Syncing
            </span>
          </div>
        </div>

        {/* Visual Schematic Graphics Canvas */}
        <div className="relative bg-slate-950 rounded-xl p-6 border border-slate-800 overflow-hidden">
          {/* Subtle Grid Pattern Background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:2rem_2rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none"></div>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            {/* Node 1: Web2 Client & Core Bank */}
            <div className="bg-slate-900/90 border border-emerald-500/30 rounded-xl p-4 shadow-lg hover:border-emerald-400 transition-all space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                  <Database className="w-4 h-4" />
                  CORE BANKING
                </div>
                <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950/80 px-1.5 py-0.5 rounded">
                  Web2 ISO
                </span>
              </div>
              <div className="space-y-1.5 text-xs">
                <div className="bg-slate-950 p-2 rounded border border-slate-800 font-semibold text-slate-200">
                  eKYC National Identity DB
                </div>
                <div className="bg-slate-950 p-2 rounded border border-slate-800 font-semibold text-slate-200">
                  Fiat Collateral GL #99201
                </div>
                <div className="bg-slate-950 p-2 rounded border border-slate-800 text-[11px] text-emerald-400 font-mono">
                  ISO 20022 camt.053 Msg
                </div>
              </div>
            </div>

            {/* Connection Arrow 1 */}
            <div className="hidden md:flex flex-col items-center justify-center text-sky-400 font-mono text-[10px] gap-1">
              <span className="bg-slate-900 border border-slate-800 px-2 py-0.5 rounded text-sky-300 animate-pulse">
                mTLS API Bridge
              </span>
              <div className="w-full h-0.5 bg-gradient-to-r from-emerald-500 via-sky-400 to-indigo-500 relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-sky-400 animate-ping"></div>
              </div>
              <span className="text-slate-500">JSON/REST Encrypted</span>
            </div>

            {/* Node 2: Fireblocks MPC Custody Middleware */}
            <div className="bg-slate-900/90 border border-indigo-500/30 rounded-xl p-4 shadow-lg hover:border-indigo-400 transition-all space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs">
                  <Lock className="w-4 h-4" />
                  FIREBLOCKS MPC
                </div>
                <span className="text-[10px] font-mono text-indigo-300 bg-indigo-950/80 px-1.5 py-0.5 rounded">
                  2/3 Vault
                </span>
              </div>
              <div className="space-y-1.5 text-xs">
                <div className="bg-slate-950 p-2 rounded border border-slate-800 font-semibold text-slate-200">
                  Institutional Policy Engine
                </div>
                <div className="bg-slate-950 p-2 rounded border border-slate-800 font-semibold text-slate-200">
                  Distributed Key Shards
                </div>
                <div className="bg-slate-950 p-2 rounded border border-slate-800 text-[11px] text-indigo-400 font-mono">
                  AML Screening Engine
                </div>
              </div>
            </div>

            {/* Connection Arrow 2 */}
            <div className="hidden md:flex flex-col items-center justify-center text-purple-400 font-mono text-[10px] gap-1">
              <span className="bg-slate-900 border border-slate-800 px-2 py-0.5 rounded text-purple-300 animate-pulse">
                Soroban RPC
              </span>
              <div className="w-full h-0.5 bg-gradient-to-r from-indigo-500 via-purple-400 to-sky-400 relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-purple-400 animate-ping"></div>
              </div>
              <span className="text-slate-500">Wasm Transaction</span>
            </div>

            {/* Node 3: Stellar Blockchain Soroban Smart Contracts */}
            <div className="bg-slate-900/90 border border-purple-500/30 rounded-xl p-4 shadow-lg hover:border-purple-400 transition-all space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <div className="flex items-center gap-2 text-purple-400 font-bold text-xs">
                  <Globe className="w-4 h-4" />
                  STELLAR SOROBAN
                </div>
                <span className="text-[10px] font-mono text-purple-300 bg-purple-950/80 px-1.5 py-0.5 rounded">
                  Web3 On-Chain
                </span>
              </div>
              <div className="space-y-1.5 text-xs">
                <div className="bg-slate-950 p-2 rounded border border-slate-800 font-semibold text-slate-200">
                  RWA Token Contract (Wasm)
                </div>
                <div className="bg-slate-950 p-2 rounded border border-slate-800 font-semibold text-slate-200">
                  Whitelist Registry Contract
                </div>
                <div className="bg-slate-950 p-2 rounded border border-slate-800 text-[11px] text-purple-400 font-mono">
                  Atomic Swap / DEX AMM
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Layer Architecture Diagram */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-6">
        <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
          <LayersIcon className="w-4 h-4 text-blue-400" />
          Sơ Đồ Tích Hợp Phân Tầng (Layered Architecture Diagram)
        </h3>

        {/* 3 Major Layers */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative">
          {/* Layer 1: Core Banking Web2 */}
          <div
            className={`p-5 rounded-xl border transition-all space-y-4 ${
              selectedStack === 'all' || selectedStack === 'corebank'
                ? 'bg-slate-900 border-emerald-500/40 shadow-lg shadow-emerald-950/30'
                : 'bg-slate-900/40 border-slate-800 opacity-40'
            }`}
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <Database className="w-5 h-5" />
                LAYER 1: CORE BANKING (Web2)
              </div>
              <span className="text-[10px] font-mono bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded border border-emerald-800">
                OFF-CHAIN
              </span>
            </div>

            <p className="text-xs text-slate-300">
              Hệ thống Ngân hàng lõi quản lý tiền gửi Fiat (VND/USD), định giá và lưu kho giấy tờ pháp lý của tài sản thực.
            </p>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                <div className="font-semibold text-emerald-300">Core GL (General Ledger)</div>
                <div className="text-[11px] text-slate-400">Ghi nợ/Có tài khoản thế chấp, Hold Collateral Account #GL-99201</div>
              </div>

              <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                <div className="font-semibold text-emerald-300">eKYC & Central Identity System</div>
                <div className="text-[11px] text-slate-400">Đối soát CSDL Quốc gia, mã hóa thông tin nhà đầu tư</div>
              </div>

              <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                <div className="font-semibold text-emerald-300">ISO 20022 Financial Gateway</div>
                <div className="text-[11px] text-slate-400">Chuẩn hóa tin nhắn giao dịch ngân hàng (pacs.008, camt.053)</div>
              </div>
            </div>
          </div>

          {/* Middleware Layer 2: Fireblocks API & Policy Engine */}
          <div
            className={`p-5 rounded-xl border transition-all space-y-4 ${
              selectedStack === 'all' || selectedStack === 'fireblocks'
                ? 'bg-slate-900 border-indigo-500/40 shadow-lg shadow-indigo-950/30'
                : 'bg-slate-900/40 border-slate-800 opacity-40'
            }`}
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
                <Lock className="w-5 h-5" />
                LAYER 2: FIREBLOCKS CUSTODY
              </div>
              <span className="text-[10px] font-mono bg-indigo-950 text-indigo-400 px-2 py-0.5 rounded border border-indigo-800">
                MPC MIDDLEWARE
              </span>
            </div>

            <p className="text-xs text-slate-300">
              Lớp bảo vệ trung gian Institutional Custody quản lý khóa bí mật phân tán (MPC) và điều hướng chính sách giao dịch.
            </p>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                <div className="font-semibold text-indigo-300">Fireblocks Policy Engine</div>
                <div className="text-[11px] text-slate-400">Quy tắc duyệt 2-of-3 signatures, AML Real-time Screening</div>
              </div>

              <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                <div className="font-semibold text-indigo-300">MPC Vault & Key Shards</div>
                <div className="text-[11px] text-slate-400">Không có chữ ký đơn lẻ, bảo vệ tài sản cấp ngân hàng</div>
              </div>

              <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                <div className="font-semibold text-indigo-300">Tokenization API Bridge</div>
                <div className="text-[11px] text-slate-400">API chuyển tiếp lệnh Mint/Burn từ Core Banking tới Soroban</div>
              </div>
            </div>
          </div>

          {/* Layer 3: Stellar Blockchain Web3 */}
          <div
            className={`p-5 rounded-xl border transition-all space-y-4 ${
              selectedStack === 'all' || selectedStack === 'stellar'
                ? 'bg-slate-900 border-purple-500/40 shadow-lg shadow-purple-950/30'
                : 'bg-slate-900/40 border-slate-800 opacity-40'
            }`}
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-purple-400 font-bold text-sm">
                <Globe className="w-5 h-5" />
                LAYER 3: STELLAR NETWORK (Web3)
              </div>
              <span className="text-[10px] font-mono bg-purple-950 text-purple-400 px-2 py-0.5 rounded border border-purple-800">
                ON-CHAIN
              </span>
            </div>

            <p className="text-xs text-slate-300">
              Sổ cái công khai Stellar xử lý các Smart Contract Soroban, quản lý danh sách Whitelist và Atomic Swaps.
            </p>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                <div className="font-semibold text-purple-300">Soroban Smart Contracts</div>
                <div className="text-[11px] text-slate-400">Hợp đồng thông minh Wasm thực thi mint_rwa(), transfer_whitelist()</div>
              </div>

              <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                <div className="font-semibold text-purple-300">Stellar Native Asset Engine</div>
                <div className="text-[11px] text-slate-400">Phí giao dịch siêu thấp ($0.00001), chốt sổ trong 3-5 giây</div>
              </div>

              <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                <div className="font-semibold text-purple-300">Third-party DEX / Orderbook Integration</div>
                <div className="text-[11px] text-slate-400">Sàn giao dịch mô phỏng tích hợp AMM Liquidity Pools</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tech Stack Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Core Banking API Integration Mock */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <Terminal className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-white text-sm">
              Mô Phỏng Tích Hợp Core Banking ISO 20022
            </h3>
          </div>

          <p className="text-xs text-slate-400">
            Khi phát hành hoặc giải chấp RWA Token, hệ thống gửi cấu trúc dữ liệu XML/JSON theo chuẩn ISO 20022 quốc tế:
          </p>

          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono text-[11px] text-emerald-400 overflow-x-auto">
            <pre>{`// ISO 20022 Collateral Hold Request (camt.053)
{
  "MsgHdr": {
    "MsgId": "VIETRWA-HOLD-20260731-00921",
    "CreDtTm": "2026-07-31T08:30:00Z"
  },
  "RwaCollateralHold": {
    "AssetTicker": "vBOND26",
    "CollateralAmountVnd": 500000000000,
    "GlAccountDebit": "GL-99201-COLLATERAL",
    "FireblocksVaultTarget": "FB-VAULT-VIETRWA-BONDS-01",
    "AuthorizationStatus": "APPROVED_BY_TREASURY"
  }
}`}</pre>
          </div>
        </div>

        {/* Soroban Smart Contract Spec Mock */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <Code2 className="w-5 h-5 text-purple-400" />
            <h3 className="font-bold text-white text-sm">
              Soroban Smart Contract Spec (Rust / Wasm)
            </h3>
          </div>

          <p className="text-xs text-slate-400">
            Smart contract quản lý Token RWA trên Stellar đảm bảo quy tắc Whitelist tuân thủ nghiêm ngặt:
          </p>

          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono text-[11px] text-purple-300 overflow-x-auto">
            <pre>{`// Soroban RWA Token Contract (Rust)
pub fn mint_rwa(e: Env, to: Address, amount: i128) {
    let admin = e.storage().instance().get(&DataKey::Admin);
    admin.require_auth(); // Requires Fireblocks MPC Signature

    // Verify recipient is eKYC Whitelisted
    if !is_whitelisted(&e, &to) {
        panic!("Error: Recipient not eKYC Whitelisted");
    }

    let balance = get_balance(&e, &to);
    set_balance(&e, &to, balance + amount);
    e.events().publish(("RWA_MINT", to), amount);
}`}</pre>
          </div>
        </div>
      </div>

      {/* NEW SECTION: Fireblocks MPC Custody & Policy Engine Detailed Visual Model */}
      <div className="bg-slate-900 border border-indigo-500/30 rounded-2xl p-6 space-y-6 shadow-xl shadow-indigo-950/20">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-2.5 py-0.5 rounded border border-indigo-500/20">
              3. Fireblocks Custody & Policy Engine
            </span>
            <h3 className="text-base font-bold text-white mt-1 flex items-center gap-2">
              <Lock className="w-5 h-5 text-indigo-400" />
              Mô Hình Chi Tiết Cơ Chế Chữ Ký Ngưỡng MPC (2-of-3 Threshold Cryptography)
            </h3>
          </div>
          <span className="text-xs text-indigo-300 font-mono bg-indigo-950 px-3 py-1 rounded-lg border border-indigo-800">
            MPC-CMP Protocol / Ed25519
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Giải pháp lưu ký cấp Ngân hàng thương mại sử dụng công nghệ <strong>Multi-Party Computation (MPC)</strong> kết hợp <strong>Chính sách Bảo mật Tự động (Policy Engine)</strong>. Khóa bí mật không bao giờ tồn tại trọn vẹn ở bất kỳ đâu; thay vào đó được chia thành 3 mảnh khóa (Key Shares) độc lập với cơ chế đồng thuận 2/3.
        </p>

        {/* MPC 3 Key Shares Visual Schema */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Key Share 1 */}
          <div className="bg-slate-950 border border-emerald-500/40 rounded-xl p-4 space-y-3 relative overflow-hidden group hover:border-emerald-400 transition-all">
            <div className="absolute top-0 right-0 bg-emerald-500/20 text-emerald-400 text-[10px] font-bold font-mono px-2 py-0.5 rounded-bl">
              SHARE 1 / 3
            </div>
            <div className="flex items-center gap-2">
              <div className="p-2 bg-emerald-950 text-emerald-400 rounded-lg border border-emerald-800">
                <Key className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Mảnh Khóa 1: Issuer Bank Node</h4>
                <span className="text-[10px] text-slate-400">DMZ Ngân Hàng Phát Hành</span>
              </div>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              Đặt tại hạ tầng On-premise / Private Cloud của Ngân hàng. Tự động kích hoạt mảnh chữ ký 1 khi Trưởng phòng Nguồn vốn phê duyệt lệnh trên Core Banking.
            </p>
            <div className="flex items-center justify-between pt-2 border-t border-slate-900 text-[10px] font-mono text-emerald-400">
              <span>Trạng thái: Active</span>
              <span className="bg-emerald-950 px-1.5 py-0.5 rounded border border-emerald-800">Local Hardware</span>
            </div>
          </div>

          {/* Key Share 2 */}
          <div className="bg-slate-950 border border-indigo-500/40 rounded-xl p-4 space-y-3 relative overflow-hidden group hover:border-indigo-400 transition-all">
            <div className="absolute top-0 right-0 bg-indigo-500/20 text-indigo-400 text-[10px] font-bold font-mono px-2 py-0.5 rounded-bl">
              SHARE 2 / 3
            </div>
            <div className="flex items-center gap-2">
              <div className="p-2 bg-indigo-950 text-indigo-400 rounded-lg border border-indigo-800">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Mảnh Khóa 2: Policy Engine Cloud</h4>
                <span className="text-[10px] text-slate-400">Fireblocks Co-signer Server</span>
              </div>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              Đặt tại Đám mây Bảo mật Fireblocks. Tự động kiểm tra Quy tắc Tuân thủ (Hạn mức phát hành, eKYC Whitelist, AML Screening) trước khi ký mảnh 2.
            </p>
            <div className="flex items-center justify-between pt-2 border-t border-slate-900 text-[10px] font-mono text-indigo-400">
              <span>Trạng thái: Auto-signing</span>
              <span className="bg-indigo-950 px-1.5 py-0.5 rounded border border-indigo-800">SGX Enclave</span>
            </div>
          </div>

          {/* Key Share 3 */}
          <div className="bg-slate-950 border border-amber-500/40 rounded-xl p-4 space-y-3 relative overflow-hidden group hover:border-amber-400 transition-all">
            <div className="absolute top-0 right-0 bg-amber-500/20 text-amber-400 text-[10px] font-bold font-mono px-2 py-0.5 rounded-bl">
              SHARE 3 / 3
            </div>
            <div className="flex items-center gap-2">
              <div className="p-2 bg-amber-950 text-amber-400 rounded-lg border border-amber-800">
                <Server className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Mảnh Khóa 3: Cold Recovery Vault</h4>
                <span className="text-[10px] text-slate-400">Trustee / Disaster Recovery</span>
              </div>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              Mảnh khóa dự phòng lưu trữ cách ly ngoại tuyến (Air-gapped) tại Tổ chức Giám sát Lưu ký độc lập. Chỉ sử dụng khi khôi phục thảm họa hoặc sự cố hệ thống.
            </p>
            <div className="flex items-center justify-between pt-2 border-t border-slate-900 text-[10px] font-mono text-amber-400">
              <span>Trạng thái: Standby (Cold)</span>
              <span className="bg-amber-950 px-1.5 py-0.5 rounded border border-amber-800">Air-Gapped HSM</span>
            </div>
          </div>
        </div>

        {/* Step-by-Step Interactive Workflow Diagram */}
        <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              Luồng Ký Số Phân Tán MPC & Thực Thi Giao Dịch On-chain
            </h4>
            <span className="text-[10px] text-slate-400 font-mono">
              Thời gian xử lý: &lt; 100ms
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Step 1 */}
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-2 relative">
              <div className="flex items-center justify-between text-[11px] font-bold text-emerald-400 font-mono">
                <span>BƯỚC 1</span>
                <span className="bg-emerald-950 px-1.5 py-0.5 rounded text-[10px]">API Request</span>
              </div>
              <h5 className="text-xs font-bold text-white">Khởi Tạo Lệnh Mint/Transfer</h5>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Core Banking phát lệnh qua REST API mã hóa mTLS sang Fireblocks Vault Middleware kèm tham số giao dịch.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-2 relative">
              <div className="flex items-center justify-between text-[11px] font-bold text-indigo-400 font-mono">
                <span>BƯỚC 2</span>
                <span className="bg-indigo-950 px-1.5 py-0.5 rounded text-[10px]">Policy Engine</span>
              </div>
              <h5 className="text-xs font-bold text-white">Sàng Lọc Quy Tắc Tuân Thủ</h5>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Fireblocks tự động quét AML, đối chiếu hạn mức giao dịch và xác minh chữ ký phê duyệt từ ngân hàng.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-2 relative">
              <div className="flex items-center justify-between text-[11px] font-bold text-purple-400 font-mono">
                <span>BƯỚC 3</span>
                <span className="bg-purple-950 px-1.5 py-0.5 rounded text-[10px]">MPC 2/3 Signing</span>
              </div>
              <h5 className="text-xs font-bold text-white">Ký Mảnh Độc Lập</h5>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Share 1 và Share 2 tính toán chữ ký bộ phận (&sigma;1, &sigma;2). Khóa riêng tuyệt đối không ghép lại ở bất kỳ thời điểm nào.
              </p>
            </div>

            {/* Step 4 */}
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-2 relative">
              <div className="flex items-center justify-between text-[11px] font-bold text-sky-400 font-mono">
                <span>BƯỚC 4</span>
                <span className="bg-sky-950 px-1.5 py-0.5 rounded text-[10px]">On-chain Broadcast</span>
              </div>
              <h5 className="text-xs font-bold text-white">Gộp Chữ Ký Chuẩn Ed25519</h5>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Kết hợp đại số ra chữ ký hợp lệ duy nhất, gửi lên Stellar Soroban RPC để Smart Contract xác thực.
              </p>
            </div>
          </div>

          {/* Mathematical & Security Comparison Grid */}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-800 text-xs">
            <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 space-y-1">
              <span className="font-bold text-emerald-400">An Toàn Tuyệt Đối (Zero Single Point)</span>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Hacker tấn công chiếm được 1 server vẫn không thể có private key hay thực thi chuyển tiền trái phép.
              </p>
            </div>

            <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 space-y-1">
              <span className="font-bold text-indigo-400">Tối Ưu Phí On-Chain (Standard Signature)</span>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Khác với Smart Contract Multisig tốn nhiều Gas, MPC tạo ra 1 chữ ký đơn chuẩn Ed25519 giúp phí giao dịch Stellar giữ nguyên mức $0.00001.
              </p>
            </div>

            <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 space-y-1">
              <span className="font-bold text-amber-400">Bảo Mật Cấu Trúc Quản Trị (Privacy)</span>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Không lộ danh tính người duyệt hay quy tắc quản trị nội bộ của ngân hàng lên sổ cái công khai Stellar.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* NEW SECTION: Integration Standards & Interoperability Protocols */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded border border-amber-500/20">
              System Integration & Bridge Standards
            </span>
            <h3 className="text-base font-bold text-white mt-1 flex items-center gap-2">
              <ArrowRightLeft className="w-5 h-5 text-amber-400" />
              Tiêu Chuẩn Tích Hợp Hệ Thống (On-chain, Off-chain & Oracle Bridges)
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-mono bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
            ISO 20022 + REST/mTLS + SEP-24
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Giao thức quy định tiêu chuẩn kết nối dữ liệu giữa hệ thống Ngân hàng lõi (Off-chain Core Banking), Nền tảng Lưu ký (Fireblocks Vault), Oracle Định giá (Chainlink PoR) và Mạng lưới Blockchain Stellar Soroban (On-chain).
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Subsection 1: Off-chain <-> On-chain Integration Standards */}
          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
              <Zap className="w-4 h-4" />
              1. Tích Hợp On-chain &lt;&ndash;&gt; Off-chain (Web2 Banking & Web3)
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">mTLS & RESTful Open API Bridge</span>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded">Security RFC-8446</span>
                </div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Xác thực 2 chiều bằng chứng chỉ số RSA 4096-bit giữa Gateway Ngân hàng và Middleware. Mọi request chuyển tiếp lệnh Mint/Burn đều được mã hóa AES-256.
                </p>
              </div>

              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">Oracle Bridge & Proof-of-Reserve (PoR)</span>
                  <span className="text-[11px] font-mono text-amber-400 bg-amber-950 px-2 py-0.5 rounded">Chainlink / Pyth</span>
                </div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Cập nhật định giá tài sản thực (NAV) và kiểm tra số dư Tài khoản Escrow phong tỏa 24/7. Tự động đẩy dữ liệu Proof of Reserve lên Soroban State mỗi 5 phút.
                </p>
              </div>

              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">ISO 20022 Messaging Gateway</span>
                  <span className="text-[11px] font-mono text-sky-400 bg-sky-950 px-2 py-0.5 rounded">camt.053 / pacs.008</span>
                </div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Chuyển đổi tín hiệu chuyển tiền fiat ngân hàng thành thông điệp chuẩn hóa XML/JSON để trigger hợp đồng thông minh thực thi mint_bond() tự động.
                </p>
              </div>
            </div>
          </div>

          {/* Subsection 2: On-chain <-> On-chain Integration Standards */}
          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-2 text-purple-400 font-bold text-xs uppercase tracking-wider">
              <Globe className="w-4 h-4" />
              2. Tích Hợp On-chain &lt;&ndash;&gt; On-chain (Cross-chain & Interoperability)
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">Stellar Ecosystem Proposal (SEP-24 & SEP-30)</span>
                  <span className="text-[10px] font-mono text-purple-400 bg-purple-950 px-2 py-0.5 rounded">Anchor Protocol</span>
                </div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Tiêu chuẩn tương tác Nạp/Rút Fiat và quản lý Phôi khóa dự phòng (Recovery Key Shards) tương thích hoàn toàn với hệ sinh thái Ví Stellar toàn cầu.
                </p>
              </div>

              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">Cross-Chain Liquidity Bridge Protocol</span>
                  <span className="text-[11px] font-mono text-indigo-400 bg-indigo-950 px-2 py-0.5 rounded">Soroban CCIP Bridge</span>
                </div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Cho phép dịch chuyển thanh khoản Trái phiếu Token hóa giữa Stellar Soroban và các mạng EVM L2 (Arbitrum, Polygon) dành cho Nhà đầu tư Quốc tế.
                </p>
              </div>

              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">Soroban RPC WebSocket Event Stream</span>
                  <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded">JSON-RPC 2.0</span>
                </div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Cổng kết nối lắng nghe Sự kiện On-chain real-time (RWA_MINT, RECONCILE_ALERT) đẩy trực tiếp vào Core Banking Reconciliation Engine.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* NEW SECTION: Official Resources Directory & External Reference Links */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-sky-400 bg-sky-500/10 px-2.5 py-0.5 rounded border border-sky-500/20">
              Official Documentation & Resource Index
            </span>
            <h3 className="text-base font-bold text-white mt-1 flex items-center gap-2">
              <Globe className="w-5 h-5 text-sky-400" />
              Chỉ Mục Liên Kết & Nguồn Truy Cấp Chính Thức (Official External Links)
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-mono bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
            Verified External Gateways
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          {/* Link 1: Stellar Soroban Docs */}
          <a
            href="https://stellar.org/soroban"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-sky-500/50 rounded-xl space-y-2 group transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-white group-hover:text-sky-400 transition-colors">Stellar Soroban</span>
              <ExternalLink className="w-4 h-4 text-sky-400 group-hover:translate-x-0.5 transition-transform" />
            </div>
            <p className="text-[11px] text-slate-400">Tài liệu chính thức về Hợp đồng thông minh Soroban Wasm trên mạng lưới Stellar.</p>
            <span className="text-[10px] text-sky-400 font-mono block pt-1 border-t border-slate-900">https://stellar.org/soroban</span>
          </a>

          {/* Link 2: Stellar Laboratory */}
          <a
            href="https://laboratory.stellar.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-purple-500/50 rounded-xl space-y-2 group transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-white group-hover:text-purple-400 transition-colors">Stellar Laboratory</span>
              <ExternalLink className="w-4 h-4 text-purple-400 group-hover:translate-x-0.5 transition-transform" />
            </div>
            <p className="text-[11px] text-slate-400">Cổng công cụ tương tác RPC, kiểm tra giao dịch và Testnet Faucet cho Developer.</p>
            <span className="text-[10px] text-purple-400 font-mono block pt-1 border-t border-slate-900">https://laboratory.stellar.org/</span>
          </a>

          {/* Link 3: Fireblocks Enterprise */}
          <a
            href="https://www.fireblocks.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-indigo-500/50 rounded-xl space-y-2 group transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-white group-hover:text-indigo-400 transition-colors">Fireblocks Custody</span>
              <ExternalLink className="w-4 h-4 text-indigo-400 group-hover:translate-x-0.5 transition-transform" />
            </div>
            <p className="text-[11px] text-slate-400">Giải pháp lưu ký MPC và Policy Engine cấp tài chính cho tổ chức ngân hàng.</p>
            <span className="text-[10px] text-indigo-400 font-mono block pt-1 border-t border-slate-900">https://www.fireblocks.com/</span>
          </a>

          {/* Link 4: Chainlink PoR */}
          <a
            href="https://chain.link/proof-of-reserve"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-amber-500/50 rounded-xl space-y-2 group transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-white group-hover:text-amber-400 transition-colors">Chainlink PoR</span>
              <ExternalLink className="w-4 h-4 text-amber-400 group-hover:translate-x-0.5 transition-transform" />
            </div>
            <p className="text-[11px] text-slate-400">Mạng lưới Oracle xác minh minh bạch tài sản ký quỹ Off-chain (Proof of Reserve).</p>
            <span className="text-[10px] text-amber-400 font-mono block pt-1 border-t border-slate-900">https://chain.link/proof-of-reserve</span>
          </a>

          {/* Link 5: ISO 20022 */}
          <a
            href="https://www.iso20022.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500/50 rounded-xl space-y-2 group transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-white group-hover:text-emerald-400 transition-colors">ISO 20022 Standard</span>
              <ExternalLink className="w-4 h-4 text-emerald-400 group-hover:translate-x-0.5 transition-transform" />
            </div>
            <p className="text-[11px] text-slate-400">Chuẩn mực tin nhắn tài chính quốc tế cho thanh toán & đối soát ngân hàng.</p>
            <span className="text-[10px] text-emerald-400 font-mono block pt-1 border-t border-slate-900">https://www.iso20022.org/</span>
          </a>

          {/* Link 6: Stellar Ecosystem Proposals */}
          <a
            href="https://github.com/stellar/stellar-protocol/tree/master/ecosystem"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-blue-500/50 rounded-xl space-y-2 group transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-white group-hover:text-blue-400 transition-colors">Stellar SEPs (SEP-24/30)</span>
              <ExternalLink className="w-4 h-4 text-blue-400 group-hover:translate-x-0.5 transition-transform" />
            </div>
            <p className="text-[11px] text-slate-400">Bộ tiêu chuẩn tích hợp Anchor Fiat, nạp rút và khôi phục tài khoản Stellar.</p>
            <span className="text-[10px] text-blue-400 font-mono block pt-1 border-t border-slate-900">github.com/stellar/stellar-protocol</span>
          </a>

          {/* Link 7: SBV Portal */}
          <a
            href="https://sbv.gov.vn/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-rose-500/50 rounded-xl space-y-2 group transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-white group-hover:text-rose-400 transition-colors">NHNN Việt Nam (SBV)</span>
              <ExternalLink className="w-4 h-4 text-rose-400 group-hover:translate-x-0.5 transition-transform" />
            </div>
            <p className="text-[11px] text-slate-400">Cổng thông tin Ngân hàng Nhà nước Việt Nam về cơ chế Sandbox thử nghiệm Fintech.</p>
            <span className="text-[10px] text-rose-400 font-mono block pt-1 border-t border-slate-900">https://sbv.gov.vn/</span>
          </a>

          {/* Link 8: VNeID Portal */}
          <a
            href="https://vneid.gov.vn/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-teal-500/50 rounded-xl space-y-2 group transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-white group-hover:text-teal-400 transition-colors">VNeID Định Danh Số</span>
              <ExternalLink className="w-4 h-4 text-teal-400 group-hover:translate-x-0.5 transition-transform" />
            </div>
            <p className="text-[11px] text-slate-400">Hệ thống định danh điện tử quốc gia ứng dụng xác thực eKYC cho nhà đầu tư.</p>
            <span className="text-[10px] text-teal-400 font-mono block pt-1 border-t border-slate-900">https://vneid.gov.vn/</span>
          </a>
        </div>
      </div>
    </div>
  );
};

function LayersIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />
      <path d="m22 12.5-8.58 3.91a2 2 0 0 1-1.66 0L2 12.5" />
      <path d="m22 17.5-8.58 3.91a2 2 0 0 1-1.66 0L2 17.5" />
    </svg>
  );
}
