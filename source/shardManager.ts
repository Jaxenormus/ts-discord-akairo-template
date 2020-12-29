import { ShardingManager } from "discord.js"
import dayjs from "dayjs"
import chalk from "chalk"

require("custom-env").env()

const manager = new ShardingManager("./src/bot.ts", {
  execArgv: ["-r", "ts-node/register"],
  totalShards: "auto",
  token: process.env.TOKEN,
})

manager.spawn()

manager.on("shardCreate", (shard) =>
  console.log(
    `${chalk.bold.gray(dayjs().format("H:mm:ss"))}`,
    `Shard ${shard.id} has successfully been launched`
  )
)
