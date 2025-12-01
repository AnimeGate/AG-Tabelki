import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import { syncThemeWithLocal } from "./helpers/theme_helpers";
import { useTranslation } from "react-i18next";
import { updateAppLanguage } from "./helpers/language_helpers";
import { RouterProvider } from "@tanstack/react-router";
import { router } from "./utils/routes";
import ErrorBoundary from "./components/ErrorBoundary";
import { Toaster } from "@/components/ui/sonner";
import { UpdateDialog } from "@/components/UpdateDialog";
import "./localization/i18n";

export default function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    syncThemeWithLocal();
    updateAppLanguage(i18n);
  }, [i18n]);

  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
      <UpdateDialog />
    </>
  );
}

const root = createRoot(document.getElementById("app")!);
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
);
