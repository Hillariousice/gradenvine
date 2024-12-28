"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
// import { expressMiddleware } from "@apollo/server/express4";
const schema_1 = require("./schema");
const db_1 = require("./database/db");
dotenv_1.default.config();
const lodash_1 = require("lodash");
const resolver_1 = require("./resolver");
const createApolloServer_1 = require("./apollo/createApolloServer");
const http_1 = __importDefault(require("http"));
const isAuthorized_1 = require("./guilde/rule/isAuthorized");
const logger_1 = require("./guilde/rule/logger");
const resolvers = (0, lodash_1.merge)(resolver_1.CafeResolvers, resolver_1.CustomerResolvers);
const startServer = async () => {
    const app = (0, express_1.default)();
    const httpServer = http_1.default.createServer(app);
    // Connect to database
    await (0, db_1.connectDB)();
    // Middlewares can be added here
    const middlewares = [isAuthorized_1.isAuthenticated, isAuthorized_1.isAuthorized, logger_1.logger];
    // Correctly configure schema and Apollo server
    const schema = {
        typeDefs: schema_1.typeDefs,
        resolvers,
    };
    const apolloServer = await (0, createApolloServer_1.createApolloServer)(middlewares, { schema });
    // Adjust context to match express middleware expectations
    await apolloServer.start();
    // app.use(
    //   "/graphql",
    //   expressMiddleware(apolloServer, {
    //     context: async ({ req, res }) => ({ req, res }),
    //   })
    // );
    const PORT = process.env.PORT || 4000;
    httpServer.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}/graphql`);
    });
};
startServer().catch((err) => {
    console.error("Error starting server:", err);
});
