

import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";


import { createDocumentValidationSchema, updateDocumentValidationSchema } from "../project/project.validation";
import { docControllers } from "./document.controller";

const router = Router();

router.post(
  "/",
  validateRequest(createDocumentValidationSchema),
  docControllers.createDoc
);

router.get("/", docControllers.getAllDocs);
router.patch(
  "/:docId",
  validateRequest(updateDocumentValidationSchema),
  docControllers.editDoc
);

router.delete("/:docId", docControllers.deleteDoc);

const documentRoutes = router;
export default documentRoutes;