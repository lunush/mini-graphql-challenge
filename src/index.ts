import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { Resolver, Query, buildSchema, Arg, Int } from "type-graphql";

const getLongestRaisingSequence = (nums: number[]) => {
  if (!nums.length) return [];

  let temp = [nums[0]];
  let res: number[] = [];

  for (let i = 1; i < nums.length; i++) {
    if (nums[i - 1] <= nums[i]) temp.push(nums[i]);
    else {
      if (temp.length > res.length) res = temp;
      temp = [nums[i]];
    }
  }

  if (temp.length > res.length) res = temp;

  return res;
};

@Resolver()
class MyResolver {
  @Query(() => [Int])
  longestRaisingSequence(@Arg("nums", () => [Int]) nums: number[]) {
    return getLongestRaisingSequence(nums);
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
