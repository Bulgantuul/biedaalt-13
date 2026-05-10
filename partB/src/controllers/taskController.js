const taskModel = require('../models/taskModel');

const getAllTasks = async (req, res) => {
  try {
    const { priority, search } = req.query;
    const tasks = await taskModel.getAll({ priority, search });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getTaskById = async (req, res) => {
  try {
    const task = await taskModel.getById(parseInt(req.params.id));
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createTask = async (req, res) => {
  try {
    const { title, priority } = req.body;
    if (!title) return res.status(400).json({ error: 'Title is required' });
    const newTask = await taskModel.create({ title, priority });
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { title, priority, completed } = req.body;
    const result = await taskModel.update(id, { title, priority, completed });
    if (!result || result.changes === 0) {
      return res.status(404).json({ error: 'Task not found or no changes' });
    }
    const updated = await taskModel.getById(id);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const result = await taskModel.remove(id);
    if (result.deleted === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};