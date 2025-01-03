export type Task = {
  id: number;
  title: string;
  description: string;
  avatar_url: string;
  status: "TODO" | "IN_PROGRESS" | "COMPLETED";
  due_date: number;
  assignee: string;
  priority: "LOW" | "MEDIUM" | "HIGH";
};
