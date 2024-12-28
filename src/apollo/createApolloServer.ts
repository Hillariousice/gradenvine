import { ApolloServer } from "apollo-server-fastify";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { applyMiddleware } from "graphql-middleware"; 

// middlewares argument was added to the createApolloServer function
export const createApolloServer = (middlewares:any, { app, schema }:any) => {
  const schemaWithPermissions = applyMiddleware(schema, ...middlewares);

  return new ApolloServer({
    schema: schemaWithPermissions, 
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer: app.server }),
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