export interface AccessLog {
  id: string;
  type: "entry" | "exit";
  timestamp: string;
  location: string;
  status: "success" | "warning";
  notificationSent: boolean;
}

export const accessHistory: AccessLog[] = [
  {
    id: "a1",
    type: "entry",
    timestamp: "2026-03-31T07:12:45Z",
    location: "Portaria Principal",
    status: "success",
    notificationSent: true,
  },
  {
    id: "a2",
    type: "exit",
    timestamp: "2026-03-30T17:45:10Z",
    location: "Portaria Principal",
    status: "success",
    notificationSent: true,
  },
  {
    id: "a3",
    type: "entry",
    timestamp: "2026-03-30T07:05:22Z",
    location: "Portaria Principal",
    status: "success",
    notificationSent: true,
  },
  {
    id: "a4",
    type: "exit",
    timestamp: "2026-03-29T12:30:00Z",
    location: "Portaria Estacionamento",
    status: "warning", // Sendo buscado mais cedo?
    notificationSent: true,
  },
];
