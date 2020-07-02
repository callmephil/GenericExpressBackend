import { app, io } from "./app";
import Connection from "./Database/Connection";
import controllerApp from "./Routes/controller";
import { models } from "./Routes/Models/index";

const onlineClients = new Set();
function onNewWebsocketConnection(socket) {
  console.info(`Socket ${socket.id} has connected.`);
  onlineClients.add(socket.id);

  socket.on("disconnect", () => {
    onlineClients.delete(socket.id);
    console.info(`Socket ${socket.id} has disconnected.`);
  });
}

const start = async () => {
  const DatabaseControllers = await Connection();

  let index = 0;
  for (const dbController in DatabaseControllers) {
    app.use('/api', await controllerApp(DatabaseControllers[dbController], models[index]));
    index++;
  }

  app.use((err, req, res, next) => {
    console.error(err);
    const message = err.message;
    res.status(500).json({
      success: false,
      message,
    });
  });

  io.on("connection", onNewWebsocketConnection);
};

start();
