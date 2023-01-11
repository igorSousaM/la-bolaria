import { connection } from "../../database/db.js";
import {
  getFullOrderById,
  getFullOrders,
  postOrder,
} from "../../repositories/orders.repository.js";

export async function postOrderController(req, res) {
  const { clientId, cakeId, quantity, totalPrice } = req.body;

  try {
    await postOrder(clientId, cakeId, quantity, totalPrice);
    res.status(201).send("bolo inserido");
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function getOrdersController(req, res) {
  //add query string

  try {
    const ordersConsult = await getFullOrders();

    if (ordersConsult.length === 0) {
      return res.status(404).send("não tem pedido");
    }

    const orders = ordersConsult.map((i) => organizeOrder(i));

    res.status(200).send(orders);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function getOrderByIdController(req, res) {
  const { id } = req.params;

  try {
    const orderConsult = await getFullOrderById(id);

    const order = organizeOrder(orderConsult);

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

  return body;
}
