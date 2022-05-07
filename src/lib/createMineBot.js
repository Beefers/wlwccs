import { createBot } from "mineflayer";
import config from "../config.js";

const bot = createBot({
    username: config.minecraft.username,
    host: config.minecraft.host
});

bot.once("login", () => { console.log("Minecraft bot ready!") });

export default bot;