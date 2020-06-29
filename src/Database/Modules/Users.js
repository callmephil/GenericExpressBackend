import { executeToDatabase, executeTransaction } from "./PreparedStatement";

const initializeUsers = async (stmtTable, connection) => {
  try {
    const { USER_SEL_ID, USER_SEL_ALL, USER_INS, USER_UPD, USER_DEL, USER_DEL_ALL } = stmtTable;

    const getUser = ({ user_id }) => {
      return executeToDatabase(USER_SEL_ID).SELECT(user_id);
    };

    const getAllUsers = () => {
      return executeToDatabase(USER_SEL_ALL).SELECT_ALL();
    };

    const createUser = (props) => {
      return executeToDatabase(USER_INS).INSERT(props);
    };

    const updateUser = ({ user_id, ...props }) => {
      return executeToDatabase(USER_UPD).UPDATE(user_id, props);
    };

    const deleteUser = ({ user_id }) => {
      return executeToDatabase(USER_DEL).DELETE(user_id);
    };

    const resetUser = () => {
      const props = [
        { first_name: "Person", last_name: "One", email: "P1@mail.com" },
        { first_name: "Person", last_name: "Two", email: "P2@mail.com" },
        { first_name: "Person", last_name: "Three", email: "P3@mail.com" },
        { first_name: "Person", last_name: "Four", email: "P4@mail.com" },
        { first_name: "Person", last_name: "Five", email: "P5@mail.com" },
        { first_name: "Person", last_name: "Six", email: "P6@mail.com" },
        { first_name: "Person", last_name: "Seven", email: "P7@mail.com" },
        { first_name: "Person", last_name: "Eight", email: "P8@mail.com" },
        { first_name: "Person", last_name: "Nine", email: "P9@mail.com" },
        { first_name: "Person", last_name: "Ten", email: "P10@mail.com" },
      ];

      const promise = Promise.all([
        executeToDatabase(USER_DEL_ALL).DELETE_ALL(),
        executeToDatabase(USER_INS).INSERT_ALL(props[0]),
        executeToDatabase(USER_INS).INSERT_ALL(props[1]),
        executeToDatabase(USER_INS).INSERT_ALL(props[2]),
        executeToDatabase(USER_INS).INSERT_ALL(props[3]),
        executeToDatabase(USER_INS).INSERT_ALL(props[4]),
        executeToDatabase(USER_INS).INSERT_ALL(props[5]),
        executeToDatabase(USER_INS).INSERT_ALL(props[6]),
        executeToDatabase(USER_INS).INSERT_ALL(props[7]),
        executeToDatabase(USER_INS).INSERT_ALL(props[8]),
        executeToDatabase(USER_INS).INSERT_ALL(props[9]),
      ]);
      return promise;
    };

    const controller = {
      getUser,
      getAllUsers,
      createUser,
      updateUser,
      deleteUser,
      resetUser,
    };

    return controller;
  } catch (e) {
    console.log(`initializeUsers ${e}`);
  }
};

export default initializeUsers;
