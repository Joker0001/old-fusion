
module.exports.initBOT = () => {
    const Discord = require('discord.js');
    const client = new Discord.Client();
    const firebase = require('firebase');
    const comandos = require('./model/cmd.js');
    const fs = require('fs');
    const jimp = require('jimp');
    const path = require('path');

    client.commands = new Discord.Collection();

    var config = {
        apiKey: process.env.API_KEY,
        authDomain: process.env.AUTH,
        databaseURL: process.env.DATABASE,
        projectId: process.env.PROJECT_ID,
        storageBucket: process.env.BUCKET,
        messagingSenderId: process.env.SENDER_ID
    };

    firebase.initializeApp(config);

    var database = firebase.database();

    client
        .on('ready', async () => {
            comandos.initCMD(fs, client);
            console.log('ONLINE');
            client.user.setActivity('Em construção | f-ajuda');
        })

        .on('guildCreate', async (guild) => {
            database.ref(`Configurações/Servidores/${guild.id}`)
                .set({
                    prefixo: 'f-',
                    autorole: false,
                    muterole: false,
                    welcome: false,
                    level: false,
                    logs: false,
                    economia: false
                }, function (error) {
                    if (error) {
                        console.error(error);
                    } else {
                        console.log('Configurações iniciadas')
                    }
                })
        })

        .on('guildDelete', async (guild) => {
            database.ref(`Configurações/Servidores/${guild.id}`)
                .remove(function (error) {
                    if (error) {
                        console.error(error);
                    } else {
                        console.log('Configurações removidas')
                    }
                });
        })

        .on('guildMemberAdd', async (member) => {
            let ref = await database.ref(`Configurações/Servidores/${member.guild.id}`);
            let data = await ref.once('value');

            if (data.val() == null || data.val().autorole == false);
            else {
                member.addRole(data.val().autorole);
            }

            await database.ref(`Servidores/Usuários/${member.guild.id}/Level/${member.id}`)
                .set({
                    pontos: 0,
                    level: 1,
                    user: `${member.username}`
                }, function (error) {
                    if (error) {
                        console.error(error);
                    } else {
                        console.log('Level iniciado ' + member.user.username);
                    }
                })
        })

        .on('guildMemberRemove', async (member) => {
            database.ref(`Servidores/Usuários/${member.guild.id}/Level/${member.id}`)
                .remove(function (error) {
                    if (error) {
                        console.error(error);
                    } else {
                        console.log('Level removido ' + member.user.username);
                    }
                })
        })

        .on('message', async (message) => {
            //if (message.guild.id !== '484412183950917642') return;
            if (message.author.bot) return;
            global.prefix = '';
            global.points = '';
            global.nextLevel = '';
            let pointsAdd = Math.floor(Math.random() * 7) + 8;
            database.ref(`Servidores/Usuários/${message.guild.id}/Level/${message.member.id}`).once('value').then(async function (snap) {
                if (snap.val() === null) {
                    database.ref(`Servidores/Usuários/${message.guild.id}/Level/${message.member.id}`)
                        .set({
                            pontos: 0,
                            level: 1,
                            user: `${message.author.username}`
                        });
                } else {
                    database.ref(`Configurações/Servidores/${message.guild.id}`).once('value')
                        .then(async function (snap2) {
                            if (snap2.val().level == false);
                            else {
                                points = snap.val().pontos + pointsAdd;
                                nextLevel = snap.val().level * 500;
                                database.ref(`Servidores/Usuários/${message.guild.id}/Level/${message.member.id}`)
                                    .update({
                                        pontos: points,
                                    });

                                if (snap.val().level == 999 || snap.val().level > 999);
                                else {
                                    if (nextLevel <= points) {
                                        nextLevel = snap.val().level + 1;
                                        database.ref(`Servidores/Usuários/${message.guild.id}/Level/${message.member.id}`)
                                            .update({
                                                level: nextLevel
                                            });

                                        jimp.read('./images/input/levelup.png')
                                            .then(async image => {
                                                image.resize(128, 128);
                                                jimp.loadFont(jimp.FONT_SANS_16_WHITE).then(font => {
                                                    image.print(font, 35, 70, "Level UP").write('./images/output/levelupedit.png');

                                                    jimp.loadFont(jimp.FONT_SANS_32_WHITE).then(async font2 => {
                                                        if (nextLevel < 10) {
                                                            image.print(font2, 55, 25, nextLevel).write('./images/output/levelupedit.png');
                                                        } else if (nextLevel >= 10 && nextLevel < 100) {
                                                            image.print(font2, 45, 25, nextLevel).write('./images/output/levelupedit.png');
                                                        } else if (nextLevel >= 100 && nextLevel <= 999) {
                                                            image.print(font2, 37, 35, nextLevel).write('./images/output/levelupedit.png');
                                                        }
                                                        message.channel.send(`**${message.author.username}#${message.author.discriminator} acaba de subir de nível!**`,
                                                            {
                                                                file: './images/output/levelupedit.png'
                                                            }
                                                        ).then(function (msg) {
                                                            msg.delete(7000);
                                                            try {
                                                                fs.unlink('./images/output/levelupedit.png');
                                                            } catch (error) {
                                                                console.error(error)
                                                            }
                                                        })
                                                    });
                                                }).catch(function (error) {
                                                    console.error(error);
                                                })
                                            });
                                    }
                                }
                            }
                        });
                }
            }).catch(function (error) {
                console.error(error);
            });

            await database.ref(`Configurações/Servidores/${message.guild.id}`).once('value').then(function (snap) {
                if (snap.val() === null) {
                    database.ref(`Configurações/Servidores/${message.guild.id}`)
                        .set({
                            prefixo: 'f-',
                            autorole: false,
                            muterole: false,
                            welcome: false,
                            level: false,
                            logs: false,
                            economia: false,
                        });
                } else {
                    prefix = snap.val().prefixo;
                }
            }).catch(function (error) {
                console.error(error);
            })
            const args = message.content.slice(prefix.length).trim().split(/ +/g);
            const comando = args.shift().toLowerCase();
            if (!message.content.startsWith(prefix)) return;
            if (message.channel.type === 'dm') return message.reply('Opa opa, você não pode usar comandos no meu privado!');
            let refManu = await database.ref(`Manutenção/${comando}`);
            let retorno = await refManu.once('value');
            if (retorno.val() == null);
            else if (retorno.val().status == true) return message.channel.send('❌ Comando **em manutenção**.');
            var cmd = client.commands.get(comando);
            if (cmd) cmd.run(client, message, args, database);
        })

        .login(process.env.SECRET);
}