export type TaskStatus = "TODO" | "IN_PROGRESS" | "COMPLETED";

export type TaskPriority = "LOW" | "MEDIUM" | "HIGH";

export type Task = {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  due_date: number;
  priority: TaskPriority;
  assignee: string;
};

export type Column = {
  id: TaskStatus;
  title: string;
};

export type User = {
  id: string;
  name: string;
  avatar_url: string;
};
