import TaskModel from "@models/Task";

interface DeleteTaskArgs {
  taskId: string;
  userId: string;
}

export const deleteTask = async (_: any, args: DeleteTaskArgs) => {
  const { taskId, userId } = args;

  const task = await TaskModel.findById(taskId);
  if (!task) {
    throw new Error("Task not found");
  }

  if (task.userId.toString() !== userId) {
    throw new Error("Unauthorized: You can only delete your own tasks.");
  }

  task.isDeleted = true;
  return await task.save();
};
