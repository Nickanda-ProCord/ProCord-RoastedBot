const Discord = require('discord.js');
const bot = new Discord.Client();
const ytdl = require('ytdl-core');
const settings = require('./config.json');

bot.on('ready', () => {
    console.log('I am ready to go!');
    bot.user.setGame('GET ROASTED!!')
});

bot.on('message', msg => {
    if(msg.author.bot) return;
    if(msg.channel.type === 'dm') return;
    if(msg.content.startsWith('/roast')) {
        msg.channel.send('Joining voice channel').catch(console.err);
        var voiceChannel = msg.member.voiceChannel;
        if(!voiceChannel) {
        return msg.reply('You have to be in a voice channel first!').catch(console.err);
         }
        voiceChannel.join().catch(console.err)
        .then(connection => {
            let stream = ytdl('https://www.youtube.com/watch?v=NStGSiSH1Ys', {
                filter: 'audioonly'
            });
            connection.channel.guild.defaultChannel.send('Playing Roast sound!')
            var dispatcher = connection.playStream(stream);
            dispatcher.on('end', () => {
                voiceChannel.leave().catch(console.err)
            });
            connection.channel.guild.defaultChannel.send('Playing Roast sound!').catch(console.err)
        }).catch(console.err);
    }
});

bot.login(settings.token);