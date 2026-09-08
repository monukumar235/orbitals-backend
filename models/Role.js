import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";


export const Role = sequelize.define(
    "Role",
    {
        id:{
            type : DataTypes.UUID,
            defaultValue : DataTypes.UUIDV4,
            primaryKey : true
        },
        name :{
            type : DataTypes.STRING(50),
            allowNull : false,
            unique : true
        },
        description : {
            type : DataTypes.TEXT,
            allowNull : true
        },
    },{
        tableName : "roles",
        timestamps : true
    }
);