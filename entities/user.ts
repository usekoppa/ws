import { Snowflake, User as APIUser } from "../../api/mod.ts";
import { APIDataMap, Entity } from "./_entity.base.ts";

export class User extends Entity<APIUser> {
  readonly username!: string;

  protected dataMap: APIDataMap<APIUser, this> = {
    username: "username",
  };

  static forge(ID: Snowflake.Raw) {
    return new this({
      id: ID,
      username: "",
      discriminator: "0000",
      avatar: null,
    });
  }
}
