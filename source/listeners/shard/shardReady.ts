import { Listener } from "discord-akairo"

export default class RateLimitListener extends Listener {
  public constructor() {
    super("shardReady", {
      emitter: "client",
      event: "shardReady",
      category: "client",
    })
  }

  public async exec(id: number): Promise<void> {
    return this.client.console(`Shard ${id} is now ready`)
  }
}
