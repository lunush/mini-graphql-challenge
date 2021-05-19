import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { Resolver, Query, buildSchema } from "type-graphql";

@Resolver()
class MyResolver {
  @Query(() => String)
  longestRaisingSequence() {
    return "hi";
  }
}

const main = async () => {
  const app = express();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [MyResolver],
      validate: false,
    }),
    playground: true,
  });

  apolloServer.applyMiddleware({
    app,
  });

  app.listen(4040);
};

main().catch((err) => console.error(err));
