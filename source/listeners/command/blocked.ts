import { Listener, Command } from "discord-akairo"
import { Message } from "discord.js"

export default class CommandBlockedListener extends Listener {
  constructor() {
    super("commandBlocked", {
      emitter: "commandHandler",
      event: "commandBlocked",
    })
  }

  exec(message: Message, _: Command, reason: string): Promise<Message> {
    return message.util?.send(
      `This command was blocked because of \`${reason}\``
    )
  }
}
