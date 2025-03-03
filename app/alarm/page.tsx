"use client";

import { AlarmClock } from "@/components/alarm-clock";
import { DigitalClock } from "@/components/digital-clock";

const AlarmPage = () => {
  return (
    <div className="min-h-[calc(100vh-50px)] flex flex-col items-center justify-center gap-4 py-6">
      <DigitalClock />
      <AlarmClock />
    </div>
  );
};

export default AlarmPage;
