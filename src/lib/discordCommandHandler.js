import { MessageEmbed } from "discord.js";
import client from "./createDiscordBot.js";
import config from "../config.js";

import playerlistCommand from "../commands/playerlist.js";

// TODO: Make better, this works for now but is not very scalable

export default async() => {
    const guild = (await client.channels.fetch(config.discord.channelId)).guild;

    guild.commands.set([{
        name: playerlistCommand.name,
        description: playerlistCommand.description,
    }])
    
    client.on("interactionCreate", async(interaction) => {
        if (!interaction.isCommand()) return;

        try {
            const { default: command } = await import(`../commands/${interaction.commandName}.js?update=${Date.now()}`);

            await interaction.deferReply({ ephemeral: command.ephemeral || false });
    
            await command.exec(interaction);
        } catch(e) {
            const formattedError = e.stack ? e.stack : e.toString();
            const errorEmbed = new MessageEmbed({
                description: `An error occurred when trying to execute \`${interaction.commandName}\``,
                color: "#ff0000",
                fields: [
                    {
                        name: "Error",
                        value: `\`\`\`js\n${formattedError}\`\`\``
                    }
                ]
            })

            console.error(`${interaction.user.tag} tried to use command ${interaction.commandName}, but an error occurred...`, e);
            interaction.editReply({ embeds: [errorEmbed] });
        }
    })
}