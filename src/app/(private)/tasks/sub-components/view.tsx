"use client";

import { FC, useState } from "react";

import Drawer from "@components/drawer";

import { data } from "../../../../data";
import Board from "./board";
import TaskForm from "./task-form";
import TaskOperate from "./task-operate";

const ViewTasks: FC = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [drawerType, setDrawerType] = useState("NEW");

  const todoTasks = data.filter((task) => task.status === "TODO");
  const inProgressTasks = data.filter((task) => task.status === "IN_PROGRESS");
  const completedTasks = data.filter((task) => task.status === "COMPLETED");
  return (
    <div className="flex h-screen gap-4 p-4">
      <Board
        onOpenDrawer={() => setOpenDrawer(true)}
        setDrawerType={setDrawerType}
        title="Todo"
        tasks={todoTasks}
        count={todoTasks.length}
      />
      <Board
        onOpenDrawer={() => setOpenDrawer(true)}
        setDrawerType={setDrawerType}
        title="In Progress"
        tasks={inProgressTasks}
        count={inProgressTasks.length}
      />
      <Board
        onOpenDrawer={() => setOpenDrawer(true)}
        setDrawerType={setDrawerType}
        title="Completed"
        tasks={completedTasks}
        count={completedTasks.length}
      />
      <Drawer
        title={drawerType === "NEW" ? "Create New Task" : "Edit Task"}
        isOpen={openDrawer}
        onCloseDrawer={() => setOpenDrawer(false)}
      >
        {drawerType === "NEW" ? null : <TaskOperate />}
        <TaskForm />
      </Drawer>
    </div>
  );
};

export default ViewTasks;
