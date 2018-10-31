const moment = require('moment');
const Discord = require('discord.js')
moment.locale('pt-br');

module.exports.run = async (bot, message, args, database) => {
    let refA = await database.ref(`Configurações/Servidores/${message.guild.id}`);
    let dataA = await refA.once('value');
    if (dataA.val().economia == false) return message.channel.send(`<@${message.author.id}> os comandos de economia neste servidor estão **desativados**.`)

    //const DBL = require("dblapi.js");
    //const dbl = new DBL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjI2NDgxMTYxMzcwODc0Njc1MiIsImJvdCI6dHJ1ZSwiaWF0IjoxNDgzMDk5MjAwfQ.8tpNASxdSsfkVF7YparhyV1Ouy5ORQ3AM2jitd_Y-PI', bot);
    let ref = database.ref(`VIP/${message.guild.id}/${message.author.id}`);
    let refDaily = database.ref(`Servidores/Usuários/${message.guild.id}/Dinheiro/${message.author.id}`);

    if (args[0] == 'cadastrar') {
        //let voto = await dbl.hasVoted(message.user.id);

        let refQuantidade = await database.ref(`VIP/${message.guild.id}`);
        let retorno = await refQuantidade.once('value');
        let array = [];

        await retorno.forEach(element => {
            array.push(element.key);
        });

        if (array.length == 20) return message.channel.send('**A lista VIP está cheia, espere a lista resetar para solicitar seu VIP. [`Reseta a cada 12hrs`]**');

        await ref.once('value').then(function (snap) {
            if (snap.val() == null) {
                var nSerieG = gerarNumeroSerie();
                ref.set({
                    nSerie: nSerieG,
                    verificado: false,
                    dataDoPedido: moment().format('L'),
                    beta: true,
                    usuario: `${message.author.username}#${message.author.discriminator}`,
                    notify: false
                });

                bot.guilds.map(m => {
                    if (m.id == message.guild.id) {
                        let embed = new Discord.RichEmbed()
                            .setAuthor(`Aprovação VIP | ${message.author.username}#${message.author.discriminator}`)
                            .addField('ID', message.author.id, true)
                            .addField('Servidor | ID', `${message.guild.name} | ${message.guild.id}`, true)
                            .setFooter(`Deseja receber novidades do VIP? Ative as notificações: ${prefix}vip notify ativar`)
                            .setColor('#DD8A32')
                        m.member('216691050293624833').send(embed);
                    };
                });
            } else if (snap.val().verificado == true && snap.val().beta == true) {
                message.channel.send(`<@${message.author.id}> você já é vip beta, não é possível realizar o cadastro.`)
            }
        });

    }

    if (args[0] == 'daily') {
        ref.once('value').then(async function (snap) {
            if (snap.val() == null) {
                message.channel.send(`<@${message.author.id}> você ainda não enviou uma solicitação para ser vip.\nDigite: \`${prefix}vip cadastrar\``);
            } else if (snap.val().verificado == false && snap.val().beta == false) {
                message.channel.send(`<@${message.author.id}> seu pedido ainda está em análise.`)
            } else if (snap.val().verificado == true && snap.val().beta == true) {
                refDaily.once('value').then(async function (snap2) {
                    if (snap2.val() == null) {
                        await refDaily.set({
                            dinheiro: snap2.val().dinheiro + 1000,
                            daily: moment().format('L'),
                            user: message.author.username
                        })

                        let embed = new Discord.RichEmbed()
                            .setAuthor(`${message.author.username}#${message.author.discriminator}`)
                            .setColor(0xDD8A32)
                            .setDescription('**Recompensa diária coletada com sucesso.**')
                            .setFooter(`Valor: F$1000`)
                            .setTimestamp();

                        await message.channel.send(embed);
                    } else {
                        if (snap2.val().daily !== moment().format('L') && snap.val().beta == true) {
                            await refDaily.update({
                                dinheiro: snap2.val().dinheiro + 1000,
                                dailyVIP: moment().format('L'),
                            })

                            let embed = new Discord.RichEmbed()
                                .setAuthor(`${message.author.username}#${message.author.discriminator}`)
                                .setColor(0xDD8A32)
                                .setDescription('**Recompensa diária coletada com sucesso.**')
                                .setFooter(`Valor: F$1000`)
                                .setTimestamp();

                            await message.channel.send(embed);
                        } else if (snap2.val().daily == moment().format('L') && snap.val().beta == true) {
                            message.channel.send({
                                embed: {
                                    author: {
                                        name: `${message.author.username}#${message.author.discriminator}`
                                    },
                                    color: 0xDD8A32,
                                    description: 'Você já coletou a recompensa VIP de hoje.',
                                    footer: {
                                        text: `Próxima daily ${moment().endOf('day').fromNow()}`
                                    }
                                }
                            });
                        }
                    }
                });
            } else if (snap.val().verificado == true && snap.val().beta == false) {
                refDaily.once('value').then(async function (snap2) {
                    if (snap2.val() == null) {
                        await refDaily.set({
                            dinheiro: snap2.val().dinheiro + 750,
                            daily: moment().format('L'),
                            user: message.author.username
                        })

                        let embed = new Discord.RichEmbed()
                            .setAuthor(`${message.author.username}#${message.author.discriminator}`)
                            .setColor(0xDD8A32)
                            .setDescription('**Recompensa diária coletada com sucesso.**')
                            .setFooter(`Valor: F$750`)
                            .setTimestamp();

                        await message.channel.send(embed);
                    } else {
                        if (snap2.val().daily !== moment().format('L') && snap.val().beta == false) {
                            await refDaily.update({
                                dinheiro: snap2.val().dinheiro + 750,
                                dailyVIP: moment().format('L'),
                            })

                            let embed = new Discord.RichEmbed()
                                .setAuthor(`${message.author.username}#${message.author.discriminator}`)
                                .setColor(0xDD8A32)
                                .setDescription('**Recompensa diária coletada com sucesso.**')
                                .setFooter(`Valor: F$750`)
                                .setTimestamp();

                            await message.channel.send(embed);
                        } else if (snap2.val().daily == moment().format('L') && snap.val().beta == false) {
                            message.channel.send({
                                embed: {
                                    author: {
                                        name: `${message.author.username}#${message.author.discriminator}`
                                    },
                                    color: 0xDD8A32,
                                    description: 'Você já coletou a recompensa VIP de hoje.',
                                    footer: {
                                        text: `Próxima daily ${moment().endOf('day').fromNow()}`
                                    }
                                }
                            });
                        }
                    }
                });
            }
        });
    }

    if (args[0] == 'remover' && args[1] && args[2]) {
        if (message.author.id !== '216691050293624833') return message.channel.send('_Comando não disponível para usuários._');
        let retorno = await database.ref(`VIP/${args[1]}`);
        let value = await retorno.once('value');
        if (value.val().verificado == false) return message.channel.send('_Este usuário já foi removido._');
        else {
            await retorno.remove().then(function (err) {
                if (err) console.error(error);
                else {
                    console.log('VIP removido')
                }
            });

            let guild = await bot.guilds.find('id', args[2]);
            let user = await bot.users.find('id', args[1]);

            if (guild.id == args[2] && user.id == args[1]) {
                let embed = new Discord.RichEmbed()
                    .setAuthor(`Remoção do VIP`)
                    .setDescription('**Seu VIP foi removido!**')
                    .setColor('#DD8A32')
                    .setFooter('Sentimos muito pelo o ocorrido')
                    .setTimestamp();
                user.send(embed);
            }

            await message.channel.send('_Usuário removido com sucesso!_');
        }

    }

    if (args[0] == "lista") {
        var embed = new Discord.RichEmbed()
            .setAuthor(`Lista de usuários VIP | ${message.guild.name}`, message.guild.iconURL)
            .setColor('#DD8A32')
            .setTimestamp();

        let array = [];
        let msg = '';
        let refLista = await database.ref(`VIP/${message.guild.id}`);
        let retorno = await refLista.once('value');

        if (retorno.val() == null) return message.channel.send(`<@${message.author.id}> ainda não temos usuários VIP's.`);

        await retorno.forEach(element => {
            array.push({ usuario: element.key, tipo: element.val().beta });
        })

        var position = await array.map(function (doc) {
            return {
                usuario: doc.usuario,
                tipo: doc.tipo
            }
        })

        position = await position.filter(function (a) {
            try {
                return bot.users.get(a.usuario).username
            } catch (error) {
            }
        })

        let lista = await position.slice(0, 20).map((a, posicao) => {
            try {
                return `${(posicao + 1)}º ${bot.users.get(a.usuario).username} - **${a.tipo}**`.replace(true, 'VIP Beta').replace(false, 'VIP Normal');
            } catch (error) {

            }
        })

        await embed.setDescription(`${lista.join("\n")}`);
        embed.setFooter(`Usuários: ${array.length}/20`)
        await message.channel.send(embed);
    }

    if (args[0] == "notify" && args[1] == "ativar") {
        let retorno = await ref.once('value');
        if (retorno.val() == null) return message.channel.send(`Você **não possui** o VIP Beta.`);

        await ref.update({
            notify: true
        });

        await message.channel.send('Notificações VIP **ativada** com sucesso.');
    }

    if (args[0] == "notify" && args[1] == "desativar") {
        let retorno = await ref.once('value');
        if (retorno.val() == null) return message.channel.send(`Você **não possui** o VIP Beta.`);

        await ref.update({
            notify: false
        });

        await message.channel.send('Notificações VIP **desativada** com sucesso.');
    }

    if (args[0] == "anunciar" && args[1]) {
        if (message.author.id !== '216691050293624833') return;
        var embed = new Discord.RichEmbed()
            .setAuthor(`NOVIDADES VIP`, bot.user.avatarURL)
            .setColor('#DD8A32')
            .setTimestamp()
            .setFooter(`Para desativar as notificações digite: ${prefix}notify desativar`)

        let array = [];
        let msg = args.join(" ").split(9);
        embed.setDescription(msg);
        let refLista = await database.ref(`VIP`);
        let retorno = await refLista.once('value');

        await retorno.forEach(element => {
            array.push(`${element.key}`);
        })

        for (let index = 0; index < array.length; index++) {

            let refUsuario = await database.ref(`VIP/${array[index]}`);
            let retorno = await refUsuario.once('value');

            if (!retorno.val().notify || retorno.val().notify == false);
            else {
                let member = bot.users.find('id', array[index]);
                member.send(embed);
            }
        }
    }

    if (args[0] == 'resetar') {
        let ref = await database.ref('VIP');
        await ref.remove();
        await message.channel.send('✅ Todos os usuários VIP\'s **foram resetados** com sucesso.')
    }

    if (!args[0]) {
        let embed = new Discord.RichEmbed()
            .setThumbnail('https://www.emoji.co.uk/files/phantom-open-emojis/symbols-phantom/13126-large-orange-diamond.png')
            .setColor('#DD8A32')
            .setDescription(`Você pode adquirir seu **VIP** comprando na **loja** ou usando o comando **${prefix}vip cadastrar.** O comando **${prefix}vip cadastrar** é necessário aprovação, se quiser adquirir o VIP normal compre na **loja**\n (\`use ${prefix}loja comprar VIP\`), custa F$2000,00.`);
        message.channel.send(embed);
    }

}

module.exports.config = {
    command: "vip"
}

function gerarNumeroSerie() {
    var nSerie = [];
    for (var i = 0; i <= 16; i++) {
        nSerie[i] = Math.floor(Math.random() * 10);
        if (i == 4 || i == 9) {
            nSerie[i] = '.';
        }
        if (i == 14) {
            nSerie[i] = '/';
        }
    }
    return nSerie.join('');
}