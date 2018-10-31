const Discord = require('discord.js');

module.exports.run = async (bot, message, args, database) => {
    database.ref(`Configurações/Servidores/${message.guild.id}`).once('value')
        .then(function (snap) {
            var logs = '';
            var muterole = '';
            var welcome = '';
            var autorole = '';

            let embed = new Discord.RichEmbed()
                .setAuthor(`Configurações ativas | ${message.guild.name}`, message.guild.iconURL)
                .setColor('DD8A32')
                .setThumbnail("http://www.myiconfinder.com/uploads/iconsets/256-256-234c01a6075c4c935b962a9a35231799.png")
                .addField(`Auto-Role ${replaces(snap, logs, muterole, autorole).autorole}`.replace(true, '<:on1:495657429552463892>').replace(false, '<:off1:495657429246279683>'), `\`${prefix}setconfig autorole\``, true)
                .addField(`Level ${snap.val().level}\n`.replace(true, '<:on1:495657429552463892>').replace(false, '<:off1:495657429246279683>'), `\`${prefix}setconfig level\``, true)
                .addField(`Logs ${replaces(snap, logs).logs}\n`.replace(true, '<:on1:495657429552463892>').replace(false, '<:off1:495657429246279683>'), `\`${prefix}setconfig logs\``, true)
                .addField(`Mute-Role ${replaces(snap, logs, muterole).muterole}\n`.replace(true, '<:on1:495657429552463892>').replace(false, '<:off1:495657429246279683>'), `\`${prefix}setconfig muterole\``, true)
                .addField(`Economia ${snap.val().economia}`.replace(true, '<:on1:495657429552463892>').replace(false, '<:off1:495657429246279683>'), `\`${prefix}setconfig economia\``, true)
                .addField(`Welcome ${replaces(snap, logs, muterole, welcome).welcome}`.replace(true, '<:on1:495657429552463892>').replace(false, '<:off1:495657429246279683>'), `\`${prefix}setconfig economia\``, true)
                .setFooter(`Solitação - ${message.author.username}`, message.author.avatarURL)
                .setTimestamp();
            message.channel.send(embed);
        });
}

module.exports.config = {
    command: 'config'
}

function replaces(snap, logs, muterole, autorole, welcome) {
    if (snap.val().logs == false) {
        logs = false;
    } else if (snap.val().logs !== false) {
        logs = true;
    }

    if (snap.val().muterole == false) {
        muterole = false;
    } else if (snap.val().muterole !== false) {
        muterole = true;
    }

    if (snap.val().autorole == false) {
        autorole = false;
    } else if (snap.val().autorole !== false) {
        autorole = true;
    }

    if (snap.val().welcome == false) {
        welcome = false;
    } else if (snap.val().welcome !== false) {
        welcome = true;
    }

    return {logs, muterole, autorole, welcome}
}