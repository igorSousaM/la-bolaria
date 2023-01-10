import { Router } from "express";
import { cakeRouter } from "./cakes.routes/cakes.routes.js";
import { clientsRouter } from "./clients.routes/clients.routes.js";
import { orderRouter } from "./orders.routes/orders.routes.js";

const router = Router()

router.use(clientsRouter)
router.use(orderRouter)
router.use(cakeRouter)

export {router}