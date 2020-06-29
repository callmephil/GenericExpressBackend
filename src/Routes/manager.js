import Express from "express";
import controllerCall from "../Middlewares/ControllerCall";
import { _objectWithoutProperties } from "../utils/_es7.fn";
const app = Express();

export default async (controller, model = [], Middlewares = {}) => {
  const call = controllerCall(controller);

  for await (const obj of model) {
    const { func, type, route, has_body, has_params, body_filters, params_filters } = obj;
    app[type](route, async (req, res, next) => {
      // TODO: Move this to middleware and return final data to be passed to transaction
      const body = _objectWithoutProperties(req.body, body_filters);
      const params = _objectWithoutProperties(req.params, params_filters);

      let _obj = null;
      if (has_body && has_params) {
        _obj = { ...params, ...body }
      } else if (has_body && !has_params) {
        _obj = { ...body }
      } else if (!has_body && has_params) {
        _obj = { ...params }
      }

      call(func, _obj, res, next);
    });
  }

  return app;
};
