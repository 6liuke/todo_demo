import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE || 'todo_app',
  process.env.MYSQL_USER || 'root',
  process.env.MYSQL_PASSWORD || '123456',
  {
    host: process.env.MYSQL_HOST || 'localhost',
    dialect: 'mysql',
    logging: false,
  }
);

export default sequelize;