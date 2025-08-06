import { Router } from 'express';
import { createApplicant, getApplicants, getApplicant, deleteApplicant } from '../controllers/applicant.controllers.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = Router();

router.route("/").post(createApplicant)

router.route("/").get(verifyJWT, getApplicants)
router.route("/:id").get(verifyJWT, getApplicant)
router.route("/:id").delete(verifyJWT, deleteApplicant)

export default router