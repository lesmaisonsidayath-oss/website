"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { getContactSettings, type ApiContactSettings } from "@/lib/api";

const ContactContext = createContext<ApiContactSettings | null>(null);

export function useContactSettings() {
  return useContext(ContactContext);
}

export function ContactProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<ApiContactSettings | null>(null);

  useEffect(() => {
    getContactSettings().then(setSettings).catch(() => {});
  }, []);

  return (
    <ContactContext.Provider value={settings}>
      {children}
    </ContactContext.Provider>
  );
}
