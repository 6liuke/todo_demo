import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import todoRoutes from './routes/todos.js';
import statisticsRoutes from './routes/statistics.js';
import sequelize from './config/database.js';

// 加载环境变量
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// 中间件
app.use(cors());
app.use(express.json());

// 路由
app.use('/api/todos', todoRoutes);
app.use('/api/statistics', statisticsRoutes);

// 连接到MySQL
sequelize.authenticate()
  .then(() => {
    console.log('Connected to MySQL database');
    // 启动服务器
    app.listen(PORT, () => {
      console.log(`Server running on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MySQL:', error.message);
  });

// 基本路由
app.get('/', (req, res) => {
  res.send('Todo API is running');
});