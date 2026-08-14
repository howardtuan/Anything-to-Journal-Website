import type { Metadata } from "next";
import { DocArticle } from "../DocArticle";

export const metadata: Metadata = { title: "Drafts & templates" };

export default function TemplatesPage() {
  return <DocArticle slug="templates" />;
}
