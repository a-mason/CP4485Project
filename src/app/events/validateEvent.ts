export function validateEventInput({
  date,
  startTime,
  endTime,
}: {
  date: string;
  startTime: string;
  endTime: string;
}): string | null {
  const today = new Date().toISOString().slice(0, 10);

  if (date < today) {
    return "Date can't be in the past.";
  }

  if (startTime && endTime && startTime >= endTime) {
    return "Start time must be before end time.";
  }

  return null;
}
