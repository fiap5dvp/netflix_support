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

  async create({ userId, userName, comments }) {
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
        user_name,
        comments,
        create_date,
        status
      ) values (
        $1,
        $2,
        $3,
        $4,
        $5
      )`,
      [userId, userName, comments, new Date(), 0]
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

  async changeUser(userId, props) {
    const { name } = props;

    await db.execute("Update tickets set user_name = $1 where user_id = $2", [
      name,
      userId,
    ]);
  }
}

module.exports = new TicketModel();
