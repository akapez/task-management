import { createSelector } from "@reduxjs/toolkit";
import { Task } from "@utils/types";

import { RootState } from "../store";

export const selectAllTaskItems = (state: RootState) => state.tasks.tasks;

export const selectTodoItems = createSelector(
  [selectAllTaskItems],
  (tasks: Task[]) => tasks.filter((task) => task.status === "TODO")
);

export const selectInProgressItems = createSelector(
  [selectAllTaskItems],
  (tasks: Task[]) => tasks.filter((task) => task.status === "IN_PROGRESS")
);

export const selectCompletedItems = createSelector(
  [selectAllTaskItems],
  (tasks: Task[]) => tasks.filter((task) => task.status === "COMPLETED")
);
