import { Column, Task, User } from "@utils/types";

export const data: Task[] = [
  {
    id: "001",
    title: "Project setup and basic components",
    description: "lorem ipsum dolor sit amet consectetur adipisicing elit",
    status: "IN_PROGRESS",
    due_date: 1735084800,
    assignee: "bcc7f656-96bf-4c04-8d0b-fe61956d5e8b",
    priority: "HIGH",
  },
  {
    id: "002",
    title: "Add authentication",
    description: "lorem ipsum dolor sit amet consectetur adipisicing elit",
    status: "TODO",
    due_date: 1737590400,
    assignee: "9766194f-d59f-48f7-b654-710a54d5b4ad",
    priority: "MEDIUM",
  },
  {
    id: "003",
    title: "Add database",
    description: "lorem ipsum dolor sit amet consectetur adipisicing elit",
    status: "COMPLETED",
    due_date: 1727827200,
    assignee: "4db6a5d9-e169-42d5-8a69-b86b813a9456",
    priority: "LOW",
  },
];

export const users: User[] = [
  {
    id: "bcc7f656-96bf-4c04-8d0b-fe61956d5e8b",
    name: "John Doe",
    avatar_url: "https://avatars.githubusercontent.com/u/1?v=4",
  },
  {
    id: "9766194f-d59f-48f7-b654-710a54d5b4ad",
    name: "Sam Smith",
    avatar_url: "https://avatars.githubusercontent.com/u/2?v=4",
  },
  {
    id: "4db6a5d9-e169-42d5-8a69-b86b813a9456",
    name: "Mark Johnson",
    avatar_url: "https://avatars.githubusercontent.com/u/3?v=4",
  },
];

export const columns: Column[] = [
  { id: "TODO", title: "To Do" },
  { id: "IN_PROGRESS", title: "In Progress" },
  { id: "COMPLETED", title: "Completed" },
];
