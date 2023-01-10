import { Router } from "express";
import { postOrder } from "../../controller/orders.controller/orders.controller.js";
import { postOrderMiddleware } from "../../middleware/orders.middleware/orders.middleware.js";
import { validateSchema } from "../../middleware/schemaValidation.js";
import { orderSchema } from "../../models/order.models/order.models.js";

const orderRouter = Router();

orderRouter.post(
  "/order",
  validateSchema(orderSchema),
  postOrderMiddleware,
  postOrder
);

export { orderRouter };
