import { Attendance } from "../models/Attendance.js";
import { Employee } from "../models/Employees.js";

export const clockIn = async (req, res) => {
  try {
    const userId = req.user.user_id;

    const employee = await Employee.findOne({
      where: {
        user_id: userId,
      },
    });

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    const today = new Date();

    const attendanceDate = today.toISOString().split("T")[0];

    const existingAttendance = await Attendance.findOne({
      where: {
        employee_id: employee.id,
        attendance_date: attendanceDate,
      },
    });

    if (existingAttendance) {
      return res.status(401).json({
        success: false,
        message: "You have already clocked in today",
      });
    }

    const attendance = await Attendance.create({
      employee_id: employee.id,
      attendance_date: attendanceDate,
      clock_in: new Date(),
      status: "PRESENT",
    });

    return res.status(201).json({
      success: true,
      message: "clockIn successfully",
      attendance,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const clockOut = async (req, res) => {
  try {
    const userId = req.user.user_id;

    const employee = await Employee.findOne({
      where: {
        user_id: userId,
      },
    });

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found.",
      });
    }

    const today = new Date();

    const attendanceDate = today.toISOString().split("T")[0];

    const attendance = await Attendance.findOne({
      where: {
        employee_id: employee.id,
        attendance_date: attendanceDate,
      },
    });

    if (!attendance) {
      return res.status(400).json({
        success: false,
        message: "You have not clocked in today",
      });
    }

    if (attendance.clock_out) {
      return res.status(400).json({
        success: false,
        message: "You have already clocked out today",
      });
    }

    const clockOutTime = new Date();

    const clockedInTime = new Date(attendance.clock_in);

    const differnceInMilliseconds =
      clockOutTime.getTime() - clockedInTime.getTime();

    const differenceInHours = differnceInMilliseconds / (1000 * 60 * 60);

    const workingHours = Number(differenceInHours.toFixed(2));

    await attendance.update({
      clock_out: clockOutTime,
      working_hours: workingHours,
    });

    return res.status(200).json({
      success: true,
      message: "Clocked out successfully.",
      attendance,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getTodayAttendance = async (req,res)=>{
    try {
        const userId = req.user.user_id;

        const employee = await Employee.findOne({
            where : {
                user_id : userId
            },
        });

        if(!employee){
            return res.status(404).json({
                success : false,
                message : "Employee not found."
            });
        }
        const today = new Date();
        
        const attendanceDate = today.toISOString().split("T")[0];

        const attendance = await Attendance.findOne({
            where :{
                employee_id : employee.id,
                attendance_date : attendanceDate,
            },
        });

        if(!attendance){
            return res.status(404).json({
                success : false,
                message : "No attendance record found for today",
                attendance : null
            });
        }
        return res.status(200).json({
            success : true,
            message :"Todays attendance fetched successfully.",
            attendance,
        });

    } catch (error) {
        return res.status(500).json({
            success : false,
            message : "Internal server error",
            error : error.message
        });
    }
}

export const getAttendanceHistory = async(req,res)=>{
    try {
        const userId = req.user.user_id;
        
        const employee = await Employee.findOne({
            where : {
                user_id : userId,
            },
        });

        if(!employee){
            return res.status(404).json({
                success : false,
                message : "Employee not found.",
            });
        }

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const offset = (page-1) * limit;

        const {count,rows:attendance} = await Attendance.findAndCountAll({
            where:{
                employee_id : employee.id,
            },
            order : [["attendance_date","DESC"]],
            limit,
            offset,
        });

        const totalpages = Math.ceil(count / limit);

        return res.status(200).json({
            success : true,
            message : "Attendance record fetched successfully.",
            count : attendance.length,
            pagination:{
                currentPage : page,
                totalpages,
                totalRecords : count,
                limit,
            },
            attendance
        });
    } catch (error) {
        return res.status(500).json({
            success : false,
            message : "Internal server error",
            error : error.message
        });
    }
}

export const getEmployeeAttendance = async (req,res)=>{
    try {
        const {id} = req.params;

        const page = Math.max(parseInt(req.query.page) ||1,1);
        const limit = Math.min(Math.max(parseInt(req.query.limit) || 10,1),100);
        const offset = (page-1) * limit;

        const employee = await Employee.findByPk(id,{
            attributes : [
                "id",
                "employee_id",
                "first_name",
                "last_name",
                "designation",
            ],
        });

        if(!employee){
            return res.status(404).json({
                success : false,
                message :"Employee not found."
            });
        }

        const {count,rows:attendance} = await Attendance.findAndCountAll({
            where :{
                employee_id : id,
            },
            order : [["attendance_date","DESC"]],
            limit,
            offset,
        });

        const totalpages = Math.ceil(count/limit);

        return res.status(200).json({
            success : true,
            employee,
            pagination:{
                currentPage : page,
                totalpages,
                totalRecords : count,
                limit,
            },
            attendance
        })
    } catch (error) {
        res.status(500).json({
            success : false,
            message : "Internal server error",
            error : error.message
        });
    }
}
