import type { Metadata } from "next";
import { DocArticle } from "./DocArticle";

export const metadata: Metadata = {
  title: "Documentation",
  description: "Learn the folder-first Anything-to-Journal workflow.",
};

export default function DocsPage() {
  return <DocArticle slug="introduction" />;
}
