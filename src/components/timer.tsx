"use client";

import type { TimerType } from "@/types";
import { Orbitron } from "next/font/google";
import { useState, useEffect } from "react";
import { DateTime as dt } from "luxon";
import { getWeekday } from "@/utils/helpers";

const orbitron = Orbitron({
  subsets: ["latin"],
  display: "swap",
});

export function Timer({
  timer,
  children,
}: {
  timer: TimerType;
  children: React.ReactNode;
}) {
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    function getCountdown() {
      const currentDT = dt.now();

      if (timer.type === "weekly") {
        const weekday = getWeekday(timer.resetDate.weekday);

        let resetDate = dt.fromObject({
          weekday,
          hour: timer.resetDate.hour,
          minute: timer.resetDate.minutes || 0,
        });

        // date must be in the future - so if we're already past the day and hour, we need to update the reset date to be the next possible value
        if (
          currentDT.day >= resetDate.day &&
          currentDT.hour >= resetDate.hour
        ) {
          const weekAheadOfReset = resetDate.plus({ days: 7 });
          const daysToMove = weekAheadOfReset.day - resetDate.day;
          resetDate = resetDate.plus({ days: daysToMove });
        }

        setCountdown(
          resetDate
            .diffNow(["days", "hours", "minutes", "seconds"])
            .toFormat("dd:hh:mm:ss")
        );
      } else {
        const currentHour = currentDT.get("hour");
        const nextHour =
          timer.resetTimes.find((val) => val > currentHour) ||
          timer.resetTimes[0];
        const resetTime = dt.fromObject({
          hour: nextHour,
        });
        setCountdown(
          resetTime
            .diffNow(["hours", "minutes", "seconds"])
            .toFormat("hh:mm:ss")
        );
      }
    }

    const tid = setInterval(getCountdown, 1000);

    return () => clearInterval(tid);
  }, []);

  return (
    <div
      className={`min-w-full py-2 lg:py-6 border-2 border-dashed rounded-md ${timer.borderColor} lg:first:col-span-2 lg:last:col-span-2`}
    >
      {children}
      <h2 className="text-center text-2xl mb-1.5">{timer.name}</h2>
      <p className="text-center text-md mb-0.5">Next reset in</p>
      <p
        className={`text-2xl mb-2 font-bold ${orbitron.className} flex gap-1 justify-center`}
      >
        {countdown.split("").map((val, idx) => (
          <span key={idx} className="min-w-[20px] text-center">
            {val}
          </span>
        ))}
      </p>
    </div>
  );
}
