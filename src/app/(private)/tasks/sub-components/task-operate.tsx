import { FC } from "react";

import { TickCircle, Trash } from "iconsax-react";

import { Button } from "@components/ui/button";

const TaskOperate: FC = () => {
  return (
    <div className="mb-5 flex flex-row justify-between">
      <Button variant="outline">
        <TickCircle size="24" color="#1C1C1C" /> Mark Complete
      </Button>
      <Button
        variant="ghost"
        size="icon"
        aria-label="Delete Task"
        onClick={() => {}}
      >
        <Trash size="32" color="#1C1C1C" />
      </Button>
    </div>
  );
};

export default TaskOperate;
