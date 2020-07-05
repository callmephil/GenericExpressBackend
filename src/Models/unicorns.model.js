import { change_1, change_2 } from "../Middlewares/example";
import { resetUnicorns } from "../Middlewares/reset.middlewares";

export const unicorns_model = {
  transactions: [
    {
      func: "getUnicorn",
      type: "SELECT",
      query: {
        UNICORN_SEL_ID: `SELECT * FROM unicorns WHERE unicorn_id = ?`,
      },
      pk: "unicorn_id",
      props: [],
    },
    {
      func: "getAllUnicorns",
      type: "SELECT_ALL",
      query: {
        UNICORN_SEL_ALL: `SELECT * FROM unicorns`,
      },
      pk: "",
      props: [],
    },
    {
      func: "createUnicorn",
      type: "INSERT",
      query: {
        UNICORN_INS: `INSERT INTO unicorns (name, age, color) VALUES ($name, $age, $color)`,
      },
      pk: "",
      props: ["name", "age", "color"],
    },
    {
      func: "updateUnicorn",
      type: "UPDATE",
      query: {
        UNICORN_UPD: `UPDATE unicorns SET name = $name, age = $age, color = $color WHERE unicorn_id = @id`,
      },
      pk: "unicorn_id",
      props: ["name", "age", "color"],
    },
    {
      func: "deleteUnicorn",
      type: "DELETE",
      query: {
        UNICORN_DEL: `DELETE FROM unicorns WHERE unicorn_id = ?`,
      },
      pk: "unicorn_id",
      props: [],
    },
    {
      func: "resetUnicorns",
      type: "DELETE",
      query: {
        UNICORN_DEL_ALL: `DELETE FROM unicorns`
      },
      pk: "",
      props: [],
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
    middlewares: [resetUnicorns],
  },
]};
