import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";



export const EmployeeDocument = sequelize.define("EmployeeDocument",{
    id : {
        type : DataTypes.UUID,
        defaultValue : DataTypes.UUIDV4,
        primaryKey : true,
    },
    employee_id:{
        type : DataTypes.UUID,
        allowNull : false,
        references : {
            model : "employees",
            key : "id",
        },
    },
    document_type:{
        type : DataTypes.STRING(50),
        allowNull : false,
    },
    document_name :{
        type : DataTypes.STRING(225),
        allowNull : false,
    },
    file_url:{
        type : DataTypes.TEXT,
        allowNull : false,
    },
    file_key : {
        type : DataTypes.TEXT,
        allowNull : false,
    },
    uploaded_at :{
        type : DataTypes.DATE,
        allowNull : false,
        defaultValue : DataTypes.NOW,
    },
    verified_by:{
        type : DataTypes.UUID,
        allowNull : true,
        references : {
            model : "users",
            key : "id",
        },
    },
    verified_at:{
        type : DataTypes.DATE,
        allowNull : true,
    },
    rejection_reason :{
        type : DataTypes.TEXT,
        allowNull : true,
    },
    
},{
    tableName : "employee_document",
    timestamps : true,
});
