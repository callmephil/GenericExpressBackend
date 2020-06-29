import { executeToDatabase, executeTransaction } from "./PreparedStatement";

const initializeUnicorns = async (stmtTable, connection) => {
  try {
    const {
      UNICORN_SEL_ID,
      UNICORN_SEL_ALL,
      UNICORN_INS,
      UNICORN_UPD,
      UNICORN_DEL,
      UNICORN_DEL_ALL
    } = stmtTable;

    const getUnicorn = ({unicorn_id}) => {
      return executeToDatabase(UNICORN_SEL_ID).SELECT(unicorn_id);
    };

    const getAllUnicorns = () => {
      return executeToDatabase(UNICORN_SEL_ALL).SELECT_ALL();
    };

    const createUnicorn = props => {
      return executeToDatabase(UNICORN_INS).INSERT(props);
    };

    const updateUnicorn = ({ unicorn_id, ...props }) => {
      return executeToDatabase(UNICORN_UPD).UPDATE(unicorn_id, props);
    };

    const deleteUnicorn = ({unicorn_id}) => {
      return executeToDatabase(UNICORN_DEL).DELETE(unicorn_id);
    };

    const resetUnicorns = () => {
      const props = [
        { name: "One", age: "1", color: "Pink" },
        { name: "Two", age: "2", color: "White" },
        { name: "Three", age: "3", color: "Zebra" }
      ];

      const promise = Promise.all([
        executeToDatabase(UNICORN_DEL_ALL).DELETE_ALL(),
        executeToDatabase(UNICORN_INS).INSERT_ALL(props[0]),
        executeToDatabase(UNICORN_INS).INSERT_ALL(props[1]),
        executeToDatabase(UNICORN_INS).INSERT_ALL(props[2])
      ]);
      return promise;
    };

    const controller = {
      getUnicorn,
      getAllUnicorns,
      createUnicorn,
      updateUnicorn,
      deleteUnicorn,
      resetUnicorns
    };

    return controller;
  } catch (e) {
    console.log(`initializeUnicorns ${e}`);
  }
};

export default initializeUnicorns;
