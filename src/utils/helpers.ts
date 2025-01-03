import {
  differenceInDays,
  format,
  isToday,
  isTomorrow,
  isYesterday,
} from "date-fns";

export const formattedDueDate = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  return format(date, "MMM d");
};

export function getRelativeDueDateMessage(timestamp: number): string {
  const dueDate = new Date(timestamp * 1000);
  const today = new Date();

  const daysDifference = differenceInDays(dueDate, today);

  if (isToday(dueDate)) {
    return "Should complete within today";
  } else if (isTomorrow(dueDate)) {
    return "Should complete within tomorrow";
  } else if (isYesterday(dueDate)) {
    return "Should’ve completed yesterday";
  } else if (daysDifference > 0) {
    return `Should complete within ${daysDifference} days`;
  } else {
    return `Should've completed ${Math.abs(daysDifference)} days ago`;
  }
}
