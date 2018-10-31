const Discord = require("discord.js");
const ms = require('ms');
const moment = require('moment');
moment.locale('pt-br');

module.exports.run = async (bot, message, args, database) => {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply('**ATENÇÃO você não possui** permissões suficientes.');
    let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!tomute) return message.reply("_Não consegui encontrar o usuário mencionado._");
    if (tomute.hasPermission("MANAGE_MESSAGES")) return message.reply(`**ATENÇÃO** eu não posso mutar este usuário!`);
    let tamanho = `${tomute}`.length;
    let reason = args.join(" ").slice(2 + tamanho + args[1].length);
    if (!reason) return message.reply('**_Você deve adicionar uma razão._**');
    let mutetime = args[1];
    if (!mutetime) return message.reply(`_Faça a especificação do tempo do mute!_ \`1s/m/h/d\``);

    let ref = await database.ref(`Configurações/Servidores/${message.guild.id}`);
    let data = await ref.once('value');
    var muteRole = data.val().muterole;

    let muterole = message.guild.roles.find(`name`, muteRole);
    if (!muterole || muteRole == false) return message.channel.send(`_Não consegui encontrar a role de Mutados._\n**Dica: Use o comando \`${prefix}setconfig muterole <role>\`**`);

    message.delete().catch(O_o => { });

    try {
        await tomute.send(`Opa! Você foi mutado por: ${mutetime} no servidor ${message.guild.name}. Desculpe!`)
    } catch (e) {
        message.channel.send(`O usuário ${tomute} foi mutado por: ${mutetime}`)
    }

    let muteembed = new Discord.RichEmbed()
        .setDescription(`Mute executado por ${message.author}`)
        .setColor('#f0ff00')
        .addField("Usuário mutado", tomute)
        .addField("Mutad em", message.channel)
        .addField("Dia/Horário do mute", moment(message.createdAt).format('LLLL'))
        .addField("Tempo do mute", mutetime)
        .addField("Razão", reason);

    var refCanal = await database.ref(`Configurações/Servidores/${message.guild.id}`);
    var dataCanal = await refCanal.once('value');

    if (dataCanal.val().logs == false) {
        message.channel.send(`✅ O usuário **foi mutado** com sucesso.`);
        message.delete(2000).catch(O_o => { });
    } else {
        let muteChannel = await message.guild.channels.find(`name`, `${dataCanal.val().logs}`);
        await muteChannel.send(muteembed);
        await (tomute.addRole(muterole.id));
    }

    setTimeout(function () {
        tomute.removeRole(muterole.id);
        message.channel.send(`<@${tomute.id}> foi desmutado!`);
    }, ms(mutetime));

}

module.exports.config = {
    command: "tempmute"
}