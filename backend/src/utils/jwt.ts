import { sign, verify } from "jsonwebtoken";
import createHttpError from "http-errors";

export const generateToken = async (payload: object, secret: string) => {
  const token = sign(payload, secret, {
    expiresIn: "24h",
  });
  return token;
};

export const verifyToken = (token: string, secret: string) => {
  try {
    const decodedInfo: any = verify(token, secret);
    return decodedInfo;
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      throw createHttpError(401, "Token Expired");
    }
    if (error.name == "JsonWebTokenError") {
      throw createHttpError(401, "Token Invalid");
    }
    throw error;
  }
};
