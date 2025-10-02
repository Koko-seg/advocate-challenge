import { getAllTasks } from "@resolvers/queries/getAllTasks";
import Task from "@models/Task";

jest.mock("@models/Task");

describe("getAllTasks Query", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return all non-deleted tasks", async () => {
    const mockTasks = [
      { _id: "1", taskName: "Task 1", isDeleted: false },
      { _id: "2", taskName: "Task 2", isDeleted: false },
    ];

    (Task.find as jest.Mock).mockResolvedValue(mockTasks);

    const result = await getAllTasks();

    expect(Task.find).toHaveBeenCalledWith({ isDeleted: false });

    expect(result).toEqual(mockTasks);
  });

  it("should return empty array if no tasks found", async () => {
    (Task.find as jest.Mock).mockResolvedValue([]);

    const result = await getAllTasks();

    expect(result).toEqual([]);
    expect(Task.find).toHaveBeenCalledWith({ isDeleted: false });
  });
});
