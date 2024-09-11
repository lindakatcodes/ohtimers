import type { ArrayOfTimers } from "./types";
import {
  BanknotesIcon,
  FireIcon,
  NewspaperIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { Timer } from "./timer";
import Link from "next/link";

export default function Home() {
  const timers: ArrayOfTimers = [
    {
      name: "Purification",
      type: "weekly",
      iconName: "fire",
      borderColor: "border-rose-800",
      iconColor: "text-rose-700",
      resetDate: {
        weekday: "Monday",
        hour: 7,
      },
    },
    {
      name: "Vendors",
      type: "weekly",
      iconName: "banknotes",
      borderColor: "border-green-700",
      iconColor: "text-green-600",
      resetDate: {
        weekday: "Sunday",
        hour: 9,
      },
    },
    {
      name: "Commissions",
      type: "weekly",
      iconName: "newspaper",
      borderColor: "border-blue-600",
      iconColor: "text-blue-600",
      resetDate: {
        weekday: "Sunday",
        hour: 9,
      },
    },
    {
      name: "Loot Crates",
      type: "hourly",
      iconName: "trash",
      borderColor: "border-amber-400",
      iconColor: "text-amber-400",
      resetTimes: [3, 7, 11, 15, 19, 23],
    },
  ];

  const iconMap = {
    fire: FireIcon,
    banknotes: BanknotesIcon,
    newspaper: NewspaperIcon,
    trash: TrashIcon,
  };

  return (
    <main>
      <h1 className="text-5xl text-center mb-8 font-bold">
        Once Human Reset Timers
      </h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:max-w-5xl lg:mx-auto mb-8">
        {timers.map((timer, idx) => {
          const TimerIcon = iconMap[timer.iconName];

          return (
            <Timer timer={timer} key={idx}>
              <TimerIcon className={`${timer.iconColor} size-24 mx-auto`} />
            </Timer>
          );
        })}
      </div>
      <footer className="text-center text-sm">
        <p>
          Built with 💖 by{" "}
          <Link
            href="https://lindakat.com"
            className="underline text-teal-500 font-bold"
          >
            LindaKatCodes
          </Link>{" "}
          using NextJS, TailwindCSS, Luxon, and Heroicons.
        </p>
        <p>
          This is a fan made site for the game Once Human, released by NetEase,
          Inc.
        </p>
      </footer>
    </main>
  );
}
