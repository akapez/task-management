import { FC } from "react";

import { Task } from "@utils/types";
import { Add, Record } from "iconsax-react";

import { Button } from "@components/ui/button";

import TaskCard from "./task-card";

interface ColumnProps {
  title: string;
  tasks: Task[];
}

const Board: FC<ColumnProps> = ({ title, tasks }) => {
  let circleColor: string = "#FF8A65";
  switch (title) {
    case "Todo":
      circleColor = "#FF8A65";
      break;
    case "In Progress":
      circleColor = "#0C6FBF";
      break;
    case "Completed":
      circleColor = "#2A7E2E";
      break;
    default:
      circleColor = "#FF8A65";
      break;
  }
  return (
    <div className="flex w-1/3 flex-col rounded-lg border-2 border-dashed border-dark-100 p-4">
      <div className="flex items-center justify-between rounded-lg bg-white px-4 py-4 shadow-sm">
        <div className="flex items-center gap-2">
          <Record size="32" color={circleColor} />
          <h2 className="text-base font-bold text-gray-900">{title}</h2>
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary-50 px-2 text-xs font-semibold text-primary-500">
            4
          </span>
        </div>
        <Button variant="ghost" size="icon" aria-label="Add Task">
          <Add size="32" color="#1C1C1C" />
        </Button>
      </div>
      <div className="mt-4 flex flex-col gap-4">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            title={task.title}
            description={task.description}
            date={task.due_date}
            priority={task.priority}
            status={task.status}
            avatarUrl={task.avatar_url}
          />
        ))}
      </div>
    </div>
  );
};

export default Board;
