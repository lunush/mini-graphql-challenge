import { Resolver, Query } from "type-graphql";

@Resolver()
export class ValidateResolver {
  @Query(() => String)
  validate() {
    return "validating..";
  }
}
