import { Employee } from "../models/Employees.js";
import bcrypt from "bcrypt";
import { User } from "../models/User.js";
import { Role } from "../models/Role.js";
import { Department } from "../models/Department.js";

export const createEmployee = async (req, res) => {
  try {
    const {
      email,
      password,
      first_name,
      last_name,
      date_of_birth,
      gender,
      phone,
      personal_email,
      current_address,
      employee_id,
      department_id,
      designation,
      joining_date,
      employment_type,
      work_location,
      highest_qualification,
      institution,
      year_of_passing,
      percentage_or_cgpa,
      pan_number,
      aadhaar_number,
      uan_number,
      bank_name,
      account_number,
      ifsc_code,
      role_id,
      reporting_manager_id,
    } = req.body;

    if (!email || !password || !first_name || !employee_id || !role_id) {
      return res.status(400).json({
        success: false,
        message:
          "Email, Password, first name, employee Id and role Id are required.",
      });
    }

    const existingUser = await User.findOne({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const existingEmployee = await Employee.findOne({
      where: { employee_id },
    });

    if (existingEmployee) {
      return res.status(400).json({
        success: false,
        message: "Employee Id already exists.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hashedPassword,
      role_id,
      is_active: true,
    });

    const employee = await Employee.create({
      employee_id,
      user_id: user.id,
      department_id,
      reporting_manager_id,
      first_name,
      last_name,
      date_of_birth,
      gender,
      phone,
      personal_email,
      current_address,
      designation,
      joining_date,
      employment_type,
      work_location,
      highest_qualification,
      institution,
      year_of_passing,
      percentage_or_cgpa,
      pan_number,
      aadhaar_number,
      uan_number,
      bank_name,
      account_number,
      ifsc_code,
      status: "ACTIVE",
    });

    return res.status(201).json({
        success : true,
        message : "Employee created successfully",
        employee
    });
  } catch (error) {
    return res.status(500).json({
        success : false,
        message  : "Internal server error.",
        error : error.message
    });
  }
}

export const getAllEmployees = async (req,res)=>{
    try {
        const employees = await Employee.findAll({
            include :[
                {
                    model :  User,
                    as : "user",
                    attributes:["id","email","is_active"],
                    include : [
                        {
                            model : Role,
                            as : "role",
                            attributes : ["id","name"]
                        },
                    ],
                },
                {
                    model : Department,
                    as : "department",
                    attributes : ["id","name"],
                },
                {
                    model : Employee,
                    as : "manager",
                    attributes :["id","employee_id","first_name","last_name"],
                },
            ],
            order : [["createdAt","DESC"]],
        });

        return res.status(200).json({
            success : true,
            count : employees.length,
            employees
        });
    } catch (error) {
        return res.status(500).json({
            success : false,
            message : "Internal server error",
            error : error.message
        });
    }
}


