const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
    const embed = new Discord.RichEmbed()
        .setDescription(`Ping ${Math.round(bot.ping)}ms`)
        .setColor('#DD8A32')
    message.channel.send(embed);
} 

module.exports.config = {
    command: "ping"
}