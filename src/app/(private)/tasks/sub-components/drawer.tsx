import React, { FC, useEffect } from "react";

import { ArrowRight, TickCircle, Trash } from "iconsax-react";

import { Button } from "@components/ui/button";

interface DrawerProps {
  isCompleted: boolean;
  drawerType: string;
  isOpen: boolean;
  onCloseDrawer: () => void;
  onOpenDelete: () => void;
  onChangeStatus: () => void;
  children: React.ReactNode;
}

const Drawer: FC<DrawerProps> = ({
  isCompleted,
  drawerType,
  isOpen,
  onCloseDrawer,
  onOpenDelete,
  onChangeStatus,
  children,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleConfirmDelete = () => {
    onCloseDrawer();
    onOpenDelete();
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      <div
        className="absolute inset-0 bg-black/80 transition-opacity"
        onClick={onCloseDrawer}
        aria-hidden="true"
      />
      <section
        className="relative ml-auto flex h-full w-screen max-w-md flex-col bg-white shadow-xl"
        aria-labelledby="drawer-title"
      >
        <div className="flex items-center justify-between border-b border-gray-200 p-6">
          {drawerType === "EDIT" && (
            <Button
              variant="outline"
              onClick={onChangeStatus}
              disabled={isCompleted}
            >
              <TickCircle
                size="24"
                color={isCompleted ? "#2A7E2E" : "#1C1C1C"}
                variant={isCompleted ? "Bold" : "Outline"}
              />
              {isCompleted ? "Completed" : "Mark Complete"}
            </Button>
          )}
          <div className="flex w-full justify-end space-x-3">
            {drawerType === "EDIT" && (
              <Button
                variant="ghost"
                size="icon"
                aria-label="Delete Task"
                onClick={handleConfirmDelete}
              >
                <Trash size="32" color="#1C1C1C" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              aria-label="Close Drawer"
              onClick={onCloseDrawer}
            >
              <ArrowRight size="32" color="#1C1C1C" />
            </Button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-6">{children}</div>
      </section>
    </div>
  );
};

export default Drawer;
