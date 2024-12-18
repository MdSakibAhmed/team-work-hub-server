import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";

import { docControllers } from "./document.controller";
import { createDocumentValidationSchema } from "./document.validation";

const router = Router();

router.post(
  "/",
  validateRequest(createDocumentValidationSchema),
  docControllers.createDoc
);

router.get("/", docControllers.getAllDocs);

router.delete("/:docId", docControllers.deleteDoc);

const documentRoutes = router;
export default documentRoutes;
