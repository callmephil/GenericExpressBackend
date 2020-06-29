import { io } from "../app";

const controllerCall = controller => {
  const call = async (method, props, res, next) => {
    try {
      const result = await controller[method](props);
      if (result)
        handleSocketEmitter(res, result);

      res.json({
        result
      });
    } catch (e) {
      next(e);
    }
  };
  return call;
};

const handleSocketEmitter = (response, result) => {
  // If method is get don't send anything.
  // If method is UPDATE, DELETE, CREATE
  // -> Send Emitter to the correct context service
  // If Reciever is in ViewMode
  // -> Send Fetch Request OR C.U.D
  // Add Limit Timer

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

export default controllerCall;
