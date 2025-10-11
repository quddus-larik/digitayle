import React from "react";
import { ClerkProvider } from "@clerk/nextjs"
import { ThemeProvider } from "@providers/theme-provider";
export function Provider({ children }: { children: React.ReactNode; }) {

    return (
      
        <ClerkProvider>
            <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </ClerkProvider>
    )
}