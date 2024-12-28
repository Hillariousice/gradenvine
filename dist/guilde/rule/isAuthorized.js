"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = exports.isAuthorized = void 0;
const graphql_shield_1 = require("graphql-shield");
const utils_1 = require("../../utils");
exports.isAuthorized = (0, graphql_shield_1.rule)()(async (parent, args, ctx, info) => {
    const { authorization } = ctx.request.headers;
    if (!authorization) {
        throw new Error("Authorization header missing");
    }
    const token = authorization.replace("Bearer", "").trim();
    try {
        const { userId } = (0, utils_1.verifyToken)(token);
        return !!userId; // Return true if userId exists
    }
    catch (error) {
        console.error("Token verification failed:", error.message);
        return false; // Unauthorized
    }
});
exports.isAuthenticated = (0, graphql_shield_1.rule)()(async (parent, args, ctx, info) => {
    const { authorization } = ctx.request.headers;
    if (!authorization) {
        throw new Error("Not authenticated: Missing authorization header");
    }
    try {
        const token = authorization.replace("Bearer", "").trim();
        (0, utils_1.verifyToken)(token); // Verify token
        return true; // Access granted
    }
    catch (error) {
        return false; // Access denied
    }
});
