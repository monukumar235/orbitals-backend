import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";



export const RolePermission = sequelize.define(
    "RolePermission",{
        role_id:{
            type : DataTypes.UUID,
            allowNull : false,
            primaryKey : true
        },
        permission_id:{
            type : DataTypes.UUID,
            allowNull : false,
            primaryKey : true
        },
    },{
        tableName : "role_permission",
        timestamps : true
    }
);