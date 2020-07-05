import { resetUsers } from "../Middlewares/reset.middlewares";

export const users_model = {
  transactions: [
    {
      func: "getUser",
      type: "SELECT",
      query: {
        USER_SEL_ID: `SELECT * FROM users WHERE user_id = ?`,
      },
      pk: "user_id",
      props: [],
    },
    {
      func: "getAllUsers",
      type: "SELECT_ALL",
      query: {
        USER_SEL_ALL: `SELECT * FROM users`,
      },
      pk: "",
      props: [],
    },
    {
      func: "createUser",
      type: "INSERT",
      query: {
        USER_INS: `INSERT INTO users (first_name, last_name, email) VALUES ($first_name, $last_name, $email)`,
      },
      pk: "",
      props: ["first_name", "last_name", "email"],
    },
    {
      func: "updateUser",
      type: "UPDATE",
      query: {
        USER_UPD: `UPDATE users SET first_name = $first_name, last_name = $last_name, email = $email WHERE user_id = @id`,
      },
      pk: "user_id",
      props: ["first_name", "last_name", "email"],
    },
    {
      func: "deleteUser",
      type: "DELETE",
      query: {
        USER_DEL: `DELETE FROM users WHERE user_id = ?`,
      },
      pk: "user_id",
      props: [],
    },
    {
      func: "resetUser",
      type: "DELETE",
      query: {
        USER_DEL_ALL: `DELETE FROM users`
      },
      pk: "",
      props: [],
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
      middlewares: [resetUsers],
    },
  ],
};
