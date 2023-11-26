"use client";
import dynamic from "next/dynamic";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
const ThemeProvider = dynamic(() => import("./theme-provider"), { ssr: false });

// Create a client
const queryClient = new QueryClient();

type Props = {
  children: React.ReactNode;
};

const Providers = ({ children }: Props) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        defaultTheme="system"
        attribute="class"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default Providers;
