import { TimerType } from "./types";
import { DateTime as dt } from "luxon";

export function getWeekday(day: string) {
  switch (day) {
    case "Monday":
      return 1;
    case "Tuesday":
      return 2;
    case "Wednesday":
      return 3;
    case "Thursday":
      return 4;
    case "Friday":
      return 5;
    case "Saturday":
      return 6;
    case "Sunday":
      return 7;
    default:
      return 1;
  }
}

export function getCountdown(timer: TimerType) {
  const currentDT = dt.now();
  let countdown = "";

  if (timer.type === "weekly") {
    const weekday = getWeekday(timer.resetDate.weekday);

    let resetDate = dt.fromObject({
      weekday,
      hour: timer.resetDate.hour,
      minute: timer.resetDate.minutes || 0,
    });

    // date must be in the future - so if we're already past the day and hour, we need to update the reset date to be the next possible value
    if ((currentDT.day === resetDate.day && currentDT.hour >= resetDate.hour) || currentDT.day > resetDate.day) {
      const weekAheadOfReset = resetDate.plus({ days: 7 });
      const daysToMove = weekAheadOfReset.day - resetDate.day;
      resetDate = resetDate.plus({ days: daysToMove });
    }

    countdown = resetDate
      .diffNow(["days", "hours", "minutes", "seconds"])
      .toFormat("dd:hh:mm:ss");
  } else {
    const currentHour = currentDT.get("hour");
    const currentDay = currentDT.get("day");
    const nextHour =
      timer.resetTimes.find((val) => val > currentHour) || timer.resetTimes[0];
    const increaseDay = nextHour === 3 && currentHour >= 23;
    const resetTime = dt.fromObject({
      day: increaseDay ? currentDay + 1 : currentDay,
      hour: nextHour,
    });
    countdown = resetTime
      .diffNow(["hours", "minutes", "seconds"])
      .toFormat("hh:mm:ss");
  }
  return countdown;
}
