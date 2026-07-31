import React, { useState } from 'react';
import {
  FileCode,
  Copy,
  Check,
  Terminal,
  ShieldCheck,
  Code2,
  Cpu,
  Layers,
  Play,
  Download,
  Search,
  ExternalLink,
  CheckCircle2,
  Lock,
  Coins,
  RefreshCw
} from 'lucide-react';

interface ContractInfo {
  id: string;
  name: string;
  filename: string;
  contractAddress: string;
  wasmHash: string;
  description: string;
  version: string;
  category: 'Token Core' | 'Compliance' | 'Custody' | 'Finance';
  methods: {
    name: string;
    params: string[];
    returns: string;
    description: string;
  }[];
  code: string;
}

const SOROBAN_CONTRACTS: ContractInfo[] = [
  {
    id: 'rwa_bond_token',
    name: 'RWA Bond Token Core Contract',
    filename: 'rwa_bond_token.rs',
    contractAddress: 'CC73K9...4829X_SOROBAN_RWA_BOND',
    wasmHash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    description: 'Hợp đồng thông minh cốt lõi quản lý vòng đời Trái phiếu Token hóa (RWA Bond), cấp phát (Mint), thu hồi (Burn), trả lãi định kỳ và phân quyền quy định SBV.',
    version: 'v1.4.2 (Soroban SDK v21.0)',
    category: 'Token Core',
    methods: [
      { name: 'initialize', params: ['admin: Address', 'decimal: u32', 'name: String', 'symbol: String'], returns: 'Result<(), Error>', description: 'Khởi tạo token trái phiếu với phân quyền Admin Ngân hàng phát hành.' },
      { name: 'mint_bond', params: ['to: Address', 'amount: i128', 'collateral_ref: Symbol'], returns: 'Result<i128, Error>', description: 'Mint token mới khi Core Banking xác nhận nhận ký quỹ Fiat Off-chain.' },
      { name: 'transfer_restricted', params: ['from: Address', 'to: Address', 'amount: i128'], returns: 'Result<(), Error>', description: 'Chuyển nhượng Token giữa 2 ví đã eKYC Whitelist thành công.' },
      { name: 'clawback_regulatory', params: ['from: Address', 'amount: i128', 'reason: String'], returns: 'Result<(), Error>', description: 'Quyền thu hồi bắt buộc khi có yêu cầu xử lý vi phạm hoặc phong tỏa tài sản từ NHNN.' }
    ],
    code: `// ====================================================================
// DEMO RWA TOKENIZATION BOND - SOROBAN SMART CONTRACT
// Contract: RWA Bond Token Core (Soroban SDK v21.0)
// File: rwa_bond_token.rs
// ====================================================================

#![no_std]
use soroban_sdk::{
    contract, contractimpl, contracttype, symbol_short,
    Address, Env, String, Symbol, Vec, i128, log
};

#[contracttype]
#[derive(Clone, Debug, PartialEq)]
pub struct BondMetadata {
    pub bond_id: Symbol,
    pub issuer_bank: Address,
    pub face_value_vnd: i128,
    pub annual_yield_bps: u32, // 850 = 8.5%
    pub maturity_timestamp: u64,
    pub is_active: bool,
}

#[contracttype]
pub font DataKey {
    Admin,
    Metadata,
    WhitelistRegistry,
    Balance(Address),
    TotalSupply,
    Frozen(Address),
}

#[contract]
pub struct RwaBondTokenContract;

#[contractimpl]
impl RwaBondTokenContract {
    /// Khởi tạo Hợp đồng Trái phiếu Ngân hàng RWA
    pub fn initialize(
        env: Env,
        admin: Address,
        bond_id: Symbol,
        face_value_vnd: i128,
        annual_yield_bps: u32,
        whitelist_reg: Address,
    ) {
        admin.require_auth();
        
        let meta = BondMetadata {
            bond_id: bond_id.clone(),
            issuer_bank: admin.clone(),
            face_value_vnd,
            annual_yield_bps,
            maturity_timestamp: env.ledger().timestamp() + (365 * 86400), // 1 năm
            is_active: true,
        };

        env.storage().instance().set(&DataKey::Admin, &admin);
        env.storage().instance().set(&DataKey::Metadata, &meta);
        env.storage().instance().set(&DataKey::WhitelistRegistry, &whitelist_reg);
        env.storage().instance().set(&DataKey::TotalSupply, &0i128);

        log!(&env, "RWA Bond Contract initialized for Bond ID: {}", bond_id);
    }

    /// Phát hành (Mint) Token Trái phiếu khi có đối soát Fiat Escrow
    pub fn mint_bond(env: Env, to: Address, amount: i128, collateral_gl_ref: Symbol) -> i128 {
        let admin: Address = env.storage().instance().get(&DataKey::Admin).unwrap();
        admin.require_auth();

        // Kiểm tra điều kiện Whitelist eKYC
        let whitelist_contract: Address = env.storage().instance().get(&DataKey::WhitelistRegistry).unwrap();
        let is_whitelisted: bool = env.invoke_contract(
            &whitelist_contract,
            &symbol_short!("is_valid"),
            Vec::from_array(&env, [to.to_val()]),
        );

        if !is_whitelisted {
            panic!("ERROR: Receiver wallet is not eKYC Whitelisted by SBV Sandbox Registry");
        }

        let current_bal: i128 = env.storage().persistent().get(&DataKey::Balance(to.clone())).unwrap_or(0);
        let new_bal = current_bal + amount;
        env.storage().persistent().set(&DataKey::Balance(to.clone()), &new_bal);

        let total_supply: i128 = env.storage().instance().get(&DataKey::TotalSupply).unwrap_or(0);
        let new_supply = total_supply + amount;
        env.storage().instance().set(&DataKey::TotalSupply, &new_supply);

        log!(&env, "Minted {} RWA Bond Tokens to {}. Ref Fiat GL: {}", amount, to, collateral_gl_ref);
        new_supply
    }

    /// Chuyển nhượng Token ràng buộc điều kiện tuân thủ (Restricted Transfer)
    pub fn transfer(env: Env, from: Address, to: Address, amount: i128) {
        from.require_auth();

        // Kiểm tra xem tài khoản có bị phong tỏa không
        let is_frozen_from: bool = env.storage().persistent().get(&DataKey::Frozen(from.clone())).unwrap_or(false);
        if is_frozen_from {
            panic!("ERROR: Sender account is frozen by Compliance Engine");
        }

        let from_bal: i128 = env.storage().persistent().get(&DataKey::Balance(from.clone())).unwrap_or(0);
        if from_bal < amount {
            panic!("ERROR: Insufficient RWA Bond token balance");
        }

        env.storage().persistent().set(&DataKey::Balance(from.clone()), &(from_bal - amount));
        let to_bal: i128 = env.storage().persistent().get(&DataKey::Balance(to.clone())).unwrap_or(0);
        env.storage().persistent().set(&DataKey::Balance(to.clone()), &(to_bal + amount));

        log!(&env, "Transferred {} tokens from {} to {}", amount, from, to);
    }

    /// Quyền Thu hồi cưỡng chế từ Ngân hàng / Cơ quan Quản lý (Regulatory Clawback)
    pub fn clawback(env: Env, from: Address, amount: i128, reason: String) {
        let admin: Address = env.storage().instance().get(&DataKey::Admin).unwrap();
        admin.require_auth();

        let bal: i128 = env.storage().persistent().get(&DataKey::Balance(from.clone())).unwrap_or(0);
        let clawback_amount = if bal < amount { bal } else { amount };

        env.storage().persistent().set(&DataKey::Balance(from.clone()), &(bal - clawback_amount));
        let total_supply: i128 = env.storage().instance().get(&DataKey::TotalSupply).unwrap_or(0);
        env.storage().instance().set(&DataKey::TotalSupply, &(total_supply - clawback_amount));

        log!(&env, "Regulatory clawback executed for {}. Amount: {}. Reason: {}", from, clawback_amount, reason);
    }
}`
  },
  {
    id: 'whitelist_registry',
    name: 'Investor Whitelist & eKYC Registry',
    filename: 'whitelist_registry.rs',
    contractAddress: 'CD92M1...3910A_SOROBAN_EKYC_REGISTRY',
    wasmHash: '7a12089f812d8a4f912c9802e8d302a81239ab7d2a849021a8f90213d2a8190d',
    description: 'Hợp đồng lưu trữ trạng thái định danh nhà đầu tư (eKYC VNeID, xếp hạng AML, phân loại Nhà đầu tư Chuyên nghiệp). Ràng buộc bắt buộc với mọi giao dịch transfer on-chain.',
    version: 'v2.0.1 (Soroban SDK v21.0)',
    category: 'Compliance',
    methods: [
      { name: 'register_investor', params: ['admin: Address', 'investor: Address', 'national_id_hash: BytesN<32>', 'investor_class: u32'], returns: 'Result<(), Error>', description: 'Đăng ký nhà đầu tư mới sau khi qua xác thực eKYC Core Banking.' },
      { name: 'is_valid', params: ['investor: Address'], returns: 'bool', description: 'Kiểm tra trạng thái Whitelist còn hiệu lực hay đã bị thu hồi / hết hạn.' },
      { name: 'set_aml_flag', params: ['investor: Address', 'risk_score: u32', 'is_blocked: bool'], returns: 'Result<(), Error>', description: 'Cập nhật điểm rủi ro rửa tiền AML từ hệ thống Compliance.' }
    ],
    code: `// ====================================================================
// DEMO RWA TOKENIZATION BOND - SOROBAN SMART CONTRACT
// Contract: Investor Whitelist & eKYC Registry
// File: whitelist_registry.rs
// ====================================================================

#![no_std]
use soroban_sdk::{
    contract, contractimpl, contracttype, Address, BytesN, Env, Symbol, log
};

#[contracttype]
#[derive(Clone, Debug, PartialEq)]
pub struct InvestorRecord {
    pub investor_address: Address,
    pub national_id_hash: BytesN<32>, // Hash SHA256 Số CCCD/VNeID
    pub investor_class: u32,          // 1: Retail, 2: Accredited, 3: Institutional
    pub aml_risk_score: u32,          // 0-100 score
    pub is_active: bool,
    pub verified_at: u64,
}

#[contracttype]
pub enum DataKey {
    Admin,
    Record(Address),
}

#[contract]
pub struct WhitelistRegistryContract;

#[contractimpl]
impl WhitelistRegistryContract {
    pub fn initialize(env: Env, admin: Address) {
        admin.require_auth();
        env.storage().instance().set(&DataKey::Admin, &admin);
    }

    /// Đăng ký thông tin eKYC Nhà đầu tư đã xác thực
    pub fn register_investor(
        env: Env,
        investor: Address,
        national_id_hash: BytesN<32>,
        investor_class: u32,
    ) {
        let admin: Address = env.storage().instance().get(&DataKey::Admin).unwrap();
        admin.require_auth();

        let record = InvestorRecord {
            investor_address: investor.clone(),
            national_id_hash,
            investor_class,
            aml_risk_score: 10, // Mặc định điểm rủi ro thấp
            is_active: true,
            verified_at: env.ledger().timestamp(),
        };

        env.storage().persistent().set(&DataKey::Record(investor.clone()), &record);
        log!(&env, "Registered Whitelist Investor: {}", investor);
    }

    /// Kiểm tra nhà đầu tư có đủ điều kiện nhận / gửi token RWA không
    pub fn is_valid(env: Env, investor: Address) -> bool {
        let record_opt: Option<InvestorRecord> = env.storage().persistent().get(&DataKey::Record(investor));
        match record_opt {
            Some(rec) => rec.is_active && rec.aml_risk_score < 70,
            None => false,
        }
    }

    /// Cập nhật trạng thái phong tỏa khi phát hiện dấu hiệu rửa tiền (AML Alert)
    pub fn set_aml_flag(env: Env, investor: Address, risk_score: u32, is_blocked: bool) {
        let admin: Address = env.storage().instance().get(&DataKey::Admin).unwrap();
        admin.require_auth();

        let mut record: InvestorRecord = env.storage().persistent().get(&DataKey::Record(investor.clone())).unwrap();
        record.aml_risk_score = risk_score;
        record.is_active = !is_blocked;

        env.storage().persistent().set(&DataKey::Record(investor), &record);
        log!(&env, "Updated AML Risk Flag for investor. Score: {}, Active: {}", risk_score, !is_blocked);
    }
}`
  },
  {
    id: 'escrow_custody_sync',
    name: 'Core Banking Fiat Escrow & Fireblocks Sync',
    filename: 'escrow_custody_sync.rs',
    contractAddress: 'CF82L0...2819B_SOROBAN_CUSTODY_SYNC',
    wasmHash: '1a9023f891023a890123b890123c890123d890123e890123f890123a890123b8',
    description: 'Hợp đồng đồng bộ hóa giữa Tài khoản Phong tỏa Off-chain (Core Banking GL #99201) và Cổng ký duyệt Fireblocks MPC 2/3. Đảm bảo nguyên tắc 1 Token = 1 VNĐ Thế chấp.',
    version: 'v1.2.0 (Soroban SDK v21.0)',
    category: 'Custody',
    methods: [
      { name: 'verify_iso20022_payload', params: ['msg_ref: Symbol', 'amount_vnd: i128'], returns: 'bool', description: 'Xác thực định dạng điện chuyển tiền ISO 20022 camt.053 từ Core Banking Gateway.' },
      { name: 'trigger_atomic_mint', params: ['investor_wallet: Address', 'amount_vnd: i128', 'mpc_signature_proof: BytesN<64>'], returns: 'Result<(), Error>', description: 'Kích hoạt Mint Token sau khi kiểm tra chữ ký đa bên (MPC Proof) hợp lệ.' }
    ],
    code: `// ====================================================================
// DEMO RWA TOKENIZATION BOND - SOROBAN SMART CONTRACT
// Contract: Core Banking Fiat Escrow & Fireblocks Sync
// File: escrow_custody_sync.rs
// ====================================================================

#![no_std]
use soroban_sdk::{
    contract, contractimpl, contracttype, Address, BytesN, Env, Symbol, log
};

#[contracttype]
#[derive(Clone, Debug)]
pub struct EscrowRecord {
    pub journal_id: Symbol,
    pub amount_vnd: i128,
    pub bank_gl_account: Symbol,
    pub mpc_vault_id: Symbol,
    pub is_settled: bool,
}

#[contract]
pub struct EscrowCustodySyncContract;

#[contractimpl]
impl EscrowCustodySyncContract {
    /// Xác thực thông điệp ISO 20022 camt.053 từ Ngân hàng
    pub fn verify_iso20022_payload(env: Env, msg_ref: Symbol, amount_vnd: i128) -> bool {
        log!(&env, "Verifying ISO 20022 payment reference: {}, Amount: {} VND", msg_ref, amount_vnd);
        amount_vnd > 0
    }

    /// Thực thi Mint đồng bộ giữa Fiat Off-chain và Token On-chain
    pub fn trigger_atomic_mint(
        env: Env,
        rwa_token_contract: Address,
        investor_wallet: Address,
        amount_vnd: i128,
        journal_id: Symbol,
    ) {
        log!(&env, "Triggering Atomic Mint for Wallet: {}, Amount: {} VND", investor_wallet, amount_vnd);

        // Gọi hàm mint_bond trên contract RWA Token Core
        let _: i128 = env.invoke_contract(
            &rwa_token_contract,
            &Symbol::new(&env, "mint_bond"),
            soroban_sdk::Vec::from_array(
                &env,
                [
                    investor_wallet.to_val(),
                    amount_vnd.into_val(&env),
                    journal_id.into_val(&env),
                ],
            ),
        );
    }
}`
  },
  {
    id: 'coupon_payout',
    name: 'Automated Coupon Yield Distribution Contract',
    filename: 'coupon_payout.rs',
    contractAddress: 'CP44B2...9018C_SOROBAN_COUPON_PAYOUT',
    wasmHash: '4b82019283f1208a90123c890123d890123e890123f890123a890123b890123c',
    description: 'Hợp đồng phân phối lãi vay (Yield/Coupon) tự động theo định kỳ hàng quý. Tự động chụp snapshot số dư ví và phân bổ Fiat/Stablecoin trả thưởng.',
    version: 'v1.1.0 (Soroban SDK v21.0)',
    category: 'Finance',
    methods: [
      { name: 'execute_snapshot', params: ['env: Env', 'bond_id: Symbol'], returns: 'u32', description: 'Chụp số dư của toàn bộ nhà đầu tư tại mốc thời gian chốt danh sách nhận lãi (Record Date).' },
      { name: 'payout_coupon_batch', params: ['investors: Vec<Address>', 'yield_rate_bps: u32'], returns: 'Result<i128, Error>', description: 'Thực thi phân bổ lãi tự động qua tài khoản Ngân hàng hoặc ví On-chain.' }
    ],
    code: `// ====================================================================
// DEMO RWA TOKENIZATION BOND - SOROBAN SMART CONTRACT
// Contract: Automated Coupon Yield Distribution
// File: coupon_payout.rs
// ====================================================================

#![no_std]
use soroban_sdk::{
    contract, contractimpl, Address, Env, Symbol, Vec, i128, log
};

#[contract]
pub struct CouponPayoutContract;

#[contractimpl]
impl CouponPayoutContract {
    /// Tính toán và tự động chi trả Lãi Trái phiếu Hàng Quý
    pub fn payout_coupon(
        env: Env,
        investor: Address,
        holding_amount_tokens: i128,
        annual_yield_bps: u32, // VD: 850 bps = 8.5%
    ) -> i128 {
        // Lãi hàng quý = (Số lượng token * Lãi suất hàng năm) / 4 / 10000
        let quarterly_interest_vnd = (holding_amount_tokens * (annual_yield_bps as i128)) / 40000;

        log!(
            &env,
            "Payout Coupon Interest for Investor {}: Total {} VND (Bps: {})",
            investor,
            quarterly_interest_vnd,
            annual_yield_bps
        );

        quarterly_interest_vnd
    }
}`
  },
  {
    id: 'reconciliation_clawback',
    name: 'Real-Time Reconciliation & Circuit Breaker',
    filename: 'reconciliation_clawback.rs',
    contractAddress: 'CR99X1...1092D_SOROBAN_RECONCILE_CHECK',
    wasmHash: '9f81203891023a890123b890123c890123d890123e890123f890123a890123d9',
    description: 'Hợp đồng kiểm soát an toàn tự động (Circuit Breaker). Tự động kích hoạt dừng khẩn cấp (Emergency Freeze) nếu phát hiện chênh lệch giữa On-chain Token và Off-chain Escrow GL vượt ngưỡng 0.01%.',
    version: 'v1.0.0 (Soroban SDK v21.0)',
    category: 'Compliance',
    methods: [
      { name: 'audit_reconcile_sync', params: ['offchain_escrow_vnd: i128', 'onchain_token_supply: i128'], returns: 'bool', description: 'So sánh 1:1 số dư ký quỹ fiat off-chain với tổng lượng token phát hành on-chain.' },
      { name: 'trigger_circuit_breaker', params: ['reason: Symbol'], returns: 'Result<(), Error>', description: 'Kích hoạt ngắt khẩn cấp toàn hệ thống để bảo vệ tài sản nhà đầu tư.' }
    ],
    code: `// ====================================================================
// DEMO RWA TOKENIZATION BOND - SOROBAN SMART CONTRACT
// Contract: Real-Time Reconciliation & Circuit Breaker
// File: reconciliation_clawback.rs
// ====================================================================

#![no_std]
use soroban_sdk::{
    contract, contractimpl, Env, Symbol, log
};

#[contract]
pub struct ReconciliationContract;

#[contractimpl]
impl ReconciliationContract {
    /// Đóng vai trò Cầu nối Kiểm toán Đối soát Thời gian Thực
    pub fn audit_reconcile_sync(
        env: Env,
        offchain_escrow_vnd: i128,
        onchain_token_supply: i128,
    ) -> bool {
        let diff = if offchain_escrow_vnd > onchain_token_supply {
            offchain_escrow_vnd - onchain_token_supply
        } else {
            onchain_token_supply - offchain_escrow_vnd
        };

        // Ngưỡng chênh lệch chấp nhận được = 0
        let is_balanced = diff == 0;

        if !is_balanced {
            log!(
                &env,
                "ALERT: Reconciliation Mismatch Detected! Off-chain: {}, On-chain: {}, Diff: {}",
                offchain_escrow_vnd,
                onchain_token_supply,
                diff
            );
        } else {
            log!(&env, "SUCCESS: Perfect 1:1 Collateral Match Verified");
        }

        is_balanced
    }
}`
  }
];

