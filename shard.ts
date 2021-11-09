import { URLs } from "../api/mod.ts";

interface ShardOptions {
  proxy?: string;
}

export class Shard extends EventTarget {
  protected ws = new WebSocket(
    this?.opts?.proxy !== "" ? this?.opts?.proxy ?? URLs.Gateway : URLs.Gateway,
  );

  opts?: ShardOptions;

  constructor(opts: ShardOptions) {
    super();
    this.opts = opts;
  }
}
