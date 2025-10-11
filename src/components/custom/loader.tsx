"use client";

import { Mirage } from "ldrs/react";
import "ldrs/react/Mirage.css";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function Loader() {

  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // wait until client-side rendering
  }, []);

  if (!mounted) return null; // avoid hydration mismatch

  return (
    <div className="flex flex-col gap-2 h-screen items-center justify-center">
      <Mirage
        size="60"
        speed="2.5"
        color={resolvedTheme === "dark" ? "white" : "black"}
      />
      <p className="text-xs text-muted-foreground">Just a moment…</p>
    </div>
  );
}
