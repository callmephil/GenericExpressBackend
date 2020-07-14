import { executeToDatabase, executeTransactions } from "./PreparedStatement";
import { models } from "../../Models";

const initializeController = async (stmtTable, connection) => {
  try {
    const prepareFunctions = () => {

      const handleTransaction = ({ stmt, type, props, pk, expectedProps }) => {
        const { [pk]: id, ...params } = props;
        const hasPk = pk !== "";
        const hasProps = expectedProps.length > 0;
        const isBulk = Array.isArray(props) && props.length > 1;

        if (isBulk) {
          const bulkExecute = executeTransactions(connection);
          return bulkExecute(stmt, type, pk, props);
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

      const controller = {};
      models.forEach(({ transactions }) => {
        transactions.forEach(({ func, statement }) => {
          const { type, stmtKey, pk, expectedProps } = statement;
          const stmt = stmtTable[stmtKey];

          controller[func] = (props) => {
            return handleTransaction({ stmt, type, props, pk, expectedProps });
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
