const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Simple Ping returns Pong command'),
    async execute(interaction) {
        await interaction.reply('Pong!')
    }
        
}