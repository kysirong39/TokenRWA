import React, { useState } from 'react';
import {
  Globe,
  ExternalLink,
  Search,
  Copy,
  Check,
  BookOpen,
  ShieldCheck,
  Layers,
  Building2,
  Code2,
  Server,
  FileText,
  Key,
  Database,
  ArrowUpRight
} from 'lucide-react';

interface ResourceLink {
  id: string;
  title: string;
  url: string;
  category: 'Stellar & Soroban' | 'Custody & Security' | 'Banking Standards' | 'Regulatory & Vietnam';
  description: string;
  tags: string[];
  isVerified?: boolean;
}

const RESOURCE_LINKS: ResourceLink[] = [
  {
    id: 'stellar-soroban-docs',
    title: 'Stellar Soroban Official Documentation',
    url: 'https://stellar.org/soroban',
    category: 'Stellar & Soroban',
    description: 'Trang tài liệu kĩ thuật chính thức về Smart Contract Soroban Wasm trên mạng lưới Stellar, bao gồm hướng dẫn SDK Rust, CLI và kiến trúc State Storage.',
    tags: ['Soroban', 'Smart Contract', 'Rust', 'Wasm', 'Stellar'],
    isVerified: true,
  },
  {
    id: 'stellar-laboratory',
    title: 'Stellar Laboratory Testnet Developer Tools',
    url: 'https://laboratory.stellar.org/',
    category: 'Stellar & Soroban',
    description: 'Cổng công cụ tương tác RPC, tạo tài khoản thử nghiệm (Testnet Faucet), ký giao dịch xdr và kiểm tra trạng thái Ledger thời gian thực.',
    tags: ['Testnet', 'RPC', 'XDR', 'Faucet', 'Developer Tools'],
    isVerified: true,
  },
  {
    id: 'stellar-protocol-seps',
    title: 'Stellar Protocol Ecosystem Proposals (SEPs)',
    url: 'https://github.com/stellar/stellar-protocol/tree/master/ecosystem',
    category: 'Stellar & Soroban',
    description: 'Bộ tiêu chuẩn tích hợp hệ sinh thái Stellar (SEP-24 cho Anchor Fiat On/Off Ramp, SEP-30 cho Khôi phục khóa dự phòng Multisig).',
    tags: ['SEP-24', 'SEP-30', 'Anchor', 'Standards', 'Github'],
    isVerified: true,
  },
  {
    id: 'soroban-sdk-crates',
    title: 'Soroban SDK Rust Crate (crates.io)',
    url: 'https://crates.io/crates/soroban-sdk',
    category: 'Stellar & Soroban',
    description: 'Thư viện SDK Rust chính thức để lập trình Hợp đồng thông minh Soroban, quản lý kiểu dữ liệu contracttype và log event on-chain.',
    tags: ['Rust', 'Crates.io', 'SDK', 'Library'],
    isVerified: true,
  },
  {
    id: 'fireblocks-custody',
    title: 'Fireblocks Enterprise Asset Custody Platform',
    url: 'https://www.fireblocks.com/',
    category: 'Custody & Security',
    description: 'Nền tảng quản lý lưu ký tài sản mã hóa doanh nghiệp ứng dụng công nghệ Chữ ký Ngưỡng MPC (2-of-3) và Động cơ Chính sách Tuân thủ (Policy Engine).',
    tags: ['Fireblocks', 'MPC', 'Custody', 'Policy Engine', 'Institutional'],
    isVerified: true,
  },
  {
    id: 'fireblocks-developers',
    title: 'Fireblocks Developer Portal & API Reference',
    url: 'https://developers.fireblocks.com/',
    category: 'Custody & Security',
    description: 'Hướng dẫn tích hợp REST API / SDK Fireblocks dành cho Ngân hàng thương mại, cấu hình Webhook thông báo giao dịch và Vault Account management.',
    tags: ['REST API', 'Webhook', 'Vault', 'SDK', 'Developers'],
    isVerified: true,
  },
  {
    id: 'chainlink-por',
    title: 'Chainlink Proof of Reserve (PoR)',
    url: 'https://chain.link/proof-of-reserve',
    category: 'Custody & Security',
    description: 'Giải pháp Oracle kiểm toán độc lập minh bạch tài sản thế chấp off-chain (Fiat Escrow) tự động cập nhật lên Smart Contract 24/7.',
    tags: ['Chainlink', 'Oracle', 'Proof of Reserve', 'Audit', 'DeFi'],
    isVerified: true,
  },
  {
    id: 'iso20022-official',
    title: 'ISO 20022 Financial Messaging Standard Portal',
    url: 'https://www.iso20022.org/',
    category: 'Banking Standards',
    description: 'Chuẩn mực quốc tế về điện chuyển tiền và thông điệp tài chính (camt.053, pacs.008) kết nối Core Banking với hệ thống Token hóa.',
    tags: ['ISO 20022', 'Core Banking', 'camt.053', 'pacs.008', 'SWIFT'],
    isVerified: true,
  },
  {
    id: 'swift-iso20022-migration',
    title: 'SWIFT ISO 20022 Migration Programme',
    url: 'https://www.swift.com/standards/iso-20022',
    category: 'Banking Standards',
    description: 'Chương trình chuyển đổi chuẩn hóa thông điệp thanh toán toàn cầu của mạng lưới SWIFT dành cho các ngân hàng thương mại.',
    tags: ['SWIFT', 'Settlement', 'Interbank', 'Global Payment'],
    isVerified: true,
  },
  {
    id: 'openapi-specification',
    title: 'OpenAPI Specification (OAS) Initiative',
    url: 'https://www.openapis.org/',
    category: 'Banking Standards',
    description: 'Mô hình chuẩn hóa thiết kế RESTful Open API mTLS tích hợp giữa Cổng Ngân hàng Web2 và Middleware Blockchain Web3.',
    tags: ['OpenAPI', 'REST', 'mTLS', 'API Gateway'],
    isVerified: true,
  },
  {
    id: 'sbv-portal',
    title: 'Ngân hàng Nhà nước Việt Nam (SBV Official Portal)',
    url: 'https://sbv.gov.vn/',
    category: 'Regulatory & Vietnam',
    description: 'Cổng thông tin Ngân hàng Nhà nước Việt Nam, cập nhật khung pháp lý Sandbox thử nghiệm công nghệ tài chính Fintech và chuyển đổi số ngân hàng.',
    tags: ['SBV', 'Regulatory', 'Sandbox', 'NHNN', 'Pháp Lý'],
    isVerified: true,
  },
  {
    id: 'vneid-portal',
    title: 'Hệ thống Định danh Điện tử Quốc gia VNeID',
    url: 'https://vneid.gov.vn/',
    category: 'Regulatory & Vietnam',
    description: 'Nền tảng định danh số quốc gia do Bộ Công an quản lý, ứng dụng trong quy trình xác thực eKYC nhà đầu tư trái phiếu ngân hàng.',
    tags: ['VNeID', 'eKYC', 'Định Danh Số', 'Bộ Công An', 'Compliance'],
    isVerified: true,
  },
  {
    id: 'ssc-portal',
    title: 'Ủy ban Chứng khoán Nhà nước (SSC Portal)',
    url: 'https://www.ssc.gov.vn/',
    category: 'Regulatory & Vietnam',
    description: 'Cổng thông tin quản lý thị trường trái phiếu doanh nghiệp, quy định xếp hạng nhà đầu tư chuyên nghiệp và lưu ký chứng khoán.',
    tags: ['SSC', 'Bond Market', 'UBCKNN', 'Securities'],
    isVerified: true,
  }
];

