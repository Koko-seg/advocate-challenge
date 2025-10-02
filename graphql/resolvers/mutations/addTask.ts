import TaskModel from "@models/Task";

interface AddTask {
  taskName: string;
  description: string;
  isDone?: boolean;
  priority?: number;
  tags?: string[];
  userId: string;
}

export const addTask = async (_: any, args: AddTask) => {
  const {
    taskName,
    description,
    isDone = false,
    priority,
    tags = [],
    userId,
  } = args;

  if (taskName === description) {
    throw new Error("Description cannot be the same as taskName");
  }

  const existing = await TaskModel.findOne({ taskName, userId });
  if (existing) {
    throw new Error("Task name must be unique per user");
  }

  if (priority && (priority < 1 || priority > 5)) {
    throw new Error("Priority must be between 1 and 5");
  }

  if (tags.length > 5) {
    throw new Error("Maximum 5 tags allowed");
  }
  if (description.length < 10) {
    throw new Error("Description must be at least 10 characters long.");
  }

  const task = new TaskModel({
    taskName,
    description,
    isDone,
    priority,
    tags,
    userId,
  });

  return await task.save();
};
