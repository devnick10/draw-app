import { JWT_SECRET } from "@repo/backend-common/config";
import jwt, { JwtPayload } from "jsonwebtoken";

export const checkAuth = (token: string): string | null => {
  try {
    const decode = jwt.verify(token, JWT_SECRET) as JwtPayload;
    if (typeof decode === "string") {
      return null;
    }
    if (!decode || !decode.userId) {
      return null;
    }
    return decode.userId;
  } catch (error) {
    return null;
  }
};
