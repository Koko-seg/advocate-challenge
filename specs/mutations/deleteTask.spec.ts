import { deleteTask } from "@resolvers/mutations/deleteTask";
import TaskModel from "@models/Task";

jest.mock("@models/Task");

describe("deleteTask mutation", () => {
  let mockTask: any;

  beforeEach(() => {
    jest.clearAllMocks();

    mockTask = {
      _id: "1",
      userId: "user1",
      isDeleted: false,
      save: jest.fn().mockResolvedValue(undefined),
    };
  });

  it("should delete task if user owns it", async () => {
    (TaskModel.findById as jest.Mock).mockResolvedValue(mockTask);

    const result = await deleteTask({}, { taskId: "1", userId: "user1" });

    expect(mockTask.isDeleted).toBe(true);
    expect(mockTask.save).toHaveBeenCalled();
  });

  it("should throw if task not found", async () => {
    (TaskModel.findById as jest.Mock).mockResolvedValue(null);

    await expect(
      deleteTask({}, { taskId: "1", userId: "user1" })
    ).rejects.toThrow("Task not found");
  });

  it("should throw if user does not own task", async () => {
    mockTask.userId = "otherUser";
    (TaskModel.findById as jest.Mock).mockResolvedValue(mockTask);

    await expect(
      deleteTask({}, { taskId: "1", userId: "user1" })
    ).rejects.toThrow("Unauthorized: You can only delete your own tasks.");
  });
});
