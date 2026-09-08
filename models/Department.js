import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";



export const Department = sequelize.define(
    "Department",{
        id:{
            type : DataTypes.UUID,
            defaultValue : DataTypes.UUIDV4,
            primaryKey : true
        },
        name: {
            type : DataTypes.STRING(100),
            allowNull : false,
            unique : true
        },
        description :{
            type : DataTypes.TEXT,
            allowNull : true
        },
    },{
        tableName : "department",
        timestamps : true
    }
);