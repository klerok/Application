import { NextFunction, Request, Response } from "express";
import z from "zod";

interface ValidateSchemas<
  TBody = unknown,
  TParams extends Request["params"] = Request["params"],
  TQuery extends Request["query"] = Request["query"]
> {
  body?: z.ZodType<TBody>;
  params?: z.ZodType<TParams>;
  query?: z.ZodType<TQuery>;
}

function toFieldErrors(error: z.ZodError): Record<string, string[]> {
  return z.flattenError(error).fieldErrors;
}

export function validateMiddleware<
  TBody = unknown,
  TParams extends Request["params"] = Request["params"],
  TQuery extends Request["query"] = Request["query"]
>(schemas: ValidateSchemas<TBody, TParams, TQuery>) {
  return (req: Request, res: Response, next: NextFunction) => {
    const errors: Record<string, string[]> = {};

    if (schemas.body) {
      const result = schemas.body.safeParse(req.body);
      if (!result.success) {
        Object.assign(errors, toFieldErrors(result.error));
      } else {
        req.body = result.data;
      }
    }

    if (schemas.params) {
      const result = schemas.params.safeParse(req.params);
      if (!result.success) {
        Object.assign(errors, toFieldErrors(result.error));
      } else {
        req.params = result.data;
      }
    }
  };
}
