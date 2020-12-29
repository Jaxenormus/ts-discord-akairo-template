import { Argument, Command } from "discord-akairo"
import { Message, MessageEmbed } from "discord.js"

export default class HelpCommand extends Command {
  public constructor() {
    super("help", {
      aliases: ["help", "commands", "command"],
      category: "Information",
      description: {
        usage: "help (command)",
        content: "Get a list of commands or help on a specific command",
        docsPath: "info/help",
      },
      args: [
        {
          id: "command",
          type: Argument.union("command", "commandAlias"),
        },
      ],
    })
  }

  public async exec(
    message: Message,
    args: { command: Command }
  ): Promise<Message | void> {
    if (args.command) {
      const embed = new MessageEmbed().setTitle(
        `${args.command.id
          .replace(/(\b[a-z](?!\s))/g, (x) => {
            return x.toUpperCase()
          })
          .replace(/-/g, " ")} Command`
      )
      if (args.command.description.docsPath) {
        embed.setURL(
          `https://docs.example.com/${args.command.description.docsPath}`
        )
      }

      embed.addField("Description", args.command.description.content)
      embed.addField(
        "Proper Usage",
        `\`${
          `${args.command.client.commandHandler.prefix}${args.command.description.usage}` ||
          `${
            args.command.client.commandHandler.prefix
          }${args.command.id.toLowerCase()} (arguments)`
        }\``
      )
      if (args.command.userPermissions) {
        let userPermissions = null
        if (args.command.userPermissions instanceof Array) {
          const userPermissionsSpread = [...args.command.userPermissions]
          userPermissions = userPermissionsSpread
            .map((x) => {
              return `\`${x
                .toString()
                .split(/_/g)
                .map((y) => `${y[0] + y.slice(1).toLowerCase()}`)
                .join(" ")}\``
            })
            .join(" ")
        }

        embed.addField("User Permissions", `${userPermissions || "None"}`)
      }
      if (args.command.clientPermissions) {
        let clientPermissions = null
        if (args.command.clientPermissions instanceof Array) {
          const clientPermissionsSpread = [...args.command.clientPermissions]
          clientPermissions = clientPermissionsSpread
            .map((x) => {
              return `\`${x
                .toString()
                .split(/_/g)
                .map((y) => `${y[0] + y.slice(1).toLowerCase()}`)
                .join(" ")}\``
            })
            .join(" ")
        }

        embed.addField("Bot Permissions", `${clientPermissions || "None"}`)
      }
      embed.setFooter(
        "Click the Header to view the documentation for this command"
      )
      return message.channel.send(embed)
    }

    const embed = new MessageEmbed().setTitle(
      `${this.client.user?.username}'s Command List`
    )
    this.client.commandHandler.categories.forEach((cat) => {
      if (cat.first()?.categoryID.toLowerCase() !== "flag") {
        embed.fields.push({
          name: `${cat.first()?.categoryID} (${cat.size})`,
          value: cat.map((cmd) => `\`${cmd.id}\``).join(", "),
          inline: false,
        })
      }
    })
    return message.util?.send(embed)
  }
}
