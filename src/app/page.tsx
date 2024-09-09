interface WeeklyTimer {
  name: string;
  type: "weekly";
  resetDate: Date;
}

interface HourlyTimer {
  name: string;
  type: "hourly";
  resetTimes: Array<number>;
}

type TimerTypes = Array<WeeklyTimer | HourlyTimer>;

export default function Home() {
  const timers: TimerTypes = [
    {
      name: "Purification",
      type: "weekly",
      resetDate: new Date("2024-09-09T07:00:00"),
    },
    {
      name: "Vendors",
      type: "weekly",
      resetDate: new Date("2024-09-15T09:00:00"),
    },
    {
      name: "Commissions",
      type: "weekly",
      resetDate: new Date("2024-09-15T09:00:00"),
    },
    {
      name: "Loot Crates",
      type: "hourly",
      resetTimes: [3, 7, 11],
    },
  ];

  return (
    <main>
      <h1>Hello world</h1>
      {timers.map((timer, idx) => (
        <div key={idx}>
          <p>{timer.name}</p>
          <p>
            {timer.type === "weekly"
              ? timer.resetDate.toString()
              : timer.resetTimes[0]}
          </p>
        </div>
      ))}
    </main>
  );
}
