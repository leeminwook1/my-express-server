import express from "express";
import Todo from "../models/Todo.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.user._id });
    res.status(200).json(todos);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/", async (req, res) => {
  const { title, description, completed, dueDate } = req.body;

  try {
    const newTodo = await Todo.create({
      title,
      description,
      completed: false,
      dueDate: new Date(),
      userId: req.user._id,
    });

    res.status(201).json(newTodo);
  } catch (err) {
    res.status(500).json({ error: "Failed to save todo" });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, completed, dueDate } = req.body;

  try {
    const updatedTodo = await Todo.findOneAndUpdate(
      { _id: id, userId: req.user._id },
      { title, description, completed, dueDate },
      { new: true, runValidators: true }
    );

    if (!updatedTodo) {
      return res
        .status(404)
        .json({ error: "Todo not found or permission denied" });
    }

    res.status(200).json(updatedTodo);
  } catch (err) {
    res.status(500).json({ error: "Failed to update todo" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    if (req.user._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "Permission denied" });
    }
    const deletedTodo = await Todo.findByIdAndDelete(id);
    if (!deletedTodo) {
      return res.status(404).json({ error: "Todo not found" });
    }
    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete todo" });
  }
});

export default router;
