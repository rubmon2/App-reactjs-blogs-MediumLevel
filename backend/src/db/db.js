import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

export const connectSequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    dialect: 'mysql',
    host: process.env.DB_HOST,
  },
);

export const connectDB = async () => {
  try {
    await connectSequelize.authenticate();
    await connectSequelize.sync({ force: false });
    console.log('database  is run');
  } catch (error) {
    console.log('error in db', error);
  }
};
