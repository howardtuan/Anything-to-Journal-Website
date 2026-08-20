import type { HomeLanguage } from "../homeCopy";

export type DocPageInfo = {
  href: string;
  title: string;
  description: string;
  group: string;
  index: string;
  headings: { id: string; label: string }[];
  keywords: string[];
};

export const docsPages: DocPageInfo[] = [
  {
    href: "/docs",
    title: "Introduction",
    description: "The folder-first workflow, generated deliverables, and local PDF/LaTeX workspace.",
    group: "Start here",
    index: "00",
    headings: [
      { id: "core-loop", label: "The core loop" },
      { id: "what-goes-in", label: "What goes in" },
      { id: "what-comes-out", label: "What comes out" },
      { id: "design-principles", label: "Design principles" },
    ],
    keywords: ["introduction", "overview", "workflow", "agent", "journal", "workspace", "PDF Preview", "LaTeX", "介紹", "流程", "工作區"],
  },
  {
    href: "/docs/getting-started",
    title: "Getting started",
    description: "Run the complete workflow from a fresh folder to a first manuscript and local edit.",
    group: "Start here",
    index: "01",
    headings: [
      { id: "before-you-start", label: "Before you start" },
      { id: "install-skill", label: "1. Install or update" },
      { id: "create-workspace", label: "2. Create the workspace" },
      { id: "add-material", label: "3. Add source material" },
      { id: "open-agent", label: "4. Open your agent" },
      { id: "confirm-mode", label: "5. Confirm the mode" },
      { id: "review-output", label: "6. Review the output" },
    ],
    keywords: ["quick start", "prompt", "install", "npx", "update", "first run", "workflow", "開始", "安裝", "更新"],
  },
  {
    href: "/docs/folder-contract",
    title: "Folder contract",
    description: "What belongs in the source workspace and how the agent treats each file.",
    group: "Prepare",
    index: "02",
    headings: [
      { id: "one-project", label: "One project, one folder" },
      { id: "recommended-structure", label: "Recommended structure" },
      { id: "supported-material", label: "Supported material" },
      { id: "keep-out", label: "What to keep out" },
      { id: "source-of-truth", label: "Evidence source of truth" },
    ],
    keywords: ["folder", "files", "inputs", "pdf", "data", "figures", "references", "資料夾", "檔案", "證據"],
  },
  {
    href: "/docs/templates",
    title: "Drafts & templates",
    description: "Choose a portable journal draft or supply a specific journal template.",
    group: "Workflow",
    index: "03",
    headings: [
      { id: "required-confirmation", label: "Required confirmation" },
      { id: "draft-mode", label: "Draft mode" },
      { id: "specific-template", label: "Specific template mode" },
      { id: "template-package", label: "Prepare the template package" },
      { id: "changing-mode", label: "Changing mode later" },
    ],
    keywords: ["draft", "template", "journal", "class", "sty", "author guide", "mode", "草稿", "模板", "期刊"],
  },
  {
    href: "/docs/overleaf",
    title: "Upload to Overleaf",
    description: "Upload the generated project ZIP and continue editing immediately.",
    group: "Edit & submit",
    index: "04",
    headings: [
      { id: "upload-bundle", label: "The upload bundle" },
      { id: "upload-steps", label: "Upload in three steps" },
      { id: "first-compile", label: "First compile" },
      { id: "edit-safely", label: "Edit safely" },
      { id: "replace-assets", label: "Replace figures and references" },
    ],
    keywords: ["overleaf", "upload", "zip", "main.tex", "compile", "latex", "上傳", "編譯", "圖片", "參考文獻"],
  },
  {
    href: "/docs/troubleshooting",
    title: "Troubleshooting",
    description: "Fix upload, compile, citation, figure, and evidence issues.",
    group: "Reference",
    index: "05",
    headings: [
      { id: "upload-problems", label: "Upload problems" },
      { id: "compile-problems", label: "Compile problems" },
      { id: "citation-problems", label: "Citation problems" },
      { id: "figure-problems", label: "Figure problems" },
      { id: "content-problems", label: "Content and evidence" },
    ],
    keywords: ["error", "missing", "compile", "citation", "figure", "evidence", "fix", "錯誤", "疑難排解", "引用", "圖片"],
  },
];

