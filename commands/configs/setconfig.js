const Discord = require('discord.js');

module.exports.run = async (bot, message, args, database) => {
    if (message.author.id !== '216691050293624833' && !message.member.hasPermission('MANAGE_GUILD')) return message.channel.send(('Você **não possui** permissões suficientes.'));
    if (!args[0]) return message.channel.send('**Informe o sistema que você quer desativar.**');

    if (args[0] == 'level') {
        database.ref(`Configurações/Servidores/${message.guild.id}`).once('value')
            .then(async function (snap) {
                if (snap.val().level == false) {
                    await database.ref(`Configurações/Servidores/${message.guild.id}`)
                        .update({
                            level: true
                        });
                    await message.channel.send('_Sistema de level ativado._');
                } else if (snap.val().level == true) {
                    database.ref(`Configurações/Servidores/${message.guild.id}`).once('value')
                        .then(async function (snap) {
                            await database.ref(`Configurações/Servidores/${message.guild.id}`)
                                .update({
                                    level: false
                                });
                            await message.channel.send('_Sistema de level desativado._');
                        });
                }
            })
    }
    if (args[0] == "autorole") {
        let autorEnviou = message.author.id;
        database.ref(`Configurações/Servidores/${message.guild.id}`).once('value')
            .then(async function (snap) {
                if (snap.val().autorole == false) {
                    message.channel.send(`<@${message.author.id}> __informe a role para autorole:__`);
                    try {
                        var response = await message.channel.awaitMessages(message => autorEnviou == message.author.id, {
                            maxMatches: 1,
                            time: 10000,
                            errors: ['time']
                        });
                    } catch (error) {
                        return message.channel.send(`<@${message.author.id}> **você não informou** a role para autorole.`);
                    }
                    await database.ref(`Configurações/Servidores/${message.guild.id}`)
                        .update({
                            autorole: response.first().content
                        });
                    await message.channel.send('_Sistema de auto-role ativado._');
                } else if (snap.val().autorole !== false && !args[1]) {
                    database.ref(`Configurações/Servidores/${message.guild.id}`).once('value')
                        .then(async function (snap) {
                            await database.ref(`Configurações/Servidores/${message.guild.id}`)
                                .update({
                                    autorole: false
                                });
                            await message.channel.send('_Sistema de auto-role desativado._');
                        });
                }
            })
    }
    if (args[0] == "muterole") {
        let autorEnviou = message.author.id;
        database.ref(`Configurações/Servidores/${message.guild.id}`).once('value')
            .then(async function (snap) {
                if (snap.val().muterole == false) {
                    message.channel.send(`<@${message.author.id}> __informe a role para mute:__`);
                    try {
                        var response = await message.channel.awaitMessages(message => autorEnviou == message.author.id, {
                            maxMatches: 1,
                            time: 10000,
                            errors: ['time']
                        });
                    } catch (err) {
                        return message.channel.send(`<@${message.author.id}> **você não informou** a role para muterole.`);
                    }
                    await database.ref(`Configurações/Servidores/${message.guild.id}`)
                        .update({
                            muterole: response.first().content
                        });
                    await message.channel.send('_Sistema de mute-role ativado._');
                } else if (snap.val().level !== false && !args[1]) {
                    database.ref(`Configurações/Servidores/${message.guild.id}`).once('value')
                        .then(async function (snap) {
                            await database.ref(`Configurações/Servidores/${message.guild.id}`)
                                .update({
                                    muterole: false
                                });
                            await message.channel.send('_Sistema de mute-role desativado._');
                        });
                }
            })
    }
    if (args[0] == "welcome") {
        database.ref(`Configurações/Servidores/${message.guild.id}`).once('value')
            .then(async function (snap) {
                if (snap.val().welcome == false) {
                    await database.ref(`Configurações/Servidores/${message.guild.id}`)
                        .update({
                            welcome: true
                        });
                    await message.channel.send('_Sistema de bem-vindos ativado._');
                } else if (snap.val().welcome == true) {
                    database.ref(`Configurações/Servidores/${message.guild.id}`).once('value')
                        .then(async function (snap) {
                            await database.ref(`Configurações/Servidores/${message.guild.id}`)
                                .update({
                                    welcome: false
                                });
                            await message.channel.send('_Sistema de bem-vindos desativado._');
                        });
                }
            })
    }
    if (args[0] == "logs") {
        var autorEnviou = message.author.id;
        database.ref(`Configurações/Servidores/${message.guild.id}`).once('value')
            .then(async function (snap) {
                if (snap.val().logs == false) {
                    message.channel.send(`<@${message.author.id}> __informe o canal para os logs:__`);
                    try {
                        var response = await message.channel.awaitMessages(message => autorEnviou == message.author.id, {
                            maxMatches: 1,
                            time: 10000,
                            errors: ['time']
                        });
                    } catch (err) {
                        return message.channel.send(`<@${message.author.id}> **você não informou** o canal para logs.`);
                    }

                    await database.ref(`Configurações/Servidores/${message.guild.id}`)
                        .update({
                            logs: response.first().content
                        });
                    await message.channel.send('_Sistema de logs ativado._');
                } else if (snap.val().logs !== false && !args[1]) {
                    database.ref(`Configurações/Servidores/${message.guild.id}`).once('value')
                        .then(async function (snap) {
                            await database.ref(`Configurações/Servidores/${message.guild.id}`)
                                .update({
                                    logs: false
                                });
                            await message.channel.send('_Sistema de logs desativado._');
                        });
                }
            })
    }
    if (args[0] == "economia") {
        database.ref(`Configurações/Servidores/${message.guild.id}`).once('value')
            .then(async function (snap) {
                if (snap.val().economia == false) {
                    await database.ref(`Configurações/Servidores/${message.guild.id}`)
                        .update({
                            economia: true
                        });
                    await message.channel.send('_Sistema de economia ativado._');
                } else if (snap.val().economia == true) {
                    database.ref(`Configurações/Servidores/${message.guild.id}`).once('value')
                        .then(async function (snap) {
                            await database.ref(`Configurações/Servidores/${message.guild.id}`)
                                .update({
                                    economia: false
                                });
                            await message.channel.send('_Sistema de economia desativado._');
                        });
                }
            })
    }
}

module.exports.config = {
    command: 'setconfig'
}