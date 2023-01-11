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

export async function getOrdersByClient(req, res) {
  const { id } = req.params;

  try {
    const orderConsult = await connection.query(`SELECT 
    o.id as "orderId", o.quantity, o."createdAt", o."totalPrice",c.name as "cakeName" 
    FROM orders o JOIN cakes c ON c.id=o."cakeId"
    WHERE o."clientId" = $1;`,[id]);;

    res.status(200).send(orderConsult.rows)

  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
