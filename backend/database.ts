// import { DataSource } from "typeorm";
import { DATABASE_HOST, DATABASE_NAME, DATABASE_PASSWORD, DATABASE_PORT, DATABASE_USER } from "./config";
import { Sequelize } from "sequelize";

type DatabaseManager = 'postgres' | 'mysql';

type Database = {
  initialize(): Promise<void>;
}

const makeDatabase = (database: DatabaseManager): Database => {
  const db = new Sequelize(`${database}://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}`);

  const initialize = async () => {
    return db.authenticate();
  }

  return {
    initialize,
  }
}

export default makeDatabase('postgres');
