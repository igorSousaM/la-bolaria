import { connection } from "../../database/db.js";

export async function postOrder(req, res) {
  const { clientId, cakeId, quantity, totalPrice } = req.body;

  try {
    await connection.query(
      'INSERT INTO orders ("clientId", "cakeId", quantity, "totalPrice") VALUES ($1,$2,$3,$4);',
      [clientId, cakeId, quantity, totalPrice]
    );
    res.status(201).send("bolo inserido");
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function getOrder(req, res) {
  try {
    const ordersConsult = await connection.query(
      `SELECT 
      o.id as "orderId", o.quantity, o."createdAt", o."totalPrice",
      o."clientId",cl.name as "clientName", cl.address,cl.phone,
      o."cakeId", ca.name as "cakeName", ca.price, ca.image, ca.description 
      FROM orders o 
      JOIN clients cl ON o."clientId"=cl.id 
      JOIN cakes ca ON ca.id=o."cakeId";`
    );

    if (ordersConsult.rows.length === 0) {
      return res.status(404).send("não tem pedido");
    }

    res.status(200).send(ordersConsult.rows);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function getOrderById(req, res) {
  const { id } = req.params;

  try {
    const ordersConsult = await connection.query(
      `SELECT 
            o.id as "orderId", o.quantity, o."createdAt", o."totalPrice",
            o."clientId",cl.name as "clientName", cl.address,cl.phone,
            o."cakeId", ca.name as "cakeName", ca.price, ca.image, ca.description 
            FROM orders o 
            JOIN clients cl ON o."clientId"=cl.id 
            JOIN cakes ca ON ca.id=o."cakeId"
            WHERE o.id = $1;`,
      [id]
    );
    res.status(200).send(ordersConsult.rows)
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
