import Database from "better-sqlite3";
import { prepareStmt } from "./Modules/PreparedStatement";
import Unique from "./Modules/Database.service";

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
    const uniqueController = await Unique(stmtData, Connection);

    const controllers = {
      uniqueController
    };

    return controllers;
  } catch (e) {
    console.log(`Failed to get database connection : ${e}`);
  }
};

export default getConnection;
