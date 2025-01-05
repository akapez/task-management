"use client";

import { useEffect } from "react";

import {
  addItem,
  removeItem,
  setItems,
  updateItem,
  updateItemStatus,
} from "@redux/reducers/taskReducer";
import { selectAllTaskItems } from "@redux/selectors/taskSelector";
import { Task, TaskStatus } from "@utils/types";
import { useDispatch, useSelector } from "react-redux";

export const useTask = () => {
  const dispatch = useDispatch();

  const allTasks = useSelector(selectAllTaskItems);

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    const tasks = storedTasks ? JSON.parse(storedTasks) : [];
    dispatch(setItems(tasks));
  }, []);

  const addTask = (task: Task) => {
    dispatch(addItem(task));
  };

  const updateTask = (id: string, task: Task) => {
    dispatch(updateItem({ id, task }));
  };

  const updateTaskStatus = (id: string, status: TaskStatus) => {
    dispatch(updateItemStatus({ id, status }));
  };

  const deleteTask = (id: string) => {
    dispatch(removeItem(id));
  };

  return {
    addTask,
    updateTask,
    updateTaskStatus,
    deleteTask,
    allTasks,
  };
};
