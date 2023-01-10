import { connection } from "../../database/db.js";

export async function postCakesMiddleware(req, res, next) {
  const { name } = req.body;

  try {
    const cakeConsult = await connection.query(
      "SELECT * FROM cakes WHERE name = $1;",
      [name]
    );
    if (cakeConsult.rows.length !== 0) {
      return res.status(409).send("ja tem bolo com esse nome");
    }

    //descobrir como fazer um link valido

  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }

  next();
}
