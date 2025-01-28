import { DataTypes } from 'sequelize';
import { connectSequelize } from '../db/db.js';

export const userModel = connectSequelize.define(
  'User',
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [5, 30] },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true, len: [5, 255] },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { len: [5, 255] },
    },
  },
  { timestamps: true },
);
