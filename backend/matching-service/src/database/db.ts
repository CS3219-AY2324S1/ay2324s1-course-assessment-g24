import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  storage: ':memory:', 
  dialect: 'sqlite',
});

const checkConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection up!");
  } catch (error) {
    console.error(`Connection error: ${error}`);
  }
};

checkConnection();
(async () => await sequelize.sync({ force: true }))();
export default sequelize;
