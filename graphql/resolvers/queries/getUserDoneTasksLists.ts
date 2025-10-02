import Task from "@models/Task";

export const getUserDoneTasksLists = async (userId: string) => {
  return await Task.find({ userId, isDone: true, isDeleted: false });
};
