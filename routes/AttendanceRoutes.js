import express from "express";
import { clockIn,clockOut,checkClockedIn,getTodayAttendance,getAttendanceHistory,getEmployeeAttendance} from "../controller/AttendanceController.js";
import {authorized} from "../middleware/AuthMiddleWare.js";
import {requirePermission} from "../middleware/PermissionMiddleWare.js";

const route = express.Router();

route.post("/clock-in",authorized,requirePermission("attendance.clockin"),clockIn);
route.post("/clock-out",authorized,requirePermission("attendance.clockout"),clockOut);
route.get("/check/today/clock-in",authorized,requirePermission("attendance.view"),checkClockedIn);
route.get("/today",authorized,requirePermission("attendance.view"),getTodayAttendance);
route.get("/history",authorized,requirePermission("attendance.view"),getAttendanceHistory);
route.get("/employee/:id",authorized,requirePermission("attendance.view"),getEmployeeAttendance);

export default route