import type { Metadata } from "next";
import { DocArticle } from "../DocArticle";

export const metadata: Metadata = { title: "Upload to Overleaf" };

export default function OverleafPage() {
  return <DocArticle slug="overleaf" />;
}
