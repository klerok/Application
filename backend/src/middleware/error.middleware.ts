import Send from "@utils/response.utils";
import { NextFunction, Request, Response } from "express";
import z, { ZodError } from "zod";

export function errorMiddleware(err: Error, _req: Request, res: Response, _next: NextFunction) {
    if (err instanceof ZodError) {
        return Send.validationErrors(res, z.flattenError(err).fieldErrors);
    }

    if (err instanceof Error) {
        if (err.message === 'Invalid credentials') {
            return Send.error(res, null, 'Invalid credentials');
        }
        if (err.message === 'Email already in use') {
            return Send.error(res, null, 'Email already in use');
        }
    }

}