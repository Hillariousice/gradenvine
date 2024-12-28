import express, { Application } from "express";
import dotenv from "dotenv";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import http from "http";
import { mergeResolvers } from "@graphql-tools/merge";
import { typeDefs } from "./schema";
import { connectDB } from "./database/db";
import { CafeResolvers, CustomerResolvers } from "./resolver";
import { logger } from "./guilde/rule/logger";
import { applyMiddleware } from "graphql-middleware";
import { permissions } from "./guilde/permission";

dotenv.config();

const resolvers = mergeResolvers([CafeResolvers, CustomerResolvers]);

const startServer = async () => {
  const app = express();
  const httpServer = http.createServer(app);

  // Connect to the database
  await connectDB();

  app.use(express.json()); 

  // Create the schema
  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  // Apply middlewares to the schema (e.g., graphql-middleware)
  
  const schemaWithMiddleware = applyMiddleware(schema, permissions, logger);

  // Create and start Apollo Server
  const apolloServer = new ApolloServer({
    schema: schemaWithMiddleware, 
  });

  await apolloServer.start().then(() => {
    console.log("Apollo Server is running!");
  });;

  app.use(
    "/graphql",
    expressMiddleware(apolloServer, {
      context: async ({ req, res }) => {
        const user = req.headers.authorization
          ? { token: req.headers.authorization }
          : null;
          console.log("Context:", { user, req, res });

        return {req, res, user };
      },
      
    })
  );
  

  const PORT = process.env.PORT || 4000;
  httpServer.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/graphql`);
  });
};

// Start the server
startServer().catch((err) => {
  console.error("Error starting server:", err);
});
