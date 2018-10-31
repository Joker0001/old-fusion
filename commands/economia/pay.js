const moment = require('moment');

module.exports.run = async (bot, message, args, database) => {
    let ref = await database.ref(`Configurações/Servidores/${message.guild.id}`);
    let data = await ref.once('value');
    if (data.val().economia == false) return message.channel.send(`<@${message.author.id}> os comandos de economia neste servidor estão **desativados**.`)
    
    global.pagamento = '';
    global.novoValor = '';
    if (!args[0]) return message.channel.send(`${message.author.username} **informe um usuário.**`);
    if (!args[1]) return message.channel.send(`${message.author.username} **informe uma quantia.**`);
    let member = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if (member.id == message.author.id) return message.channel.send('_Você não pode pagar a si mesmo._');
    //Remove dinheiro do usuário
    await database.ref(`Servidores/Usuários/${message.guild.id}/Dinheiro/${message.author.id}`)
        .once('value').then(async function (snap) {
            if (snap.val().dinheiro !== 0) {
                if (snap.val().dinheiro > args[1]) {
                    novoValor = snap.val().dinheiro - args[1];
                } else {
                    novoValor = args[1] - snap.val().dinheiro;
                }

                database.ref(`Servidores/Usuários/${message.guild.id}/Dinheiro/${message.author.id}`)
                    .update({
                        dinheiro: novoValor
                    });
            } else {
                message.channel.send('_Você não possui saldo suficiente para realização a transação._');
            }
        });

    //Paga o usuário mencionado
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
                name: 'Pagamento',
                icon_url: message.guild.iconURL
            },
            color: 0xDD8A32,
            description: `**${message.author.username}#${message.author.discriminator} pagou F$${parseInt(pagamento).toLocaleString('pt-BR')} para ${member.user.username}#${member.user.discriminator}**`
        }
    });
}

module.exports.config = {
    command: 'pay'
}
