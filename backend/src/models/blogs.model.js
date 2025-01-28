import { DataTypes } from 'sequelize';
import { connectSequelize } from '../db/db.js';
import { userModel } from './user.model.js';

export const blogModel = connectSequelize.define(
  'Blogs',
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { len: [5, 45] },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [5, 255] },
    },
    important: { type: DataTypes.STRING, allowNull: false },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: userModel,
        key: 'id',
      },
    },
  },
  { timestamps: true },
);
