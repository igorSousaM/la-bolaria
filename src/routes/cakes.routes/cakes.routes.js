import { Router } from "express";
import { postCakes } from "../../controller/cakes.controller/cakes.controller.js";
import { postCakesMiddleware } from "../../middleware/cakes.middleware/cakes.middleware.js";
import { validateSchema } from "../../middleware/schemaValidation.js";
import { postCakesSchema } from "../../models/cakes.models/cakes.model.js";

const cakeRouter = Router();

cakeRouter.post(
  "/cakes",
  validateSchema(postCakesSchema),
  postCakesMiddleware,
  postCakes
);

export { cakeRouter };
