import { connection } from "../database/db.js";

export async function getCakeByName(name) {
  const cakeConsult = await connection.query(
    "SELECT * FROM cakes WHERE name = $1;",
    [name]
  );
  return cakeConsult.rows[0];
}

export async function getCakeById(id) {
  const cakeConsult = await connection.query(
    "SELECT * FROM cakes WHERE id=$1;",
    [id]
  );

  return cakeConsult.rows[0];
}

export async function postCake(name, price, image, description) {
  await connection.query(
    "INSERT INTO cakes (name, price, image, description) VALUES ($1,$2,$3,$4);",
    [name, price, image, description]
  );
}
