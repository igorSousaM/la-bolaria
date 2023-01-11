import { connection } from "../../database/db.js";
import { getCakeByName } from "../../repositories/cake.repository.js";

export async function postCakesMiddleware(req, res, next) {
  const { name } = req.body;

  try {
    const cakeConsult = await getCakeByName(name);

    if (cakeConsult && cakeConsult.name === name) {
      return res.status(409).send("ja tem bolo com esse nome");
    }

    //descobrir como fazer um link valido
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }

  next();
}
