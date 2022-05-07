import client, { webhookClient } from "./lib/createDiscordBot.js";
import bot from "./lib/createMineBot.js";
import config from "./config.js";

client.on("messageCreate", async (message) => {
    if (message.channelId !== config.discord.channelId || message.author.bot || message.content.startsWith("/" || "\\/")) return;

    const CHAT_LENGTH_LIMIT = bot.supportFeature("lessCharsInChat") ? 100 : 256;
    const padding = `[D] <${message.author.username}> `;
    const content = [];

    if (message.content.length > 0) {
        content.push(message.content);
    }

    if (message.attachments.size > 0) {
        content.push(...message.attachments.map(a => a.url));
    }

    const PADDED_LENGTH_LIMIT = CHAT_LENGTH_LIMIT - padding.length;
    const sanitisedContent = padding + content.join(" ").replace(/\r?\n|\r/g, " ").substring(0, PADDED_LENGTH_LIMIT);

    bot.chat(sanitisedContent);
})

bot.on("chat", async (username, message) => {
    if (username === bot.username) return;

    webhookClient.send({
        username: username,
        content: message,
        avatarURL: `https://crafthead.net/helm/${username}.png`
    })
})