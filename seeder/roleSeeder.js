import { Role } from "../models/Role.js";
import { Permission } from "../models/Permission.js";
import { RolePermission } from "../models/RolePermission.js";

const roles = [
  {
    name: "CEO",
    description: "Chief Executive Officer",
  },
  {
    name: "Director",
    description: "Organization Director",
  },
  {
    name: "HR",
    description: "Human Resources",
  },
  {
    name: "Manager",
    description: "Department Manager",
  },
  {
    name: "Team Lead",
    description: "Team Lead",
  },
  {
    name: "Employee",
    description: "Organization Employee",
  },
];

const permissions = [
  "employee.view",
  "employee.create",
  "employee.update",
  "employee.delete",

  "attendance.view",
  "attendance.clockin",
  "attendance.clockout",
  "attendance.manage",

  "report.create",
  "report.view",
  "report.approve",
  "report.reject",

  "onboarding.view",
  "onboarding.verify",
  "onboarding.approve",
  "onboarding.reject",

  "payslip.view",
  "payslip.create",
  "payslip.update",

  "leave.apply",
  "leave.view",
  "leave.approve",
  "leave.reject",
];

export const seedDatabase = async () => {
  try {
    for (const role of roles) {
      await Role.findOrCreate({
        where: {
          name: role.name,
        },
        defaults: role,
      });
    }

    for (const permission of permissions) {
      await Permission.findOrCreate({
        where: { name: permission },
        defaults: {
          name: permission,
          description: `permission for ${permission}`,
        },
      });
    }

    const rolePermissions = {
      Employee: [
        "employee.view",
        "attendance.view",
        "attendance.clockin",
        "attendance.clockout",
        "report.create",
        "report.view",
        "onboarding.view",
        "payslip.view",
        "leave.apply",
        "leave.view",
      ],

      "Team Lead": [
        "employee.view",
        "attendance.view",
        "report.view",
        "report.approve",
        "report.reject",
        "leave.view",
      ],

      Manager: [
        "employee.view",
        "attendance.view",
        "attendance.manage",
        "report.view",
        "report.approve",
        "report.reject",
        "leave.view",
        "leave.approve",
        "leave.reject",
      ],

      HR: [
        "employee.view",
        "employee.create",
        "employee.update",
        "employee.delete",

        "attendance.view",
        "attendance.manage",

        "onboarding.view",
        "onboarding.verify",
        "onboarding.approve",
        "onboarding.reject",

        "payslip.view",
        "payslip.create",
        "payslip.update",

        "leave.view",
        "leave.approve",
        "leave.reject",
      ],

      Director: [
        "employee.view",
        "attendance.view",
        "report.view",
        "payslip.view",
        "leave.view",
      ],

      CEO: [
        "employee.view",
        "attendance.view",
        "report.view",
        "payslip.view",
        "leave.view",
      ],
    };

    for (const [roleName, permissionNames] of Object.entries(rolePermissions)) {
  const role = await Role.findOne({
    where: {
      name: roleName,
    },
  });

  for (const permissionName of permissionNames) {
    const permission = await Permission.findOne({
      where: {
        name: permissionName,
      },
    });

    await RolePermission.findOrCreate({
      where: {
        role_id: role.id,
        permission_id: permission.id,
      },
    });
  }
}

    console.log("Roles and permission seeded successfully");
  } catch (error) {
    console.log("Seeder Error", error.message);
  }
};
