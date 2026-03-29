import Send from "@utils/response.utils";
import { NextFunction, Request, Response } from "express";
import z, { ZodError } from "zod";
import { JsonWebTokenError } from "jsonwebtoken";

export function errorMiddleware(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  const unauthorizedMessages = new Set([
    "Invalid credentials",
    "jwt malformed",
    "invalid signature",
    "Invalid refresh token",
    "Invalid refresh token userId",
    "Invalid userId",
    "No active sessions found",
    "No active session found for this token",
  ]);

  function internalServerError(res: Response, err: Error) {
    console.error(err);
    const message =
      process.env.NODE_ENV === "production"
        ? "Internal server error"
        : err.message;
    return Send.error(res, null, message);
  }

  if (res.headersSent) {
    return _next(err);
  }

  if (err instanceof ZodError) {
    return Send.validationErrors(res, z.flattenError(err).fieldErrors);
  }

  if (err instanceof Error) {
    if (err instanceof JsonWebTokenError) {
      return Send.unauthorized(res, null, "Invalid refresh token");
    }

    if (unauthorizedMessages.has(err.message)) {
      return Send.unauthorized(res, null, err.message);
    }
    if (
      err.message === "Failed to create session" ||
      err.message === "Refresh secret is not set"
    ) {
      return internalServerError(res, err);
    }
    if (err.message === "Email already in use") {
      return Send.conflict(res, null, "Email already in use");
    }
  }
  console.error(err);
  const isProd = process.env.NODE_ENV === "production";
  if (!isProd && err instanceof Error) {
    return Send.error(res, null, err.message);
  }
  return Send.error(res, null, "Internal server error");
}
