import { FC, Fragment } from "react";

import { useDraggable } from "@dnd-kit/core";
import { formattedDueDate, getDueDateMessage } from "@utils/helpers";
import { TaskPriority, TaskStatus } from "@utils/types";
import { Clock, TickCircle } from "iconsax-react";

import { Avatar, AvatarImage } from "@components/ui/avatar";
import { Badge } from "@components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@components/ui/card";
import { Separator } from "@components/ui/separator";

interface TaskCardProps {
  id: string;
  status: TaskStatus;
  title: string;
  description: string;
  date: number;
  priority: TaskPriority;
  avatarUrl: string;
  onOpenDrawer: () => void;
}

const TaskCard: FC<TaskCardProps> = ({
  id,
  status,
  title,
  description,
  date,
  priority,
  avatarUrl,
  onOpenDrawer,
}) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
  });
  let badgeColor: string = "bg-blue-100 text-blue-500 hover:bg-blue-100";
  switch (priority) {
    case "LOW":
      badgeColor = "bg-blue-100 text-blue-500 hover:bg-blue-100";
      break;
    case "MEDIUM":
      badgeColor = "bg-orange-100 text-orange-500 hover:bg-orange-100";
      break;
    case "HIGH":
      badgeColor = "bg-red-100 text-red-500 hover:bg-red-100";
      break;
    default:
      badgeColor = "bg-blue-100 text-blue-500 hover:bg-blue-100";
      break;
  }

  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
      }
    : undefined;

  return (
    <Card
      // onClick={onOpenDrawer}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="w-full cursor-grab"
      style={style}
    >
      <CardHeader className="flex-row items-start gap-2 space-y-0">
        <TickCircle
          size="24"
          color={status === "COMPLETED" ? "#2A7E2E" : "#1C1C1C"}
          variant={status === "COMPLETED" ? "Bold" : "Outline"}
        />
        <h3 className="text-xl font-semibold leading-none text-dark-500">
          {title}
        </h3>
      </CardHeader>
      <Separator />
      <CardContent>
        <p className="mb-5 mt-3 text-sm text-dark-400">{description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={avatarUrl} alt="Avatar" />
            </Avatar>
            <span className="text-sm font-medium text-dark-400">
              {formattedDueDate(date)}
            </span>
          </div>
          <Badge variant="secondary" className={badgeColor}>
            {priority}
          </Badge>
        </div>
      </CardContent>
      {status !== "COMPLETED" && (
        <Fragment>
          <Separator />
          <CardFooter className="pt-1">
            <div className="flex items-center gap-1 pt-3 text-sm text-dark-500">
              <Clock size="16" color="#1C1C1C" />
              <span>{getDueDateMessage(date)}</span>
            </div>
          </CardFooter>
        </Fragment>
      )}
    </Card>
  );
};

export default TaskCard;
