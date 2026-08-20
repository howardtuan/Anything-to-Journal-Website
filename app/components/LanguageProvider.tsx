"use client";

import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import type { HomeLanguage } from "../homeCopy";

type LanguageContextValue = {
  language: HomeLanguage;
  toggleLanguage: () => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<HomeLanguage>("en");

  useEffect(() => {
    const saved = window.localStorage.getItem("atj-language");
    const nextLanguage: HomeLanguage = saved === "zh-TW" ? "zh-TW" : "en";
    document.documentElement.lang = nextLanguage;
    const frame = window.requestAnimationFrame(() => setLanguage(nextLanguage));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const value = useMemo<LanguageContextValue>(() => ({
    language,
    toggleLanguage() {
      const nextLanguage: HomeLanguage = language === "en" ? "zh-TW" : "en";
      setLanguage(nextLanguage);
      document.documentElement.lang = nextLanguage;
      window.localStorage.setItem("atj-language", nextLanguage);
    },
  }), [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside LanguageProvider");
  return context;
}
