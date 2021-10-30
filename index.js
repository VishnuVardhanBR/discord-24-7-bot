const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const ytdl = require("ytdl-core");
const { MessageEmbed } = require('discord.js');
require('dotenv').config()

var mentionID = process.env.MENTION_ID
const token = process.env.TOKEN

var link = "";
var tuned;
var stop, update;

var lofi = "https://www.youtube.com/watch?v=5qap5aO4i9A&ab_channel=ChilledCow";
var anime = "https://www.youtube.com/watch?v=NJvaGDTJEQU"
var edm = "https://www.youtube.com/watch?v=7tNtU5XFwrU"
var rap = "https://www.youtube.com/watch?v=n4pr7j-kTO0"
var pop = "https://www.youtube.com/watch?v=36YnV9STBqc";
var synthwave = "https://www.youtube.com/watch?v=RnvhuvYufuE";
var classical = "https://www.youtube.com/watch?v=2gO1v2GPMFk"



client.once("ready", () => {
    mentionID = client.user.id
    console.log("I'm ready Vain sir");
    client.user.setActivity('mention me', { type: "LISTENING" })
});

client.once("reconnecting", () => {
    console.log("Reconnecting!");
});

client.once("disconnect", () => {
    console.log("Disconnect!");
});

client.on("message", async message => {
    if (message.author.bot) return;

    if (message.content.toLowerCase() === `<@${mentionID}> ping` || message.content.toLowerCase() === `<@!${mentionID}> ping`) {
                message.channel.send("Pinging...").then(m =>{          
            var ping = m.createdTimestamp - message.createdTimestamp;          
            var embed = new MessageEmbed()
            .setAuthor(`Your ping is ${ping}`)
            .setColor(3447003)       
            m.edit(embed)
        });

    }
    else if (message.content.toLowerCase() === (`<@${mentionID}>`) || message.content.toLowerCase() === (`<@!${mentionID}>`) || message.content.toLowerCase() === (`<@${mentionID}> help`) || message.content.toLowerCase() === (`<@!${mentionID}> help`)) {
        
		message.channel.send({
            embed: {
                color: 3447003,
                author: {
                    name: client.user.username,
                    icon_url: client.user.avatarURL()
                },
                fields: [{
                    name: "Invite!",
                    value: "24/7radio can be added to as many servers as you want! [Click me to add it to yours.](https://discord.com/api/oauth2/authorize?client_id=791615094462218301&permissions=3172352&scope=bot)"
                },
                {
                    name: "About",
                    value: "24/7radio is a music bot which allows you to tune into a range of music streams of different genres, and at the highest quality!\n"
                },
                {
                    name: "Commands",
                    value: "Use @24/7radio before station name to tune to it\n@**24/7radio for help**\n**@24/7radio ping**: Shows the latency between your client and the bot\n**@24/7radio stop**: Stop playing current radio\n**@24/7radio leave**: Leave the voice channel\n**@24/7radio count**: Check how many servers this bot is in\n**@24/7radio log:** Check whats new!"
                },
                {
                    name: "Available radio stations",
                    value: "**lofi:** Chill lofi hip-hop beats\n**pop:** Popular music/ Best hits\n**rap:** A mix of popular rap music\n**synthwave:** A retro-synthwave mix\n**edm:** A mix of Electronic Dance Music from No Copyright Sounds (NCS)\n**classical:** A mix of the best classical pieces including legends like Mozart\n**anime:** A mix of wide range of anime songs\n**Example: @24/7radio lofi**"
                }
                ]

            }

        });

    }
    else if (message.content.toLowerCase() === (`<@${mentionID}> lofi`).toLowerCase() || message.content.toLowerCase() === (`<@!${mentionID}> lofi`).toLowerCase()) {
        link = lofi
        tuned = "Tuned to Lofi Hip-Hop!"
        execute(message);
    }
    else if (message.content.toLowerCase() === (`<@${mentionID}> anime`).toLowerCase() || message.content.toLowerCase() === (`<@!${mentionID}> anime`).toLowerCase()) {
        link = anime
        tuned = "Tuned to Anime music!"
        execute(message);
    }
    else if (message.content.toLowerCase() === (`<@${mentionID}> edm`).toLowerCase() || message.content.toLowerCase() === (`<@!${mentionID}> edm`).toLowerCase()) {
        link = edm;
        tuned = "Tuned to EDM! (NCS)"
        execute(message);
    }
    else if (message.content.toLowerCase() === (`<@${mentionID}> rap`).toLowerCase() || message.content.toLowerCase() === (`<@!${mentionID}> rap`).toLowerCase()) {
        link = rap
        tuned = "Tuned to Rap!"
        execute(message);
    }
    else if (message.content.toLowerCase() === (`<@${mentionID}> pop`).toLowerCase() || message.content.toLowerCase() === (`<@!${mentionID}> pop`).toLowerCase()) {
        link = pop
        tuned = "Tuned to Popular Hits!"
        execute(message);
    }
    else if (message.content.toLowerCase() === (`<@${mentionID}> synthwave`).toLowerCase() || message.content.toLowerCase() === (`<@!${mentionID}> synthwave`).toLowerCase()) {
        link = synthwave
        tuned = "Tuned to Synthwave!"
        execute(message);
    }
    else if (message.content.toLowerCase() === (`<@${mentionID}> classical`).toLowerCase() || message.content.toLowerCase() === (`<@!${mentionID}> classical`).toLowerCase()) {
        link = classical
        tuned = "Tuned to Classical!"
        execute(message);
    }
    //else if (message.content.toLowerCase() === (`<@${mentionID}> dubstep`).toLowerCase() || message.content.toLowerCase() === (`<@!${mentionID}> dubstep`).toLowerCase()) {
    //    link = dubstep
    //    tuned = "Tuned to Dubstep!"
    //    execute(message);
    //}
    else if (message.content.toLowerCase() === (`<@${mentionID}> stop`).toLowerCase() || message.content.toLowerCase() === (`<@!${mentionID}> stop`).toLowerCase()) {
        stop = true;
        link = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
        tuned = "Disconnected from station";
        execute(message);
    }
    else if (message.content.toLowerCase() === (`<@${mentionID}> leave`).toLowerCase() || message.content.toLowerCase() === (`<@!${mentionID}> leave`).toLowerCase()) {
        stop = true;
        link = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
        tuned = "Disconnected from voice channel";
        message.member.voice.channel.leave();
    }
    else if (message.content.toLowerCase() === (`<@${mentionID}> np`).toLowerCase() || message.content.toLowerCase() === (`<@!${mentionID}> np`).toLowerCase()) {
        message.channel.send({
            embed: {
                color: 3447003,
                title: tuned,
                url: link
            }
        });
    } 

    else if (message.content.toLowerCase() === (`<@${mentionID}> log`).toLowerCase() || message.content.toLowerCase() === (`<@!${mentionID}> log`).toLowerCase()) {
        message.channel.send({
            embed: {
                color: 3447003,
                fields: [{
                    name: "Update log for v1.0",
                    value: "Changed styling of all messages\nAdded 3 new stations (pop, synthwave, classical)\nAdded stop command\nMinor optimizations and bug fixes"
                },
                {
                    name: "Update log for v1.1",
                    value: "Added invite link in help\nAdded **dubstep** music station\nAdded a **leave** voice channel command\nAdded a server **count** command\nMinor bugs and fixes\nAdded an easter egg ;)"                }]
            }
        });
    }
    else if (message.content.toLowerCase() === (`<@${mentionID}> count`).toLowerCase() || message.content.toLowerCase() === (`<@!${mentionID}> count`).toLowerCase()) {
        message.channel.send({
            embed: {
                color: 3447003,
                fields: [{
                    name: "The bot is in " + client.guilds.cache.size + " servers!",
                    value: "[Click me to add it to yours.](https://discord.com/api/oauth2/authorize?client_id=791615094462218301&permissions=3172352&scope=bot)"
                }]
            }
        });
    }
    else if (message.content.toLowerCase() === (`<@${mentionID}> vcount`).toLowerCase() || message.content.toLowerCase() === (`<@!${mentionID}> vcount`).toLowerCase()) {
        message.channel.send({
            embed: {
                color: 3447003,
                fields: [{
                    name: "The bot is in " + client.voice.connections.size + " voice channels!",
                    value: "[Click me to add it to yours.](https://discord.com/api/oauth2/authorize?client_id=791615094462218301&permissions=3172352&scope=bot)"
                }]
            }
        });
    }
    else if (message.content.toLowerCase().startsWith((`<@${mentionID}>`).toLowerCase()) || message.content.toLowerCase().startsWith((`<@!${mentionID}>`).toLowerCase())) {
        message.channel.send({
            embed: {
                color: 3447003,
                fields: [{
                    name: "Please enter a valid command!",
                    value: "**24/7radio** for help"
                }]
            }
        });
    }
    //updatemessage(message.channel);
});



async function execute(message) {
    const voiceChannel = message.member.voice.channel;
    var voiceBitrate = voiceChannel.bitrate;
    if (!voiceChannel)
        return message.channel.send("You need to be in a voice channel to play music");
    else {
        message.channel.send({
            embed: {
                color: 3447003,
                title: tuned,
                url: link
            }
        });
    }


    const permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
        return message.channel.send("I need the permissions to join and speak in your voice channel");
    }
    if (stop == true) {
        link = "";
        stop = false;
    }
    try {
        var connection = await voiceChannel.join();
        play(connection, voiceBitrate);
    } catch (err) {
        console.log(err);
        return message.channel.send(err);
    }

}


function play(connection, voiceBitrate) {
    const dispatcher = connection
        .play(ytdl(link), {bitrate: voiceBitrate})
        .on("error", error => console.error(error));
    dispatcher.setVolumeLogarithmic(0.40);

}
function updatemessage(channel) {
    if (!update) {
        channel.send({
            embed: {
                color: 16580705,
                fields: [{
                    name: "The bot has been updated since the last time you used it!",
                    value: "Check new features/ patch out by typing **@24/7radio log**"
                }]
            }
        });
        update = true;
    }
}


client.login(token);