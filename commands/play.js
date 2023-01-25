const { SlashCommandBuilder, ChannelType} = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Play videos from YouTube in Discord!')
        .addStringOption(option => {
            return option 
                .setName("searchterms")
                .setDescription("Search Keywords")
                .setRequired(true);
            }
        ),
    async execute(interaction) {
        
    }
}