import { app } from "./app";
import { models } from "./Models/index";
import controllerApp from "./Routes/controller";

const start = async () => {
  for (const model of models) {
    app.use('/api', await controllerApp(null, model.routes))
  }

  app.use((err, req, res, next) => {
    console.error(err);
    const message = err.message;
    res.status(500).json({
      success: false,
      message,
    });
  });

};

start();
