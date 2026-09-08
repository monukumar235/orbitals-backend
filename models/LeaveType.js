import { DataTypes, DATE } from "sequelize";
import { sequelize } from "../config/database.js";


export const LeaveType = sequelize.define("LeaveType",{
    id :{
        type : DataTypes.UUID,
        defaultValue : DataTypes.UUIDV4,
        primaryKey : true
    },
    name :{
        type : DataTypes.STRING(50),
        allowNull : false,
        unique : true,
    },
    description:{
        type : DataTypes.TEXT,
        allowNull : true,
    },
    default_days:{
        type : DataTypes.DECIMAL(5,2),
        allowNull : false,
        defaultValue : 0,
    },
    is_paid :{
        type : DataTypes.BOOLEAN,
        defaultValue : true,
    },
    is_active:{
        type : DataTypes.BOOLEAN,
        defaultValue : true,
    },

},{
    tableName : "leave_type",
    timestamps : true,
})