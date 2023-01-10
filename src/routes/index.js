import { Router } from "express";
import { clientsRouter } from "./clients.routes/clients.routes";
import { orderRouter } from "./orders.routes/orders.routes";

const router = Router()

router.use(clientsRouter)
router.use(orderRouter)
router.use(clientsRouter)

export {router}