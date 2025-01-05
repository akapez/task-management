import { FC, Fragment } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTask, useToast } from "@hooks";
import { cn } from "@lib/utils";
import { Task, TaskPriority, TaskStatus } from "@utils/types";
import { taskSchema, TaskSchema } from "@validations/task";
import { format } from "date-fns";
import { Calendar2, DocumentText, Flag, Record, User } from "iconsax-react";
import { CalendarIcon, Loader2 } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

import { Avatar, AvatarImage } from "@components/ui/avatar";
import { Button } from "@components/ui/button";
import { Calendar } from "@components/ui/calender";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { Input } from "@components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import { Textarea } from "@components/ui/text-area";

import { users } from "../../../../data";

interface TaskFormProps {
  taskData: Task | null;
  drawerType: string;
  setOpenDrawer: (state: boolean) => void;
}

const TaskForm: FC<TaskFormProps> = ({
  taskData,
  drawerType,
  setOpenDrawer,
}) => {
  const { toast } = useToast();
  const { addTask, updateTask } = useTask();
  const form = useForm<TaskSchema>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: taskData ? taskData.title : "",
      description: taskData ? taskData.description : "",
      status: taskData?.status && taskData.status,
      due_date: taskData ? new Date(taskData.due_date * 1000) : undefined,
      assignee: taskData?.assignee && taskData.assignee,
      priority: taskData?.priority && taskData.priority,
    },
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<TaskSchema> = async (data) => {
    const date = new Date(data.due_date);
    const unixTimestamp = Math.floor(date.getTime() / 1000);
    const task = {
      title: data.title,
      description: data.description,
      status: data.status as TaskStatus,
      due_date: unixTimestamp,
      assignee: data.assignee,
      priority: data.priority as TaskPriority,
    };

    setOpenDrawer(false);
    if (drawerType === "NEW") {
      const newTask: Task = {
        id: uuidv4(),
        ...task,
      };
      addTask(newTask);
      toast({ title: "Task created" });
    } else {
      const taskId = taskData?.id || "";
      const oldTask: Task = {
        id: taskId,
        ...task,
      };
      updateTask(taskId, oldTask);
      toast({ title: "Task updated" });
    }
  };

  return (
    <Fragment>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-2">
            <FormField
              control={control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      id="title"
                      type="text"
                      placeholder="Title"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="space-y-3 py-5">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem className="flex flex-row justify-between">
                    <FormLabel
                      htmlFor="status"
                      className="flex flex-row items-center gap-2 text-dark-300"
                    >
                      <Record size="20" color="#727272" />
                      Status
                    </FormLabel>
                    <div className="flex flex-col">
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl className="w-60">
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent id="status">
                          <SelectItem value="TODO">
                            <div className="flex flex-row gap-2">
                              <Record size="18" color="#FF8A65" />
                              Todo
                            </div>
                          </SelectItem>
                          <SelectItem value="IN_PROGRESS">
                            <div className="flex flex-row gap-2">
                              <Record size="18" color="#0C6FBF" />
                              In Progress
                            </div>
                          </SelectItem>
                          <SelectItem value="COMPLETED">
                            <div className="flex flex-row gap-2">
                              <Record size="18" color="#2A7E2E" />
                              Completed
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="due_date"
                render={({ field }) => (
                  <FormItem className="flex flex-row justify-between">
                    <FormLabel className="flex flex-row items-center gap-2 text-dark-300">
                      <Calendar2 size="20" color="#727272" />
                      Due Date
                    </FormLabel>
                    <div className="flex flex-col">
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-60 pl-3 text-left font-normal text-primary-500",
                                !field.value && "text-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "d MMMM yyyy")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0" align="start">
                          <Calendar
                            id="due_date"
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date < new Date("1900-01-01")}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="assignee"
                render={({ field }) => (
                  <FormItem className="flex flex-row justify-between">
                    <FormLabel
                      htmlFor="assignee"
                      className="flex flex-row items-center gap-2 text-dark-300"
                    >
                      <User size="20" color="#727272" />
                      Assignee
                    </FormLabel>
                    <div className="flex flex-col">
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl className="w-60">
                          <SelectTrigger>
                            <SelectValue placeholder="Select assignee" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent id="assignee">
                          {users.map((user) => (
                            <SelectItem key={user.id} value={user.id}>
                              <div className="flex items-center space-x-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarImage
                                    src={user.avatar_url}
                                    alt={user.name}
                                  />
                                </Avatar>
                                <span>{user.name}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem className="flex flex-row justify-between">
                    <FormLabel
                      htmlFor="priority"
                      className="flex flex-row items-center gap-2 text-dark-300"
                    >
                      <Flag size="20" color="#727272" />
                      Priority
                    </FormLabel>
                    <div className="flex flex-col">
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl className="w-60">
                          <SelectTrigger>
                            <SelectValue placeholder="Select priority" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent id="priority">
                          <SelectItem value="LOW">Low</SelectItem>
                          <SelectItem value="MEDIUM">Medium</SelectItem>
                          <SelectItem value="HIGH">High</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    htmlFor="description"
                    className="flex flex-row items-center gap-2 text-dark-300"
                  >
                    <DocumentText size="20" color="#727272" />
                    Description
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      id="description"
                      placeholder="Description"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            disabled={isSubmitting}
            id="sign-up-btn"
            className={`w-full text-primary-foreground ${drawerType === "NEW" ? "bg-primary-500 hover:bg-primary-500/90" : "bg-tertiary-600 hover:bg-tertiary-600/90"}`}
            type="submit"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin" />
                Please wait
              </>
            ) : drawerType === "NEW" ? (
              "Create"
            ) : (
              "Update"
            )}
          </Button>
        </form>
      </Form>
    </Fragment>
  );
};

export default TaskForm;
