import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const Attendance = sequelize.define("Attendance", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  employee_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references :{
      model : "employees",
      key : "id",
    },
  },
  attendance_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  clock_in: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  clock_out: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  working_hours: {
    type: DataTypes.DECIMAL(5,2),
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING(30),
    allowNull: false,
    defaultValue: "PRESENT",
  },
  remarks: {
    type : DataTypes.TEXT,
    allowNull : true,
  },
},{
    tableName : "attendance",
    timestamps : true,
    indexes:[
        {
            unique : true,
            fields :["employee_id","attendance_date"],
        },
    ],
});
