require("express-async-errors");
const express = require("express");
const cors = require("cors");
const TreatExceptionMiddleware = require("./middlewares/TreatExceptionMiddleware");

const rabbitMQ = require("@joinf/rabbitmq");

const routes = require("./routes");

class Server {
  constructor() {
    this.server = express();

    // this.initializeBroker();
    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  /* async initializeBroker() {
    // amqp://user:pass@host.com/vhost
    //"amqp://localhost"
    await rabbitMQ.init("amqp://user:12345@localhost");

    rabbitMQ.consumer.listen("teste", ({ message, data, channel }) => {
      console.log(data);
      channel.ack(message);
    });

    rabbitMQ.consumer.listen("tickets", ({ message, data, channel }) => {
      console.log(data);
      channel.ack(message);
    });
  } */

  middlewares() {
    this.server.use(express.json());
    this.server.use(cors());
    this.server.use(express.json({ limit: "50mb" }));
    this.server.use(express.urlencoded({ limit: "50mb", extended: true }));
  }

  routes() {
    this.server.get("/status", (req, res) => {
      res.send(`${process.env.SERVICE_NAME} service is running`);
    });
    this.server.use(routes);
  }

  exceptionHandler() {
    this.server.use(TreatExceptionMiddleware);
  }
}

const myServer = new Server();

module.exports.producer = myServer.producer;

module.exports.server = myServer.server;
