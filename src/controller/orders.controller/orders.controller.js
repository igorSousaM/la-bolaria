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

export async function getOrders(req, res) {
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

    const orders = ordersConsult.rows.map(i=>organizeOrder(i))

    res.status(200).send(orders);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function getOrderById(req, res) {
  const { id } = req.params;

  try {
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

    const order = organizeOrder(orderConsult.rows[0]) 

    res.status(200).send(order);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

function organizeOrder(obj) {

  const body = {
    client: {
      id: obj.clientId,
      name: obj.clientName,
      address: obj.address,
      phone: obj.phone,
    },
    cake: {
      id: obj.cakeId,
      name: obj.cakeName,
      price: obj.price,
      description: obj.description,
      image: obj.image,
    },
    orderId: obj.orderId,
    createdAt: obj.createdAt,
    quantity: obj.quantity,
    totalPrice: obj.totalPrice,
  };

  return body
}
