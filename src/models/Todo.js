import mongoose from "mongoose";

// To-do 아이템의 스키마 정의
const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  dueDate: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User", // 'User' 스키마와 연관
  },
});

// 모델 생성
const Todo = mongoose.model("Todo", todoSchema);

export default Todo;
