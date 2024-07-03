// import { DataSource } from "typeorm";
import { DATABASE_HOST, DATABASE_NAME, DATABASE_PASSWORD, DATABASE_PORT, DATABASE_USER } from "./config";
import { Sequelize } from "sequelize";

type Database = {
  initialize(): Promise<void>;
}

const makeDatabase = (): Database => {
  const db = new Sequelize(`postgres://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}`);

  const initialize = async () => {
    return db.authenticate();
  }

  return {
    initialize,
  }
}

export default makeDatabase();
