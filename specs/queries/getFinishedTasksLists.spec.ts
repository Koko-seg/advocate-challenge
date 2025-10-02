import { getFinishedTasksLists } from "@resolvers/queries/getFinishedTasksLists";
import Task from "@models/Task";

jest.mock("@models/Task");

describe("getFinishedTasksLists Query", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return all finished non-deleted tasks", async () => {
    const mockTasks = [
      { _id: "1", taskName: "Finished 1", isFinished: true, isDeleted: false },
      { _id: "2", taskName: "Finished 2", isFinished: true, isDeleted: false },
    ];

    (Task.find as jest.Mock).mockResolvedValue(mockTasks);

    const result = await getFinishedTasksLists();

    expect(Task.find).toHaveBeenCalledWith({
      isFinished: true,
      isDeleted: false,
    });
    expect(result).toEqual(mockTasks);
  });

  it("should return empty array if no finished tasks found", async () => {
    (Task.find as jest.Mock).mockResolvedValue([]);

    const result = await getFinishedTasksLists();

    expect(result).toEqual([]);
    expect(Task.find).toHaveBeenCalledWith({
      isFinished: true,
      isDeleted: false,
    });
  });
});
