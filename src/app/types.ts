/* NOTE: all hours should be listed in 24 time */
interface WeeklyTimer {
  name: string;
  type: "weekly";
  iconName: string;
  borderColor: string;
  iconColor: string;
  resetDate: {
    weekday: string;
    hour: number;
    minutes?: number;
  };
}

interface HourlyTimer {
  name: string;
  type: "hourly";
  iconName: string;
  borderColor: string;
  iconColor: string;
  resetTimes: Array<number>;
}

export type ArrayOfTimers = Array<WeeklyTimer | HourlyTimer>;
export type TimerType = WeeklyTimer | HourlyTimer;
