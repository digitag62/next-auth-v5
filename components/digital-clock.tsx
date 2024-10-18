"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";

export const DigitalClock = () => {
  const [mounted, setMounted] = useState(false);
  const [is24Hour, setIs24Hour] = useState(false);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setTime(new Date());
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const formattedTime = useMemo<string>(() => {
    if (!mounted) return "";
    const hours = is24Hour
      ? time.getHours().toString().padStart(2, "0")
      : (time.getHours() % 12 || 12).toString().padStart(2, "0");
    const minutes = time.getMinutes().toString().padStart(2, "0");
    const seconds = time.getSeconds().toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  }, [time, is24Hour, mounted]);

  return (
    <div className="flex flex-col justify-center items-center gap-2 border p-8 rounded-2xl">
      <div className="text-2xl font-bold tracking-tight">Digital Clock</div>
      <div className="text-sm text-gray-500 dark:text-gray-400 mb-4 text-center">
        Display current time in hours, minutes, and seconds.
      </div>
      <div className="text-6xl font-bold tracking-tight">{formattedTime}</div>
      <Button onClick={() => setIs24Hour((curr) => !curr)} variant="link">
        {is24Hour ? 24 : 12} Hours Format
      </Button>
    </div>
  );
};
