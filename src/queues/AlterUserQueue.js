const TicketModel = require("../models/TicketModel");

const AlterUserQueue = async ({ message, data, channel }) => {
  const { id, props } = data;

  await TicketModel.changeUser(id, props);

  channel.ack(message);
};

module.exports = AlterUserQueue;
