import { connection } from "../../database/db.js";

export async function postClientsMiddleware(req, res, next) {
  const { name, address, phone } = req.body;

  try {
    const clientConsult = await connection.query(
      "SELECT * FROM clients WHERE name = $1 AND address = $2 AND phone = $3;",
      [name, address, phone]
    );

    if (clientConsult.rows.length !== 0) {
      return res.status(409).send("esse cliente ja existe");
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }

  next();
}

export async function getOrdersByClientMiddleware(req, res, next) {
  const { id } = req.params;

  try {
    const clientConsult = await connection.query(
      "SELECT * FROM clients WHERE id=$1",
      [id]
    );

    if(clientConsult.rows.length === 0){
      res.status(404).send("cliente nao existe")
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }

  next();
}
