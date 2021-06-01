import Express from "express";
import { Logger } from "../utils/logger";
const app = Express();

export default async (controller, models = []) => {
  try {
    for await (const model of models) {
      try {
        const { type, route, middlewares } = model;
        app[type](route, [...middlewares], async ({ result }, res, next) => {
          res.json({ result });
        });
      } catch (e) {
        const logger = Logger("controller", "For Loop");
        logger.logError(e.message, model);
        next(e);
      }
    }

    return app;
  } catch (e) {
    const logger = Logger("controller", "Default Catch");
    logger.logError(e.message);
  }
};
