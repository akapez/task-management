import Link from "next/link";

import { Button } from "@components/ui/button";

const Dashboard = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center rounded-md bg-gradient-to-b from-blue-100 to-white">
      <h1 className="mb-4 text-center text-4xl font-bold">
        Welcome to Task Manager
      </h1>
      <p className="mb-8 max-w-md text-center text-xl">
        This is a simple task manager application built with Next.js
      </p>
      <Link href="/tasks">
        <Button>Get Started</Button>
      </Link>
    </div>
  );
};

export default Dashboard;
