import { addTask } from "./mutations/addTask";

export const resolvers = {
  Query: {},
  Mutation: {
    addTask,
  },
};
