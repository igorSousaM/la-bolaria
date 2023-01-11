import { getCakeById } from "../../repositories/cake.repository.js";
import { getClientById } from "../../repositories/clients.repostory.js";
import { getOrderById } from "../../repositories/orders.repository.js";

export async function postOrderMiddleware(req, res, next) {
  const { cakeId, clientId, quantity, totalPrice } = req.body;

  try {
    const cakeConsult = await getCakeById(cakeId);
    if (!cakeConsult) {
      return res.status(404).send("esse bolo nao existe");
    }

    const clientConsult = await getClientById(clientId);

    if (!clientConsult) {
      return res.status(404).send("cliente nao existe");
    }

    if (totalPrice !== quantity * cakeConsult.price) {
      return res
        .status(400)
        .send("preco total nao condiz com a qtd ou preço do bolos");
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }

  next();
}

export async function getOrderByIdMiddleware(req, res, next) {
  const { id } = req.params;

  try {
    const orderConsult = await getOrderById(id);

    if (!orderConsult) {
      return res.status(404).send("esse pedido nao existe");
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }

  next();
}
