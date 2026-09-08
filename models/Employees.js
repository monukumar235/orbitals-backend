import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const Employee = sequelize.define(
  "Employee",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    employee_id: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
    },

    department_id: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    first_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    date_of_birth: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    gender: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    personal_email: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },
    current_address: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    designation: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    joining_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    employment_type: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    work_location: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    highest_qualification: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },

    institution: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },

    year_of_passing: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    percentage_or_cgpa: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },

    pan_number: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },

    aadhaar_number: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },

    uan_number: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    bank_name: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },

    account_number: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },

    ifsc_code: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },

    status: {
      type: DataTypes.STRING(30),
      defaultValue: "ACTIVE",
    },
  },
  {
    tableName: "employees",
    timestamps: true,
  },
);
