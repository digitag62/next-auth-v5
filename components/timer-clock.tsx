import React, { useEffect, useRef, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import useSound from "use-sound";
import Head from "next/head";

export const TimerClock = () => {
  const [duration, setDuration] = useState<number | string>("");
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [duar] = useSound("/sound/shocked-sound-effect.mp3", { volume: 0.5 });
  // const [huh] = useSound("/sound/huhh.mp3", { volume: 0.5 });
  const [goku] = useSound("/sound/metal-pipe.mp3", { volume: 0.3 });

  let selectSeconds = [];
  for (let i: number = 1; i <= 60; i++) {
    selectSeconds.push({
      text: `${String(i).padStart(2, "0")} Min`,
      duration: i * 60,
    });
  }

  const handleSetDuration = (): void => {
    if (typeof duration === "number" && duration > 0) {
      setTimeLeft(duration);
      setIsActive(false);
      setIsPaused(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  const handleDurationChange = (value: string): void => {
    setDuration(Number(value) || "");
  };

  const handleStart = (): void => {
    duar();
    if (timeLeft > 0) {
      setIsActive(true);
      setIsPaused(false);
    }
  };

  const handlePause = (): void => {
    duar();
    if (isActive) {
      setIsPaused(true);
      setIsActive(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  const handleReset = (): void => {
    duar();

    setIsActive(false);
    setIsPaused(false);
    setTimeLeft(typeof duration === "number" ? duration : 0);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  useEffect(() => {
    console.log({ isActive, isPaused });
    if (isActive && !isPaused) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timerRef.current!);
            goku();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isActive, isPaused]);

  return (
    <div className="flex flex-col gap-2 items-center justify-center rounded-2xl p-8  border">
      <div className="text-2xl font-bold tracking-tight">Countdown Timer</div>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 text-center">
        Display countdown timeer in minutes, and seconds.
      </p>
      <div className="text-6xl font-bold tracking-tight">
        {formatTime(timeLeft)}
      </div>
      <div className="flex items-center mt-4 gap-2">
        <Select onValueChange={handleDurationChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            {selectSeconds.map((t) => (
              <SelectItem value={t.duration.toString()}>{t.text}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          onClick={handleSetDuration}
          variant="outline"
          className="text-gray-800 dark:text-gray-200"
        >
          Set
        </Button>
      </div>
      <div className="flex justify-center gap-4">
        <Button
          onClick={handleStart}
          variant="outline"
          className={cn(
            !isActive ? "block" : "hidden",
            "text-gray-800 dark:text-gray-200"
          )}
        >
          {isPaused ? "Resume" : "Start"}
        </Button>
        <Button
          onClick={handlePause}
          variant="outline"
          className={cn(
            !isPaused && isActive ? "block" : "hidden",
            "text-gray-800 dark:text-gray-200"
          )}
        >
          Pause
        </Button>
        <Button
          onClick={handleReset}
          variant="outline"
          className="text-gray-800 dark:text-gray-200 "
        >
          Reset
        </Button>
      </div>
    </div>
  );
};
