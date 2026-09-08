import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";



export const LeaveBalance = sequelize.define("LeaveBalance",{
    id : {
        type : DataTypes.UUID,
        defaultValue : DataTypes.UUIDV4,
        primaryKey : true
    },
    employee_id:{
        type : DataTypes.UUID,
        allowNull : false,
    },
    leave_type_id : {
        type : DataTypes.UUID,
        allowNull : false,
    },
    year :{
        type : DataTypes.INTEGER,
        allowNull : false,
    },
    allocated_days:{
        type : DataTypes.DECIMAL(5,2),
        allowNull : false,
        defaultValue : 0
    },
    used_days : {
        type : DataTypes.DECIMAL(5,2),
        allowNull : false,
        defaultValue : 0
    },

    remaining_days : {
        type : DataTypes.DECIMAL(5,2),
        allowNull : false,
        defaultValue : 0,
    }, 
},{
    tableName : "leave_balance",
    timestamps : true,

    indexes :[{
        unique : true,
        fields : ["employee_id","leave_type_id","year"],
    },],
});