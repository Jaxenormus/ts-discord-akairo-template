import { Listener } from "discord-akairo"

export default class RateLimitListener extends Listener {
  public constructor() {
    super("shardResume", {
      emitter: "client",
      event: "shardResume",
      category: "client",
    })
  }

  public async exec(id: number): Promise<void> {
    return this.client.console(`Shard ${id} has successfully resumed`)
  }
}
