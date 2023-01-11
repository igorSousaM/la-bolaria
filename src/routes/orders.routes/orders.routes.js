import { Router } from "express";
import {
  getOrders,
  getOrderById,
  postOrder,
} from "../../controller/orders.controller/orders.controller.js";
import { getOrderByIdMiddleware, postOrderMiddleware } from "../../middleware/orders.middleware/orders.middleware.js";
import { validateSchema } from "../../middleware/schemaValidation.js";
import { orderSchema } from "../../models/order.models/order.models.js";

const orderRouter = Router();

orderRouter.post(
  "/order",
  validateSchema(orderSchema),
  postOrderMiddleware,
  postOrder
);

orderRouter.get("/order", getOrders);
orderRouter.get("/order/:id",getOrderByIdMiddleware,getOrderById)

export { orderRouter };
