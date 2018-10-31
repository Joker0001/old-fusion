const EmbedMode = require('../../model/paginationembed/src/struct/Embeds.js');
const path = require('path');
const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
    const embeds = [];

    for (let index = 0; index < 8; index++) {
        if (index == 0) {
            embeds.push(new Discord.RichEmbed()
                .setAuthor(`Minhas informações`, bot.user.avatarURL)
                .setThumbnail('https://cdn.discordapp.com/emojis/486181409459798054.png?v=1')
                .setDescription(`Abaixo estão algumas informações sobre meu funcionamento. 
                    Para saber quais comandos estão disponíveis utilize os emojis para navegar. 
                    **Comandos com \`<>\` é obrigatório informar e com \`()\` é opcional.**`)
                .addField('<:server:486177812600848405> Servidores', `[\`${bot.guilds.size} servidores\`]`, true)
                .addField('<:users:486177811686621186> Usuários', `[\`${bot.users.size} usuários\`]`, true)
                .addField('<:versao:486183591399784458> Versão', '[`Versão: 2.0`]', true)
                .addField('<:prefix:486186548526579712> Prefixo utilizado', `[\`Utilize ${prefix}\`]`, true)
                .addField('<:node:489095125616820242> Linguagem', '[`JavaScript - NodeJS`]', true)
                .addField('<:adicionar:486174837472231477> Me adicione', '[Clique aqui](https://discordapp.com/api/oauth2/authorize?client_id=488022333500424203&permissions=8&scope=bot)', true)
                .setFooter('© 2018 - Todos os direitos reservados', `${bot.users.find(`id`, '216691050293624833').avatarURL}`)
            )
        }

        if (index == 1) {
            embeds.push(new Discord.RichEmbed()
                .setAuthor(`Comandos de configuação`)
                .setThumbnail('https://cdn.discordapp.com/emojis/486496268231639061.png?v=1')
                .setDescription(`**${prefix}prefix <novo prefixo>** - Utilizado para trocar o prefixo global do servidor.
                **${prefix}setconfig <configuração>** - Utilizado para habilitar configurações no servidor
                Configurações disponíveis: level, autorole, muterole, logs, economia`)
            )
        }

        if (index == 2) {
            embeds.push(new Discord.RichEmbed()
                .setAuthor(`Comandos de economia`)
                .setThumbnail('https://cdn.discordapp.com/emojis/495326708510228482.png?v=1')
                .setDescription(`**${prefix}addmoney <@Usuario> <quantidade>** - Utilizado para adicionar saldo à um usuário.
                    **${prefix}removermoney <@Usuario> <quantidade>** - Utilizado para remover o saldo de um usuário no servidor.
                    **${prefix}apostar <@Usuario> <quantidade>** - Utilizado para apostar uma quantia de dinheiro com o usuário mencionado.
                    **${prefix}daily** - Utilizado para receber a recompensa diária no servidor.
                    **${prefix}pay <@Usuario> <quantidade>** - Utilizado para pagar um usuário no servidor.
                    **${prefix}saldo** - Utilizado para mostrar o saldo do usuário no servidor.
                    **${prefix}loja (comprar) (produto)** - Utilizado para mostrar a loja disponível no bot.
                    **${prefix}serverloja (comprar) (produto)** - Em desenvolvimento.
                    **${prefix}vip <comando> (complemento)** - Comando VIP.
                    Comandos VIP: cadastrar, daily beta, lista, notify ativar, notify desativar, help`)
            )
        }

        if (index == 3) {
            embeds.push(new Discord.RichEmbed()
                .setAuthor(`Comandos de imagem`)
                .setThumbnail('https://cdn.discordapp.com/emojis/492036737019674644.png?v=1')
                .setDescription(`**${prefix}avatar <@Usuario>** - Utilizado para mostrar a imagem do usuário mencionado.
                    **${prefix}circle <@Usuario>** - Retorna a imagem do usuário em forma de circulo.)
                    **${prefix}diamond <@Usuario>** - Retorna a imagem do usuário em forma de diamante.)
                    **${prefix}invert <@Usuario>** - Retorna a imagem do usuário com as cores invertidas.)
                    **${prefix}polygon <@Usuario>** - Retorna a imagem do usuário em forma de polígono.)
                    **${prefix}sepia <@Usuario>** - Retorna a imagem do usuário em sepia.)
                    **${prefix}redimensionar <@Usuario> <x> <y>** - Redimensiona o avatar de acordo com X e Y.`)
            )
        }

        if (index == 4) {
            embeds.push(new Discord.RichEmbed()
                .setAuthor(`Comandos de informações`)
                .setThumbnail('https://cdn.discordapp.com/emojis/486157445408751626.png?v=1')
                .setDescription(`**${prefix}config** - Mostra as configurações ativas no servidor.
                    **${prefix}novidades** - Em desenvolvimento.
                    **${prefix}infobot** - Em desenvolvimento.`)
            )

        }

        if (index == 5) {
            embeds.push(new Discord.RichEmbed()
                .setAuthor(`Comandos de utilidade`)
                .setThumbnail('https://discordapp.com/assets/e770e7da3fb872af10856268118a6e34.svg')
                .setDescription(`**${prefix}ranking <level/dinheiro>** - Mostra ranking de level ou dinheiro no servidor.
                    **${prefix}level** - Mostra seu level no servidor.
                    **${prefix}ping** - Mostra o ping do bot.`)
            )
        }

        if (index == 6) {
            embeds.push(new Discord.RichEmbed()
                .setAuthor(`Comandos de música`)
                .setThumbnail('https://cdn.discordapp.com/emojis/486254522486882304.png?v=1')
                .setDescription(`**${prefix}music play <URL/Nome>** - O bot irá tocar uma música apartir do URL ou nome da música.
                    **${prefix}music skip** - Pula a música que está tocando atualmente.
                    **${prefix}music stop** - Finaliza todas as músicas.
                    **${prefix}music volume <0-10>** - Troca o volume do bot.
                    **${prefix}music np** - Mostra a música que está tocando atualmente.
                    **${prefix}music queue** - Mostra as músicas que estão na fila.
                    **${prefix}music pause** - Pausa a música atual.
                    **${prefix}music resume** - Resume a música atual.`)
            )
        }

        if (index == 7) {
            embeds.push(new Discord.RichEmbed()
                .setAuthor(`Comandos de moderação`)
                .setThumbnail('https://cdn.discordapp.com/emojis/486496267866734592.png?v=1')
                .setDescription(`**${prefix}addrole <@Usuario> <role>** - Adiciona uma role para o usuário mencionado.
                    **${prefix}removerole <@Usuario> <role>** - Mostra a música que está tocando atualmente.
                    **${prefix}ban <@Usuario> <motivo>** - Bane o usuário do servidor.
                    **${prefix}kick <@Usuario> <motivo>** - Kicka o usuário do servidor.
                    **${prefix}tempmute <@Usuario> <tempo 1s/m/h/d>** - Muta temporariamente um usuário.
                    **${prefix}limparmsg <1-100>** - Limpa as mensagens do canal.
                    **${prefix}setname <@Usuario> ** - Troca o nick do usuário mencionado.`)
            )
        }

    }

    new EmbedMode()
        .setArray(embeds)
        .setAuthorizedUsers([message.author.id])
        .setChannel(message.channel)
        .showPageIndicator(true)
        .setPage(1)
        .setColor(0xDD8A32)
        .build();
}

module.exports.config = {
    command: 'ajuda'
}