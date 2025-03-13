import express from 'express';
import Todo from '../models/todo.js';
import { startOfDay, endOfDay, parseISO } from 'date-fns';
import { Op } from 'sequelize';

const router = express.Router();

// 获取所有todos
router.get('/', async (req, res) => {
  try {
    const { date } = req.query;
    let where = {};
    
    if (date) {
      const startDate = startOfDay(parseISO(date));
      const endDate = endOfDay(parseISO(date));
      where.createdAt = {
        [Op.between]: [startDate, endDate]
      };
    }
    
    const todos = await Todo.findAll({
      where,
      order: [['createdAt', 'DESC']]
    });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 创建新todo
router.post('/', async (req, res) => {
  try {
    const newTodo = await Todo.create({
      text: req.body.text,
      completed: req.body.completed || false
    });
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 更新todo
router.patch('/:id', async (req, res) => {
  try {
    const todo = await Todo.findByPk(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: '找不到该Todo' });
    }

    const updatedTodo = await todo.update({
      text: req.body.text !== undefined ? req.body.text : todo.text,
      completed: req.body.completed !== undefined ? req.body.completed : todo.completed
    });
    res.json(updatedTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 删除todo
router.delete('/:id', async (req, res) => {
  try {
    const todo = await Todo.findByPk(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: '找不到该Todo' });
    }

    await todo.destroy();
    res.json({ message: '删除成功' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;