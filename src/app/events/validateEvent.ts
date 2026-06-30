export function localTodayString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function validateEventInput({
  title,
  date,
  endDate,
  startTime,
  endTime,
}: {
  title: string;
  date: string;
  endDate: string;
  startTime: string;
  endTime: string;
}): string | null {
  const today = localTodayString();

  if (!title || title.trim() === "") {
    return "Please enter an event name.";
  }

  if (!date) {
    return "Please choose a date.";
  }

  if (date < today) {
    return "Date can't be in the past.";
  }

  const finalEndDate = endDate ? endDate : date;

  if (finalEndDate < date) {
    return "End date can't be before the start date.";
  }

  if (endTime && !startTime) {
    return "Please add a start time before the end time.";
  }

  if (startTime && endTime) {
    const start = `${date}T${startTime}`;
    const end = `${finalEndDate}T${endTime}`;
    if (end <= start) {
      return "The event must end after it starts.";
    }
  }

  return null;
}