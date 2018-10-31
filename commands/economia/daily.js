const moment = require('moment');
moment.locale('pt-br');

module.exports.run = async (bot, message, args, database) => {
    let ref = await database.ref(`Configurações/Servidores/${message.guild.id}`);
    let data = await ref.once('value');
    if (data.val().economia == false) return message.channel.send(`<@${message.author.id}> os comandos de economia neste servidor estão **desativados**.`)
    
    global.dinheiroD = '';
    database.ref(`Servidores/Usuários/${message.guild.id}/Dinheiro/${message.member.id}`)
        .once('value').then(async function (snap) {
            var array = [10, 50.75, 100, 215.50];
            var randomIndex = Math.floor(Math.random() * array.length);
            var randomElement = array[randomIndex];
            if (snap.val() === null) {
                await database.ref(`Servidores/Usuários/${message.guild.id}/Dinheiro/${message.member.id}`)
                    .set({
                        dinheiro: randomElement,
                        daily: moment().format('L'),
                        user: `${message.author.username}`
                    });
                await message.channel.send({
                    embed: {
                        author: {
                            name: `${message.author.username}#${message.author.discriminator}`
                        },
                        color: 0xDD8A32,
                        description: '**Recompensa diária coletada com sucesso.**'
                    }
                });
            } else {
                database.ref(`Servidores/Usuários/${message.guild.id}/Dinheiro/${message.member.id}`)
                    .once('value').then(async function (snap2) {
                        dinheiroD = snap2.val().dinheiro + 100;
                        if (snap2.val().daily !== moment().format('L')) {
                            await database.ref(`Servidores/Usuários/${message.guild.id}/Dinheiro/${message.member.id}`)
                                .update({
                                    dinheiro: dinheiroD,
                                    daily: moment().format('L'),
                                    user: `${message.author.username}`
                                });
                            await message.channel.send({
                                embed: {
                                    author: {
                                        name: `${message.author.username}#${message.author.discriminator}`,
                                    },
                                    color: 0xDD8A32,
                                    description: '**Recompensa diária coletada com sucesso.**'
                                }
                            });
                        } else {
                            message.channel.send({
                                embed: {
                                    author: {
                                        name: `${message.author.username}#${message.author.discriminator}`
                                    },
                                    color: 0xDD8A32,
                                    description: 'Você já coletou a recompensa diária de hoje.',
                                    footer: {
                                        text: `Próxima daily ${moment().endOf('day').fromNow()}`
                                    }
                                }
                            });
                        }
                    })
            }
        })
}

module.exports.config = {
    command: "daily"
}