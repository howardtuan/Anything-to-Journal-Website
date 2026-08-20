"use client";

import Link from "next/link";
import { ArticleFrame, Callout, CodeBlock, Section } from "./DocComponents";

const firstPromptZh = `在這個資料夾使用 Anything-to-Journal Skill。
開啟任何來源內容前，先問我要：
1. 彈性的期刊草稿，或
2. 特定期刊模板。
等我回答後，再讀取並分類所有來源資料。`;

const installCommand = "npx anything-to-journal@latest install";
const updateCommand = "npx anything-to-journal@latest update";

const sourceTreeZh = `my-research/
├── README.md
├── notes/
│   ├── research-question.md
│   └── methods-notes.docx
├── data/
│   ├── results.xlsx
│   └── analysis.csv
├── figures/
│   ├── figure-01.png
│   └── figure-02.pdf
├── sources/
│   ├── interviews.pdf
│   └── prior-draft.docx
├── references.bib
└── journal-template/          # 選用`;

const outputTreeZh = `journal-output/
├── manuscript/
│   ├── manuscript.tex
│   ├── references.bib
│   ├── traceability.csv
│   └── evidence-map.csv
├── reports/
│   ├── source-review.json
│   └── quality-report.md
└── submission/
    ├── overleaf-upload.zip     ← 上傳此檔
    ├── overleaf-upload/
    │   ├── main.tex            ← ZIP 根目錄
    │   ├── references.bib
    │   └── README_OVERLEAF.md
    ├── manuscript.pdf
    └── submission-package.zip`;

const templateTreeZh = `journal-template/
├── sample-manuscript.tex
├── journal.cls
├── journal.sty                # 若有提供
├── bibliography-style.bst     # 若有提供
├── author-guidelines.pdf
└── template-notes.md           # 選用`;

export function ZhDocArticle({ slug }: { slug: string }) {
  switch (slug) {
    case "getting-started":
      return <GettingStartedZh />;
    case "folder-contract":
      return <FolderContractZh />;
    case "templates":
      return <TemplatesZh />;
    case "overleaf":
      return <OverleafZh />;
    case "troubleshooting":
      return <TroubleshootingZh />;
    default:
      return <IntroductionZh />;
  }
}

