import { MessageEmbed } from "discord.js";
import config from "../config.js";
import bot from "../lib/createMineBot.js";

export default {
    name: "playerlist",
    description: "Shows the playerlist of the server",
    ephemeral: true,
    exec: (interaction) => {
        const playerList = Object.keys(bot.players).filter(p => p !== bot.username);
        const playerListEmbed = new MessageEmbed({
            description: `There are ${playerList.length} players on \`${config.minecraft.host}\`.`,
            fields: [
                {
                    name: "Players",
                    value: playerList.join("\n")
                }
            ],
        })
        interaction.editReply({ embeds: [playerListEmbed] });
    }
}