"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { usePathname, useSearchParams } from "next/navigation";

export function NavigationProgress() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [progress, setProgress] = useState(0);
  const [showProgress, setShowProgress] = useState(true);

  useEffect(() => {
    const loadingTime = 4000;
    let startTime = Date.now();

    const updateProgress = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      const newProgress = Math.min(100, (elapsed / loadingTime) * 100);

      setProgress(newProgress);

      if (newProgress < 100) {
        requestAnimationFrame(updateProgress);
      } else {
        setShowProgress(false);
      }
    };

    // Start the progress update
    updateProgress();
  }, [pathname, searchParams]);

  if (!showProgress || progress === 100) {
    return null;
  }

  return <Progress value={progress} className="w-full absolute z-[99999] top-0 left-0 right-0 h-1" />;
}
