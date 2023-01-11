import { Router } from "express";
import { postCakesController } from "../../controller/cakes.controller/cakes.controller.js";
import { postCakesMiddleware } from "../../middleware/cakes.middleware/cakes.middleware.js";
import { validateSchema } from "../../middleware/schemaValidation.js";
import { cakesSchema } from "../../models/cakes.models/cakes.model.js";

const cakeRouter = Router();

cakeRouter.post(
  "/cakes",
  validateSchema(cakesSchema),
  postCakesMiddleware,
  postCakesController
);

export { cakeRouter };
