import { io } from "../../app";
// import { onlineClients } from '../../index';

const queryList = [
  // Users
  {
    USER_INS: `INSERT INTO users (first_name, last_name, email) VALUES ($first_name, $last_name, $email)`,
    USER_UPD: `UPDATE users SET first_name = $first_name, last_name = $last_name, email = $email WHERE user_id = @id`,
    USER_DEL: `DELETE FROM users WHERE user_id = ?`,
    USER_SEL_ID: `SELECT * FROM users WHERE user_id = ?`,
    USER_SEL_ALL: `SELECT * FROM users`,
    USER_DEL_ALL: `DELETE FROM users`
  },
  // Unicorns
  {
    UNICORN_INS: `INSERT INTO unicorns (name, age, color) VALUES ($name, $age, $color)`,
    UNICORN_UPD: `UPDATE unicorns SET name = $name, age = $age, color = $color WHERE unicorn_id = @id`,
    UNICORN_DEL: `DELETE FROM unicorns WHERE unicorn_id = ?`,
    UNICORN_SEL_ID: `SELECT * FROM unicorns WHERE unicorn_id = ?`,
    UNICORN_SEL_ALL: `SELECT * FROM unicorns`,
    UNICORN_DEL_ALL: `DELETE FROM unicorns`
  }
];

const prepareStmt = db => {
  try {
    let stmt = [];

    queryList.forEach(element => {
      for (const key in element) {
        if (element.hasOwnProperty(key)) stmt[key] = db.prepare(element[key]);
      }
    });

    return stmt;
  } catch (e) {
    console.log(`prepareStmt : ${e}`);
  }
};

const executeTransaction = (db, sqlArray) => {
  const statements = sqlArray.map(sql => db.prepare(sql));
  return db.transaction((data = {}) => {
    let result;
    for (const stmt of statements) {
      // if (stmt.reader) result = stmt.get(data);
      stmt.run(data);
    }
    return result;
  });
};

const executeToDatabase = stmt => {
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
    }

    const SELECT = id => {
      try {
        return id ? stmt.get(id) : stmt.get();
      } catch (e) {
        return handleCatch(e);
      }
    };

    const SELECT_ALL = id => {
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

    const INSERT = props => {
      try {
        const result = stmt.run({
          ...props
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
          ...props
        });

        return result.changes === 1 ? { id, ...props } : null;
      } catch (e) {
        return handleCatch(e);
      }
    };

    const DELETE = id => {
      try {
        const result = stmt.run(id);
        return result.changes === 1 ? { id } : null;
      } catch (e) {
        return handleCatch(e);
      }
    };

    const DELETE_PROPS = props => {
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

    const INSERT_ALL = props => {
      try {
        const result = stmt.run({
          ...props
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
      INSERT_ALL
    };

    return QueryCenter;
  } catch (e) {
    console.log(`preparedQueries error ${e}`);
  }
};

export { prepareStmt, executeToDatabase, executeTransaction };
