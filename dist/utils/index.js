"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.verifyPassword = exports.signToken = exports.hashPassword = void 0;
const argon2_1 = require("argon2");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const hashPassword = async (password) => {
    return await (0, argon2_1.hash)(password);
};
exports.hashPassword = hashPassword;
const signToken = (data) => {
    return jsonwebtoken_1.default.sign(data, process.env.JWT_SECRET);
};
exports.signToken = signToken;
const verifyPassword = async (hash, password) => {
    return await (0, argon2_1.verify)(hash, password);
};
exports.verifyPassword = verifyPassword;
const verifyToken = (token) => {
    return jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
};
exports.verifyToken = verifyToken;
