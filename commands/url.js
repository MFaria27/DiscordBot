const { SlashCommandBuilder, ChannelType} = require('discord.js');
const ytdl = require("ytdl-core")
const { Track } = require('discord-player');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('url')
        .setDescription('Play a video from a YouTube URL')
        .addStringOption(option => {
            return option 
                .setName("url")
                .setDescription("Song URL")
                .setRequired(true);
            }
        ),
    async execute(interaction) {

        const url = interaction.options.getString("url")
        const streamInfo = await ytdl.getInfo(url)
        
        let track = new Track(interaction.client.player, {
            author: streamInfo.videoDetails.author,
            description: streamInfo.videoDetails.description,
            duration: parseInt(streamInfo.videoDetails.lengthSeconds)*1000,
            requestedBy: interaction.member,
            source: 'youtube',
            thumbnail: streamInfo.videoDetails.thumbnails,
            title: streamInfo.videoDetails.title,
            url: streamInfo.videoDetails.video_url,
            views: streamInfo.videoDetails.viewCount
        })
        
        const queue = interaction.client.queue
        interaction.client.tracks.push(track)
        interaction.reply("Added " + track.title + " to the Queue!")
        await playTracks(interaction, queue);
    }
}

function playTracks (interaction, queue) {
    if(!interaction.client.playing && interaction.client.tracks.length != 0) {
        const track = interaction.client.tracks[0]
        console.log(track.duration + " + " + 5000)
        interaction.client.player.emit("start", queue, track);
        queue.play(track)
        setTimeout(() => {
            interaction.client.player.emit("end", queue, track);
        }, track.duration + 5000)
    }
    else {
        setTimeout(() => {
            playTracks(interaction, queue)
        }, 4000)
    }
}
