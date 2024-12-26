import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";

import { docControllers } from "./document.controller";
import { createDocumentValidationSchema } from "./document.validation";
import { handleRedisCache } from "../../middleware/redisCacheHandler";

const router = Router();

router.post(
  "/",
  validateRequest(createDocumentValidationSchema),
  docControllers.createDoc
);

router.get("/", handleRedisCache, docControllers.getAllDocs);

router.delete("/:docId", docControllers.deleteDoc);

const documentRoutes = router;
export default documentRoutes;
