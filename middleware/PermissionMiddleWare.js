import { User } from "../models/User.js";
import { Role } from "../models/Role.js";
import { Permission } from "../models/Permission.js";

export const requirePermission = (permissionName) => {
  return async (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "Authentication Required.",
        });
      }

      const user = await User.findByPk(req.user.user_id, {
        include: [
          {
            model: Role,
            as: "role",
            include: [
              {
                model: Permission,
                as: "permissions",
                through: {
                  attributes: [],
                },
              },
            ],
          },
        ],
      });

      if (!user) {
        return res.status(403).json({
          success: false,
          message: "User not found!",
        });
      }

      const hasPermission = user.role.permissions.some(
        (permission) => permission.name === permissionName,
      );

      if (!hasPermission) {
        return res.status(403).json({
          success: false,
          message: "You donot have the permission to perform this action",
        });
      }
      next();
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  };
};
