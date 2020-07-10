import { io } from "../app";
import Express from "express";
import { _objectWithoutProperties } from "../utils/_es7.fn";
import { Logger } from "../utils/logger";
const app = Express();

const controllerCall = (controller) => {
  return async (method, props, res, next) => {
    try {
      const result = await controller[method](props);
      if (result === null) res.status(500);

      if (result) {
        handleSocketEmitter(res, result);
      }

      res.json({
        result,
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
  try {
    const transactionCall = controllerCall(controller);

    for await (const model of models) {
      try {
        const { func, type, route, middlewares } = model;
        app[type](route, [...middlewares], async ({ params, body }, res, next) => {
          const data = Array.isArray(body) ? body : { ...params, ...body };

          transactionCall(func, data, res, next);
        });
      } catch (e) {
        const logger = Logger("controller", "For Loop");
        logger.logError(e.message, model);
      }
    }

    return app;
  } catch (e) {
    const logger = Logger("controller", "Default Catch");
    logger.logError(e.message);
  }
};
