import { connection } from "../database/db.js";

export async function getOrderById(id) {
  const orderConsult = await connection.query(
    "SELECT * FROM orders WHERE id=$1;",
    [id]
  );

  return orderConsult.rows[0];
}

export async function postOrder(clientId, cakeId, quantity, totalPrice) {
  await connection.query(
    'INSERT INTO orders ("clientId", "cakeId", quantity, "totalPrice") VALUES ($1,$2,$3,$4);',
    [clientId, cakeId, quantity, totalPrice]
  );
}

export async function getFullOrders() {
  const ordersConsult = await connection.query(
    `SELECT 
        o.id as "orderId", o.quantity, o."createdAt", o."totalPrice",
        o."clientId",cl.name as "clientName", cl.address,cl.phone,
        o."cakeId", ca.name as "cakeName", ca.price, ca.image, ca.description 
        FROM orders o 
        JOIN clients cl ON o."clientId"=cl.id 
        JOIN cakes ca ON ca.id=o."cakeId";`
  );

  return ordersConsult.rows;
}

export async function getFullOrderById(id) {
  const orderConsult = await connection.query(
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

  return orderConsult.rows[0];
}

