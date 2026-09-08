import {Sequelize} from "sequelize"
import dotenv from "dotenv"
dotenv.config();

export const sequelize = new Sequelize(
    process.env.DATABASE_URL,{
        dialect : "postgres",
        logging : false,
        dialectOptions:{
            ssl :{
                require : true,
                rejectUnauthorized : false
            }
        }
    }
);

export const connectDb = async ()=>{
    try {
        await sequelize.authenticate();
        console.log("Neon PostGreSql connected successfully!");
    } catch (error) {
        console.log("Database connection failed:",error.message);
        process.exit();
    }
}
