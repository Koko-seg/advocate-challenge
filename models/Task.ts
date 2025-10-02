import mongoose, { Schema, Document } from "mongoose";

export interface ITask extends Document {
  taskName: string;
  description: string;
  isDone: boolean;
  isFinished: boolean;
  isDeleted: boolean;
  priority?: number;
  tags?: string[];
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

const TaskSchema: Schema = new Schema(
  {
    taskName: { type: String, required: true },
    description: { type: String, required: true },
    isDone: { type: Boolean, default: false },
    isFinished: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    priority: { type: Number, min: 1, max: 5 },
    tags: {
      type: [String],
      validate: [(val: string[]) => val.length <= 5, "Max 5 tags"],
    },
    userId: { type: String, required: true },
  },
  { timestamps: true }
);

// ✅ Already compiled check
export default mongoose.models.Task ||
  mongoose.model<ITask>("Task", TaskSchema);
