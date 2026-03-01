import mongoose from "mongoose";

const ColumnSchema = new mongoose.Schema({
  columnName: {
    type: String,
    required: true
  },
  dataType: {
    type: String,
    required: true
  }
}, { _id: false });

const TableSchema = new mongoose.Schema({
  tableName: {
    type: String,
    required: true
  },
  columns: [ColumnSchema],
  rows: [
    {
      type: mongoose.Schema.Types.Mixed
    }
  ]
}, { _id: false });

const AssignmentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    enum: ["Easy", "Medium", "Hard"],
    required: true
  },
  question: {
    type: String,
    required: true
  },
  sampleTables: [TableSchema],
  expectedOutput: {
    type: mongoose.Schema.Types.Mixed
  }
}, { timestamps: true });

const Assignment = mongoose.model("Assignment", AssignmentSchema);

export default Assignment;