import { resetUsers } from "../Middlewares/reset.middlewares";

export const users_model = {
  // TODO: Find a way to re-use existing function for multiple statement.
  transactions: [
    {
      func: "getUser",
      statements: [
        {
          type: "SELECT",
          stmtKey: "USER_SEL_ID",
          query: `SELECT * FROM users WHERE user_id = ?`,
          pk: "user_id",
          props: [],
        },
      ],
    },
    {
      func: "getAllUsers",
      statements: [
        {
          type: "SELECT_ALL",
          stmtKey: "USER_SEL_ALL",
          query: `SELECT * FROM users`,
          pk: "",
          props: [],
        },
      ],
    },
    {
      func: "createUser",
      statements: [
        {
          type: "INSERT",
          stmtKey: "USER_INS",
          query: `INSERT INTO users (first_name, last_name, email) VALUES ($first_name, $last_name, $email)`,
          pk: "",
          props: ["first_name", "last_name", "email"],
        },
      ],
    },
    {
      func: "updateUser",
      statements: [
        {
          type: "UPDATE",
          stmtKey: "USER_UPD",
          query: `UPDATE users SET first_name = $first_name, last_name = $last_name, email = $email WHERE user_id = @id`,
          pk: "user_id",
          props: ["first_name", "last_name", "email"],
        },
      ],
    },
    {
      func: "deleteUser",
      statements: [
        {
          type: "DELETE",
          stmtKey: "USER_DEL",
          query: `DELETE FROM users WHERE user_id = ?`,
          pk: "user_id",
          props: [],
        },
      ],
    },
    {
      func: "resetUser",
      statements: [
        {
          type: "DELETE",
          stmtKey: "USER_DEL_ALL",
          query: `DELETE FROM users`,
          pk: "",
          props: [],
        },
      ],
    },
    {
      // TODO: Duplicate
      func: "insertDefaultUsers",
      statements: [
        {
          type: "INSERT",
          stmtKey: "USER_INS",
          query: `INSERT INTO users (first_name, last_name, email) VALUES ($first_name, $last_name, $email)`,
          pk: "",
          props: ["first_name", "last_name", "email"],
        },
      ],
    },
  ],
  routes: [
    {
      func: "getUser",
      type: "get",
      route: "/users/:user_id",
      exclude_body: [],
      exclude_params: [],
      middlewares: [],
    },
    {
      func: "getAllUsers",
      type: "get",
      route: "/users/",
      exclude_body: [],
      exclude_params: [],
      middlewares: [],
    },
    {
      func: "createUser",
      type: "post",
      route: "/users/",
      exclude_body: [],
      exclude_params: [],
      middlewares: [],
    },
    {
      func: "updateUser",
      type: "patch",
      route: "/users/:user_id",
      exclude_body: [],
      exclude_params: [],
      middlewares: [],
    },
    {
      func: "deleteUser",
      type: "delete",
      route: "/users/:user_id",
      exclude_body: [],
      exclude_params: [],
      middlewares: [],
    },
    {
      func: "resetUser",
      type: "delete",
      route: "/users/",
      exclude_body: [],
      exclude_params: [],
      middlewares: [],
    },
    {
      func: "insertDefaultUsers",
      type: "put",
      route: "/unicorns/",
      exclude_body: [],
      exclude_params: [],
      middlewares: [resetUsers],
    },
  ],
};
