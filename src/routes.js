const { Router } = require("express");

const AuthMiddleware = require("./middlewares/AuthMiddleware");

const TicketController = require("./controllers/TicketController");

const routes = Router();

routes.post("/api/tickets", AuthMiddleware, TicketController.create);
routes.get("/api/tickets", AuthMiddleware, TicketController.list);

module.exports = routes;
