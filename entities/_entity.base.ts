import { Snowflake } from "../../api/mod.ts";

export abstract class Entity<APIType> {
  readonly ID!: Snowflake.Raw;

  protected abstract dataMap: APIDataMap<APIType, this>;

  protected constructor(
    raw: APIType,
  );
  protected constructor(
    raw: Partial<APIType>,
    forged: true,
  );
  protected constructor(
    public readonly raw: APIType | Partial<APIType>,
    public readonly forged = false,
  ) {
    this.populate();
  }

  protected populate() {
    for (const [superTypeKey, APITypeKey] of Object.entries(this.dataMap)) {
      const value = this.raw[APITypeKey as keyof APIType];
      if (typeof value !== "undefined") {
        // @ts-expect-error If the key is used correctly, this shouldn't cause many problems.
        // Also, change all nulls to undefined.
        Reflect.set(this, superTypeKey, this.raw[APITypeKey] ?? void 0);
      }
    }
  }

  toJSON() {
    const JSONData = {} as APIType;
    for (const [superTypeKey, APITypeKey] of Object.entries(this.dataMap)) {
      const prop = this[superTypeKey as keyof this];
      if (typeof prop !== "undefined") {
        // @ts-expect-error If the key is used correctly, this shouldn't cause many problems.
        JSONData[APITypeKey] = this[superTypeKey].toJSON?.();
      }
    }

    return JSONData;
  }
}

export type APIDataMap<APIType, SuperEntity> = {
  [k in keyof SuperEntity]?: keyof APIType;
};
