const Discord = require("discord.js");
const moment = require('moment');
moment.locale('pt-br');

module.exports.run = async (bot, message, args) => {
  message.delete();
  if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send('**Você não tem permissões para usar este comando!**');
  if (!args[0]) return message.channel.send('**Você deve mencionar o usuário que deseja banir.**');
  if (!args[1]) return message.channel.send('**Você deve adicionar uma razão.**');
  let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if (!bUser) return message.channel.send(`**Não consegui encontrar** o usuário mencionado.`);
  if (bUser.id === bot.user.id) return message.channel.send(`**ATENÇÃO** eu não posso banir este usuário!`);
  let tamanho = `${bUser}`.length;
  let bReason = args.join(" ").slice(2 + tamanho);
  if (bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`**ATENÇÃO** eu não posso banir este usuário!`);

  let banEmbed = new Discord.RichEmbed()
    .setDescription(`Ban executado por ${message.author}`)
    .setColor("#cf000f")
    .addField("Usuário banido", `${bUser} with ID ${bUser.id}`)
    .addField("Banido por", `<@${message.author.id}> with ID ${message.author.id}`)
    .addField("Banido em", message.channel)
    .addField("Horário que foi banido", message.createdAt)
    .addField("Razão", bReason);

  var ref = await database.ref(`Configurações/Servidores/${message.guild.id}`);
  var data = await ref.once('value');

  if (data.val().logs == false) {
    message.channel.send(`✅ O usuário **foi banido** com sucesso.`);
    message.delete(2000).catch(O_o => { });
  } else {
    let banChannel = message.guild.channels.find(`name`, `${data.val().logs}`);
    message.guild.member(bUser).ban(bReason);
    banChannel.send(banEmbed);
  }
}

module.exports.config = {
  command: "ban"
}