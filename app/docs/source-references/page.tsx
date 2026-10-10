import type { Metadata } from "next";
import { SourceReferencesArticle } from "../SourceReferencesArticle";

export const metadata: Metadata = { title: "PDF source references" };

export default function SourceReferencesPage() {
  return <SourceReferencesArticle />;
}
