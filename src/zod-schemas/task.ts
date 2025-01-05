import { z } from "zod";

export const taskSchema = z.object({
  title: z.string().trim().min(5, {
    message: "Title must be at least five characters.",
  }),
  status: z.string({
    required_error: "Status is required.",
  }),
  due_date: z.date({
    required_error: "Due date is required.",
  }),
  priority: z.string({
    required_error: "Priority is required.",
  }),
  assignee: z.string({
    required_error: "Assignee is required.",
  }),
  description: z
    .string()
    .trim()
    .min(10, {
      message: "Description must be at least ten characters.",
    })
    .max(500, {
      message: "Description must be no longer than 500 characters.",
    }),
});

export type TaskSchema = z.infer<typeof taskSchema>;
