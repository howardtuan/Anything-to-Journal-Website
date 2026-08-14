import type { Metadata } from "next";
import { DocArticle } from "../DocArticle";

export const metadata: Metadata = { title: "Getting started" };

export default function GettingStartedPage() {
  return <DocArticle slug="getting-started" />;
}
