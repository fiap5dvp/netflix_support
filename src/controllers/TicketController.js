const TicketModel = require("../models/TicketModel");

class TicketController {
  async store(req, res) {
    const { comments } = req.body;

    await TicketModel.create({
      userId: req.user.id,
      userName: req.user.name,
      comments,
    });

    res.sendStatus(201);
  }

  async list(req, res) {
    const tickets = await TicketModel.list(req.user.id);

    res.send(tickets);
  }
}

module.exports = new TicketController();
