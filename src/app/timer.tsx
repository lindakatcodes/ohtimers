"use client";

import { Orbitron } from "next/font/google";
import { useEffect, useState } from "react";
import { getCountdown } from "./helpers";
import type { TimerType } from "./types";

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
  const [countdown, setCountdown] = useState("00:00:00:00");

  useEffect(() => {
    const tid = setInterval(() => {
      const newCountdown = getCountdown(timer);
      setCountdown(newCountdown);
    }, 1000);

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
