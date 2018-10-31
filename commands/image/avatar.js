const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
    let member = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);

    if (!args[0]) {
        let embed = new Discord.RichEmbed()
            .setImage(message.author.avatarURL)
            .setColor("#DD8A32")
            .setTimestamp()
            .setFooter(`Sua foto ${message.author.username}#${message.author.discriminator}`);
        message.channel.send(embed);
    } else {
        let embed = new Discord.RichEmbed()
            .setImage(member.user.avatarURL)
            .setAuthor(`Foto de ${member.user.username}#${member.user.discriminator}`)
            .setColor("#DD8A32")
            .setTimestamp()
            .setFooter(`Solicitado por ${message.author.username}#${message.author.discriminator}`);
        message.channel.send(embed);
    }
}

module.exports.config = {
    command: "avatar"
}

const Discord = require('discord.js')

