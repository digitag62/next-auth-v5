"use client";

import { TimerClock } from "@/components/timer-clock";

const AlarmPage = () => {
  return (
    <div className="min-h-[calc(100vh-50px)] flex flex-col items-center justify-center gap-4 py-6">
      <TimerClock />
    </div>
  );
};

export default AlarmPage;
