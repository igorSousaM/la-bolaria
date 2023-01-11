import { connection } from "../database/db.js";

export async function getClient(name, address, phone) {
  const clientConsult = await connection.query(
    "SELECT * FROM clients WHERE name = $1 AND address = $2 AND phone = $3;",
    [name, address, phone]
  );

  return clientConsult.rows[0];
}

export async function getClientById(id) {
  const clientConsult = await connection.query(
    "SELECT * FROM clients WHERE id=$1",
    [id]
  );

  return clientConsult.rows[0];
}

export async function postClient(name, address, phone) {
  await connection.query(
    "INSERT INTO clients (name, address, phone) VALUES ($1, $2, $3);",
    [name, address, phone]
  );
}
