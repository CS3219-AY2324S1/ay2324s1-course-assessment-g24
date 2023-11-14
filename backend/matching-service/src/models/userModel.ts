import { DataTypes } from "sequelize";

import sequelize from "../database/db";
import { STATUS } from "../utils/enums";

const UserModel = sequelize.define("User", {
  socketId: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM({
      values: ["DEFAULT", "IN_QUEUE", "MATCHED"],
    }),
    allowNull: false,
    defaultValue: "DEFAULT",
  },
});

interface User {
  socketId: string;
  status: STATUS;
}

export { UserModel, User };
