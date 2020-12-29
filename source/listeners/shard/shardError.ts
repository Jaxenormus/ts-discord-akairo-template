import { Listener } from "discord-akairo"

export default class RateLimitListener extends Listener {
  public constructor() {
    super("shardError", {
      emitter: "client",
      event: "shardError",
      category: "client",
    })
  }

  public async exec(error: Error, id: number): Promise<void> {
    return this.client.console(`Shard ${id} has encountered an error ${error}`)
  }
}
