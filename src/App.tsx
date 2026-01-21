import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { LanguageProvider } from "@/i18n";
import {
  DEFAULT_MODE,
  DEFAULT_THEME,
  normalizeThemeName,
  type Mode,
  type ThemeName,
} from "@/config/themes";
import { loadRuntimeThemeConfig } from "@/config/themeConfig";
import { PaletteThemeProvider } from "@/theme/PaletteThemeProvider";
import { PALETTE_THEME_STORAGE_KEY, usePaletteTheme } from "@/theme/paletteTheme";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ResumePdf from "./pages/ResumePdf";
import ErrorBoundary from "./components/ErrorBoundary";
import { useTheme } from "next-themes";

const queryClient = new QueryClient();

function RuntimeThemeInitializer({
  configuredTheme,
  configuredMode,
}: {
  configuredTheme: ThemeName;
  configuredMode: Mode;
}) {
  const { setTheme } = useTheme();
  const { setTheme: setPaletteTheme } = usePaletteTheme();

  useEffect(() => {
    // Only apply runtime defaults if the visitor hasn't explicitly chosen yet.
    try {
      const storedMode = localStorage.getItem("theme"); // next-themes default storage key
      if (!storedMode) setTheme(configuredMode);

      const storedPaletteRaw = localStorage.getItem(PALETTE_THEME_STORAGE_KEY);
      if (!normalizeThemeName(storedPaletteRaw)) setPaletteTheme(configuredTheme);
    } catch {
      // ignore
    }
  }, [configuredMode, configuredTheme, setPaletteTheme, setTheme]);

  return null;
}

const App = () => {
  const [configuredTheme, setConfiguredTheme] = useState<ThemeName>(DEFAULT_THEME);
  const [configuredMode, setConfiguredMode] = useState<Mode>(DEFAULT_MODE);

  useEffect(() => {
    let cancelled = false;
    loadRuntimeThemeConfig().then((cfg) => {
      if (cancelled) return;
      setConfiguredTheme(cfg.theme);
      setConfiguredMode(cfg.mode);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <ThemeProvider attribute="class" defaultTheme={DEFAULT_MODE} enableSystem>
          <PaletteThemeProvider defaultTheme={configuredTheme}>
            <RuntimeThemeInitializer
              configuredTheme={configuredTheme}
              configuredMode={configuredMode}
            />
            <TooltipProvider delayDuration={0}>
              <Toaster />
              <Sonner />
              <ErrorBoundary>
                <BrowserRouter>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/print/resume" element={<ResumePdf />} />
                    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </BrowserRouter>
              </ErrorBoundary>
            </TooltipProvider>
          </PaletteThemeProvider>
        </ThemeProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
};

export default App;
