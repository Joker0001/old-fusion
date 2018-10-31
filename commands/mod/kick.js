const Discord = require("discord.js");
const moment = require('moment');
moment.locale('pt-br');

module.exports.run = async (bot, message, args) => {

  if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send('**Você não tem permissões para usar este comando!**')
  if (!args[0]) return message.channel.send('**Você deve mencionar o usuário que deseja kickar.**');
  if (!args[1]) return message.channel.send('**Você deve adicionar uma razão.**');
  let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if (!kUser) return message.channel.send(`**Não consegui encontrar** o usuário mencionado.`);
  if (kUser.id === bot.user.id) return message.channel.send(`**ATENÇÃO** eu não posso kickar este usuário!`);
  let tamanho = `${kUser}`.length;
  let kReason = args.join(" ").slice(2 + tamanho);
  if (kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`**ATENÇÃO** eu não posso kickar este usuário!`);

  let kickEmbed = new Discord.RichEmbed()
    .setDescription(`Kick executado por ${message.author}`)
    .setColor("#f9690e")
    .addField("Usuário kickado", `${kUser}`)
    .addField("Kickado por", `<@${message.author.id}>`)
    .addField("Kickado em", `${message.channel}`)
    .addField("Dia/Horário do mute", `${moment(message.createdAt).format('LLLL')}`)
    .addField("Razão", kReason);


  var ref = await database.ref(`Configurações/Servidores/${message.guild.id}`);
  var data = await ref.once('value');

  if (data.val().logs == false) {
    message.channel.send(`✅ O usuário **foi kickado** com sucesso.`);
    message.delete(2000).catch(O_o => { });
  } else {
    let kickChannel = message.guild.channels.find(`name`, `${data.val().logs}`);
    message.guild.member(kUser).kick(kReason);
    kickChannel.send(kickEmbed);
  }
}

module.exports.config = {
  command: "kick"
}