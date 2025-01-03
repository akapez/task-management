"use client";

import { FC } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@lib/utils";
import {
  Diagram,
  Home,
  LampCharge,
  NotificationBing,
  Setting2,
  TaskSquare,
} from "iconsax-react";

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Tasks", href: "/tasks", icon: TaskSquare },
  { name: "Report", href: "/reports", icon: Diagram },
  { name: "Insights", href: "/insights", icon: LampCharge },
  { name: "Inbox", href: "/inbox", icon: NotificationBing },
  { name: "Settings", href: "/settings", icon: Setting2 },
];

const LeftNavigation: FC = () => {
  const pathname = usePathname();

  return (
    <>
      <nav className="fixed bottom-0 left-0 top-16 z-40 w-60 shrink-0 border-r border-gray-200 bg-white shadow-md">
        <div className="flex h-full flex-col">
          <ul className="mx-2 flex-grow py-3">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={cn(
                    "text-dark-400 m-3 flex items-center rounded-md bg-gray-100 px-4 py-2 font-semibold hover:bg-gray-300",
                    pathname === item.href &&
                      "bg-primary-500 hover:bg-primary-500 text-white"
                  )}
                >
                  <item.icon
                    size="24"
                    color={pathname === item.href ? "#FFFFFF" : "#474747"}
                    className="mr-4"
                  />
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default LeftNavigation;
