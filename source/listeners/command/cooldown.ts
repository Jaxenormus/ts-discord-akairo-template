import { Listener, Command } from "discord-akairo"
import { Message } from "discord.js"
import dayjs from "dayjs"

export default class CooldownListener extends Listener {
  constructor() {
    super("cooldown", {
      emitter: "commandHandler",
      event: "cooldown",
    })
  }

  exec(message: Message, _: Command, remaining: number): Promise<Message> {
    return message.util?.send(
      `Please wait ${dayjs(remaining).format(
        "ss"
      )} seconds before running this command again`
    )
  }
}
