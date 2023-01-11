import { Router } from "express";
import {
  getOrdersController,
  getOrderByIdController,
  postOrderController,
} from "../../controller/orders.controller/orders.controller.js";
import {
  getOrderByIdMiddleware,
  postOrderMiddleware,
} from "../../middleware/orders.middleware/orders.middleware.js";
import { validateSchema } from "../../middleware/schemaValidation.js";
import { orderSchema } from "../../models/order.models/order.models.js";

const orderRouter = Router();

orderRouter.post(
  "/order",
  validateSchema(orderSchema),
  postOrderMiddleware,
  postOrderController
);

orderRouter.get("/orders", getOrdersController);
orderRouter.get("/orders/:id", getOrderByIdMiddleware, getOrderByIdController);

export { orderRouter };
