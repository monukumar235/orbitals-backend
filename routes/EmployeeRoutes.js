import express from "express";
import { createEmployee,getAllEmployees,getEmployeeById,getProfile,updateEmployee,deactivateEmployee,activateEmployee} from "../controller/EmployeeController.js";
import { authorized } from "../middleware/AuthMiddleWare.js";
import { requirePermission } from "../middleware/PermissionMiddleWare.js";


const route = express.Router();

route.post("/",authorized,requirePermission("employee.create"),createEmployee);
route.get("/",authorized,requirePermission("employee.view"),getAllEmployees);
route.get("/:id",authorized,requirePermission("employee.view"),getEmployeeById);
route.get("/me/profile", authorized ,getProfile);
route.patch("/:id/update", authorized ,requirePermission("employee.update"),updateEmployee);
route.patch("/:id/deactivate", authorized ,requirePermission("employee.delete"),deactivateEmployee);
route.patch("/:id/activate", authorized ,requirePermission("employee.update"),activateEmployee);

export default route;