import { change_1, change_2 } from "../Middlewares/example";
import { resetUnicorns } from "../Middlewares/reset.middlewares";
import { ENUM_REST_API_TYPES, ENUM_QUERY_TYPES } from "../utils/enums";

export const unicorns_model = {
  transactions: [
    {
      func: "getUnicorn",
      statement: {
        type: ENUM_QUERY_TYPES.SELECT,
        stmtKey: "UNICORN_SEL_ID",
        query: `SELECT * FROM unicorns WHERE unicorn_id = ?`,
        pk: "unicorn_id",
        expectedProps: [],
      },
    },
    {
      func: "getAllUnicorns",
      statement: {
        type: ENUM_QUERY_TYPES.SELECT_ALL,
        stmtKey: "UNICORN_SEL_ALL",
        query: `SELECT * FROM unicorns`,
        pk: "",
        expectedProps: [],
      },
    },
    {
      func: "createUnicorn",
      statement: {
        type: ENUM_QUERY_TYPES.INSERT,
        stmtKey: "UNICORN_INS",
        query: `INSERT INTO unicorns (name, age, color) VALUES ($name, $age, $color)`,
        pk: "",
        expectedProps: ["name", "age", "color"],
      },
    },
    {
      func: "updateUnicorn",
      statement: {
        type: ENUM_QUERY_TYPES.UPDATE,
        stmtKey: "UNICORN_UPD",
        query: `UPDATE unicorns SET name = $name, age = $age, color = $color WHERE unicorn_id = @id`,
        pk: "unicorn_id",
        expectedProps: ["name", "age", "color"],
      },
    },
    {
      func: "deleteUnicorn",
      statement: {
        type: ENUM_QUERY_TYPES.DELETE,
        stmtKey: "UNICORN_DEL",
        query: `DELETE FROM unicorns WHERE unicorn_id = ?`,
        pk: "unicorn_id",
        expectedProps: [],
      },
    },
    {
      func: "resetUnicorns",
      statement: {
        type: ENUM_QUERY_TYPES.DELETE_ALL,
        stmtKey: "UNICORN_DEL_ALL",
        query: `DELETE FROM unicorns`,
        pk: "",
        expectedProps: [],
      },
    },
  ],
  routes: [
    {
      func: "getUnicorn",
      type: ENUM_REST_API_TYPES.GET,
      route: "/unicorns/:unicorn_id",
      middlewares: [change_1, change_2],
    },
    {
      func: "getAllUnicorns",
      type: ENUM_REST_API_TYPES.GET,
      route: "/unicorns/",
      middlewares: [],
    },
    {
      func: "createUnicorn",
      type: ENUM_REST_API_TYPES.POST,
      route: "/unicorns/",
      middlewares: [],
    },
    {
      func: "updateUnicorn",
      type: ENUM_REST_API_TYPES.PATCH,
      route: "/unicorns/:unicorn_id",
      middlewares: [],
    },
    {
      func: "deleteUnicorn",
      type: ENUM_REST_API_TYPES.DELETE,
      route: "/unicorns/:unicorn_id",
      middlewares: [],
    },
    {
      func: "resetUnicorns",
      type: ENUM_REST_API_TYPES.PUT,
      route: "/unicorns/",
      middlewares: [resetUnicorns],
    },
  ],
};
