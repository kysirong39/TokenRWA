import { RwaAsset, InvestorProfile, SimulationStep, ReconciliationItem } from '../types';

export const INITIAL_RWA_ASSETS: RwaAsset[] = [
  {
    id: 'rwa-001',
    name: 'Trái phiếu Ngân hàng VietRWA 2026 - Kỳ hạn 3 năm',
    ticker: 'vBOND26',
    type: 'corporate_bond',
    valuationVnd: 500_000_000_000, // 500 Tỷ VND
    totalSupply: 500_000,
    tokenPriceVnd: 1_000_000,
    yieldRate: '8.5%/năm (Cố định)',
    issuerName: 'Ngân hàng Thương mại Cổ phần VietRWA',
    custodianBank: 'Trung tâm Lưu ký Ngân hàng Nhà nước (SBV Custody)',
    underlyingAssetDoc: 'Quyết định phát hành số 408/QĐ-NHNN & Hồ sơ tài sản thế chấp BĐS Hạng A',
    stellarAssetCode: 'vBOND26:GCDA...STELLAR',
    sorobanContractId: 'C3X89...SOROBAN_RWA_BOND',
    fireblocksVaultId: 'FB-VAULT-VIETRWA-BONDS-01',
    status: 'active',
  },
  {
    id: 'rwa-002',
    name: 'Tòa nhà Văn phòng Vincom Center B - Tầng 12-20',
    ticker: 'vRE-TOWER',
    type: 'real_estate',
    valuationVnd: 300_000_000_000, // 300 Tỷ VND
    totalSupply: 300_000,
    tokenPriceVnd: 1_000_000,
    yieldRate: '6.8%/năm (Lợi tức cho thuê)',
    issuerName: 'Tập đoàn Quản lý Bất động sản Sài Gòn',
    custodianBank: 'VietRWA Trustee & Custody Department',
    underlyingAssetDoc: 'Giấy chứng nhận QSDĐ số CT-884920, Hợp đồng cho thuê văn phòng 10 năm',
    stellarAssetCode: 'vRETOWER:GB72...STELLAR',
    sorobanContractId: 'C9Y12...SOROBAN_RWA_RE',
    fireblocksVaultId: 'FB-VAULT-VIETRWA-REALESTATE',
    status: 'active',
  },
  {
    id: 'rwa-003',
    name: 'Tín chỉ Carbon Rừng Tuyên Quang - 100,000 Tonnes CO2e',
    ticker: 'vGREEN-C01',
    type: 'carbon_credit',
    valuationVnd: 50_000_000_000, // 50 Tỷ VND
    totalSupply: 100_000,
    tokenPriceVnd: 500_000,
    yieldRate: 'Định giá tăng trưởng Carbon Market',
    issuerName: 'Công ty Cổ phần Quản lý Rừng Tuyên Quang & VERRA',
    custodianBank: 'Bộ Tài nguyên Môi trường & VietRWA ESG Vault',
    underlyingAssetDoc: 'Chứng nhận Verra VCU-1829-2025, Báo cáo kiểm định độc lập SGS',
    stellarAssetCode: 'vGREENC01:GA23...STELLAR',
    sorobanContractId: 'C1K44...SOROBAN_RWA_CARBON',
    fireblocksVaultId: 'FB-VAULT-ESG-CARBON-01',
    status: 'active',
  },
];

export const INITIAL_INVESTOR: InvestorProfile = {
  id: 'inv-8821',
  fullName: 'Trần Văn Hoàng',
  nationalId: '001092004812',
  email: 'hoang.tran@vietrwa-invest.vn',
  investorClass: 'Accredited_Retail',
  ekycStatus: 'VERIFIED',
  amlRiskScore: 'LOW',
  fireblocksWalletAddress: 'GBX5764PZ7N28UQ3M4KLK99...STELLAR_MPC',
  fiatBalanceVnd: 250_000_000,
  tokenBalances: {
    vBOND26: 50,
    'vRE-TOWER': 20,
    'vGREEN-C01': 100,
  },
};

