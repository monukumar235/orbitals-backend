import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const DailyReport = sequelize.define(
  "DailyReport",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    employee_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    report_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    tasks_completed: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    task_pending: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    blockers: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING(30),
      allowNull: false,
      defaultValue: "SUBMITTED",
    },
    reviewed_by: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    reviewed_at: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    review_comments: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "daily_report",
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ["employee_id", "report_date"],
      },
    ],
  },
);
