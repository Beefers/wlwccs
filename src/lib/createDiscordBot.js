import { Client, WebhookClient, Intents } from "discord.js";
import config from "../config.js";

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_WEBHOOKS] });
export const webhookClient = new WebhookClient({ id: config.discord.webhook.id, token: config.discord.webhook.token });

client.once("ready", () => { console.log("Discord client ready!") });

client.login(config.discord.token);

export default client;