import { resetUsers, updateUsers, deleteUsers } from "../Middlewares/reset.middlewares";
import { ENUM_QUERY_TYPES, ENUM_REST_API_TYPES } from "../utils/enums";

export const users_model = {
  // TODO: Find a way to re-use existing function for multiple statement.
  transactions: [
    {
      func: "getUser",
      statement: {
        type: ENUM_QUERY_TYPES.SELECT,
        stmtKey: "USER_SEL_ID",
        query: `SELECT * FROM users WHERE user_id = ?`,
        pk: "user_id",
        expectedProps: [],
      },
    },
    {
      func: "getAllUsers",
      statement: {
        type: ENUM_QUERY_TYPES.SELECT_ALL,
        stmtKey: "USER_SEL_ALL",
        query: `SELECT * FROM users`,
        pk: "",
        expectedProps: [],
      },
    },
    {
      func: "createUser",
      statement: {
        type: ENUM_QUERY_TYPES.INSERT,
        stmtKey: "USER_INS",
        query: `INSERT INTO users (first_name, last_name, email) VALUES ($first_name, $last_name, $email)`,
        pk: "",
        expectedProps: ["first_name", "last_name", "email"],
      },
    },
    {
      func: "updateUser",
      statement: {
        type: ENUM_QUERY_TYPES.UPDATE,
        stmtKey: "USER_UPD",
        query: `UPDATE users SET first_name = $first_name, last_name = $last_name, email = $email WHERE user_id = @id`,
        pk: "user_id",
        expectedProps: ["first_name", "last_name", "email"],
      },
    },
    {
      func: "deleteUser",
      statement: {
        type: ENUM_QUERY_TYPES.DELETE,
        stmtKey: "USER_DEL",
        query: `DELETE FROM users WHERE user_id = ?`,
        pk: "user_id",
        expectedProps: [],
      },
    },
    {
      func: "resetUser",
      statement: {
        type: ENUM_QUERY_TYPES.DELETE_ALL,
        stmtKey: "USER_DEL_ALL",
        query: `DELETE FROM users`,
        pk: "",
        expectedProps: [],
      },
    },
  ],
  routes: [
    {
      func: "getUser",
      type: ENUM_REST_API_TYPES.GET,
      route: "/users/:user_id",
      middlewares: [],
    },
    {
      func: "getAllUsers",
      type: ENUM_REST_API_TYPES.GET,
      route: "/users/",
      middlewares: [],
    },
    {
      func: "createUser",
      type: ENUM_REST_API_TYPES.POST,
      route: "/users/",
      middlewares: [],
    },
    {
      func: "updateUser",
      type: ENUM_REST_API_TYPES.PATCH,
      route: "/users/",
      middlewares: [updateUsers],
    },
    {
      func: "updateUser",
      type: ENUM_REST_API_TYPES.PATCH,
      route: "/users/:user_id",
      middlewares: [],
    },
    {
      func: "deleteUser",
      type: ENUM_REST_API_TYPES.DELETE,
      route: "/users/props/",
      middlewares: [deleteUsers],
    },
    {
      func: "deleteUser",
      type: ENUM_REST_API_TYPES.DELETE,
      route: "/users/:user_id",
      middlewares: [],
    },
    {
      func: "resetUser",
      type: ENUM_REST_API_TYPES.DELETE,
      route: "/users/",
      middlewares: [],
    },
    {
      func: "createUser",
      type: ENUM_REST_API_TYPES.PUT,
      route: "/users/",
      middlewares: [resetUsers],
    },
  ],
};
