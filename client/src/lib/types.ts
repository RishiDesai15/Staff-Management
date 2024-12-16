export interface Staff {
  id: number;
  name: string;
  role: string;
  color: string;
}

export interface TimeSlot {
  staffId: number;
  startTime: string;
  endTime: string;
  dayOfWeek: string;
}

export const STAFF_LIST: Staff[] = [
  { id: 1, name: "Pharmacist 1", role: "Pharmacist1", color: "bg-blue-100" },
  { id: 2, name: "Pharmacist 2", role: "Pharmacist2", color: "bg-green-100" },
  { id: 3, name: "Technician 1", role: "Technician", color: "bg-orange-100" },
  { id: 4, name: "Assistant 1", role: "Assistant1", color: "bg-yellow-100" },
  { id: 5, name: "Assistant 2", role: "Assistant2", color: "bg-pink-100" }
];

export const DAYS_OF_WEEK = [
  "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
];
