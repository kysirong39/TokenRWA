export type NavigationTab =
  | 'problem_model'
  | 'architecture_tech'
  | 'workflow_simulator'
  | 'smart_contracts'
  | 'reconciliation_ledger'
  | 'ai_advisor'
  | 'links_library';

export type AssetType = 'corporate_bond' | 'real_estate' | 'carbon_credit' | 'gold_vault';

export interface RwaAsset {
  id: string;
  name: string;
  ticker: string;
  type: AssetType;
  valuationVnd: number; // in VND
  totalSupply: number;
  tokenPriceVnd: number;
  yieldRate: string;
  issuerName: string;
  custodianBank: string;
  underlyingAssetDoc: string;
  stellarAssetCode: string;
  sorobanContractId: string;
  fireblocksVaultId: string;
  status: 'active' | 'pending_mint' | 'matured';
}

export interface InvestorProfile {
  id: string;
  fullName: string;
  nationalId: string;
  email: string;
  investorClass: 'Institutional' | 'Accredited_Retail' | 'Retail';
  ekycStatus: 'VERIFIED' | 'PENDING' | 'REJECTED';
  amlRiskScore: 'LOW' | 'MEDIUM' | 'HIGH';
  fireblocksWalletAddress: string;
  fiatBalanceVnd: number;
  tokenBalances: { [tokenTicker: string]: number };
}

export interface SimulationStep {
  id: number;
  key: 'ekyc' | 'mint' | 'custody' | 'trading' | 'redeem';
  title: string;
  shortDesc: string;
  details: string;
}

export interface OnChainLog {
  id: string;
  timestamp: string;
  txHash: string;
  ledgerIndex: number;
  action: string;
  contractMethod: string;
  payload: Record<string, any>;
  gasUsed: string;
  status: 'SUCCESS' | 'FAILED' | 'PENDING';
}

export interface OffChainLog {
  id: string;
  timestamp: string;
  journalId: string;
  system: 'Core Banking' | 'ERP Vault' | 'Fireblocks Engine';
  accountNo: string;
  action: string;
  amountVnd: number;
  referenceDoc: string;
  status: 'COMPLETED' | 'HOLD' | 'RELEASED';
}

export interface ReconciliationItem {
  id: string;
  assetTicker: string;
  assetName: string;
  offChainCollateralVnd: number;
  onChainTotalSupplyTokens: number;
  tokenUnitPriceVnd: number;
  onChainMarketCapVnd: number;
  discrepancyVnd: number;
  status: 'BALANCED' | 'DISCREPANCY_ALERT' | 'PENDING_SETTLEMENT';
  lastReconciledAt: string;
  auditNotes: string;
}
