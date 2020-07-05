import { executeToDatabase, executeTransaction } from "./PreparedStatement";
import { models } from "../../Models";

const initializeController = async (stmtTable, connection) => {
  try {
    const prepareFunctions = () => {
      const controller = {};
      models.forEach(({ transactions }) => {
        transactions.forEach(({ func, type, query, pk, props }) => {
          const stmtKey = Object.keys(query)[0];
          const stmt = stmtTable[stmtKey];
          controller[func] = (_props) => {
            const { [pk]: id, ...params } = _props;

            // // note pk should not be array
            // clean this shiet
            // find a way to run multiple queries

            if (pk.length > 0 && props.length < 1) {
              return executeToDatabase(stmt)[type](id);
            } else if (pk.length > 0 && props.length > 0) {
              return executeToDatabase(stmt)[type](id, params);
            } else if (pk === "" && props.length > 0) {
              return executeToDatabase(stmt)[type](_props);
            } else if (Array.isArray(params)) {

            } else {
              return executeToDatabase(stmt)[type]();
            }
          };
        });
      });
      return controller;
    };
    
    return prepareFunctions();
  } catch (e) {
    console.log(`initializeUnicorns ${e}`);
  }
};

export default initializeController;
