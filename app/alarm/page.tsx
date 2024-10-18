"use client";

import { AlarmClock } from "@/components/alarm-clock";
import { DigitalClock } from "@/components/digital-clock";
import { TimerClock } from "@/components/timer-clock";

const AlarmPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 py-6">
      <AlarmClock />
      <DigitalClock />
      <TimerClock />
    </div>
  );
};

export default AlarmPage;
