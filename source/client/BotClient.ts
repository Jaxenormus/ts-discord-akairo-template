import {
  AkairoClient,
  CommandHandler,
  ListenerHandler,
  InhibitorHandler,
} from "discord-akairo"
import { Message } from "discord.js"
import { join } from "path"
import dayjs from "dayjs"
import chalk from "chalk"

declare module "discord-akairo" {
  // eslint-disable-next-line no-shadow
  interface AkairoClient {
    commandHandler: CommandHandler
    listenerHandler: ListenerHandler
    // eslint-disable-next-line no-unused-vars
    console: (content: string) => void
  }
}

interface BotOptions {
  token?: string
  developer?: string | string[]
}

export default class BotClient extends AkairoClient {
  public config: BotOptions

  // eslint-disable-next-line no-unused-vars
  public console: (content: string) => void

  public inhibitorHandler: InhibitorHandler = new InhibitorHandler(this, {
    directory: join(__dirname, "..", "inhibitors"),
  })

  public listenerHandler: ListenerHandler = new ListenerHandler(this, {
    directory: join(__dirname, "..", "listeners"),
  })

  public commandHandler: CommandHandler = new CommandHandler(this, {
    directory: join(__dirname, "..", "commands"),
    prefix: "sul!",
    allowMention: true,
    handleEdits: true,
    aliasReplacement: /-/g,
    commandUtil: true,
    commandUtilLifetime: 3e5,
    defaultCooldown: 6e4,
    argumentDefaults: {
      prompt: {
        modifyStart: (_: Message, str: string): string => {
          return `${str} or type \`cancel\` to cancel the command`
        },
        modifyRetry: (_: Message, str: string): string => {
          return `${str} or type \`cancel\` to cancel the command`
        },
        timeout: () => "You took too long, the command has now been canceled",

        ended: () =>
          "You exceeded the maximum amount of attempts, this command has now been canceled",

        cancel: () => "The command has been successfully canceled",

        retries: 3,
        time: 3e4,
      },
      otherwise: "",
    },
    ignorePermissions: ["546491068598976522"],
  })

  public constructor(config: BotOptions) {
    super()
    this.config = config
    this.console = (content: any): void => {
      return console.log(
        `${chalk.bold.gray(dayjs().format("H:mm:ss"))}`,
        content
      )
    }
  }

  private async init(): Promise<void> {
    this.commandHandler.useListenerHandler(this.listenerHandler)
    this.commandHandler.useInhibitorHandler(this.inhibitorHandler)
    this.listenerHandler.setEmitters({
      commandHandler: this.commandHandler,
      listenerHandler: this.listenerHandler,
      process,
    })
    this.inhibitorHandler.loadAll()
    this.commandHandler.loadAll()
    this.listenerHandler.loadAll()
  }

  public async start(): Promise<string> {
    await this.init()
    return this.login(this.config.token)
  }
}
