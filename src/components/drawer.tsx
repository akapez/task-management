"use client";

import React, { FC, useEffect } from "react";

import { ArrowRight } from "iconsax-react";

import { Button } from "./ui/button";

interface DrawerProps {
  title: string;
  isOpen: boolean;
  onCloseDrawer: () => void;
  children: React.ReactNode;
}

const Drawer: FC<DrawerProps> = ({
  title,
  isOpen,
  onCloseDrawer,
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

  console.log("Drawer rendered");

  return (
    <div className="fixed inset-0 z-50 flex">
      <div
        className="absolute inset-0 bg-dark-500 bg-opacity-75 transition-opacity"
        onClick={onCloseDrawer}
        aria-hidden="true"
      />
      <section
        className="relative ml-auto flex h-full w-screen max-w-md flex-col bg-white shadow-xl"
        aria-labelledby="drawer-title"
      >
        <div className="flex items-center justify-between border-b border-gray-200 p-6">
          <h2 id="drawer-title" className="text-lg font-semibold text-gray-900">
            {title}
          </h2>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Close Drawer"
            onClick={onCloseDrawer}
          >
            <ArrowRight size="32" color="#1C1C1C" />
          </Button>
        </div>
        <div className="flex-1 overflow-y-auto p-6">{children}</div>
      </section>
    </div>
  );
};

export default Drawer;
