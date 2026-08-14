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
    description: "What Anything-to-Journal does and how the folder-first workflow works.",
    group: "Start here",
    index: "00",
    headings: [
      { id: "core-loop", label: "The core loop" },
      { id: "what-goes-in", label: "What goes in" },
      { id: "what-comes-out", label: "What comes out" },
      { id: "design-principles", label: "Design principles" },
    ],
    keywords: ["introduction", "overview", "workflow", "agent", "journal"],
  },
  {
    href: "/docs/getting-started",
    title: "Getting started",
    description: "Run the complete workflow from a fresh folder to a first manuscript.",
    group: "Start here",
    index: "01",
    headings: [
      { id: "before-you-start", label: "Before you start" },
      { id: "create-workspace", label: "1. Create the workspace" },
      { id: "add-material", label: "2. Add source material" },
      { id: "open-agent", label: "3. Open your agent" },
      { id: "confirm-mode", label: "4. Confirm the mode" },
      { id: "review-output", label: "5. Review the output" },
    ],
    keywords: ["quick start", "prompt", "install", "first run", "workflow"],
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
    keywords: ["folder", "files", "inputs", "pdf", "data", "figures", "references"],
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
    keywords: ["draft", "template", "journal", "class", "sty", "author guide", "mode"],
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
    keywords: ["overleaf", "upload", "zip", "main.tex", "compile", "latex"],
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
    keywords: ["error", "missing", "compile", "citation", "figure", "evidence", "fix"],
  },
];

export const docsGroups = ["Start here", "Prepare", "Workflow", "Edit & submit", "Reference"];

export function pageForPath(pathname: string) {
  return docsPages.find((page) => page.href === pathname) ?? docsPages[0];
}
