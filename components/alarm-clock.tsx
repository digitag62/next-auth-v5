import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
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

const formSchema = z.object({
  hour: z.number(),
  minute: z.number(),
});

export const AlarmClock = () => {
  let selectMinutes = [];
  let selectHours = [];

  for (let i: number = 1; i <= 60; i++) {
    selectMinutes.push({
      text: `${String(i).padStart(2, "0")}`,
      duration: i * 60,
    });
  }

  for (let i: number = 1; i <= 24; i++) {
    selectHours.push({
      text: `${String(i).padStart(2, "0")}`,
      duration: i,
    });
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    // defaultValues: {},
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

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
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Hours" />
                    </SelectTrigger>
                    <SelectContent>
                      {selectHours.map((t) => (
                        <SelectItem value={t.duration.toString()}>
                          {t.text}
                        </SelectItem>
                      ))}
                    </SelectContent>
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
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Minutes" />
                    </SelectTrigger>
                    <SelectContent>
                      {selectMinutes.map((t) => (
                        <SelectItem value={t.duration.toString()}>
                          {t.text}
                        </SelectItem>
                      ))}
                    </SelectContent>
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
    </div>
  );
};
