import { Role } from "./Role.js";
import { User } from "./User.js";
import { Employee } from "./Employees.js";
import { Department } from "./Department.js";
import {Permission} from "./Permission.js";
import {RolePermission} from "./RolePermission.js";
import { Attendance } from "./Attendance.js";
import { DailyReport } from "./DailyReport.js";
import { LeaveType } from "./LeaveType.js";
import { Leave } from "./Leave.js";
import { LeaveBalance } from "./LeaveBalance.js";
import { Payslip } from "./PaySlip.js";
import { Onboarding } from "./Onboarding.js";
import { EmployeeDocument } from "./EmployeeDocument.js";

User.belongsTo(Role,
    {
        foreignKey : "role_id",
        as : "role",
    }
);

Role.hasMany(
    User,
    {
        foreignKey : "role_id",
        as : "users",
    }
);

Employee.belongsTo(User,{
    foreignKey : "user_id",
    as : "user",
});

User.hasOne(Employee,{
    foreignKey : "user_id",
    as : "employee",
});

Employee.belongsTo(Department,{
    foreignKey : "department_id",
    as : "department",
});


Department.hasMany(Employee ,{
    foreignKey : "department_id",
    as : "employees"
});


Employee.belongsTo(Employee, {
  foreignKey: "reporting_manager_id",
  as: "manager",
});

Employee.hasMany(Employee, {
  foreignKey: "reporting_manager_id",
  as: "teamMembers",
});


Role.belongsToMany(Permission, {
  through: RolePermission,
  foreignKey: "role_id",
  otherKey: "permission_id",
  as: "permissions",
});

Permission.belongsToMany(Role, {
  through: RolePermission,
  foreignKey: "permission_id",
  otherKey: "role_id",
  as: "roles",
});

Employee.hasMany(Attendance,{
    foreignKey : "employee_id",
    as : "attendance",
});

Attendance.belongsTo(Employee,{
    foreignKey : "employee_id",
    as: "employee",
});

Employee.hasMany(DailyReport,{
    foreignKey : "employee_id",
    as : "dailyReports"
});

DailyReport.belongsTo(Employee,{
    foreignKey : "employee_id",
    as : "employee",
});

DailyReport.belongsTo(User,{
    foreignKey : "reviewed_by",
    as : "reviewer",
});


Employee.hasMany(Leave,{
    foreignKey : "employee_id",
    as : "leaves",
});

Leave.belongsTo(Employee,{
    foreignKey : "employee_id",
    as : "employee",
});

LeaveType.hasMany(Leave,{
    foreignKey : "leave_type_id",
    as : "leaves"
});

Leave.belongsTo(LeaveType,{
    foreignKey : "leave_type_id",
    as : "leave"
});

Employee.hasMany(LeaveBalance,{
    foreignKey : "employee_id",
    as : "leaveBalance"
});

LeaveBalance.belongsTo(Employee,{
    foreignKey : "employee_id",
    as : "employee"
});


LeaveType.hasMany(LeaveBalance,{
    foreignKey : "leave_type_id",
    as : "balance"
});

LeaveBalance.belongsTo(LeaveType,{
    foreignKey : "leave_type_id",
    as : "leaveType"
});

Leave.belongsTo(User,{
    foreignKey : "reviewed_by",
    as : "reviewer"
});


Employee.hasMany(Payslip,{
    foreignKey : "employee_id",
    as : "payslips"
});

Payslip.belongsTo(Employee,{
    foreignKey : "employee_id",
    as : "employee"
});

Employee.hasOne(Onboarding,{
    foreignKey : "employee_id",
    as : "onboarding",
});

Onboarding.belongsTo(Employee,{
    foreignKey : "employee_id",
    as : "employee",
});

Employee.hasMany(EmployeeDocument,{
    foreignKey : "employee_id",
    as : "documents",
});

EmployeeDocument.belongsTo(Employee,{
    foreignKey : "employee_id",
    as : "employee",
});

Onboarding.belongsTo(User,{
    foreignKey : "verified_by",
    as : "verifier",
});

EmployeeDocument.belongsTo(User,{
    foreignKey : "verified_by",
    as : "verifier",
});


export {
    Role,
    Employee,
    User,
    Department,
    Permission,
    RolePermission,
    Attendance,
    DailyReport,
    Leave,
    LeaveType,
    LeaveBalance,
    Payslip,
    Onboarding,
    EmployeeDocument,
};

