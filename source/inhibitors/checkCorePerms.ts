import { Inhibitor } from "discord-akairo"
import { TextChannel, Message } from "discord.js"

export default class CheckPermsInhibitor extends Inhibitor {
  constructor() {
    super("checkCorePerms", {
      reason: "missing-core-permissions",
      priority: 1,
    })
  }

  async exec(message: Message): Promise<boolean> {
    if (
      message.guild?.me?.permissions.has("SEND_MESSAGES") &&
      message.channel instanceof TextChannel &&
      message.channel
        .permissionsFor(this.client.user ? this.client.user : "")
        ?.toArray()
        .includes("SEND_MESSAGES") &&
      message.guild.me.permissions.has("USE_EXTERNAL_EMOJIS") &&
      message.channel
        .permissionsFor(this.client.user ? this.client.user : "")
        ?.toArray()
        .includes("USE_EXTERNAL_EMOJIS") &&
      message.guild.me.permissions.has("EMBED_LINKS") &&
      message.channel
        .permissionsFor(this.client.user ? this.client.user : "")
        ?.toArray()
        .includes("EMBED_LINKS")
    ) {
      return false
    }
    return true
  }
}
