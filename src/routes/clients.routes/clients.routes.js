import { Router } from "express";
import { postClients } from "../../controller/clients.controller/clients.controller.js";
import { postClientsMiddleware } from "../../middleware/clients.middleware/clients.middleware.js";
import { validateSchema } from "../../middleware/schemaValidation.js";
import { clientsSchema } from "../../models/clients.models/clients.models.js";

const clientsRouter = Router();

clientsRouter.post(
  "/clients",
  validateSchema(clientsSchema),
  postClientsMiddleware,
  postClients
);

export { clientsRouter };
