import { addTask } from "./mutations/addTask";
import { deleteTask } from "./mutations/deleteTask";
import { updateTask } from "./mutations/updateTask";
import { getAllTasks } from "./queries/getAllTasks";
import { getFinishedTasksLists } from "./queries/getFinishedTasksLists";
import { getUserDoneTasksLists } from "./queries/getUserDoneTasksLists";

export const resolvers = {
  Query: {
    getAllTasks,
    getFinishedTasksLists,
    getUserDoneTasksLists,
  },
  Mutation: {
    addTask,
    updateTask,
    deleteTask,
  },
};
