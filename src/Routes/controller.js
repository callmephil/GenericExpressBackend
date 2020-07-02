import { io } from "../app";
import Express from "express";
import { _objectWithoutProperties } from "../utils/_es7.fn";
const app = Express();

const controllerCall = controller => {
  return async (method, props, res, next) => {
    try {
      const result = await controller[method](props);
      if (result === null)
        res.status(500);

      if (result)
        handleSocketEmitter(res, result);

      res.json({
        result
      });
    } catch (e) {
      next(e);
    }
  };
};

const handleSocketEmitter = (response, result) => {
  try {
    const { baseUrl, method } = response.req;

    if (method === "GET") return;
    const id = result.id ? result.id : null;
    delete result.id;
    io.sockets.emit(baseUrl, method, id, JSON.stringify(result));
  } catch (err) {
    console.error(`handleSocketEmitter ${err}`);
  }
};

export default async (controller, models = []) => {
  const transactionCall = controllerCall(controller);

  for await (const model of models) {
    const {
      func,
      type,
      route,
      exclude_body,
      exclude_params,
      middlewares,
    } = model;
    app[type](route, [...middlewares], async (req, res, next) => {
      const body = _objectWithoutProperties(req.body, exclude_body);
      const params = _objectWithoutProperties(req.params, exclude_params);
      transactionCall(func, {...params, ...body }, res, next);
    });
  }

  return app;
};
