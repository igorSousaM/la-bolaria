import {
  getClient,
  getClientById,
} from "../../repositories/clients.repostory.js";

export async function postClientsMiddleware(req, res, next) {
  const { name, address, phone } = req.body;

  try {
    const clientConsult = await getClient(name, address, phone);

    if (clientConsult) {
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
    const clientConsult = await getClientById(id);

    if (!clientConsult) {
      return res.status(404).send("cliente nao existe");
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }

  next();
}
