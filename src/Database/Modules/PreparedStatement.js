import { io } from "../../app";
import { models } from "../../Models/index";
import { ENUM_QUERY_TYPES } from "../../utils/enums";

const getQueriesFromModels = (models = []) => {
  return models.map(({ transactions }) => {
    const _obj = {};
    transactions.forEach(({ statements }) => {
      statements.forEach(({ stmtKey, query }) => {
        _obj[stmtKey] = query;
      });
    });
    return _obj;
  });
};

const prepareStmt = (db) => {
  try {
    const stmt = [];
    const queryList = getQueriesFromModels(models);

    queryList.forEach((element) => {
      for (const key in element) {
        if (element.hasOwnProperty(key)) {
          stmt[key] = db.prepare(element[key]);
        }
      }
    });

    return stmt;
  } catch (e) {
    console.log(`prepareStmt : ${e}`);
  }
};

const executeTransactions = (db) => {
  return db.transaction((stmt, type, pk, props) => {
    try {
      const promises = [];
      for (const { [pk]: id, ...prop } of props) {
        if (type === ENUM_QUERY_TYPES.DELETE) {
          promises.push(stmt.run(id));
        } else {
          // INSERT OR UPDATE
          promises.push(stmt.run({ id, ...prop }));
        }
      }
      return Promise.all(promises);
    } catch (e) {
      return {
        success: false,
        message: e.message,
      };
    }
  });
};

// TODO: Execute Multiple Statement based on pk/props or type
const executeMultipleStatement = (db, stmtTable) => {
  return db.transaction((statements, props) => {
    try {
      const promises = [];

      statements.forEach(({ type, pk, expectedProps, stmtKey }) => {
        const stmt = stmtTable[stmtKey];

        if (expectedProps.length === 0) {
        } else {
          if (props.length !== 0) {
            for (const { [pk]: id, ...prop } of props) {
              if (type === "DELETE") {
                promises.push(stmt.run(id));
              } else {
                // INSERT OR UPDATE
                promises.push(stmt.run({ id, ...prop }));
              }
            }
          }
        }
      });

      return Promise.all(promises);
    } catch (e) {
      return {
        success: false,
        message: e.message,
      };
    }
  });
};

const executeToDatabase = (stmt) => {
  try {
    const handleCatch = (err) => {
      console.error(`[ERROR] PreparedStatement/Execute: ${err.message}`);
      io.sockets.emit("ERROR", err.message);
      // const reciever = onlineClients.values().next().value;
      // io.sockets.connected[reciever].emit("ERROR", err.message);
      return null;
      // return {
      //   success: false,
      //   result: err.message
      // }
    };

    const SELECT = (id) => {
      try {
        return id ? stmt.get(id) : stmt.get();
      } catch (e) {
        return handleCatch(e);
      }
    };

    const SELECT_ALL = (id) => {
      try {
        return id ? stmt.all(id) : stmt.all();
      } catch (e) {
        return handleCatch(e);
      }
    };

    const SELECT_PROPS = (props, all) => {
      try {
        return all ? stmt.all({ ...props }) : stmt.get({ ...props });
      } catch (e) {
        return handleCatch(e);
      }
    };

    const INSERT = (props) => {
      try {
        const result = stmt.run({
          ...props,
        });

        return { id: result.lastInsertRowid, ...props };
      } catch (e) {
        return handleCatch(e);
      }
    };

    const UPDATE = (id, props) => {
      try {
        props.id = id;
        const result = stmt.run({
          ...props,
        });

        return result.changes === 1 ? { id, ...props } : null;
      } catch (e) {
        return handleCatch(e);
      }
    };

    const DELETE = (id) => {
      try {
        const result = stmt.run(id);
        return result.changes === 1 ? { id } : null;
      } catch (e) {
        return handleCatch(e);
      }
    };

    const DELETE_ALL = () => {
      try {
        return stmt.run();
      } catch (e) {
        return handleCatch(e);
      }
    };

    const DELETE_PROPS = (props) => {
      try {
        const result = stmt.run({ ...props });
        return result.changes === 1 ? { ...props } : null;
      } catch (e) {
        return handleCatch(e);
      }
    };

    const QueryCenter = {
      SELECT,
      SELECT_ALL,
      SELECT_PROPS,
      INSERT,
      UPDATE,
      DELETE,
      DELETE_ALL,
      DELETE_PROPS,
    };

    return QueryCenter;
  } catch (e) {
    console.log(`preparedQueries error ${e}`);
  }
};

export { prepareStmt, executeToDatabase, executeTransactions, executeMultipleStatement };
