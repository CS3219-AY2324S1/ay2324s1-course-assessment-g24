import { Sequelize } from "sequelize";

const sequelize = new Sequelize("sqlite::memory:");

const checkConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection up!");
  } catch (error) {
    console.error(`Connection error: ${error}`);
  }
};

checkConnection();
await sequelize.sync({ force: true });
export default sequelize;
