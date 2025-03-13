import express from 'express';
import { Op } from 'sequelize';
import { startOfDay, endOfDay, subDays } from 'date-fns';
import Todo from '../models/todo.js';

const router = express.Router();

// 获取最近7天内每天完成的Todo任务数量
router.get('/completed-todos', async (req, res) => {
  try {
    const today = new Date();
    const sevenDaysAgo = subDays(today, 6); // 获取7天前的日期

    const completedTodos = await Todo.findAll({
      where: {
        completed: true,
        createdAt: {
          [Op.between]: [startOfDay(sevenDaysAgo), endOfDay(today)]
        }
      },
      attributes: ['createdAt']
    });

    // 初始化最近7天的数据结构
    const dailyStats = {};
    for (let i = 0; i <= 6; i++) {
      const date = subDays(today, i);
      const dateStr = date.toISOString().split('T')[0];
      dailyStats[dateStr] = 0;
    }

    // 统计每天完成的任务数量
    completedTodos.forEach(todo => {
      const dateStr = todo.createdAt.toISOString().split('T')[0];
      if (dailyStats[dateStr] !== undefined) {
        dailyStats[dateStr]++;
      }
    });

    // 转换为前端需要的数组格式
    const result = Object.entries(dailyStats)
      .sort(([dateA], [dateB]) => dateA.localeCompare(dateB))
      .map(([date, count]) => ({
        date,
        count
      }));

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;