function IntroductionZh() {
  return (
    <ArticleFrame slug="introduction">
      <p className="doc-lead">
        Anything-to-Journal 是以資料夾為核心的 Agent Skill。提供研究專案的完整脈絡後，
        它會產生容易檢查、編譯與修改的期刊論文。
      </p>
      <Callout type="success" title="最簡短的說明">
        任何資料都能成為論文。把來源資料放進全新資料夾，在該處開啟 Agent 並使用這個 Skill。
      </Callout>

      <Section id="core-loop" title="核心流程">
        <div className="doc-steps compact">
          <div><span>01</span><strong>收集</strong><p>建立專用資料夾並加入所有有用的來源。</p></div>
          <div><span>02</span><strong>確認</strong><p>選擇草稿模式或特定期刊模板。</p></div>
          <div><span>03</span><strong>檢查</strong><p>完成選擇後，Agent 才會讀取並分類所有資料。</p></div>
          <div><span>04</span><strong>產生</strong><p>Agent 撰寫、編譯、檢查並封裝論文。</p></div>
        </div>
        <p>
          格式確認是流程契約的一部分，而且必須在讀取來源內容前完成。Agent 可以透過檔名定位資料夾，
          但不可從零散線索推測目標期刊，也不可在你回答前檢查證據。
        </p>
      </Section>

      <Section id="what-goes-in" title="輸入內容">
        <p>
          工作區可以包含筆記、草稿、PDF、試算表、結構化資料、圖片、程式輸出、逐字稿、引用資料與投稿說明。
          格式可以混用；內容是否有用比資料夾是否整齊更重要。
        </p>
        <div className="material-grid">
          <div><span>文字</span><strong>筆記與草稿</strong><p>Markdown、純文字、Word 與既有論文。</p></div>
          <div><span>資料</span><strong>表格與結果</strong><p>CSV、TSV、試算表與匯出的摘要。</p></div>
          <div><span>媒體</span><strong>圖片與圖表</strong><p>可投稿的圖片與工作中的視覺素材。</p></div>
          <div><span>引用</span><strong>參考文獻</strong><p>BibTeX 資料庫、來源 PDF 與引用筆記。</p></div>
        </div>
      </Section>

      <Section id="what-comes-out" title="輸出內容">
        <p>
          主要交付內容是一套純文字、可編輯的 LaTeX 專案，另附編譯後的預覽與簡短產生報告。
          在支援的環境中，Agent 也會啟動本機 Manuscript Workspace：同一個 localhost 頁面包含可捲動的 PDF 預覽，
          以及直接連接實際來源檔的 LaTeX 編輯器。Overleaf 版本會另外封裝，讓你能一步上傳完整專案。
        </p>
        <CodeBlock value={outputTreeZh} filename="輸出結構" />
        <Callout type="success" title="Codex 與手動編輯共用同一份來源">
          兩種方式都會更新 <code>journal-output/manuscript/manuscript.tex</code>。儲存後會重新編譯預覽，
          外部修改會被偵測；若編譯失敗，畫面仍會保留上一份成功的 PDF。
        </Callout>
        <Callout title="main.tex 已放在 Overleaf 需要的位置">
          在 <code>submission/overleaf-upload.zip</code> 裡，<code>main.tex</code> 位於 ZIP 根目錄，
          不會多包一層資料夾。
        </Callout>
      </Section>

      <Section id="design-principles" title="設計原則">
        <ul className="check-list">
          <li><strong>證據先於文字。</strong> 每項主張都應能追溯至來源資料夾。</li>
          <li><strong>明確呈現不確定性。</strong> 證據不足時要顯示缺口，不可虛構內容。</li>
          <li><strong>輸出可由人直接編輯。</strong> 章節、圖片與參考文獻都保留在一般檔案中。</li>
          <li><strong>本機編輯同步。</strong> Codex 與瀏覽器工作區共用同一份 LaTeX 來源。</li>
          <li><strong>可攜式交付。</strong> 輸出可在本機工作區使用，也能繼續上傳 Overleaf。</li>
          <li><strong>忠實遵循模板。</strong> 只有在使用者提供並確認後，才套用特定期刊格式。</li>
        </ul>
        <Link className="doc-next-card" href="/docs/getting-started">
          <span>下一篇指南 / 01</span>
          <strong>執行第一次期刊論文流程</strong>
          <i>↗</i>
        </Link>
      </Section>
    </ArticleFrame>
  );
}

