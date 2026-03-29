import express from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import AuthControllers from "@controllers/auth.controllers";
import { validate } from "middleware/validate.middleware";
import authSchema from "validations/auth.schema";
import { asyncHandler } from "@utils/asyncHandler";

const router = express.Router();

router.post(
  "/register",
  validate({ body: authSchema.register }),
  asyncHandler(AuthControllers.Register)
);

router.post(
  "/login",
  validate({ body: authSchema.login }),
  asyncHandler(AuthControllers.login)
);

router.get("/me", authMiddleware, asyncHandler(AuthControllers.me));

router.post("/logout", asyncHandler(AuthControllers.LogoutCurrent));

router.post("/logout-all", asyncHandler(AuthControllers.LogoutAll));

export default router;
