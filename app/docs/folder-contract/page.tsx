import type { Metadata } from "next";
import { DocArticle } from "../DocArticle";

export const metadata: Metadata = { title: "Folder contract" };

export default function FolderContractPage() {
  return <DocArticle slug="folder-contract" />;
}
