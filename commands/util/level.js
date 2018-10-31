const Discord = require('discord.js');

module.exports.run = async (bot, message, args, database) => {
    global.points = '';
    global.nextLevel = '';
    global.level = '';
    global.difference = '';
    global.configLevel = '';

    await database.ref(`Configurações/Servidores/${message.guild.name}/${message.guild.id}`).once('value')
        .then(function (snap) {
            configLevel = snap.val().level;
        })

    if (configLevel == false) return message.channel.send('_O sistema de level está desativado neste servidor._');
    else {
        await database.ref(`Servidores/Usuários/${message.guild.id}/Level/${message.member.id}`).once('value')
            .then(async function (snap) {
                points = snap.val().pontos;
                level = snap.val().level;
                nextLevel = level * 500;
                difference = nextLevel - points;

                if (level == 999) {
                    let lvlEmbedMax = new Discord.RichEmbed()
                        .setDescription(`**${message.author.username}#${message.author.discriminator}**`)
                        .setColor('#DD8A32')
                        .addField("Nível", `${level}/999`, true)
                        .addField("XP", points, true)
                        .setFooter(`Level máximo`, message.author.avatarURL);
                    message.channel.send(lvlEmbedMax).then(msg => {
                        msg.delete(9000)
                    })
                } else {
                    let lvlEmbed = new Discord.RichEmbed()
                        .setDescription(`**${message.author.username}#${message.author.discriminator}**`)
                        .setColor('#DD8A32')
                        .addField("Nível", `${level}/999`, true)
                        .addField("XP", points, true)
                        .setFooter(`${difference} XP para ir para o próximo nível.`, message.author.avatarURL);
                    message.channel.send(lvlEmbed).then(msg => {
                        msg.delete(9000)
                    })
                }

            });
    }
}

module.exports.config = {
    command: "level"
}