import BotClient from './client/BotClient';
require('custom-env').env();

const client: BotClient = new BotClient({
  token: process.env.TOKEN,
});

client.start();
