
module.exports.run = async (bot, message, args, database) => {
    global.status = '';
    if (message.author.id !== '216691050293624833' && !message.member.hasPermission('MANAGE_GUILD')) return message.channel.send(('Você **não possui** permissões suficientes.'));
    
    let ref = await database.ref(`Configurações/Servidores/${message.guild.id}`);
    let data = await ref.once('value');
    if (data.val().economia == false) return message.channel.send(`<@${message.author.id}> os comandos de economia neste servidor estão **desativados**.`)
    
    if (!args[0]) return message.channel.send(`${message.author.username} **informe um usuário.**`);
    if (!args[1]) return message.channel.send(`${message.author.username} **informe uma quantia.**`);
    let member = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);

    await database.ref(`Servidores/Usuários/${message.guild.id}/Dinheiro/${member.id}`)
        .once('value').then(async function (snap) {
            if (snap.val() == null) {
                pagamento = args[1];
                let dinheiroRecebido = parseInt(pagamento);
                database.ref(`Servidores/Usuários/${message.guild.id}/Dinheiro/${member.id}`)
                    .set({
                        dinheiro: dinheiroRecebido
                    });
            } else {
                pagamento = args[1];
                let dinheiroRecebido = parseInt(pagamento) + parseInt(snap.val().dinheiro);
                database.ref(`Servidores/Usuários/${message.guild.id}/Dinheiro/${member.id}`)
                    .update({
                        dinheiro: dinheiroRecebido
                    });
            }
        });

    await message.channel.send({
        embed: {
            author: {
                name: 'Depósito bancário',
                icon_url: message.guild.iconURL
            },
            color: 0xDD8A32,
            description: `**${message.author.username}#${message.author.discriminator} depositou F$${parseInt(pagamento).toLocaleString('pt-BR')} na conta de ${member.user.username}#${member.user.discriminator}**`
        }
    });
}

module.exports.config = {
    command: 'addmoney'
}