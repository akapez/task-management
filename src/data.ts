import { Task } from "@utils/types";

export const data: Task[] = [
  {
    id: 1,
    title: "Project setup and basic components",
    description: "lorem ipsum dolor sit amet consectetur adipisicing elit",
    avatar_url: "https://avatars.githubusercontent.com/u/1?v=4",
    status: "IN_PROGRESS",
    due_date: 1735084800,
    assignee: "John Doe",
    priority: "HIGH",
  },
  {
    id: 2,
    title: "Add authentication",
    description: "lorem ipsum dolor sit amet consectetur adipisicing elit",
    avatar_url: "https://avatars.githubusercontent.com/u/2?v=4",
    status: "TODO",
    due_date: 1737590400,
    assignee: "Sam Smith",
    priority: "MEDIUM",
  },
  {
    id: 3,
    title: "Add database",
    description: "lorem ipsum dolor sit amet consectetur adipisicing elit",
    avatar_url: "https://avatars.githubusercontent.com/u/3?v=4",
    status: "COMPLETED",
    due_date: 1727827200,
    assignee: "Mark Johnson",
    priority: "LOW",
  },
];

export const users = [
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

export const priorities = ["LOW", "MEDIUM", "HIGH"];

export const statuses = ["TODO", "IN_PROGRESS", "COMPLETED"];