function GettingStartedZh() {
  return (
    <ArticleFrame slug="getting-started">
      <p className="doc-lead">
        從只服務一篇論文的空白工作區開始。Skill 會先詢問一個格式問題，接著讀取完整工作區並準備交付內容。
      </p>

      <Section id="before-you-start" title="開始前準備">
        <p>你需要 Node.js 18 或更新版本，以及能存取本機檔案的 Agent。開始時不需要先安裝 LaTeX 或使用 Overleaf。</p>
        <Callout type="warning" title="請使用新的資料夾">
          不要把 Skill 指向桌面、下載、個人主目錄或包含多個專案的大型封存資料夾。
          專用資料夾能讓證據範圍保持清楚。
        </Callout>
      </Section>

      <Section id="install-skill" title="1. 安裝或更新">
        <p>第一次請執行 npx 安裝程式。它會把最新發布版本放入 <code>$CODEX_HOME/skills</code>；若未設定 <code>CODEX_HOME</code>，則使用 <code>~/.codex/skills</code>。</p>
        <CodeBlock value={installCommand} filename="終端機 / 第一次安裝" />
        <Callout type="success" title="既有安裝不會被直接覆蓋">
          安裝指令遇到既有目標時會停止。若已安裝 Skill，請改用更新指令。
        </Callout>
        <h3>日後更新</h3>
        <p>使用 <code>@latest</code> 取得最新 npm 版本。更新程式會先驗證既有 Skill、暫存替換內容，再以不可分割的方式完成交換。</p>
        <CodeBlock value={updateCommand} filename="終端機 / 更新" />
        <p>若要安裝到特定 repository，請加上 <code>--repo /absolute/path/to/repository</code>。執行 <code>npx anything-to-journal@latest --help</code> 可查看明確的目標與 dry-run 選項。</p>
      </Section>

      <Section id="create-workspace" title="2. 建立工作區">
        <p>建立一個名稱明確且固定的新資料夾。這個資料夾同時是輸入邊界，也是 Agent 的工作位置。</p>
        <CodeBlock value={`mkdir coastal-risk-manuscript\ncd coastal-risk-manuscript`} filename="終端機" />
      </Section>

      <Section id="add-material" title="3. 加入來源資料">
        <p>複製所有可支持論文的資料。若原始檔名具有意義，請保留；若資料集或符號需要說明，可加入簡短的 README。</p>
        <CodeBlock value={sourceTreeZh} filename="工作區範例" />
        <p>資料不完整也可以開始。流程應回報證據缺口，而不是用沒有依據的內容補齊。</p>
      </Section>

      <Section id="open-agent" title="4. 開啟 Agent">
        <p>從新資料夾內開啟你的程式 Agent，接著直接要求它使用 Skill，並在檢查資料前先詢問必要的模式問題。</p>
        <CodeBlock value={firstPromptZh} filename="第一個 Prompt" />
      </Section>

      <Section id="confirm-mode" title="5. 確認模式">
        <p>Agent 必須在開啟來源內容前暫停，並詢問你要使用下列哪一種模式：</p>
        <div className="mode-doc-grid">
          <div><span>A / 草稿</span><h3>彈性期刊草稿</h3><p>適合先建立完整論文結構，再決定投稿期刊。</p></div>
          <div><span>B / 模板</span><h3>特定期刊模板</h3><p>適合已持有官方 class 檔案、範例文章與作者指南的情況。</p></div>
        </div>
        <p>若選擇模板模式，請指出目標期刊，並把官方檔案放入 <code>journal-template/</code>。</p>
      </Section>

      <Section id="review-output" title="6. 檢查輸出">
        <p>產生完成後，請先閱讀報告，再使用本機 Manuscript Workspace 或直接開啟編譯後的 PDF。先處理尚未解決的證據備註，再花時間調整版面。</p>
        <CodeBlock value={outputTreeZh} filename="預期輸出" />
        <ul className="check-list">
          <li>開啟 <code>reports/quality-report.md</code> 並閱讀每一項警告。</li>
          <li>在 PDF 預覽中捲動閱讀完整論文，檢查版面問題。</li>
          <li>在 LaTeX 分頁編輯實際的 <code>manuscript/manuscript.tex</code>，或繼續請 Codex 修改。</li>
          <li>儲存以重新編譯並更新預覽；最後一次修改後，再執行既有的正式 build 與 audit。</li>
          <li>確認所有引用都能解析，且參考文獻資料完整。</li>
          <li>準備線上編輯時，上傳 <code>submission/overleaf-upload.zip</code>。</li>
        </ul>
      </Section>
    </ArticleFrame>
  );
}

