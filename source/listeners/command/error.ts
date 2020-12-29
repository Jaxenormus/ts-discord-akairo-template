import { Listener, Command } from "discord-akairo"
import { Message } from "discord.js"

export default class ErrorListener extends Listener {
  constructor() {
    super("error", {
      emitter: "commandHandler",
      event: "error",
    })
  }

  exec(error: Error, _: Message, command: Command): void {
    this.client.console(`${command.id} has encountered an error: ${error}`)
  }
}
