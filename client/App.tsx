import "./global.css";

import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CategoryPage from "./pages/Category";
import WatchPage from "./pages/Watch";
import { Header } from "./components/layout/Header";
import { Splash } from "./components/layout/Splash";
import { App as CapApp } from "@capacitor/app";

const queryClient = new QueryClient();

function AppContent() {
  const navigate = useNavigate();

  useEffect(() => {
    // Handle Capacitor back button (Fire TV remote back button)
    const handleBackButton = CapApp.addListener("backButton", ({ canGoBack }) => {
      if (canGoBack) {
        navigate(-1);
      } else {
        // At root, don't close the app - stay on the page
        // This prevents the app from closing unexpectedly
      }
    });

    return () => {
      handleBackButton.remove();
    };
  }, [navigate]);

  return (
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Splash />
      <Header />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/category/:slug" element={<CategoryPage />} />
        <Route path="/watch/:id" element={<WatchPage />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </TooltipProvider>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Splash />
        <Header />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/category/:slug" element={<CategoryPage />} />
          <Route path="/watch/:id" element={<WatchPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
