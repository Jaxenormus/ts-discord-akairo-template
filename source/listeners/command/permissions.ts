import { Listener, Command } from "discord-akairo"
import { Message } from "discord.js"

export default class MissingPermissionsListener extends Listener {
  constructor() {
    super("missingPermissions", {
      emitter: "commandHandler",
      event: "missingPermissions",
    })
  }

  exec(
    message: Message,
    _: Command,
    type: string,
    missing: unknown
  ): Promise<Message> {
    return message.util?.send(
      `The ${type} is missing the following permissions ${missing}`
    )
  }
}
