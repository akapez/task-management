import { FC } from "react";

import { useDroppable } from "@dnd-kit/core";
import { Column, Task } from "@utils/types";
import { Add, Record } from "iconsax-react";
import { motion } from "motion/react";

import { Button } from "@components/ui/button";

import { users } from "../../../../data";
import TaskCard from "./task-card";

interface BoardProps {
  column: Column;
  tasks: Task[];
  count: number;
  onOpenDrawer: () => void;
  setDrawerType: (title: string) => void;
  setTaskDetails: (task: Task | null) => void;
}

const Board: FC<BoardProps> = ({
  column,
  tasks,
  count,
  onOpenDrawer,
  setDrawerType,
  setTaskDetails,
}) => {
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
  });
  let circleColor: string = "#FF8A65";
  switch (column.id) {
    case "TODO":
      circleColor = "#FF8A65";
      break;
    case "IN_PROGRESS":
      circleColor = "#0C6FBF";
      break;
    case "COMPLETED":
      circleColor = "#2A7E2E";
      break;
    default:
      circleColor = "#FF8A65";
      break;
  }

  const handleDrawerOpen = (status: string) => {
    setTaskDetails(null);
    setDrawerType(status);
    onOpenDrawer();
  };

  const handleTask = (task: Task) => {
    setTaskDetails(task);
    setDrawerType("EDIT");
    onOpenDrawer();
  };

  return (
    <motion.div
      ref={setNodeRef}
      className="flex w-1/3 flex-col rounded-lg border-2 p-4"
      animate={{
        borderColor: isOver ? "#0247B3" : "#C8C8C8",
        borderStyle: isOver ? "solid" : "dashed",
        boxShadow: isOver ? "0px 4px 20px #6298EB" : "none",
      }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
    >
      <div className="flex items-center justify-between rounded-lg bg-white px-4 py-4 shadow-sm">
        <div className="flex items-center gap-2">
          <Record size="32" color={circleColor} />
          <h2 className="text-base font-bold text-gray-900">{column.title}</h2>
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary-50 px-2 text-xs font-semibold text-primary-500">
            {count}
          </span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Add Task"
          onClick={() => handleDrawerOpen("NEW")}
        >
          <Add size="32" color="#1C1C1C" />
        </Button>
      </div>
      <div className="mt-4 flex flex-col gap-4">
        {tasks.map((task) => {
          const assigneeDetails = users.find(
            (user) => user.id === task.assignee
          );
          return (
            <TaskCard
              onOpenDrawer={() => handleTask(task)}
              key={task.id}
              id={task.id}
              title={task.title}
              description={task.description}
              date={task.due_date}
              priority={task.priority}
              status={task.status}
              avatarUrl={assigneeDetails?.avatar_url || ""}
            />
          );
        })}
        <Button
          variant="ghost"
          aria-label="Add Task"
          onClick={() => handleDrawerOpen("NEW")}
        >
          <Add size="32" color="#1C1C1C" />
          Add task
        </Button>
      </div>
    </motion.div>
  );
};

export default Board;
