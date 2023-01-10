import { connection } from "../../database/db.js";

export async function postOrder(req, res) {
  const { clientId, cakeId, quantity, totalPrice } = req.body;

  try {
    await connection.query(
      'INSERT INTO orders ("clientId", "cakeId", quantity, "totalPrice") VALUES ($1,$2,$3,$4);',
      [clientId, cakeId, quantity, totalPrice]
    );
    res.status(201).send("bolo inserido")
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
