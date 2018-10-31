const Discord = require('discord.js');

module.exports.run = async (bot, message, args, database) => {
    let ref = await database.ref(`Configurações/Servidores/${message.guild.id}`);
    let data = await ref.once('value');
    if (data.val().economia == false) return message.channel.send(`<@${message.author.id}> os comandos de economia neste servidor estão **desativados**.`)

    await database.ref(`Servidores/Usuários/${message.guild.id}/Dinheiro/${message.member.id}`)
        .once('value').then(async function (snap) {
            if (snap.val() == null) {
                message.channel.send(`Você ainda **não possui** saldo em sua carteira.\nUse \`${prefix}daily\` para receber sua recompensa.`);
            } else {
                let embed = new Discord.RichEmbed()
                    .setAuthor(`${message.author.username}#${message.author.discriminator}`)
                    .setColor('DD8A32')
                    .setThumbnail("https://images.vexels.com/media/users/3/130113/isolated/preview/ee88eaa5c5bf97bb5fd0b4c876ef3b10--cone-bill-c-rculo-d-lar-by-vexels.png")
                    .addField('Saldo disponível', `F$${parseInt(snap.val().dinheiro).toLocaleString('pt-BR')}`)
                message.channel.send(embed);
            }
        });
}

module.exports.config = {
    command: 'saldo'
}

