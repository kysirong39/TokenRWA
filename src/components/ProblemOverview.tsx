import React from 'react';
import {
  Building2,
  Lock,
  ArrowRight,
  TrendingUp,
  FileCheck,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ShieldAlert,
  Globe,
  Layers,
  Users,
  Landmark,
  Scale
} from 'lucide-react';

export const ProblemOverview: React.FC = () => {
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Key Takeaways Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 border border-blue-800/40 rounded-2xl p-6 text-slate-100 shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-600/20 text-blue-400 rounded-xl border border-blue-500/30">
            <Layers className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-900/50 px-2.5 py-0.5 rounded border border-blue-700/50">
                Executive Summary
              </span>
              <span className="text-xs text-slate-400">Key Takeaways</span>
            </div>
            <h2 className="text-xl font-bold text-white">
              Bài Toán Token Hóa Tài Sản Thực (RWA) Trong Lĩnh Vực Ngân Hàng & Tài Chính
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed max-w-4xl">
              Token hóa tài sản thực (Real World Assets - RWA) là quá trình chuyển đổi quyền sở hữu hoặc lợi ích kinh tế của tài sản truyền thống (Trái phiếu doanh nghiệp, Bất động sản, Tín chỉ Carbon, Vàng) thành mã thông báo kỹ thuật số (Cryptographic Tokens) lưu trữ trên sổ cái Blockchain. Nền tảng kết hợp hạ tầng <strong>Core Banking (Web2)</strong> với <strong>Stellar Blockchain & Fireblocks MPC Custody (Web3)</strong> để thanh khoản hóa tài sản, giảm chi phí vận hành và tự động hóa quy trình đối soát tuân thủ.
            </p>
          </div>
        </div>
      </div>

      {/* Grid: 3 Cột Bài toán Kinh doanh */}
      <div className="grid grid-[#121212] md:grid-cols-3 gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-all">
          <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center mb-4 border border-amber-500/20">
            <Lock className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-white text-base mb-2">1. Thách Thức Tài Sản Kém Thanh Khoản</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Các tài sản có giá trị lớn như Trái phiếu doanh nghiệp lẻ, Bất động sản thương mại hay Tín chỉ Carbon đòi hỏi vốn đầu tư ban đầu quá lớn, quy trình chuyển nhượng thủ công tốn từ vài tuần đến hàng tháng (T+30), chi phí môi giới cao và khó chia nhỏ quyền sở hữu (fractional ownership).
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-all">
          <div className="w-10 h-10 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center mb-4 border border-blue-500/20">
            <TrendingUp className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-white text-base mb-2">2. Giải Pháp Token Hóa RWA Ngân Hàng</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Chia nhỏ tài sản thành từng Token có mệnh giá nhỏ (VD: 1.000.000 VNĐ/Token). Thông qua Smart Contract Soroban trên Stellar, việc trả cổ tức/lãi suất diễn ra tự động, thanh toán tức thì (T+0), giao dịch 24/7 và sẵn sàng kết hợp các sàn thứ cấp được kiểm soát.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-all">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4 border border-emerald-500/20">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-white text-base mb-2">3. Tuân Thủ & Quản Lý Rủi Ro Đẳng Cấp Institutional</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Áp dụng giải pháp Fireblocks MPC Custody loại bỏ điểm thất bại đơn lẻ (Single Point of Failure) khi giữ khóa bí mật. Toàn bộ người tham gia phải eKYC/AML và nằm trong danh sách Whitelist được lập trình cứng trong Smart Contract.
          </p>
        </div>
      </div>

      {/* Operating Model Diagram & Stakeholders */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Building2 className="w-5 h-5 text-blue-400" />
              Mô Hình Hoạt Động Cốt Lõi (Operating Model) & Thành Phần Tham Gia
            </h3>
            <p className="text-xs text-slate-400">
              Sự phối hợp chặt chẽ giữa các bên định chế tài chính, hạ tầng công nghệ Web2/Web3 và Cơ quan quản lý
            </p>
          </div>
          <span className="text-xs bg-slate-800 text-slate-300 px-3 py-1 rounded-full font-mono">
            Architecture Map v2.5
          </span>
        </div>

        {/* Stakeholder Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="p-4 bg-slate-950 rounded-xl border border-blue-900/50 space-y-2">
            <div className="flex items-center gap-2 text-blue-400 font-bold text-xs">
              <Landmark className="w-4 h-4" />
              1. Asset Issuer / Owner
            </div>
            <p className="text-xs text-slate-300 font-semibold">Chủ sở hữu Tài sản</p>
            <p className="text-[11px] text-slate-400 leading-tight">
              Doanh nghiệp phát hành Trái phiếu, Chủ đầu tư BĐS, Dự án Carbon mang tài sản tới Ngân hàng để định giá & niêm yết.
            </p>
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-indigo-900/50 space-y-2">
            <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs">
              <Building2 className="w-4 h-4" />
              2. Custodian & Trustee
            </div>
            <p className="text-xs text-slate-300 font-semibold">Ngân hàng Giám sát</p>
            <p className="text-[11px] text-slate-400 leading-tight">
              Quản lý tài sản thế chấp gốc off-chain trong Core Banking Vault. Ghi nhận quyền thụ hưởng pháp lý và khóa tài sản.
            </p>
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-purple-900/50 space-y-2">
            <div className="flex items-center gap-2 text-purple-400 font-bold text-xs">
              <Lock className="w-4 h-4" />
              3. Fireblocks & Stellar
            </div>
            <p className="text-xs text-slate-300 font-semibold">Hạ tầng Web3 & MPC</p>
            <p className="text-[11px] text-slate-400 leading-tight">
              Phát hành Token RWA chuẩn Stellar/Soroban. Quản lý ví tổ chức MPC Multi-Sig 2/3 và bộ quy tắc chuyển nhượng.
            </p>
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-emerald-900/50 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
              <Users className="w-4 h-4" />
              4. Investors & DEX
            </div>
            <p className="text-xs text-slate-300 font-semibold">Nhà đầu tư & Sàn thứ cấp</p>
            <p className="text-[11px] text-slate-400 leading-tight">
              Nhà đầu tư cá nhân chuyên nghiệp / Định chế eKYC thành công mua bán Token RWA trên sàn mô phỏng OTC/DEX 24/7.
            </p>
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-amber-900/50 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
              <Scale className="w-4 h-4" />
              5. Regulator (SBV)
            </div>
            <p className="text-xs text-slate-300 font-semibold">Cơ quan Quản lý (NHNN)</p>
            <p className="text-[11px] text-slate-400 leading-tight">
              Giám sát hạn mức giao dịch trong môi trường Thử nghiệm có kiểm soát (Regulatory Sandbox), kiểm toán đối soát định kỳ.
            </p>
          </div>
        </div>

        {/* Workflow steps visual */}
        <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            Workflow Quy Trình Nghiệp Vụ Tổng Tổng Thể (End-to-End Workflow)
          </h4>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex-1 bg-slate-900 p-3 rounded-lg border border-slate-800 text-center w-full">
              <div className="font-bold text-blue-400">1. eKYC & Whitelist</div>
              <div className="text-[11px] text-slate-400 mt-1">Xác thực CCCD & AML Rating</div>
            </div>

            <ArrowRight className="w-4 h-4 text-slate-600 hidden lg:block" />

            <div className="flex-1 bg-slate-900 p-3 rounded-lg border border-slate-800 text-center w-full">
              <div className="font-bold text-indigo-400">2. Lock Asset & Mint</div>
              <div className="text-[11px] text-slate-400 mt-1">Hold Core Banking GL → Smart Contract Mint</div>
            </div>

            <ArrowRight className="w-4 h-4 text-slate-600 hidden lg:block" />

            <div className="flex-1 bg-slate-900 p-3 rounded-lg border border-slate-800 text-center w-full">
              <div className="font-bold text-purple-400">3. Fireblocks Custody</div>
              <div className="text-[11px] text-slate-400 mt-1">Lưu ký MPC Multi-Sig 2/3 Vault</div>
            </div>

            <ArrowRight className="w-4 h-4 text-slate-600 hidden lg:block" />

            <div className="flex-1 bg-slate-900 p-3 rounded-lg border border-slate-800 text-center w-full">
              <div className="font-bold text-emerald-400">4. DEX/OTC Trading</div>
              <div className="text-[11px] text-slate-400 mt-1">Giao dịch thứ cấp Atomic Swap</div>
            </div>

            <ArrowRight className="w-4 h-4 text-slate-600 hidden lg:block" />

            <div className="flex-1 bg-slate-900 p-3 rounded-lg border border-slate-800 text-center w-full">
              <div className="font-bold text-amber-400">5. Đối soát & Redeem</div>
              <div className="text-[11px] text-slate-400 mt-1">Reconcile Sổ cái & Rút Fiat về tài khoản</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bảng so sánh Traditional vs Tokenized RWA */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Scale className="w-5 h-5 text-indigo-400" />
          Bảng So Sánh: Mô Hình Quản Lý Tài Sản Truyền Thống vs Token Hóa RWA
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950 text-slate-300 font-bold">
                <th className="p-3">Tiêu chí so sánh</th>
                <th className="p-3 text-amber-400">Quản lý Tài sản Truyền thống</th>
                <th className="p-3 text-blue-400">Mô hình RWA Tokenization (Web2 + Web3)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              <tr className="hover:bg-slate-800/30">
                <td className="p-3 font-semibold text-slate-200">Thời gian thanh toán (Settlement)</td>
                <td className="p-3 text-slate-400">
                  <span className="inline-flex items-center gap-1 text-amber-400">
                    <XCircle className="w-3.5 h-3.5" /> T+2 đến T+30
                  </span>
                  {' '}(Thủ công, chứng từ giấy)
                </td>
                <td className="p-3 text-slate-300">
                  <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" /> T+0 (Gần như tức thì 3-5 giây)
                  </span>
                  {' '}qua Stellar Network
                </td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="p-3 font-semibold text-slate-200">Rào cản gia nhập & Mệnh giá</td>
                <td className="p-3 text-slate-400">Rất cao (Từ 1 Tỷ - 100 Tỷ VNĐ/giao dịch), đòi hỏi nhà đầu tư lớn</td>
                <td className="p-3 text-slate-300">Rất linh hoạt (Chia nhỏ đến 1.000.000 VNĐ/Token) cho phép mở rộng quy mô vốn</td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="p-3 font-semibold text-slate-200">Phân phối Lãi suất / Cổ tức</td>
                <td className="p-3 text-slate-400">Thủ công định kỳ hàng quý/năm qua lệnh chuyển tiền ngân hàng, tốn nguồn lực</td>
                <td className="p-3 text-slate-300">Tự động qua Smart Contract Soroban trả trực tiếp vào ví eKYC của nhà đầu tư</td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="p-3 font-semibold text-slate-200">Quy trình Đối soát (Reconciliation)</td>
                <td className="p-3 text-slate-400">Đối soát cuối ngày (End-of-day EOD) thủ công, dễ phát sinh chênh lệch sổ sách</td>
                <td className="p-3 text-slate-300">Đối soát thời gian thực (Real-time Automated Matching) giữa Core Banking GL & On-chain Supply</td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="p-3 font-semibold text-slate-200">Lưu ký & An toàn Bảo mật</td>
                <td className="p-3 text-slate-400">Tệp lưu kho vật lý hoặc phần mềm tập trung dễ bị rủi ro tấn công nội bộ</td>
                <td className="p-3 text-slate-300">Institutional Fireblocks MPC Vault (Chữ ký phân tán 2/3) chống rò rỉ private key</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Bài học & Cơ hội cho Việt Nam */}
      <div className="bg-gradient-to-br from-slate-900 to-emerald-950/40 border border-emerald-800/30 rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-3 border-b border-emerald-800/40 pb-3">
          <Globe className="w-6 h-6 text-emerald-400" />
          <div>
            <h3 className="text-base font-bold text-white">
              Bài Học & Cơ Hội Cho Hệ Thống Ngân Hàng Việt Nam
            </h3>
            <p className="text-xs text-slate-400">
              Góc nhìn chiến lược từ Chuyên gia Đổi mới Sáng tạo (Innovation Analyst)
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
          <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-2">
            <h4 className="font-bold text-emerald-400 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              1. Khai Thác Thị Trường Trái Phiếu Doanh Nghiệp & BĐS
            </h4>
            <p className="text-slate-300 leading-relaxed">
              Thị trường Trái phiếu Doanh nghiệp Việt Nam đang cần khôi phục niềm tin thông qua tính minh bạch. Việc ứng dụng RWA Tokenization giúp minh bạch hóa tài sản bảo đảm, theo dõi dòng tiền thanh toán gốc/lãi công khai trên sổ cái blockchain mà không thể bị sửa đổi.
            </p>
          </div>

          <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-2">
            <h4 className="font-bold text-emerald-400 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              2. Sẵn Sàng Cho Khung Cơ Chế Thử Nghiệm (Sandbox NHNN)
            </h4>
            <p className="text-slate-300 leading-relaxed">
              Các ngân hàng thương mại Việt Nam (Agribank, VietinBank, BIDV, Vietcombank, Techcombank) có thể đóng vai trò Custodian Bank và Token Issuer trong Nghị định Sandbox Fintech của Ngân hàng Nhà nước, tận dụng Nghị định 13/2023/NĐ-CP về bảo vệ dữ liệu cá nhân trong eKYC.
            </p>
          </div>

          <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-2">
            <h4 className="font-bold text-emerald-400 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              3. Đón Đầu Thị Trường Tín Chỉ Carbon Việt Nam (2028)
            </h4>
            <p className="text-slate-300 leading-relaxed">
              Theo Đề án thành lập thị trường carbon tại Việt Nam từ 2028, token hóa các tín chỉ carbon rừng, năng lượng tái tạo giúp thu hút vốn đầu tư ESG quốc tế với thanh khoản toàn cầu.
            </p>
          </div>

          <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-2">
            <h4 className="font-bold text-emerald-400 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              4. Hạ Tầng Chống Rửa Tiền (AML/FATF Compliance)
            </h4>
            <p className="text-slate-300 leading-relaxed">
              Áp dụng bộ quy tắc Travel Rule và tích hợp Fireblocks Policy Engine để giám sát mọi giao dịch token, đảm bảo chỉ những tài khoản eKYC đã qua xác minh tại Việt Nam mới được phép sở hữu.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
