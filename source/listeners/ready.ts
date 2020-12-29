import { Listener } from "discord-akairo"

export default class ReadyListener extends Listener {
  public constructor() {
    super("ready", {
      emitter: "client",
      event: "ready",
      category: "client",
    })
  }

  public async exec(): Promise<void> {
    await this.client.user.setActivity(
      `${this.client.guilds.cache.size} Servers`,
      {
        type: "WATCHING",
      }
    )
    this.client.console(`Successfully logged in as ${this.client.user.tag}`)
  }
}
