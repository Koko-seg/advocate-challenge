import { getUserDoneTasksLists } from "@resolvers/queries/getUserDoneTasksLists";
import Task from "@models/Task";

jest.mock("@models/Task");

describe("getUserDoneTasksLists Query", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return all done non-deleted tasks for the user", async () => {
    const userId = "user1";
    const mockTasks = [
      { _id: "1", taskName: "Done 1", userId, isDone: true, isDeleted: false },
      { _id: "2", taskName: "Done 2", userId, isDone: true, isDeleted: false },
    ];

    (Task.find as jest.Mock).mockResolvedValue(mockTasks);

    const result = await getUserDoneTasksLists(userId);

    expect(Task.find).toHaveBeenCalledWith({
      userId,
      isDone: true,
      isDeleted: false,
    });
    expect(result).toEqual(mockTasks);
  });

  it("should return empty array if no done tasks found for the user", async () => {
    const userId = "user1";
    (Task.find as jest.Mock).mockResolvedValue([]);

    const result = await getUserDoneTasksLists(userId);

    expect(result).toEqual([]);
    expect(Task.find).toHaveBeenCalledWith({
      userId,
      isDone: true,
      isDeleted: false,
    });
  });
});
