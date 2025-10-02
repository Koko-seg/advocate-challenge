import Task from "@models/Task";

export const getFinishedTasksLists = async () => {
  return await Task.find({ isFinished: true, isDeleted: false });
};
