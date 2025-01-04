"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task, TaskStatus } from "@utils/types";

export interface TaskState {
  tasks: Task[];
}

const getLocalStorageData = (): Task[] => {
  const storedTasks = localStorage.getItem("tasks");
  return storedTasks ? JSON.parse(storedTasks) : [];
};

const addToLocalStorage = (tasks: Task[]) => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const initialState: TaskState = {
  tasks: getLocalStorageData(),
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<Task>) {
      state.tasks.push(action.payload);
      addToLocalStorage(state.tasks);
    },
    updateItemStatus: (
      state,
      action: PayloadAction<{
        id: string;
        status: TaskStatus;
      }>
    ) => {
      const { id, status } = action.payload;
      const task = state.tasks.find((task) => task.id === id);
      if (task) {
        task.status = status;
        localStorage.setItem("tasks", JSON.stringify(state.tasks));
      }
    },
  },
});

export const { addItem, updateItemStatus } = taskSlice.actions;
export default taskSlice.reducer;
