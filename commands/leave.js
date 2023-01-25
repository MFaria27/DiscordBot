const { SlashCommandBuilder, ChannelType} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('leave')
        .setDescription('Makes Aria leave the channel they are in')
        ,

    async execute(interaction) {
        try{interaction.client.queue.destroy();}
        catch{await interaction.reply('Aria is not in any voice channels')}
            
    }
}