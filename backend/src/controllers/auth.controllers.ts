import Send from "@utils/response.utils";
import { NextFunction, Request, Response } from "express";
import authSchema from "validations/auth.schema";
import z from "zod";
import AuthService from "services/auth.service";

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict" as const,
  path: "/",
};

class AuthControllers {
  static async Register(req: Request, res: Response, _next: NextFunction) {
    const { username, email, password } = req.body as z.infer<
      typeof authSchema.register
    >;
    const newUser = await AuthService.register({ username, email, password });
    return Send.success(res, newUser, "User successfully registered");
  }

  static async login(req: Request, res: Response, _next: NextFunction) {
    const { email, password } = req.body as z.infer<typeof authSchema.login>;
    const userData = await AuthService.login({ email, password });

    res.cookie("accessToken", userData.accessToken, {
      ...cookieOptions,
      maxAge: 15 * 60 * 1000,
    });
    res.cookie("refreshToken", userData.refreshToken, cookieOptions);

    return Send.success(
      res,
      {
        userId: userData.user.userId,
        username: userData.user.username,
        email: userData.user.email,
        role: userData.user.role,
      },
      "Login successful"
    );
  }

  static async me(req: Request, res: Response, _next: NextFunction) {
    const userId = req.user?.userId;
    if (typeof userId !== "number")
      return Send.unauthorized(res, null, "Unauthorized");

    const user = await AuthService.getMe(userId);
    if (!user) return Send.notFound(res, null, "User not found");

    return Send.success(res, user, "Current user");
  }

  static async LogoutCurrent(req: Request, res: Response, _next: NextFunction) {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken)
      return Send.unauthorized(res, null, "Refresh token not found");

    await AuthService.logoutCurrent(refreshToken);

    res.clearCookie("accessToken", cookieOptions);
    res.clearCookie("refreshToken", cookieOptions);

    return Send.success(res, null, "Logged out successfully");
  }

  static async LogoutAll(req: Request, res: Response, _next: NextFunction) {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return Send.unauthorized(res, null, "Refresh token not found");
    }

    await AuthService.logoutAllFromRefresh(refreshToken);

    res.clearCookie("accessToken", cookieOptions);
    res.clearCookie("refreshToken", cookieOptions);

    return Send.success(res, null, "Logged out from all devices");
  }
}

export default AuthControllers;
