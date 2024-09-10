import type { ArrayOfTimers } from "@/types";
import { Timer } from "@/components/timer";
import { FireIcon, BanknotesIcon, NewspaperIcon, TrashIcon } from "@heroicons/react/24/outline";

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
      <h1 className="text-5xl text-center mb-4">Once Human Reset Timers</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:container lg:mx-auto">
        {timers.map((timer, idx) => {
          const TimerIcon = iconMap[timer.iconName];

          return (
            <Timer timer={timer} key={idx}>
              <TimerIcon className={`${timer.iconColor} w-28 h-28 mx-auto`} />
            </Timer>
          );
        })}
      </div>
    </main>
  );
}
