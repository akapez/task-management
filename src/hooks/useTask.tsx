import { addItem, updateItemStatus } from "@redux/reducers/taskReducer";
import {
  selectAllTaskItems,
  selectCompletedItems,
  selectInProgressItems,
  selectTodoItems,
} from "@redux/selectors/taskSelector";
import { Task, TaskStatus } from "@utils/types";
import { useDispatch, useSelector } from "react-redux";

export const useTask = () => {
  const dispatch = useDispatch();

  const allTasks = useSelector(selectAllTaskItems);
  const todoTasks = useSelector(selectTodoItems);
  const inProgressTasks = useSelector(selectInProgressItems);
  const completedTasks = useSelector(selectCompletedItems);

  const addTask = (task: Task) => {
    dispatch(addItem(task));
  };

  const updateTask = (id: string, status: TaskStatus) => {
    dispatch(updateItemStatus({ id, status }));
  };

  return {
    addTask,
    updateTask,
    allTasks,
    todoTasks,
    inProgressTasks,
    completedTasks,
  };
};