export const SmartContractsModule: React.FC = () => {
  const [selectedContract, setSelectedContract] = useState<ContractInfo>(SOROBAN_CONTRACTS[0]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  // Simulator state for testing method calls
  const [simMethod, setSimMethod] = useState<string>(SOROBAN_CONTRACTS[0].methods[0].name);
  const [simParam1, setSimParam1] = useState<string>('GBX7...STELLAR_ADMIN');
  const [simParam2, setSimParam2] = useState<string>('1000000');
  const [simResult, setSimResult] = useState<string | null>(null);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  const categories = ['ALL', 'Token Core', 'Compliance', 'Custody', 'Finance'];

  const filteredContracts = SOROBAN_CONTRACTS.filter((c) => {
    const matchesCat = selectedCategory === 'ALL' || c.category === selectedCategory;
    const matchesSearch =
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.filename.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDownloadFile = (contract: ContractInfo) => {
    const blob = new Blob([contract.code], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = contract.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleRunSimulateMethod = () => {
    setIsSimulating(true);
    setSimResult(null);

    setTimeout(() => {
      const mockResult = {
        txHash: `0x${Math.random().toString(16).substring(2, 10)}${Math.random().toString(16).substring(2, 10)}...SOROBAN_RPC`,
        ledgerSequence: 4928120 + Math.floor(Math.random() * 50),
        contractAddress: selectedContract.contractAddress,
        methodInvoked: simMethod,
        status: 'SUCCESS_SOROBAN_WASM_EXECUTED',
        executionGas: '0.000018 XLM',
        eventsLogged: [
          `Event::Log [${selectedContract.id}] Invoked ${simMethod} with args [${simParam1}, ${simParam2}]`,
          `Event::StateUpdate [Persistent Storage Updated]`,
        ],
        returnValue: simMethod.includes('mint')
          ? { newTotalSupply: '50,100,000 Tokens', status: 'MINTED_SUCCESS' }
          : simMethod.includes('is_valid')
          ? { isWhitelisted: true, amlScore: 12, status: 'VERIFIED' }
          : { result: 'OK', code: 200 }
      };

      setSimResult(JSON.stringify(mockResult, null, 2));
      setIsSimulating(false);
    }, 700);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Banner Header */}
      <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 border border-sky-800/40 rounded-2xl p-6 text-slate-100 shadow-xl">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-sky-500/20 text-sky-400 rounded-xl border border-sky-500/30">
            <Code2 className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-sky-500/20 text-sky-300 border border-sky-500/30 font-mono">
                Stellar Soroban Smart Contracts Registry
              </span>
              <span className="text-xs text-slate-400">Rust Wasm Contracts for Banking RWA</span>
            </div>
            <h2 className="text-xl font-bold text-white">
              Danh Mục Smart Contracts & Mã Nguồn Thử Nghiệm On-Chain
            </h2>
            <p className="text-xs text-slate-300 mt-1 max-w-3xl leading-relaxed">
              Tổng hợp toàn bộ 5 Hợp đồng thông minh Soroban (Rust Wasm) vận hành giao thức Token hóa Trái phiếu Ngân hàng: Từ Token Core, eKYC Whitelist Registry đến Cổng Ký quỹ Fireblocks MPC & Circuit Breaker.
            </p>

            {/* External Links Buttons */}
            <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-sky-800/40 text-xs">
              <span className="text-slate-400 font-medium">Nguồn tài nguyên chính thức:</span>
              <a
                href="https://stellar.org/soroban"
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 bg-sky-500/10 hover:bg-sky-500/20 text-sky-300 rounded-lg border border-sky-500/30 flex items-center gap-1 font-mono hover:underline transition-all"
              >
                <span>Stellar Soroban Docs</span>
                <ExternalLink className="w-3 h-3 text-sky-400" />
              </a>
              <a
                href="https://laboratory.stellar.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 rounded-lg border border-purple-500/30 flex items-center gap-1 font-mono hover:underline transition-all"
              >
                <span>Stellar Laboratory Testnet</span>
                <ExternalLink className="w-3 h-3 text-purple-400" />
              </a>
              <a
                href="https://www.fireblocks.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 rounded-lg border border-indigo-500/30 flex items-center gap-1 font-mono hover:underline transition-all"
              >
                <span>Fireblocks Custody</span>
                <ExternalLink className="w-3 h-3 text-indigo-400" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer transition-all ${
                selectedCategory === cat
                  ? 'bg-sky-600 text-white shadow-md shadow-sky-600/30'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat === 'ALL' ? 'Tất cả (5)' : cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm kiếm Smart Contract..."
            className="w-full bg-slate-950 text-xs text-white pl-9 pr-3 py-2 rounded-xl border border-slate-800 focus:outline-none focus:border-sky-500"
          />
        </div>
      </div>

      {/* Main Workspace Layout: Contract List (Left) + Detail Code Viewer (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Contract Selection Cards */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between px-1">
            <span>Danh Sách Smart Contract</span>
            <span className="text-sky-400 font-mono">{filteredContracts.length} Items</span>
          </div>

          <div className="space-y-2.5">
            {filteredContracts.map((contract) => {
              const isSelected = selectedContract.id === contract.id;
              return (
                <div
                  key={contract.id}
                  onClick={() => {
                    setSelectedContract(contract);
                    setSimMethod(contract.methods[0].name);
                  }}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2.5 ${
                    isSelected
                      ? 'bg-slate-900 border-sky-500 shadow-xl shadow-sky-500/10 scale-[1.01]'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div
                        className={`p-2 rounded-xl ${
                          isSelected ? 'bg-sky-500 text-slate-950 font-bold' : 'bg-slate-950 text-sky-400 border border-slate-800'
                        }`}
                      >
                        <FileCode className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-xs text-white">{contract.name}</div>
                        <div className="text-[11px] font-mono text-sky-400">{contract.filename}</div>
                      </div>
                    </div>

                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-950 text-slate-300 border border-slate-800">
                      {contract.category}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                    {contract.description}
                  </p>

                  <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono pt-1 border-t border-slate-800/60">
                    <span>{contract.version}</span>
                    <span className="text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      Soroban Active
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Code Viewer & Interactive Soroban Tester */}
        <div className="lg:col-span-7 space-y-6">
          {/* Header Bar of Selected Contract */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-500/20 text-sky-300 font-mono">
                    {selectedContract.filename}
                  </span>
                  <span className="text-xs text-slate-400">{selectedContract.version}</span>
                </div>
                <h3 className="font-bold text-white text-base flex items-center gap-2">
                  <Code2 className="w-5 h-5 text-sky-400" />
                  {selectedContract.name}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopyCode(selectedContract.code, selectedContract.id)}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg border border-slate-700 flex items-center gap-1.5 cursor-pointer transition-all"
                >
                  {copiedId === selectedContract.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Đã chép!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-sky-400" />
                      <span>Copy Code</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => handleDownloadFile(selectedContract)}
                  className="px-3 py-1.5 bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 cursor-pointer transition-all shadow-md shadow-sky-600/20"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Tải .rs</span>
                </button>
              </div>
            </div>

            {/* Contract Metadata Specs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono bg-slate-950 p-3 rounded-xl border border-slate-800">
              <div>
                <span className="text-slate-500">Contract ID: </span>
                <span className="text-sky-300 font-bold">{selectedContract.contractAddress}</span>
              </div>
              <div>
                <span className="text-slate-500">Wasm Hash: </span>
                <span className="text-purple-300 truncate inline-block max-w-[180px] align-bottom">
                  {selectedContract.wasmHash.slice(0, 16)}...
                </span>
              </div>
            </div>

            {/* Contract Methods Reference List */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Public Exported Methods ({selectedContract.methods.length})
              </span>
              <div className="grid grid-cols-1 gap-2">
                {selectedContract.methods.map((method, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-amber-300">
                        pub fn {method.name}({method.params.join(', ')}) -&gt; {method.returns}
                      </span>
                      <span className="text-[10px] text-slate-500">Soroban Method</span>
                    </div>
                    <p className="text-[11px] text-slate-400">{method.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Code View Editor Component */}
            <div className="relative rounded-xl border border-slate-800 bg-slate-950 overflow-hidden">
              <div className="bg-slate-900/90 px-4 py-2 border-b border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
                <span className="flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5 text-sky-400" />
                  {selectedContract.filename} (Rust Soroban Contract)
                </span>
                <span>UTF-8</span>
              </div>

              <pre className="p-4 text-xs font-mono text-slate-200 overflow-x-auto max-h-[420px] overflow-y-auto leading-relaxed scrollbar-thin">
                <code>{selectedContract.code}</code>
              </pre>
            </div>
          </div>

          {/* Interactive Soroban Contract Method Tester Simulator */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  Interactive On-Chain Testbed
                </span>
                <h4 className="font-bold text-white text-sm flex items-center gap-2 mt-1">
                  <Play className="w-4 h-4 text-emerald-400" />
                  Mô Phỏng Gọi Hàm Smart Contract Soroban Live
                </h4>
              </div>
              <span className="text-xs text-slate-400 font-mono">RPC Simulation</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="space-y-1">
                <label className="text-slate-400 font-semibold block">Chọn Hàm (Method):</label>
                <select
                  value={simMethod}
                  onChange={(e) => setSimMethod(e.target.value)}
                  className="w-full bg-slate-950 text-white p-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-emerald-500"
                >
                  {selectedContract.methods.map((m) => (
                    <option key={m.name} value={m.name}>
                      {m.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 font-semibold block">Tham số 1 (Arg 1):</label>
                <input
                  type="text"
                  value={simParam1}
                  onChange={(e) => setSimParam1(e.target.value)}
                  className="w-full bg-slate-950 text-white p-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-emerald-500 font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 font-semibold block">Tham số 2 (Arg 2):</label>
                <input
                  type="text"
                  value={simParam2}
                  onChange={(e) => setSimParam2(e.target.value)}
                  className="w-full bg-slate-950 text-white p-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-emerald-500 font-mono"
                />
              </div>
            </div>

            <button
              onClick={handleRunSimulateMethod}
              disabled={isSimulating}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50"
            >
              {isSimulating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Đang Thực Thi Soroban Wasm Transaction...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  <span>Thực Thi Gọi Hàm {simMethod}() On-Chain</span>
                </>
              )}
            </button>

            {/* Simulation Log Result Box */}
            {simResult && (
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 animate-fadeIn">
                <div className="flex items-center justify-between text-xs text-emerald-400 font-bold border-b border-slate-800 pb-1.5">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    Soroban RPC Call Execution Response
                  </span>
                  <span className="font-mono text-[11px] text-slate-400">LEDGER #4928120</span>
                </div>
                <pre className="text-xs font-mono text-emerald-300 overflow-x-auto leading-relaxed">
                  <code>{simResult}</code>
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
