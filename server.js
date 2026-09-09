import dotenv from "dotenv";
import app from "./app.js";
import { sequelize,connectDb } from "./config/database.js";
import  "./models/index.js";
import authRoute from "./routes/AuthRoutes.js";


dotenv.config();

const port = process.env.PORT || 5000;

app.use("/api/auth",authRoute);


const startServer = async () => {
  await connectDb();
  await sequelize.sync();
  console.log("DataBase tables synchronised");
  app.listen(port, () => {
    console.log(`server is running at port ${port}`);
  });
};

startServer();
