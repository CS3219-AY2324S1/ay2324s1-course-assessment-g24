import { DataTypes } from "sequelize";

import sequelize from "../database/db";

const MatchModel = sequelize.define("Match", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  socketIdOne: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  socketIdTwo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

interface Match {
  id: string;
  socketIdOne: string;
  socketIdTwo: string;
}

export { MatchModel, Match };
