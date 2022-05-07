import client, { webhookClient } from "./lib/createDiscordBot.js";
import bot from "./lib/createMineBot.js";
import config from "./config.js";

client.on("messageCreate", async (message) => {
    if (message.channelId !== config.discord.channelId || message.author.bot) return;

    const padding = `[D] <${message.author.username}>`;

    bot.chat(`${padding} ${message.content.substring(0, 1024 - padding.length)}`);
})

bot.on("chat", async (username, message) => {
    if (username === bot.username) return;

    webhookClient.send({
        username: username,
        content: message,
        avatarURL: "https://static.wikia.nocookie.net/minecraft_gamepedia/images/b/b6/Respawn_Anchor_%281%29_JE1.png/revision/latest?cb=20220115130737"
    })
})