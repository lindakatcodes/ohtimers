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

    // ensure if we're past the reset day or on the same day and past the reset hour, we move to the next week. important that we use weekday here and move forward a week - otherwise things get a little off and you start to see negative timers
    if (
      currentDT.weekday > resetDate.weekday ||
      (currentDT.weekday === resetDate.weekday &&
        currentDT.hour >= resetDate.hour)
    ) {
      resetDate = resetDate.plus({ weeks: 1 });
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
