const Discord = require('discord.js');

module.exports.run = async (bot, message, args, database) => {
    let ref = await database.ref(`Configurações/Servidores/${message.guild.id}`);
    let data = await ref.once('value');
    if (data.val().economia == false) return message.channel.send(`<@${message.author.id}> os comandos de economia neste servidor estão **desativados**.`)
    
    let member = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if (!args[0]) return message.channel.send(`${message.author.username} **informe um usuário.**`);
    if (!args[1]) return message.channel.send(`${message.author.username} **informe uma quantia.**`);

    let array = [message.author.username, member.user.username, message.author.id, member.user.id];
    let arrayN = array.slice(0, 2);
    console.log(arrayN);

    var randomIndex = Math.floor(Math.random() * arrayN.length);
    var randomElement = array[randomIndex];

    global.ganhador = '';
    global.idGanhador = '';
    global.idPerdedor = '';
    global.perdedor = '';
    global.status = '';
    global.novoValorA = '';
    global.novoValorR = '';

    if (randomIndex == 0) {
        ganhador = arrayN[0];
        idGanhador = array[2];
        perdedor = arrayN[1];
        idPerdedor = array[3];
    } else if (randomIndex == 1) {
        ganhador = arrayN[1];
        idGanhador = array[3];
        perdedor = arrayN[0];
        idPerdedor = array[2];
    }

    let embed = new Discord.RichEmbed()
        .setAuthor(`Apostas | ${message.guild.name}`, message.guild.iconURL)
        .setDescription(`
            **${message.author.username}#${message.author.discriminator}** apostou **F$${parseInt(args[1]).toLocaleString('pt-BR')}** com **${member.user.username}#${member.user.discriminator}**\n\n**Digite** \`aceitar\` ou \`cancelar\` [**30s para aceitar**].`)
        .setThumbnail("http://www.effecthub.com/uploads/item/54680_thumb.png")
        .setColor("#DD8A32")
        .addField(`Apostador`, `${message.author.username}#${message.author.discriminator}`, true)
        .addField(`Valor apostado`, `F$${parseInt(args[1]).toLocaleString('pt-BR')}`, true)

    let embed2 = new Discord.RichEmbed()
        .setAuthor(`FIM DA APOSTA | ${message.guild.name}`, message.guild.iconURL)
        .setDescription(`**Ganhador** da aposta ${ganhador} `)
        .setColor("#DD8A32")
        .setFooter(`Perdedor da aposta: ${perdedor}`)
        .setTimestamp();

    message.channel.send(embed).then(async function (msg) {
        msg.delete(30000);
    });

    //Pega o valor do usuário que apostou
    await database.ref(`Servidores/Usuários/${message.guild.id}/Dinheiro/${message.author.id}`)
        .once('value').then(async function (snap) {
            if (snap.val().dinheiro > 0) {
                if (snap.val().dinheiro > args[1]) {
                    novoValorA = snap.val().dinheiro - args[1];
                    console.log('Valor A: ' + novoValorA)
                } else {
                    novoValorA = args[1] - snap.val().dinheiro;
                    console.log('Valor A: ' + novoValorA)
                }

                //Pega o valor do usuário mencionado
                await database.ref(`Servidores/Usuários/${message.guild.id}/Dinheiro/${member.id}`)
                    .once('value').then(async function (snap2) {
                        if (snap2.val() == null || snap2.val().dinheiro < args[1]) {
                            message.channel.send('_Este usuário **não possui** saldo suficiente na carteira_');
                        } else {
                            if (snap2.val().dinheiro > args[1]) {
                                novoValorR = snap2.val().dinheiro - args[1];
                                console.log('Valor R: ' + novoValorR)
                            } else {
                                novoValorR = args[1] - snap2.val().dinheiro;
                                console.log('Valor R: ' + novoValorR)
                            }

                            const collector = new Discord.MessageCollector(message.channel, m => m.author.id === member.id, { time: 30000 });
                            collector.on('collect', async message => {
                                if (message.content === "aceitar") {
                                    status = true;
                                    message.channel.send(embed2);

                                    await database.ref(`Servidores/Usuários/${message.guild.id}/Dinheiro/${idGanhador}`)
                                        .once('value').then(async function (snap) {
                                            database.ref(`Servidores/Usuários/${message.guild.id}/Dinheiro/${idGanhador}`)
                                                .update({
                                                    dinheiro: parseInt(snap.val().dinheiro) + parseInt(args[1])
                                                })
                                        });
                                        
                                    if (randomIndex == 0) {
                                        database.ref(`Servidores/Usuários/${message.guild.id}/Dinheiro/${idPerdedor}`)
                                            .update({
                                                dinheiro: parseInt(novoValorR)
                                            })
                                        console.log('Perdedor R: ' + novoValorR)
                                    } else if (randomIndex == 1) {
                                        database.ref(`Servidores/Usuários/${message.guild.id}/Dinheiro/${idPerdedor}`)
                                            .update({
                                                dinheiro: parseInt(novoValorA)
                                            })
                                        console.log('Perdedor A: ' + novoValorA)
                                    }
                                } else if (message.content === "cancelar") {
                                    status = false;
                                    message.channel.send(`**${member.user.username}#${member.user.discriminator} cancelou a aposta.**`);
                                }
                            })


                            /*setTimeout(function () {
                                if (status !== true || status !== false) {
                                    message.channel.send('**Tempo esgotado para confirmar ou cancelar a aposta.**');
                                }
                            }, 30000);*/
                        }
                    });
            } else {
                message.channel.send('_Você não possui saldo suficiente para realização da aposta._');
            }
        });

}

module.exports.config = {
    command: "apostar"
}