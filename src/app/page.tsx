import type { ArrayOfTimers } from "@/types";
import { Timer } from "@/components/timer";
import { FireIcon } from "@heroicons/react/24/outline";

export default function Home() {
  const timers: ArrayOfTimers = [
    {
      name: "Purification",
      type: "weekly",
      iconName: "fire",
      resetDate: {
        weekday: "Monday",
        hour: 7,
      },
    },
    {
      name: "Vendors",
      type: "weekly",
      iconName: "fire",
      resetDate: {
        weekday: "Sunday",
        hour: 9,
      },
    },
    {
      name: "Commissions",
      type: "weekly",
      iconName: "fire",
      resetDate: {
        weekday: "Sunday",
        hour: 9,
      },
    },
    {
      name: "Loot Crates",
      type: "hourly",
      iconName: "fire",
      resetTimes: [3, 7, 11, 15, 19, 23],
    },
  ];

  const iconMap = {
    fire: FireIcon,
  };

  return (
    <main>
      <h1>Hello world</h1>
      {timers.map((timer, idx) => {
        const TimerIcon = iconMap[timer.iconName];

        return (
          <div key={idx}>
            <Timer timer={timer}>
              <TimerIcon />
            </Timer>
          </div>
        );
      })}
    </main>
  );
}
