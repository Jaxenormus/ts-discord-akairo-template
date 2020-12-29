import { Listener } from "discord-akairo"

export default class RateLimitListener extends Listener {
  public constructor() {
    super("shardReconnecting", {
      emitter: "client",
      event: "shardReconnecting",
      category: "client",
    })
  }

  public async exec(id: number): Promise<void> {
    return this.client.console(`Shard ${id} is attempting to reconnect`)
  }
}
