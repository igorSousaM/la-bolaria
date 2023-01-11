import { connection } from "../../database/db.js";
import { postCake } from "../../repositories/cake.repository.js";

export async function postCakesController(req, res) {
  const { name, price, image, description } = req.body;

  try {
    await postCake(name, price, image, description);
    res.status(201).send("inserido");
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
