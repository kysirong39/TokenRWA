import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client server-side
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
};

// API Endpoint: AI RWA Asset Structuring & Compliance Analysis
app.post("/api/rwa/ai-analyze", async (req, res) => {
  try {
    const { assetName, assetType, valuation, jurisdiction, tokenStandard } = req.body;

    const ai = getGeminiClient();
    if (!ai) {
      return res.status(500).json({
        error: "GEMINI_API_KEY chưa được cấu hình. Vui lòng thêm API Key trong panel Secrets.",
      });
    }

    const prompt = `Bạn là một chuyên gia cao cấp về Blockchain, Web3 và RWA (Real World Asset) Tokenization trong ngành ngân hàng tài chính tại Việt Nam và quốc tế.
Hãy phân tích và tạo cấu trúc Token hóa cho tài sản thực sau:
- Tên tài sản: ${assetName || "Trái phiếu Doanh nghiệp Bất động sản Hạng A"}
- Loại tài sản: ${assetType || "Corporate Bond"}
- Giá trị định giá: ${valuation || "500 Tỷ VND"}
- Pháp lý & Tài phán: ${jurisdiction || "Việt Nam (SBV Sandbox & NĐ 13/2023/NĐ-CP)"}
- Chuẩn Token: ${tokenStandard || "Stellar Asset / Soroban Smart Contract"}

Hãy trả về phản hồi định dạng Markdown bao gồm các mục chi tiết:
1. **Phân tích Cấu trúc Token hóa (Asset Token Structure)**: Tên Token, Mã Ticker, Tổng cung, Mệnh giá fractional, Cơ chế cổ tức/lãi suất.
2. **Khung Pháp lý & Tuân thủ (Regulatory & KYC/AML)**: Điều kiện Sandbox NHNN (SBV), quy định eKYC, phân loại nhà đầu tư (Accredited vs Retail).
3. **Mô hình Custody & Fireblocks Setup**: Quy trình bảo chứng off-chain tại Core Banking và MPC Multi-sig 2/3 vault trên Fireblocks.
4. **Luồng Smart Contract Soroban**: Các hàm chính (mint, transfer_whitelist, freeze, redeem, yield_payout).
5. **Cơ chế Đối soát (Reconciliation)**: Quy trình kiểm toán hàng ngày giữa Core Banking Ledger và On-chain Stellar Supply.
6. **Đánh giá rủi ro & Bài học cho Ngân hàng Việt Nam**: Top 3 rủi ro hàng đầu và đề xuất lộ trình triển khai thử nghiệm.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        temperature: 0.7,
      },
    });

    res.json({ analysis: response.text });
  } catch (error: any) {
    console.error("Error generating RWA analysis:", error);
    res.status(500).json({ error: error.message || "Lỗi xử lý AI RWA Analysis" });
  }
});

// API Endpoint: Interactive Follow-Up Chat with Gemini AI
app.post("/api/rwa/ai-chat", async (req, res) => {
  try {
    const { messages, contextAsset } = req.body;

    const ai = getGeminiClient();
    if (!ai) {
      return res.status(500).json({
        error: "GEMINI_API_KEY chưa được cấu hình. Vui lòng kiểm tra môi trường.",
      });
    }

    const systemInstruction = `Bạn là Chuyên gia Tư vấn Cấp cao về RWA Tokenization, Ngân hàng Số và Khung Pháp lý Fintech tại Việt Nam (NHNN/SBV Sandbox, Nghị định 13, Luật Các TCTD).
Bối cảnh tài sản hiện tại: ${JSON.stringify(contextAsset || {})}
Hãy trả lời câu hỏi trao đổi của người dùng một cách chuyên nghiệp, chính xác, định dạng Markdown rõ ràng, dễ đọc, mang tính tư vấn chiến lược cho tổ chức ngân hàng.`;

    const chatMessages = (messages || []).map((m: any) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.text }],
    }));

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: [
        { role: "user", parts: [{ text: systemInstruction }] },
        ...chatMessages,
      ],
      config: {
        temperature: 0.7,
      },
    });

    res.json({ reply: response.text });
  } catch (error: any) {
    console.error("Error in AI Chat:", error);
    res.status(500).json({ error: error.message || "Lỗi xử lý AI Chat" });
  }
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "RWA Banking Platform API" });
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`RWA Banking Server listening at http://0.0.0.0:${PORT}`);
  });
}

startServer();
