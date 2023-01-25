const { SlashCommandBuilder, ChannelType} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('join')
        .setDescription('Allows Aria to join a voice channel!')
        ,
    async execute(interaction) {
        
        const voiceChannel = interaction.member.voice.channel;
        
        if (voiceChannel.members.size === 0) {
            await interaction.reply("Cannot join an empty voice channel")
            return;
        }

        interaction.client.queue = interaction.client.player.createQueue(interaction.guild, {
            metadata: {
                channel: voiceChannel
            }
        });

        interaction.client.player.on("start", (queue, track) =>{
            interaction.followUp("Now Playing " + track.title)
            interaction.client.playing = true;
        })
        interaction.client.player.on("end", (queue, track) =>{
            console.log("Done Playing " + track.title)
            interaction.client.playing = false;
            interaction.client.tracks.shift();
        })
        interaction.client.player.on("connectionError", (queue, error) =>{
            interaction.followUp("There seems to have been a connection error. Let me restart...")
            interaction.client.queue.connect(voiceChannel)
        })

        interaction.client.queue.connect(voiceChannel)
        interaction.client.playing = false;

        await interaction.reply(`Aria has joined ${voiceChannel.name}`)
    }
}