export const SIMULATION_STEPS: SimulationStep[] = [
  {
    id: 1,
    key: 'ekyc',
    title: '1. eKYC & Investor Onboarding',
    shortDesc: 'Xác thực định danh, đánh giá điểm rủi ro AML & Whitelist ví Fireblocks MPC',
    details:
      'Hệ thống thu thập Căn cước công dân gắn chip, quét khuôn mặt Liveness Check, đối soát cơ sở dữ liệu Bộ Công an & Sanction List. Sau khi pass AML rating LOW/MEDIUM, ví của nhà đầu tư được phê duyệt trong Fireblocks Policy Engine.',
  },
  {
    id: 2,
    key: 'mint',
    title: '2. Asset Lock & Token Minting',
    shortDesc: 'Khóa tài sản off-chain tại Core Banking & Gọi API Mint Token RWA',
    details:
      'Ngân hàng Giám sát ghi nhận tài sản bảo đảm (Hold Collateral) trên sổ cái Core Banking GL (General Ledger). Fireblocks gửi yêu cầu ký MPC 2/3 tới Soroban Smart Contract trên Stellar Public Blockchain để khởi tạo số lượng Token tương ứng 1:1.',
  },
  {
    id: 3,
    key: 'custody',
    title: '3. Fireblocks Custody & Policy Engine',
    shortDesc: 'Lưu ký an toàn với công nghệ MPC Multi-Sig & Quản lý khóa phân tán',
    details:
      'Toàn bộ Token RWA phát hành và tài sản thế chấp được bảo vệ trong Fireblocks Institutional Vault. Các giao dịch yêu cầu chữ ký phân tán (MPC Key Shares) qua 3 node độc lập (Ngân hàng phát hành, Tổ chức lưu ký, Audit Node).',
  },
  {
    id: 4,
    key: 'trading',
    title: '4. Secondary DEX & OTC Trading',
    shortDesc: 'Giao dịch thứ cấp mô phỏng tích hợp sàn bên thứ ba',
    details:
      'Nhà đầu tư đã eKYC có thể đặt lệnh Mua/Bán Token RWA trên Sàn giao dịch mô phỏng (DEX AMM/Orderbook). Smart Contract Soroban tự động kiểm tra điều kiện Whitelist của bên mua và bên bán trước khi cho phép Atomic Swap thành công.',
  },
  {
    id: 5,
    key: 'redeem',
    title: '5. Token Redemption & Fiat Unlock',
    shortDesc: 'Đốt Token RWA on-chain & Giải chấp tài sản/Fiat gốc off-chain',
    details:
      'Nhà đầu tư gửi yêu cầu Rút gốc (Redeem). Smart Contract thực hiện đợt Burn Token RWA on-chain. Ngân hàng nhận sự kiện On-chain Event, giải chấp khoản thế chấp trên Core Banking GL và chuyển tiền Fiat VND về tài khoản thanh toán của nhà đầu tư.',
  },
];

export const INITIAL_RECONCILIATION_ITEMS: ReconciliationItem[] = [
  {
    id: 'rec-001',
    assetTicker: 'vBOND26',
    assetName: 'Trái phiếu Ngân hàng VietRWA 2026',
    offChainCollateralVnd: 500_000_000_000,
    onChainTotalSupplyTokens: 500_000,
    tokenUnitPriceVnd: 1_000_000,
    onChainMarketCapVnd: 500_000_000_000,
    discrepancyVnd: 0,
    status: 'BALANCED',
    lastReconciledAt: '2026-07-31 08:00:00 (Hệ thống tự động)',
    auditNotes: 'Hoàn toàn cân bằng. Core Banking Collateral Hold ID #GL-99201 = Stellar Minted Supply.',
  },
  {
    id: 'rec-002',
    assetTicker: 'vRE-TOWER',
    assetName: 'Tòa nhà Văn phòng Vincom Center B',
    offChainCollateralVnd: 300_000_000_000,
    onChainTotalSupplyTokens: 300_000,
    tokenUnitPriceVnd: 1_000_000,
    onChainMarketCapVnd: 300_000_000_000,
    discrepancyVnd: 0,
    status: 'BALANCED',
    lastReconciledAt: '2026-07-31 08:00:00 (Hệ thống tự động)',
    auditNotes: 'Cân bằng 1:1 giữa Giấy chứng nhận QSDĐ off-chain và Token phát hành.',
  },
  {
    id: 'rec-003',
    assetTicker: 'vGREEN-C01',
    assetName: 'Tín chỉ Carbon Rừng Tuyên Quang',
    offChainCollateralVnd: 50_000_000_000,
    onChainTotalSupplyTokens: 100_000,
    tokenUnitPriceVnd: 500_000,
    onChainMarketCapVnd: 50_000_000_000,
    discrepancyVnd: 0,
    status: 'BALANCED',
    lastReconciledAt: '2026-07-31 08:00:00 (Hệ thống tự động)',
    auditNotes: 'Chứng nhận VCU VERRA khớp 100,000 đơn vị carbon credit on-chain.',
  },
];
