"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task, TaskStatus } from "@utils/types";

export interface TaskState {
  tasks: Task[];
}

const saveToLocalStorage = (tasks: Task[]) => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const initialState: TaskState = {
  tasks: [],
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Task[]>) {
      state.tasks = action.payload;
    },
    addItem(state, action: PayloadAction<Task>) {
      state.tasks.push(action.payload);
      saveToLocalStorage(state.tasks);
    },
    updateItem(state, action: PayloadAction<{ id: string; task: Task }>) {
      const taskExist = state.tasks.find(
        (task) => task.id === action.payload.id
      );
      if (taskExist) {
        Object.assign(taskExist, action.payload.task);
        saveToLocalStorage(state.tasks);
      }
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
        saveToLocalStorage(state.tasks);
      }
    },
    removeItem(state, action: PayloadAction<string>) {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      saveToLocalStorage(state.tasks);
    },
  },
});

export const { addItem, setItems, updateItem, updateItemStatus, removeItem } =
  taskSlice.actions;
export default taskSlice.reducer;
