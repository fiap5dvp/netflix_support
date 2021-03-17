const db = require("../services/DatabaseService");

class TicketModel {
  async get(id) {
    const response = await db.execute("Select * from tickets where id=$1", [
      id,
    ]);

    if (response.rows.length <= 0) {
      throw {
        message: "Ticket não encontrado",
        status: 400,
      };
    }

    const movie = response.rows[0];

    return movie;
  }

  async create({ userId, comments }) {
    if (!userId) {
      throw {
        status: 400,
        message: "Usuário não informado",
      };
    }

    if (!comments) {
      throw {
        status: 400,
        message: "Comentário não informado",
      };
    }

    await db.execute(
      `insert into tickets (
        user_id, 
        comments,
        create_date,
        status
      ) values (
        $1,
        $2,
        $3,
        $4
      )`,
      [userId, comments, new Date(), 0]
    );
  }

  async list(userId) {
    const response = await db.execute(
      "Select * from tickets where user_id = $1",
      [userId]
    );

    const movie = response.rows;

    return movie;
  }
}

module.exports = new TicketModel();
