import { FC } from "react";

import { Task } from "@utils/types";

import { data } from "../../../../data";
import Board from "./board";

const ViewTasks: FC = () => {
  const todoTasks = data.filter((task) => task.status === "TODO");
  const inProgressTasks = data.filter((task) => task.status === "IN_PROGRESS");
  const completedTasks = data.filter((task) => task.status === "COMPLETED");

  return (
    <div className="flex h-screen gap-4 p-4">
      <Board title="Todo" tasks={todoTasks} />
      <Board title="In Progress" tasks={inProgressTasks} />
      <Board title="Completed" tasks={completedTasks} />
    </div>
  );
};

export default ViewTasks;
