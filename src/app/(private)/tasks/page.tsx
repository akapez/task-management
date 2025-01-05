import { Metadata } from "next";

import ViewTasks from "./sub-components/view";

export const metadata: Metadata = {
  title: "Tasks",
};

const TasksPage = () => {
  return <ViewTasks />;
};

export default TasksPage;
