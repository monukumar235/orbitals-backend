import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";


export const  Onboarding = sequelize.define("Onboarding",{
    id:{
        type : DataTypes.UUID,
        defaultValue : DataTypes.UUIDV4,
        primaryKey : true
    },
    employee_id:{
        type : DataTypes.UUID,
        allowNull :false,
        unique : true,
        references : {
            model : "employees",
            key : "id",
        },
    },
    status:{
        type : DataTypes.STRING(30),
        allowNull : false,
        defaultValue : "PENDING",
    },
    started_at : {
        type : DataTypes.DATE,
        allowNull : true,
    },
    submitted_at :{
        type : DataTypes.DATE,
        allowNull : true,
    },
    viewed_at:{
        type : DataTypes.DATE,
        allowNull :true,
    },
    viewed_by:{
        type : DataTypes.UUID,
        allowNull : true,
        references : {
            model : "users",
            key : "id",
        },
    },
    rejection_reason:{
        type : DataTypes.TEXT,
        allowNull : true,
    },
    notes:{
        type : DataTypes.TEXT,
        allowNull : true,
    },
},{
    tableName : "onboarding",
    timestamps : true,
});