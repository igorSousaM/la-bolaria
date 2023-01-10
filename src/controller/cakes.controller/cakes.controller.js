import { connection } from "../../database/db.js";

export async function postCakes(req, res) {
  const { name, price, image, description } = req.body;

  try {
    await connection.query(
      "INSERT INTO cakes (name, price, image, description) VALUES ($1,$2,$3,$4);",
      [name, price, image, description]
    );
    res.status(201).send("inserido")
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
