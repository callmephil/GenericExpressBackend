import { change_1, change_2 } from "../../Middlewares/example";

export const unicorns_model = [
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
];
