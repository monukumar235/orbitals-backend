import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";


export const Leave = sequelize.define("Leave",{
    id : {
        type : DataTypes.UUID,
        defaultValue : DataTypes.UUIDV4,
        primaryKey : true,
    },
    employee_id :{
        type : DataTypes.UUID,
        allowNull : false,
    },
    leave_type_id:{
        type : DataTypes.UUID,
        allowNull : false,
    },
    start_date:{
        type : DataTypes.DATEONLY,
        allowNull : false,
    },
    end_date:{
        type : DataTypes.DATEONLY,
        allowNull : false,
    },
    total_days :{
        type : DataTypes.DECIMAL(5,2),
        allowNull : false,
    },
    reason :{
        type : DataTypes.TEXT,
        allowNull : true,
    },
    status :{
        type : DataTypes.STRING(30),
        allowNull : false,
        defaultValue : "PENDING",
    },
    reviewed_by:{
        type : DataTypes.UUID,
        allowNull : true,
    },
    reviewed_at:{
        type : DataTypes.DATE,
        allowNull : true,
    },
    reviewed_comments :{
        type : DataTypes.TEXT,
        allowNull : true,
    },
},{
    tableName : "leave",
    timestamps : true,
});