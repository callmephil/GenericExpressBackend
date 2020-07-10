import {
  executeToDatabase,
  executeTransactions,
  executeMultipleStatement,
} from "./PreparedStatement";
import { models } from "../../Models";

const initializeController = async (stmtTable, connection) => {
  try {
    const prepareFunctions = () => {
      const controller = {};
      models.forEach(({ transactions }) => {
        transactions.forEach(({ func, statements }) => {
          if (statements.length === 1) {
            const { type, stmtKey, pk, expectedProps } = statements[0];
            const stmt = stmtTable[stmtKey];

            // Init Function
            controller[func] = (props) => {
              const { [pk]: id, ...params } = props;
              const hasPk = pk !== "";
              const hasProps = expectedProps.length > 0;
              const isBulk = Array.isArray(props) && props.length > 1;

              // TODO: SIMPLIFY
              if (isBulk) {
                const multi = executeTransactions(connection);
                return multi(stmt, type, pk, props);
              } else if (hasPk && !hasProps) {
                return executeToDatabase(stmt)[type](id);
              } else if (hasPk && hasProps) {
                return executeToDatabase(stmt)[type](id, params);
              } else if (!hasPk && hasProps) {
                return executeToDatabase(stmt)[type](props);
              } else {
                return executeToDatabase(stmt)[type]();
              }
            };
          } else if (statements.length > 1) {
            controller[func] = (props) => {
              const multi = executeMultipleStatement(connection, stmtTable);
              return multi(statements, props);
            };
          }
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