function FolderContractZh() {
  return (
    <ArticleFrame slug="folder-contract">
      <p className="doc-lead">
        資料夾規範界定 Agent 可把哪些內容視為證據、哪些內容應忽略，以及產生的檔案要放在哪裡。
        清楚的邊界能讓論文更容易稽核。
      </p>

      <Section id="one-project" title="一個專案，一個資料夾">
        <p>每篇論文使用一個專用的頂層資料夾。Agent 會遞迴讀取，所以子資料夾適合用來分類，但不會隱藏內容。</p>
        <div className="do-dont-grid">
          <div className="do"><span>應該</span><p><code>coastal-risk-manuscript/</code><br />一個研究問題，一組證據。</p></div>
          <div className="dont"><span>不要</span><p><code>Desktop/</code><br />混入不相關檔案、機密與模糊範圍。</p></div>
        </div>
      </Section>

      <Section id="recommended-structure" title="建議結構">
        <p>Skill 不要求固定架構，但可預期的名稱能清楚表達用途並減少後續詢問。</p>
        <CodeBlock value={sourceTreeZh} filename="來源資料夾" />
        <p>根目錄的 <code>README.md</code> 最適合用來說明研究問題、專有名詞、最新版資料集，以及哪些檔案應優先採用。</p>
      </Section>

      <Section id="supported-material" title="支援的資料">
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead><tr><th>資料類型</th><th>常見檔案</th><th>用途</th></tr></thead>
            <tbody>
              <tr><td>研究筆記</td><td><code>.md .txt .docx .pdf</code></td><td>問題、理由、方法與詮釋</td></tr>
              <tr><td>資料與結果</td><td><code>.csv .tsv .xlsx</code></td><td>報告數值、表格與可追溯摘要</td></tr>
              <tr><td>圖片</td><td><code>.png .jpg .pdf</code></td><td>論文圖片與視覺證據</td></tr>
              <tr><td>參考文獻</td><td><code>.bib .ris .pdf</code></td><td>引用與書目紀錄</td></tr>
              <tr><td>程式輸出</td><td><code>.json .html .log</code></td><td>重現脈絡與計算結果</td></tr>
              <tr><td>期刊檔案</td><td><code>.cls .sty .bst .tex</code></td><td>特定模板模式的格式規則</td></tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="keep-out" title="不應放入的內容">
        <ul className="cross-list">
          <li>密碼、存取權杖、私鑰與登入憑證。</li>
          <li>尚未獲准用於論文的可識別個人原始資料。</li>
          <li>不相關專案，或無法判斷權威版本的重複封存檔。</li>
          <li>先前執行產生的輸出，除非你要刻意延續修改。</li>
          <li>你無權處理的付費牆或授權內容。</li>
        </ul>
      </Section>

      <Section id="source-of-truth" title="證據來源基準">
        <p>工作區檔案是候選證據，不會自動成為事實。Agent 應區分原始觀察、分析輸出、詮釋與作者指示。</p>
        <Callout type="warning" title="沒有來源，就不能虛構結果">
          若必要數值、引用、方法細節或結論缺漏或互相矛盾，論文必須標示待檢查缺口，不可猜測。
        </Callout>
      </Section>
    </ArticleFrame>
  );
}

function TemplatesZh() {
  return (
    <ArticleFrame slug="templates">
      <p className="doc-lead">
        輸出模式要在讀取來源內容前選定。草稿模式著重可攜性；特定模板模式著重忠實遵循提供的期刊套件。
      </p>

      <Section id="required-confirmation" title="必要確認">
        <p>讀取工作區內容前，Agent 會提出一個直接問題並等待回答：</p>
        <CodeBlock value={`我要產生：\nA. 彈性的期刊草稿，或\nB. 採用特定期刊模板的論文？\n\n若選 B，應遵循哪一本期刊？官方模板檔案位於何處？`} filename="AGENT 確認點" />
        <p>Skill 可以列出檔名以定位工作區，但在此確認點之前，不會開啟、摘要或解讀來源內容。</p>
      </Section>

      <Section id="draft-mode" title="草稿模式">
        <p>當論點與證據需要先穩定，再決定投稿期刊時，請選擇草稿模式。輸出會採用常見論文章節與保守的 LaTeX 相依套件。</p>
        <ul className="check-list">
          <li>可攜式文章架構，視需要包含摘要、前言、方法、結果、討論與參考文獻。</li>
          <li>一般且容易閱讀的 LaTeX 檔案，方便編輯與檢查。</li>
          <li>中性格式，日後可移轉至特定期刊。</li>
          <li>即使尚未選定期刊，也會提供 Overleaf-ready 套件。</li>
        </ul>
      </Section>

      <Section id="specific-template" title="特定模板模式">
        <p>已知目標期刊且持有官方模板資料時，請選擇此模式。Agent 會把這些檔案當作限制，不會憑記憶重建期刊樣式。</p>
        <Callout title="使用官方檔案">
          請從期刊或出版社下載目前的模板與作者說明。截圖或舊的投稿 PDF 不足以作為模板。
        </Callout>
      </Section>

      <Section id="template-package" title="準備模板套件">
        <p>把完整模板套件放進來源工作區中名稱清楚的資料夾。請包含範例文章，因為它往往比 class 檔更清楚地示範必要指令。</p>
        <CodeBlock value={templateTreeZh} filename="期刊模板" />
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead><tr><th>檔案</th><th>重要性</th></tr></thead>
            <tbody>
              <tr><td><code>sample-manuscript.tex</code></td><td>顯示預期的文件結構與指令。</td></tr>
              <tr><td><code>journal.cls</code> / <code>.sty</code></td><td>定義期刊版面與套件行為。</td></tr>
              <tr><td><code>.bst</code></td><td>使用 BibTeX 時控制參考文獻格式。</td></tr>
              <tr><td>作者指南</td><td>定義篇幅、章節、圖片與投稿要求。</td></tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="changing-mode" title="日後切換模式">
        <p>論文內容穩定後，可以從草稿模式移至特定模板。請保留原草稿輸出，把原始來源與目前的官方模板複製到新的空白資料夾，再開始目標模板流程。</p>
        <Callout type="warning" title="把移轉視為新一次產生流程">
          期刊模板可能改變章節順序、參考文獻工具、浮動物件與中繼資料。移轉後請重新編譯並檢查整篇論文。
        </Callout>
      </Section>
    </ArticleFrame>
  );
}

