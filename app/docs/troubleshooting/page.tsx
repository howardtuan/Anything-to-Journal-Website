import type { Metadata } from "next";
import { DocArticle } from "../DocArticle";

export const metadata: Metadata = { title: "Troubleshooting" };

export default function TroubleshootingPage() {
  return <DocArticle slug="troubleshooting" />;
}
