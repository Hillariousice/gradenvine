import { hash, verify } from "argon2";
import jwt, { JwtPayload } from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key";

export const hashPassword = async (password:string) => {
  return await hash(password);
};

export const signToken = (data:{}) => {
    return jwt.sign(data, process.env.JWT_SECRET!);
  };

export const verifyPassword = async (hash:string, password:string) => {
    return await verify(hash, password);
  };

export const verifyToken = (token:string) => {
  try {
    return jwt.verify(token, SECRET_KEY) as JwtPayload;
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
  };

 