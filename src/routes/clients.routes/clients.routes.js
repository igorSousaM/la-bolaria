import { Router } from "express";
import {
  getOrdersByClientController,
  postClientsController,
} from "../../controller/clients.controller/clients.controller.js";
import {
  getOrdersByClientMiddleware,
  postClientsMiddleware,
} from "../../middleware/clients.middleware/clients.middleware.js";
import { validateSchema } from "../../middleware/schemaValidation.js";
import { clientsSchema } from "../../models/clients.models/clients.models.js";

const clientsRouter = Router();

clientsRouter.post(
  "/clients",
  validateSchema(clientsSchema),
  postClientsMiddleware,
  postClientsController
);

clientsRouter.get(
  "/clients/:id/orders",
  getOrdersByClientMiddleware,
  getOrdersByClientController
);

export { clientsRouter };
