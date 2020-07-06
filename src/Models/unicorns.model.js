import { change_1, change_2 } from "../Middlewares/example";
import { resetUnicorns } from "../Middlewares/reset.middlewares";

export const unicorns_model = {
  transactions: [
    {
      func: "getUnicorn",
      statements: [
        {
          type: "SELECT",
          stmtKey: "UNICORN_SEL_ID",
          query: `SELECT * FROM unicorns WHERE unicorn_id = ?`,
          pk: "unicorn_id",
          props: [],
        },
      ],
    },
    {
      func: "getAllUnicorns",
      statements: [
        {
          type: "SELECT_ALL",
          stmtKey: "UNICORN_SEL_ALL",
          query: `SELECT * FROM unicorns`,
          pk: "",
          props: [],
        },
      ],
    },
    {
      func: "createUnicorn",
      statements: [
        {
          type: "INSERT",
          stmtKey: "UNICORN_INS",
          query: `INSERT INTO unicorns (name, age, color) VALUES ($name, $age, $color)`,
          pk: "",
          props: ["name", "age", "color"],
        },
      ],
    },
    {
      func: "updateUnicorn",
      statements: [
        {
          type: "UPDATE",
          stmtKey: "UNICORN_UPD",
          query: `UPDATE unicorns SET name = $name, age = $age, color = $color WHERE unicorn_id = @id`,
          pk: "unicorn_id",
          props: ["name", "age", "color"],
        },
      ],
    },
    {
      func: "deleteUnicorn",
      statements: [
        {
          type: "DELETE",
          stmtKey: "UNICORN_DEL",
          query: `DELETE FROM unicorns WHERE unicorn_id = ?`,
          pk: "unicorn_id",
          props: [],
        },
      ],
    },
    {
      func: "resetUnicorns",
      statements: [
        {
          type: "DELETE_ALL",
          stmtKey: "UNICORN_DEL_ALL",
          query: `DELETE FROM unicorns`,
          pk: "",
          props: [],
        },
      ],
    },
    {
      // TODO: Duplicate
      func: "insertDefaultUnicorns",
      statements: [
        {
          type: "INSERT",
          stmtKey: "UNICORN_INS_ALL",
          query: `INSERT INTO unicorns (name, age, color) VALUES ($name, $age, $color)`,
          pk: "",
          props: ["name", "age", "color"],
        },
      ],
    },
  ],
  routes: [
    {
      func: "getUnicorn",
      type: "get",
      route: "/unicorns/:unicorn_id",
      exclude_body: [],
      exclude_params: [],
      middlewares: [change_1, change_2],
    },
    {
      func: "getAllUnicorns",
      type: "get",
      route: "/unicorns/",
      exclude_body: [],
      exclude_params: [],
      middlewares: [],
    },
    {
      func: "createUnicorn",
      type: "post",
      route: "/unicorns/",
      exclude_body: [],
      exclude_params: [],
      middlewares: [],
    },
    {
      func: "updateUnicorn",
      type: "patch",
      route: "/unicorns/:unicorn_id",
      exclude_body: [],
      exclude_params: [],
      middlewares: [],
    },
    {
      func: "deleteUnicorn",
      type: "delete",
      route: "/unicorns/:unicorn_id",
      exclude_body: [],
      exclude_params: [],
      middlewares: [],
    },
    {
      func: "resetUnicorns",
      type: "delete",
      route: "/unicorns/",
      exclude_body: [],
      exclude_params: [],
      middlewares: [],
    },
    {
      func: "insertDefaultUnicorns",
      type: "put",
      route: "/unicorns/",
      exclude_body: [],
      exclude_params: [],
      middlewares: [resetUnicorns],
    },
  ],
};
