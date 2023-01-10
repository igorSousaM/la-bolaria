import { connection } from "../../database/db.js";

export async function postClients(req, res) {
  const { name, address, phone } = req.body;

  try {
    await connection.query(
      "INSERT INTO clients (name, address, phone) VALUES ($1, $2, $3);",
      [name, address, phone]
    );
    res.status(201).send("inserido");
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