function OverleafZh() {
  return (
    <ArticleFrame slug="overleaf">
      <p className="doc-lead">
        Anything-to-Journal 會建立一個專供 Overleaf 使用的 ZIP。請把該套件上傳為新專案，不需要手動重建檔案結構。
      </p>

      <Section id="upload-bundle" title="上傳套件">
        <CodeBlock value={outputTreeZh} filename="產生的交付內容" />
        <Callout type="success" title="上傳 submission/overleaf-upload.zip">
          你只需要傳送這個檔案。壓縮檔根目錄包含 <code>main.tex</code>，並附上論文所需的參考文獻、
          支援 LaTeX、圖片與期刊檔案。
        </Callout>
      </Section>

      <Section id="upload-steps" title="三步驟上傳">
        <ol className="numbered-steps">
          <li><span>1</span><div><strong>開啟 Overleaf</strong><p>在專案儀表板選擇 <b>New Project</b>。</p></div></li>
          <li><span>2</span><div><strong>選擇 Upload Project</strong><p>從選單選擇 <b>Upload Project</b>。</p></div></li>
          <li><span>3</span><div><strong>選擇產生的 ZIP</strong><p>選擇 <code>journal-output/submission/overleaf-upload.zip</code>，等待專案開啟。</p></div></li>
        </ol>
        <p>Overleaf 會自動解壓縮。你應該會立刻在同一個專案根目錄看到 <code>main.tex</code>、<code>README_OVERLEAF.md</code>、<code>references.bib</code> 與必要支援檔案。</p>
      </Section>

      <Section id="first-compile" title="第一次編譯">
        <p>變更設定前請先閱讀 <code>README_OVERLEAF.md</code>。其中會記錄預期的編譯器、參考文獻工具與模板專屬設定。</p>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead><tr><th>檢查項目</th><th>預期狀態</th></tr></thead>
            <tbody>
              <tr><td>主文件</td><td><code>main.tex</code></td></tr>
              <tr><td>編譯器</td><td>依 <code>README_OVERLEAF.md</code> 說明</td></tr>
              <tr><td>參考文獻</td><td>依文件使用 BibTeX 或 Biber</td></tr>
              <tr><td>素材</td><td>使用與 <code>main.tex</code> 引用相符的扁平檔名</td></tr>
            </tbody>
          </table>
        </div>
        <Callout type="warning" title="不要任意更換編譯器">
          期刊 class 可能要求 pdfLaTeX、XeLaTeX 或 LuaLaTeX。變更編譯器前，請遵循產生的 README 與期刊說明。
        </Callout>
      </Section>

      <Section id="edit-safely" title="安全編輯">
        <p>請在 <code>main.tex</code> 修改標題、摘要、章節、聲明、圖片說明與內文。若套件包含支援用 <code>.tex</code> 檔，請編輯對應檔案並保持 <code>\input</code> 名稱不變。</p>
        <ul className="check-list">
          <li>在 <code>main.tex</code> 或對應的支援 <code>.tex</code> 檔編輯內文。</li>
          <li>移動表格或圖片時沿用既有標籤。</li>
          <li>完成一小組修改後就重新編譯。</li>
          <li>大幅調整模板結構前先下載備份。</li>
        </ul>
      </Section>

      <Section id="replace-assets" title="替換圖片與參考文獻">
        <p>替換圖片時，請把新檔上傳至專案根目錄並保持檔名不變，或更新對應的 <code>\includegraphics</code> 引用。引用資料請編輯 <code>references.bib</code>，並盡量保持 citation key 不變。</p>
        <CodeBlock value={`figure-02.png               # 替換或新增\nreferences.bib              # 編輯已驗證資料\nmain.tex                    # 更新內文、圖片說明與引用`} filename="常見編輯目標" />
      </Section>
    </ArticleFrame>
  );
}

