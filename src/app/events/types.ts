export type TravelEvent = {
  _id: string;
  title: string;
  description: string;
  category: EventCategory;
  location: string;
  date: string;
  startTime: string;
  endTime: string;
  url: string;
  submittedBy: string;
  createdAt: string;
};

export const EVENT_CATEGORIES = [
  "Music",
  "Food & Drink",
  "Festival",
  "Outdoors",
  "Arts",
  "Community",
  "Sports",
  "Other",
] as const;

export type EventCategory = (typeof EVENT_CATEGORIES)[number];
