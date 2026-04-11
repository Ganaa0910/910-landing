"use client";

import { useState, useEffect } from "react";

export function SiteGate({ children }: { children: React.ReactNode }) {
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("910-entered")) {
      setEntered(true);
      return;
    }

    const check = () => {
      if (sessionStorage.getItem("910-entered")) {
        setEntered(true);
      } else {
        requestAnimationFrame(check);
      }
    };
    requestAnimationFrame(check);
  }, []);

  if (!entered) return null;

  return <>{children}</>;
}