function TroubleshootingZh() {
  return (
    <ArticleFrame slug="troubleshooting">
      <p className="doc-lead">
        請從編譯紀錄中的第一個錯誤開始處理，後續錯誤通常只是連帶結果。進行結構性修正前，先保留一份產生輸出的副本。
      </p>

      <Section id="upload-problems" title="上傳問題">
        <h3>Overleaf 找不到 <code>main.tex</code></h3>
        <p>你可能壓縮了外層 <code>journal-output/</code>，而沒有使用產生的封存檔。請原樣上傳 <code>submission/overleaf-upload.zip</code>。</p>
        <CodeBlock value={`✓ submission/overleaf-upload.zip → main.tex 位於 ZIP 根目錄\n✕ journal-output.zip → submission/overleaf-upload/main.tex`} filename="ZIP 根目錄" />
        <h3>ZIP 遭拒或檔案過大</h3>
        <p>請從上傳副本移除未使用的原始媒體與中間分析檔案，但保留在來源工作區。Overleaf 套件只需包含論文相依檔案。</p>
      </Section>

      <Section id="compile-problems" title="編譯問題">
        <div className="issue-list">
          <div><span>01</span><div><strong>缺少 <code>.cls</code> 或 <code>.sty</code></strong><p>把官方 class 或 style 檔複製到專案根目錄後重新編譯。不要用不相關套件替代。</p></div></div>
          <div><span>02</span><div><strong>未定義的控制序列</strong><p>確認提供該指令的期刊套件存在且已載入，並與官方範例論文比對。</p></div></div>
          <div><span>03</span><div><strong>編譯器錯誤</strong><p>開啟 <code>README_OVERLEAF.md</code>，把專案編譯器設為文件指定的選項。</p></div></div>
          <div><span>04</span><div><strong>本機可編譯，線上卻失敗</strong><p>檢查檔名字母大小寫、相對路徑，以及 Overleaf 目前 TeX 發行版未提供的套件。</p></div></div>
        </div>
      </Section>

      <Section id="citation-problems" title="引用問題">
        <h3>引用顯示為 <code>[?]</code></h3>
        <p>確認 citation key 存在於 <code>references.bib</code>，參考文獻檔名與 <code>main.tex</code> 相符，而且設定的後端符合文件。</p>
        <Callout title="執行足夠次數的重新編譯">
          LaTeX 引用可能需要多次處理。Overleaf 通常會自動完成，但從頭重新編譯可清除過時的輔助檔案。
        </Callout>
        <h3>參考文獻存在但資料不完整</h3>
        <p>請使用可靠的書目來源修正 BibTeX 項目，不可虛構缺少的 DOI、頁碼、卷期或作者資料。</p>
      </Section>

      <Section id="figure-problems" title="圖片問題">
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead><tr><th>症狀</th><th>檢查項目</th></tr></thead>
            <tbody>
              <tr><td>找不到圖片</td><td>路徑、檔名拼字與字母大小寫</td></tr>
              <tr><td>PDF 空白或損毀</td><td>匯出相容性與嵌入字型</td></tr>
              <tr><td>圖片漂移太遠</td><td>位置指定與周圍文字；避免強制固定每個浮動物件</td></tr>
              <tr><td>圖片模糊</td><td>改用向量 PDF 或更高解析度的點陣圖</td></tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="content-problems" title="內容與證據">
        <h3>論文包含沒有支持的陳述</h3>
        <p>請追溯至來源資料夾。若沒有證據，就刪除該陳述或標為尚未解決的作者問題；補上缺少的來源後再要求 Agent 修訂。</p>
        <h3>兩個來源檔案互相矛盾</h3>
        <p>不要默默選擇其中之一。請在工作區 README 記錄衝突、指出權威來源，再只重新執行受影響章節。</p>
        <Callout type="warning" title="格式無法解決證據問題">
          編譯乾淨不代表內容正確。使用前請檢查主張、數值、引用、作者資料、倫理聲明與投稿要求。
        </Callout>
      </Section>
    </ArticleFrame>
  );
}
