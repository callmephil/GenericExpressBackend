import Database from "better-sqlite3";
import { prepareStmt } from "./Modules/PreparedStatement";
import Users from './Modules/Users';
import Unicorns from "./Modules/Unicorns";

let Connection;
const openConnection = () => {
  try {
    const path = require("path");
    const dbPath = path.resolve(__dirname, "./db.sqlite");
    const db = new Database(dbPath, { verbose: console.log });
    return db;
  } catch (error) {
    console.log(`Database Connection failed : ${error}`);
  }
};

const getConnection = async () => {
  try {
    if (!Connection) Connection = openConnection();

    const stmtData = prepareStmt(Connection);
    const usersController = await Users(stmtData, Connection);
    const unicornsController = await Unicorns(stmtData, Connection);

    const controllers = {
      usersController,
      unicornsController
    };

    return controllers;
  } catch (e) {
    console.log(`Failed to get database connection : ${e}`);
  }
};

export default getConnection;
