"use client";

import { FC, useState } from "react";

import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { useTask } from "@hooks";
import { TaskStatus } from "@utils/types";

import Drawer from "@components/drawer";

import { columns } from "../../../../data";
import Board from "./board";
import TaskForm from "./task-form";
import TaskOperate from "./task-operate";

const ViewTasks: FC = () => {
  const { allTasks, updateTask } = useTask();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [drawerType, setDrawerType] = useState("NEW");

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id as string;
    const newStatus = over.id as TaskStatus;

    updateTask(taskId, newStatus);
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="flex h-screen gap-4 p-4">
        {columns.map((column) => {
          return (
            <Board
              key={column.id}
              column={column}
              onOpenDrawer={() => setOpenDrawer(true)}
              setDrawerType={setDrawerType}
              tasks={allTasks.filter((task) => task.status === column.id)}
              count={
                allTasks.filter((task) => task.status === column.id).length
              }
            />
          );
        })}
        <Drawer
          title={drawerType === "NEW" ? "Create New Task" : "Edit Task"}
          isOpen={openDrawer}
          onCloseDrawer={() => setOpenDrawer(false)}
        >
          {drawerType === "NEW" ? null : <TaskOperate />}
          <TaskForm setOpenDrawer={setOpenDrawer} />
        </Drawer>
      </div>
    </DndContext>
  );
};

export default ViewTasks;
