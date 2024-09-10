"use client";

import type { TimerType } from "@/types";

import { useState, useEffect } from "react";
import { DateTime as dt } from "luxon";
import { getWeekday } from "@/utils/helpers";

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
        const currentWeekday = currentDT.get("weekday");
        const weekday = getWeekday(timer.resetDate.weekday);

        let resetDate = dt.fromObject({
          weekday,
          hour: timer.resetDate.hour,
          minute: timer.resetDate.minutes || 0,
        });

        if (currentWeekday === weekday) {
          // we need to move this a week ahead
          resetDate = resetDate.plus({ days: 7 });
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
    <div>
      {children}
      <p>{timer.name}</p>
      <p>Next reset is </p>
      <p>{countdown}</p>
    </div>
  );
}
