require('dotenv').config();
const { Telegraf, Markup } = require('telegraf');
const axios = require('axios');

const bot = new Telegraf(process.env.BOT_TOKEN);
const button = Markup.keyboard([
  ['Give me a Joke'],
]);

const headers = {
  Accept: 'application/json',
};

async function getJoke() {
  const { data } = await axios.get('https://icanhazdadjoke.com/', { headers });
  return data.joke;
}

bot.start((ctx) => ctx.reply('Welcome', button));
bot.on('message', async (ctx) => {
  const joke = await getJoke();
  ctx.reply((joke));
});
bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
