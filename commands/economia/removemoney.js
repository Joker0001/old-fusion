
module.exports.run = async (bot, message, args, database) => {
    let ref = await database.ref(`Configurações/Servidores/${message.guild.id}`);
    let data = await ref.once('value');
    if (data.val().economia == false) return message.channel.send(`<@${message.author.id}> os comandos de economia neste servidor estão **desativados**.`)
    
    global.status = '';
    if (message.author.id !== '216691050293624833' && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(('Você **não possui** permissões suficientes.'));
    if (!args[0]) return message.channel.send(`${message.author.username} **informe um usuário.**`);
    if (!args[1]) return message.channel.send(`${message.author.username} **informe uma quantia.**`);
    let member = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);

    await database.ref(`Servidores/Usuários/${message.guild.id}/Dinheiro/${member.id}`)
        .once('value').then(async function (snap) {
            if (snap.val() == null) {
                message.channel.send('_Este usuário ainda não possui registro no banco de dados._');
            } else {
                pagamento = args[1];
                if (snap.val().dinheiro > 0 ) {
                    if (snap.val().dinheiro > pagamento) {
                        let dinheiroRecebido = parseInt(snap.val().dinheiro) - parseInt(pagamento);
                        database.ref(`Servidores/Usuários/${message.guild.id}/Dinheiro/${member.id}`)
                            .update({
                                dinheiro: dinheiroRecebido
                            });
                    } else {
                        let dinheiroRecebido = parseInt(pagamento) - parseInt(snap.val().dinheiro);
                        database.ref(`Servidores/Usuários/${message.guild.id}/Dinheiro/${member.id}`)
                            .update({
                                dinheiro: dinheiroRecebido
                            });
                    }
                } else {
                    message.channel.send('_Este usuário já está com o saldo zerado, impossível completar a transação._');
                }
            }
        });

    await message.channel.send({
        embed: {
            author: {
                name: 'Remoção de saldo',
                icon_url: message.guild.iconURL
            },
            color: 0xDD8A32,
            description: `**${message.author.username}#${message.author.discriminator} remeoveu F$${parseInt(pagamento).toLocaleString('pt-BR')} da conta de ${member.user.username}#${member.user.discriminator}**`
        }
    });
}

module.exports.config = {
    command: 'removemoney'
}