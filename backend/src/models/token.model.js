import { DataTypes } from 'sequelize';
import { connectSequelize } from '../db/db.js';

export const tokenModel = connectSequelize.define(
  'Token',
  {
    token: { type: DataTypes.STRING, allowNull: false },
  },
  { timestamps: true },
);
