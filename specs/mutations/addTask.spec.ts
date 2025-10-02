import { addTask } from "@resolvers/mutations/addTask";
import TaskModel from "@models/Task";

jest.mock("@models/Task"); // TaskModel-ийг бүр mock хийнэ

describe("addTask mutation", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create a new task successfully", async () => {
    const mockSave = jest.fn().mockResolvedValue({
      _id: "1",
      taskName: "Test Task2",
      description: "A valid description",
      isDone: false,
      priority: 3,
      tags: ["work"],
      userId: "user123",
    });

    (TaskModel as any).mockImplementation(() => ({
      save: mockSave,
    }));

    const result = await addTask(null, {
      taskName: "Test Task2",
      description: "A valid description",
      priority: 3,
      tags: ["work"],
      userId: "user123",
    });

    expect(result.taskName).toBe("Test Task2"); // mock-тай тааруулсан
    expect(mockSave).toHaveBeenCalled();
  });

  it("should throw error if taskName already exists for user", async () => {
    (TaskModel as any).findOne = jest
      .fn()
      .mockResolvedValue({ taskName: "Test Task" });

    await expect(
      addTask(null, {
        taskName: "Test Task",
        description: "Another valid description",
        priority: 2,
        userId: "user123",
      })
    ).rejects.toThrow("Task name must be unique per user");
  });

  it("should throw error if description is less than 10 characters", async () => {
    // findOne mock → null
    (TaskModel as any).findOne = jest.fn().mockResolvedValue(null);

    // description < 10 тул алдаа throw хийнэ
    await expect(
      addTask(null, {
        taskName: "UniqueTask",
        description: "Too short", // 10-с бага
        priority: 3,
        userId: "user123",
      })
    ).rejects.toThrow("Description must be at least 10 characters long.");
  });

  it("should throw error if taskName equals description", async () => {
    (TaskModel as any).findOne = jest.fn().mockResolvedValue(null);
    (TaskModel as any).mockImplementation(() => ({
      save: jest.fn(),
    }));

    await expect(
      addTask(null, {
        taskName: "SameText",
        description: "SameText",
        priority: 3,
        userId: "user123",
      })
    ).rejects.toThrow("Description cannot be the same as taskName");
  });

  it("should throw error if priority is out of range", async () => {
    (TaskModel as any).findOne = jest.fn().mockResolvedValue(null);
    (TaskModel as any).mockImplementation(() => ({
      save: jest.fn(),
    }));

    await expect(
      addTask(null, {
        taskName: "Task2",
        description: "Valid description here",
        priority: 6,
        userId: "user123",
      })
    ).rejects.toThrow("Priority must be between 1 and 5");
  });

  it("should throw error if tags exceed 5", async () => {
    (TaskModel as any).findOne = jest.fn().mockResolvedValue(null);
    (TaskModel as any).mockImplementation(() => ({
      save: jest.fn(),
    }));

    await expect(
      addTask(null, {
        taskName: "Task3",
        description: "Valid description here",
        priority: 3,
        tags: ["a", "b", "c", "d", "e", "f"], // 6 tags
        userId: "user123",
      })
    ).rejects.toThrow("Maximum 5 tags allowed");
  });
});
