import { connection } from "../../database/db.js";

export async function postOrderMiddleware(req, res, next) {
  const { cakeId, clientId, quantity, totalPrice } = req.body;

  try {
    const cakeConsult = await connection.query(
      "SELECT * FROM cakes WHERE id=$1;",
      [cakeId]
    );

    if (cakeConsult.rows.length === 0) {
      return res.status(404).send("esse bolo nao existe");
    }

    const clientConsult = await connection.query(
      "SELECT * FROM clients WHERE id=$1;",
      [clientId]
    );

    if (clientConsult.rows.length === 0) {
      return res.status(404).send("esse cliente nao existe");
    }

    if (totalPrice !== quantity * cakeConsult.rows[0].price) {
      return res
        .status(409)
        .send("preco total nao condiz com a qtd ou preço do bolos");
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }

  next();
}
