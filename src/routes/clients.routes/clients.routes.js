import { Router } from "express";
import { getOrdersByClient, postClients } from "../../controller/clients.controller/clients.controller.js";
import { getOrdersByClientMiddleware, postClientsMiddleware } from "../../middleware/clients.middleware/clients.middleware.js";
import { validateSchema } from "../../middleware/schemaValidation.js";
import { clientsSchema } from "../../models/clients.models/clients.models.js";

const clientsRouter = Router();

clientsRouter.post(
  "/clients",
  validateSchema(clientsSchema),
  postClientsMiddleware,
  postClients
);

clientsRouter.get("/clients/:id/orders",getOrdersByClientMiddleware, getOrdersByClient)

export { clientsRouter };