export const LinksLibraryModule: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = [
    'ALL',
    'Stellar & Soroban',
    'Custody & Security',
    'Banking Standards',
    'Regulatory & Vietnam'
  ];

  const filteredLinks = RESOURCE_LINKS.filter((item) => {
    const matchesCat = selectedCategory === 'ALL' || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase())) ||
      item.url.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleCopyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 border border-sky-800/40 rounded-2xl p-6 text-slate-100 shadow-xl">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-sky-500/20 text-sky-400 rounded-xl border border-sky-500/30">
            <BookOpen className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-sky-500/20 text-sky-300 border border-sky-500/30 font-mono">
                Thư Viện Liên Kết Chuyên Ngành
              </span>
              <span className="text-xs text-slate-400">13 Verified Resources Index</span>
            </div>
            <h2 className="text-xl font-bold text-white">
              7. Thư Viện Liên Kết & Nguồn Truy Cấp Tài Liệu Chính Thức
            </h2>
            <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
              Tổng hợp toàn bộ các cổng thông tin, tiêu chuẩn hạ tầng, tài liệu phát triển Soroban Smart Contracts, cổng lưu ký Fireblocks MPC, tiêu chuẩn ngân hàng ISO 20022 và các kênh tham chiếu pháp lý Sandbox tại Việt Nam.
            </p>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Category Selector Pills */}
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
              {cat === 'ALL' ? 'Tất cả (13)' : cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[260px]">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm tài liệu, URL hoặc từ khóa..."
            className="w-full bg-slate-950 text-xs text-white pl-9 pr-3 py-2 rounded-xl border border-slate-800 focus:outline-none focus:border-sky-500"
          />
        </div>
      </div>

      {/* Links Grid Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredLinks.map((item) => (
          <div
            key={item.id}
            className="bg-slate-900 border border-slate-800 hover:border-sky-500/50 rounded-2xl p-5 space-y-3 flex flex-col justify-between transition-all group hover:shadow-xl hover:shadow-sky-500/5"
          >
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 bg-slate-950 text-sky-400 rounded-lg border border-slate-800">
                    <Globe className="w-4 h-4" />
                  </span>
                  <div>
                    <h3 className="font-bold text-white text-sm group-hover:text-sky-300 transition-colors flex items-center gap-1.5">
                      {item.title}
                    </h3>
                  </div>
                </div>

                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-950 text-slate-300 border border-slate-800 shrink-0 font-mono">
                  {item.category}
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {item.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-950 text-slate-400 border border-slate-800/80"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* URL Footer Action Bar */}
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2 text-xs">
              <span className="font-mono text-[11px] text-sky-400 truncate max-w-[240px]">
                {item.url}
              </span>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => handleCopyUrl(item.url, item.id)}
                  className="px-2.5 py-1 bg-slate-950 hover:bg-slate-800 text-slate-300 text-xs rounded-lg border border-slate-800 flex items-center gap-1 cursor-pointer transition-all"
                  title="Sao chép URL"
                >
                  {copiedId === item.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 text-[11px]">Đã chép</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-400" />
                      <span className="text-[11px]">Copy</span>
                    </>
                  )}
                </button>

                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs rounded-lg flex items-center gap-1 shadow-md shadow-sky-600/20 transition-all cursor-pointer"
                >
                  <span>Truy cập</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
