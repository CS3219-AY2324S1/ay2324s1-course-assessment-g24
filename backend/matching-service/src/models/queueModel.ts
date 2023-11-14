import { DataTypes } from "sequelize";

import sequelize from "../database/db";

const QueueModel = sequelize.define("Queue", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  queueingSocketId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  difficulty: {
    type: DataTypes.ENUM({
      values: ["HARD", "MEDIUM", "EASY"],
    }),
    allowNull: false,
  },
  language: {
    type: DataTypes.ENUM({
      values: ["PYTHON", "C++", "JAVSCRIPT"],
    }),
    allowNull: false,
  },
});

interface Queue {
  id: string;
  queueingSocketId: string;
  difficulty: string;
  language: string;
}

export { QueueModel, Queue };
