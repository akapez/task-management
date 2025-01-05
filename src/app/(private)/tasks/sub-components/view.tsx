"use client";

import { FC, Fragment, useState } from "react";

import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { useTask, useToast } from "@hooks";
import { Task, TaskStatus } from "@utils/types";

import Dialog from "@components/dialog";

import { columns } from "../../../../data";
import Board from "./board";
import Drawer from "./drawer";
import TaskForm from "./task-form";

const ViewTasks: FC = () => {
  const { toast } = useToast();
  const { allTasks, updateTaskStatus, deleteTask } = useTask();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [drawerType, setDrawerType] = useState("NEW");
  const [taskDetails, setTaskDetails] = useState<Task | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
    const taskId = active.id as string;
    const newStatus = over.id as TaskStatus;
    updateTaskStatus(taskId, newStatus);
  };

  const handleDeleteTask = () => {
    if (taskDetails) {
      deleteTask(taskDetails.id);
    }
    setOpenDialog(false);
    toast({ title: "Task deleted" });
  };

  const handleChangeStatus = () => {
    if (taskDetails) {
      updateTaskStatus(taskDetails.id, "COMPLETED");
    }
    setOpenDrawer(false);
    toast({ title: "Status changed" });
  };

  return (
    <Fragment>
      <DndContext onDragEnd={handleDragEnd}>
        <div className="flex h-screen gap-4 p-4">
          {columns.map((column) => {
            return (
              <Board
                key={column.id}
                column={column}
                onOpenDrawer={() => setOpenDrawer(true)}
                setDrawerType={setDrawerType}
                setTaskDetails={setTaskDetails}
                tasks={allTasks.filter((task) => task.status === column.id)}
                count={
                  allTasks.filter((task) => task.status === column.id).length
                }
              />
            );
          })}
        </div>
      </DndContext>
      <Drawer
        onChangeStatus={handleChangeStatus}
        isCompleted={taskDetails?.status === "COMPLETED"}
        onOpenDelete={() => setOpenDialog(true)}
        drawerType={drawerType}
        isOpen={openDrawer}
        onCloseDrawer={() => setOpenDrawer(false)}
      >
        <TaskForm
          taskData={taskDetails}
          setOpenDrawer={setOpenDrawer}
          drawerType={drawerType}
        />
      </Drawer>
      <Dialog
        title="Are you sure you want to delete selected task?"
        description="This will permanently delete the selected task. These items will no longer be accessible to you. This action is irreversible."
        openDialog={openDialog}
        onCancel={() => setOpenDialog(false)}
        onConfirm={handleDeleteTask}
        actionButtonName="Yes, delete"
        variant="destructive"
      />
    </Fragment>
  );
};

export default ViewTasks;
