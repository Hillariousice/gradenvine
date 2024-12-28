"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApolloServer = void 0;
const apollo_server_fastify_1 = require("apollo-server-fastify");
const apollo_server_core_1 = require("apollo-server-core");
const graphql_middleware_1 = require("graphql-middleware");
// middlewares argument was added to the createApolloServer function
const createApolloServer = (middlewares, { app, schema }) => {
    const schemaWithPermissions = (0, graphql_middleware_1.applyMiddleware)(schema, ...middlewares);
    return new apollo_server_fastify_1.ApolloServer({
        schema: schemaWithPermissions,
        plugins: [
            (0, apollo_server_core_1.ApolloServerPluginDrainHttpServer)({ httpServer: app.server }),
            {
                serverWillStart: async () => {
                    return {
                        drainServer: async () => {
                            await app.close();
                        },
                    };
                },
            },
        ],
    });
};
exports.createApolloServer = createApolloServer;
