import { FC } from "react";

import { Add, Record } from "iconsax-react";

import { Button } from "@components/ui/button";

interface ColumnProps {
  title: string;
  cards: string[];
}

const Board: FC<ColumnProps> = ({ title, cards }) => {
  let circleColor: string = "#FF8A65";
  switch (title) {
    case "Todo":
      circleColor = "#FF8A65";
      break;
    case "In Progress":
      circleColor = "#0C6FBF";
      break;
    case "Completed":
      circleColor = "#2A7E2E";
      break;
    default:
      circleColor = "#FF8A65";
      break;
  }
  return (
    <div className="border-dark-100 flex w-1/3 flex-col rounded-lg border-2 border-dashed p-4">
      <div className="flex items-center justify-between rounded-lg bg-white px-4 py-4 shadow-sm">
        <div className="flex items-center gap-2">
          <Record size="32" color={circleColor} />
          <h2 className="text-base font-bold text-gray-900">{title}</h2>
          <span className="bg-primary-50 text-primary-500 flex h-5 w-5 items-center justify-center rounded-full px-2 text-xs font-semibold">
            4
          </span>
        </div>
        <Button variant="ghost" size="icon" aria-label="Add Task">
          <Add size="32" color="#1C1C1C" />
        </Button>
      </div>
      <div className="mt-4 flex flex-col gap-4">
        {cards.map((card, index) => (
          <div key={index} className="rounded bg-blue-50 p-4 shadow-sm">
            {card}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Board;
