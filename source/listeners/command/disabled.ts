import { Listener, Command } from "discord-akairo"
import { Message } from "discord.js"

export default class CommandDisabledListener extends Listener {
  constructor() {
    super("commandDisabled", {
      emitter: "commandHandler",
      event: "commandDisabled",
    })
  }

  exec(message: Message, command: Command): Promise<Message> {
    return message.util?.send(
      `This command ${command.id} is disabled, please try again later`
    )
  }
}
