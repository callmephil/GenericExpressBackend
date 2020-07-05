import { io } from "../../app";
import { models } from "../../Models/index";

const getQueriesFromModels = (models = []) => {
  return models.map(({ transactions }) => {
    const _obj = {};
    transactions.forEach(({ query }) => {
      const [key, value] = Object.entries(query)[0];
      _obj[key] = value;
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
  return db.transaction((stmt, type, props) => {
    const promises = [];
    for (const prop of props) {
      promises.push(executeToDatabase(stmt)[type](prop));
    }
    return Promise.all(promises);
  })
}

const executeMultipleStatement = (db) => {
  return db.transaction((stmt, props) => {
    const type = "";
    const promises = [];
    if (Array.isArray(stmt)) {
      for (const statement of stmt) {
        promises.push(executeToDatabase(statement)[type](props))
      }
    }
    return Promise.all(promises);
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

    const DELETE_PROPS = (props) => {
      try {
        const result = stmt.run({ ...props });
        return result.changes === 1 ? { ...props } : null;
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

    const INSERT_ALL = (props) => {
      try {
        const result = stmt.run({
          ...props,
        });
        return result;
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
      DELETE_PROPS,
      DELETE_ALL,
      INSERT_ALL,
    };

    return QueryCenter;
  } catch (e) {
    console.log(`preparedQueries error ${e}`);
  }
};

export { prepareStmt, executeToDatabase, executeTransaction };
