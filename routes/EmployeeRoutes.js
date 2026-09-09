import express from "express";
import { createEmployee,getAllEmployees } from "../controller/EmployeeController.js";
import { authorized } from "../middleware/AuthMiddleWare.js";
import { requirePermission } from "../middleware/PermissionMiddleWare.js";


const route = express.Router();

route.post("/",authorized,requirePermission("employee.create"),createEmployee);
route.get("/",authorized,requirePermission("employee.view"),getAllEmployees);

export default route;