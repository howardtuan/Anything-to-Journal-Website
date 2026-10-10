"use client";

import { useLanguage } from "../components/LanguageProvider";
import { ArticleFrame, Callout, CodeBlock, Section } from "./DocComponents";

export function SourceReferencesArticle() {
  const { language } = useLanguage();
  const zh = language === "zh-TW";

  return (
    <ArticleFrame slug="source-references">
      <p className="doc-lead">{zh
        ? "PDF 預覽中的參考節點，讓你從名詞、數值與圖表說明回到研究資料。點擊節點即可開啟來源面板，查看對應檔案、記錄的位置與標示的原文。"
        : "Reference nodes in PDF Preview connect recorded terms, values, and figure or table captions to your research files. Open a node to see the source file, its recorded location, and highlighted evidence."}</p>

      <p>{zh ? "v1.2.0 新增 PDF 證據連結、來源預覽、黃色標記與多來源切換。PDF.js 隨 Skill 安裝，於本機載入，不需外部 CDN。" : "New in v1.2.0: PDF evidence links, source previews, yellow highlights, and multiple-source switching. PDF.js ships with the skill and loads locally without an external CDN."}</p>

      <Section id="follow-a-reference" title={zh ? "從論述回到來源" : "Follow a claim to its source"}>
        <ol>
          <li>{zh ? "在本機 Manuscript Workspace 開啟 PDF 預覽。" : "Open PDF Preview in the local Manuscript Workspace."}</li>
          <li>{zh ? "點擊重點旁的參考節點，例如「模型準確率 0.9」旁的節點。" : "Click the reference node beside a recorded finding, such as model accuracy 0.9."}</li>
          <li>{zh ? "來源面板會顯示檔名與定位資訊；文字來源以黃色螢光標示對應內容。" : "The source panel shows the filename and locator, with yellow highlighting for matched source text."}</li>
          <li>{zh ? "若有多個來源，逐一切換，對照每份資料的上下文。" : "Switch between linked sources to compare each file and its surrounding context."}</li>
        </ol>
        <Callout title={zh ? "同一個數值，也要核對研究情境" : "Check the context behind the number"}>
          {zh ? "例如 0.9 可能是測試集的 accuracy，也可能是其他模型的 F1。請核對資料集、指標與實驗條件；螢光標示本身不等於論述已被驗證。" : "A value of 0.9 might be test accuracy or another model’s F1 score. Check the dataset, metric, and experiment conditions. A highlight locates evidence; it does not independently verify the claim."}
        </Callout>
      </Section>

      <Section id="source-locations" title={zh ? "可以查看哪些來源位置" : "What a source location can show"}>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead><tr><th>{zh ? "來源" : "Source"}</th><th>{zh ? "定位方式" : "Location and display"}</th></tr></thead>
            <tbody>
              <tr><td>PDF</td><td>{zh ? "記錄的頁碼與文字，或頁面上的指定區域。可擷取的匹配文字以黃色標示。" : "A recorded page and text passage, or a specified page region. Matching extractable text is highlighted in yellow."}</td></tr>
              <tr><td>{zh ? "純文字、Markdown、CSV" : "Plain text, Markdown, CSV"}</td><td>{zh ? "原始檔案的行號與文字片段，保留可對照的上下文。" : "Line numbers and text excerpts from the original file, with context for comparison."}</td></tr>
              <tr><td>DOCX</td><td>{zh ? "可擷取的內文依段落順序顯示。原始分頁與內嵌圖形需下載原檔查看。" : "Extractable text in paragraph order. Download the original to inspect its pagination and embedded figures."}</td></tr>
              <tr><td>{zh ? "圖片與圖表" : "Images and figures"}</td><td>{zh ? "支援的圖片預覽與已記錄的區域，協助辨識圖中對應內容。" : "A supported image preview with the recorded region identified."}</td></tr>
            </tbody>
          </table>
        </div>
        <p>{zh ? "能作為研究輸入的格式，比能直接螢光標示的格式更多。掃描 PDF、無法擷取文字的檔案或沒有精確定位資訊的來源，需要補上頁碼、區域或可檢查的文字摘錄；不會憑空產生螢光標示，也不自動執行 OCR。" : "Accepted research inputs cover more formats than direct highlighting. Scanned PDFs, files without extractable text, and sources without precise locators need a page, region, or reviewable text extract. The workspace does not invent a matching passage or perform automatic OCR."}</p>
      </Section>

      <Section id="record-evidence" title={zh ? "維護參考資訊" : "Keep references useful"}>
        <p>{zh ? "節點來自稿件記錄的 evidence map，而非只因數值相同就視為來源。請讓 Agent 為重要論述記錄來源檔案、精確引文與適合的頁碼、行號或區域。同一論述可連結多筆來源。" : "Nodes use evidence recorded for the manuscript, rather than assuming that matching numbers prove a source. Ask the agent to record the source file, exact supporting quote, and appropriate page, line, or region for important claims. One claim can link to multiple sources."}</p>
        <CodeBlock filename={zh ? "範例 Prompt" : "EXAMPLE PROMPT"} value={zh
          ? "請為準確率 0.9、關鍵名詞與圖表說明補上來源參考資訊。\n逐一核對原始檔案，記錄精確引文與頁碼、行號或區域。\n若無法確認位置，請標示缺口，不要推測或把重複文字當成唯一匹配。"
          : "Add source references for accuracy 0.9, key terms, and figure or table captions.\nCheck each original file and record the exact quote and page, line, or region.\nFlag unresolved locations instead of guessing or treating repeated text as a unique match."} />
        <p>{zh ? "既有 evidence-map.csv 仍可使用，精確位置可記錄在選用的 evidence-locations.json。較舊的記錄若只有檔名或一般說明，可先查看現有資訊，再補齊定位；更新 Skill 不會自動為既有論文完成所有映射。修改論述或替換來源後，也應重新檢查對應位置。" : "Existing evidence-map.csv files remain usable, with precise locations recorded in the optional evidence-locations.json. Older records with only filenames or general notes can be reviewed and enriched with locators. Updating the skill does not automatically map every claim in an existing manuscript. Recheck references when claims or source files change."}</p>
      </Section>

      <Section id="unresolved-references" title={zh ? "缺漏與不明確的位置" : "Missing and ambiguous locations"}>
        <p>{zh ? "若找不到檔案、引文無匹配或出現多個可能位置，工作區會顯示待檢查狀態。請確認檔名、來源版本與定位記錄，再請 Agent 修正。沒有可靠位置時，不能把標示當成已核實證據。" : "Missing files, unmatched quotes, and multiple candidate locations remain explicit review states. Check the filename, source version, and locator, then ask the agent to correct the record. Without a reliable location, a reference must not be treated as verified evidence."}</p>
        <Callout title={zh ? "本機審閱與投稿交付" : "Local review and submission"}>
          {zh ? "來源檔案在本機工作區開啟。原本的 LaTeX 編輯、重新編譯與 Overleaf ZIP 交付流程照常使用；互動來源面板屬於本機工作區。" : "Source files open in the local workspace. LaTeX editing, recompilation, and the Overleaf ZIP handoff continue as before. The interactive source panel is part of the local workspace."}
        </Callout>
      </Section>
    </ArticleFrame>
  );
}
