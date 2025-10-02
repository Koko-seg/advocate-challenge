import { gql } from "graphql-tag";

export const typeDefs = gql`
  scalar Date

  type Task {
    _id: ID!
    taskName: String!
    description: String!
    isFinished: Boolean!
    isDeleted: Boolean!
    isDone: Boolean!
    priority: Int
    tags: [String!]
    createdAt: Date
    updatedAt: Date
    userId: String
  }

  type Query {
    getAllTasks: [Task!]!
    getFinishedTasksLists: [Task!]!
    getUserDoneTasksLists(userId: String!): [Task!]!
  }

  type Mutation {
    addTask(
      taskName: String!
      description: String!
      isDone: Boolean = false
      priority: Int
      tags: [String!]
      userId: String!
    ): Task!

    updateTask(
      taskId: ID!
      userId: String!
      taskName: String
      description: String
      isDone: Boolean
      isFinished: Boolean
      isDeleted: Boolean
      priority: Int
      tags: [String!]
    ): Task!
  }
`;
