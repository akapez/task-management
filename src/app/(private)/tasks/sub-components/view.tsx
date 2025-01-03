import { FC } from "react";

import Board from "./board";

const ViewTasks: FC = () => {
  return (
    <div className="flex h-screen gap-4 p-4">
      <Board title="Todo" cards={["Card 1", "Card 2", "Card 3"]} />
      <Board title="In Progress" cards={["Card A", "Card B"]} />
      <Board title="Completed" cards={["Card X"]} />
    </div>
  );
};

export default ViewTasks;
