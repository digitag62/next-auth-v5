"use client";

import React, { useEffect, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { Cross1Icon } from "@radix-ui/react-icons";
import useSound from "use-sound";

const timerRef = useRef<NodeJS.Timeout | null>(null);

const formSchema = z.object({
  hour: z.string(),
  minute: z.string(),
});

export type AlarmsType = {
  time: string;
  run: boolean;
};

export const AlarmClock = () => {
  const [alarms, setAlarms] = useState<AlarmsType[]>([]);
  const [duar] = useSound("/sound/shocked-sound-effect.mp3", { volume: 0.5 });
  const [alarmsRetro, { stop }] = useSound("/sound/alarms-morning.wav");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedData: AlarmsType[] = JSON.parse(
        localStorage.getItem("alarms") || "[]"
      );
      setAlarms(savedData);
    }
  }, []);

  let selectMinutes = [];
  let selectHours = [];

  for (let i: number = 1; i <= 60; i++) {
    selectMinutes.push(
      <SelectItem key={i} value={`${String(i).padStart(2, "0")}`}>
        {`${String(i).padStart(2, "0")}`}
      </SelectItem>
    );
  }

  for (let i: number = 1; i <= 24; i++) {
    selectHours.push(
      <SelectItem key={i} value={`${String(i).padStart(2, "0")}`}>
        {`${String(i).padStart(2, "0")}`}
      </SelectItem>
    );
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      hour: "",
      minute: "",
    },
  });

  // Function to sort an array of objects
  const compare = (a: AlarmsType, b: AlarmsType) => {
    if (a.time < b.time) {
      return -1;
    }
    if (a.time > b.time) {
      return 1;
    }
    return 0;
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!values.hour || !values.minute)
      return alert("PLEASE SET TIME CORRECTLY");

    const data = { time: `${values.hour}:${values.minute}`, run: false };

    const existingTime = alarms.find(
      (t) => t.time === `${values.hour}:${values.minute}`
    );

    form.reset();

    if (existingTime) return alert("TIME ALREADY EXIST");

    if (typeof window !== "undefined") {
      const updateData = [...alarms, data];

      updateData.sort(compare);
      localStorage.setItem("alarms", JSON.stringify(updateData));

      setAlarms(updateData);
      duar();
    }
  }

  const handleCheck = (e: boolean, idx: number) => {
    if (typeof window !== "undefined") {
      const newAlarms = [...alarms];
      newAlarms[idx].run = e;

      localStorage.setItem("alarms", JSON.stringify(newAlarms));
      setAlarms(newAlarms);
      duar();
    }
  };

  const handleRemove = (idx: number) => {
    if (typeof window !== "undefined") {
      const newAlarms = [...alarms];
      newAlarms.splice(idx, 1);

      localStorage.setItem("alarms", JSON.stringify(newAlarms));
      setAlarms(newAlarms);
      duar();
    }
  };

  const adsad = () => {
    alarms.map((arm) => {
      const [hours, minutes] = arm.time
        .split(":")
        .map((num) => parseInt(num, 10));

      const now = new Date();
      const alarmsDate = new Date();
      alarmsDate.setHours(hours, minutes, 0, 0);

      const timeDiff = alarmsDate.getTime() - now.getTime();

      if (timeDiff <= 0) return;

      timerRef.current = setInterval(() => {
        const currTime = new Date();
        if (currTime >= alarmsDate) {
          alarmsRetro();
        }
      });
    });
  };

  // useEffect(() => {
  // if timer is running
  // if (isActive && !isPaused) {
  // }

  // timerRef.current = setInterval(() => {
  //   setTimeLeft((prevTime) => {
  //     if (prevTime <= 1) {
  //       console.log(timerRef);
  //       clearInterval(timerRef.current!);
  //       setEnd(true);
  //       alarmsRetro();
  //       return 0;
  //     }
  //     return prevTime - 1;
  //   });
  // }, 1000);

  // return () => {
  //   if (timerRef.current) {
  //     clearInterval(timerRef.current);
  //   }
  // };
  // }, []);

  return (
    <div className="flex flex-col gap-2 items-center justify-center rounded-2xl p-8  border">
      <div className="text-2xl font-bold tracking-tight">Alarm Timer</div>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 text-center">
        Display countdown timeer in minutes, and seconds.
      </p>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex items-center justify-center gap-2"
        >
          <FormField
            control={form.control}
            name="hour"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Hours" />
                    </SelectTrigger>
                    <SelectContent>{selectHours}</SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="minute"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Minutes" />
                    </SelectTrigger>
                    <SelectContent>{selectMinutes}</SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" variant="outline">
            Set
          </Button>
        </form>
      </Form>

      <div className="w-full flex flex-col gap-2">
        {alarms.map((alm, index) => (
          <div
            className="flex items-center justify-between space-x-2 border p-2 rounded-lg"
            key={index}
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleRemove(index)}
            >
              <Cross1Icon className="w-4 h-4" />
            </Button>
            <Label htmlFor="airplane-mode">{alm.time}</Label>
            <Switch
              id="airplane-mode"
              onCheckedChange={(e) => handleCheck(e, index)}
              checked={alm.run}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
