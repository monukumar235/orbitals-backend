import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";


export const Payslip = sequelize.define("Payslip",{
    id:{
        type : DataTypes.UUID,
        defaultValue : DataTypes.UUIDV4,
        primaryKey : true,
    },
    employee_id :{
        type : DataTypes.UUID,
        allowNull : false,
    },
    month:{
        type : DataTypes.INTEGER,
        allowNull : false,
        validate:{
            min:1,
            max:12,
        },
    },
    year:{
        type : DataTypes.INTEGER,
        allowNull : false,
    },
    basic_salary:{
        type : DataTypes.DECIMAL(12,2),
        allowNull : false,
        defaultValue : 0,
    },
    hra :{
        type : DataTypes.DECIMAL(12,2),
        defaultValue : 0,
    },
    allowance : {
        type : DataTypes.DECIMAL(12,2),
        defaultValue :0,
    },
    gross_salary :{
        type : DataTypes.DECIMAL(12,2),
        defaultValue : 0,
    },
    pf_deduction :{
        type : DataTypes.DECIMAL(12,2),
        defaultValue : 0,
    },
    tax_deduction :{
        type : DataTypes.DECIMAL(12,2),
        defaultValue : 0,
    },
    other_deductions :{
        type : DataTypes.DECIMAL(12,2),
        defaultValue : 0,
    },
    total_deductions :{
        type : DataTypes.DECIMAL(12,2),
        defaultValue : 0,
    },
    net_salary :{
        type : DataTypes.DECIMAL(12,2),
        defaultValue : 0,
    },
    payment_date:{
        type : DataTypes.DATEONLY,
        allowNull :true,
    },
    status:{
        type : DataTypes.STRING(30),
        allowNull : false,
        defaultValue : "GENERATED",
    },

},{
    tableName : "payslips",
    timestamps : true,

    indexes:[{
        unique : true,
        fields : ["employee_id","month","year"],
    },],
});