export const zhDocsPages: DocPageInfo[] = [
  {
    href: "/docs",
    title: "介紹",
    description: "了解資料夾優先流程、產生的交付內容與本機 PDF／LaTeX 工作區。",
    group: "開始",
    index: "00",
    headings: [
      { id: "core-loop", label: "核心流程" },
      { id: "what-goes-in", label: "輸入內容" },
      { id: "what-comes-out", label: "輸出內容" },
      { id: "design-principles", label: "設計原則" },
    ],
    keywords: ["介紹", "概覽", "流程", "agent", "期刊", "工作區", "PDF 預覽", "LaTeX", "introduction", "workflow", "workspace"],
  },
  {
    href: "/docs/getting-started",
    title: "開始使用",
    description: "從全新資料夾完成第一份論文與本機編修流程。",
    group: "開始",
    index: "01",
    headings: [
      { id: "before-you-start", label: "開始前準備" },
      { id: "install-skill", label: "1. 安裝或更新" },
      { id: "create-workspace", label: "2. 建立工作區" },
      { id: "add-material", label: "3. 加入來源資料" },
      { id: "open-agent", label: "4. 開啟 Agent" },
      { id: "confirm-mode", label: "5. 確認模式" },
      { id: "review-output", label: "6. 檢查輸出" },
    ],
    keywords: ["快速開始", "prompt", "安裝", "npx", "更新", "第一次執行", "流程", "getting started", "install"],
  },
  {
    href: "/docs/folder-contract",
    title: "資料夾規範",
    description: "了解來源工作區應包含什麼，以及 Agent 如何處理每個檔案。",
    group: "準備",
    index: "02",
    headings: [
      { id: "one-project", label: "一個專案，一個資料夾" },
      { id: "recommended-structure", label: "建議結構" },
      { id: "supported-material", label: "支援的資料" },
      { id: "keep-out", label: "不應放入的內容" },
      { id: "source-of-truth", label: "證據來源基準" },
    ],
    keywords: ["資料夾", "檔案", "輸入", "pdf", "資料", "圖片", "參考文獻", "folder", "evidence"],
  },
  {
    href: "/docs/templates",
    title: "草稿與模板",
    description: "選擇可攜式期刊草稿，或提供特定期刊模板。",
    group: "工作流程",
    index: "03",
    headings: [
      { id: "required-confirmation", label: "必要確認" },
      { id: "draft-mode", label: "草稿模式" },
      { id: "specific-template", label: "特定模板模式" },
      { id: "template-package", label: "準備模板套件" },
      { id: "changing-mode", label: "日後切換模式" },
    ],
    keywords: ["草稿", "模板", "期刊", "class", "sty", "作者指南", "模式", "draft", "template", "journal"],
  },
  {
    href: "/docs/overleaf",
    title: "上傳至 Overleaf",
    description: "上傳產生的專案 ZIP，立即繼續編輯。",
    group: "編輯與投稿",
    index: "04",
    headings: [
      { id: "upload-bundle", label: "上傳套件" },
      { id: "upload-steps", label: "三步驟上傳" },
      { id: "first-compile", label: "第一次編譯" },
      { id: "edit-safely", label: "安全編輯" },
      { id: "replace-assets", label: "替換圖片與參考文獻" },
    ],
    keywords: ["overleaf", "上傳", "zip", "main.tex", "編譯", "latex", "upload", "compile"],
  },
  {
    href: "/docs/troubleshooting",
    title: "疑難排解",
    description: "解決上傳、編譯、引用、圖片與證據問題。",
    group: "參考",
    index: "05",
    headings: [
      { id: "upload-problems", label: "上傳問題" },
      { id: "compile-problems", label: "編譯問題" },
      { id: "citation-problems", label: "引用問題" },
      { id: "figure-problems", label: "圖片問題" },
      { id: "content-problems", label: "內容與證據" },
    ],
    keywords: ["錯誤", "遺失", "編譯", "引用", "圖片", "證據", "修正", "error", "troubleshooting"],
  },
];

export const docsGroups = ["Start here", "Prepare", "Workflow", "Edit & submit", "Reference"];
export const zhDocsGroups = ["開始", "準備", "工作流程", "編輯與投稿", "參考"];

export function docsPagesFor(language: HomeLanguage) {
  return language === "zh-TW" ? zhDocsPages : docsPages;
}

export function docsGroupsFor(language: HomeLanguage) {
  return language === "zh-TW" ? zhDocsGroups : docsGroups;
}

export function pageForPath(pathname: string, language: HomeLanguage = "en") {
  const pages = docsPagesFor(language);
  const normalizedPath = pathname.length > 1 ? pathname.replace(/\/$/, "") : pathname;
  return pages.find((page) => page.href === normalizedPath) ?? pages[0];
}
