import { rule } from "graphql-shield";
import { JwtPayload } from "jsonwebtoken";

import { verifyToken } from "../../utils";

interface Context {
  request: {
    headers: {
      authorization?: string;
    };
  };
}

export const isAuthorized = rule()(async (parent, args, ctx: Context, info) => {
  const { authorization } = ctx.request.headers;

  if (!authorization) {
    throw new Error("Authorization header missing");
  }

  const token = authorization.replace("Bearer", "").trim();

  try {
    
    const { userId } = verifyToken(token) as JwtPayload;
    return !!userId; // Return true if userId exists
  } catch (error: any) {
    console.error("Token verification failed:", error.message);
    return false; // Unauthorized
  }
});

export const isAuthenticated = rule()(async (parent, args,ctx: Context, info) => {
  const { authorization } = ctx.request.headers;

  if (!authorization) {
    throw new Error("Not authenticated: Missing authorization header");
  }

  try {
    const token = authorization.replace("Bearer", "").trim();
    verifyToken(token); // Verify token
    return true; // Access granted
  } catch (error) {
    return false; // Access denied
  }
});
