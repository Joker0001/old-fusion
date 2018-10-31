const Discord = require('discord.js');

module.exports.run = async (bot, message, args, database) => {
    if (args[0] == 'level') {
        try {
            let ref = await database.ref(`Servidores/Usuários/${message.guild.id}`);
            let retorno = await ref.once('value');

            let array = [];
            let arrayFinal = [];

            await retorno.forEach(element => {
                array.push(element.key);
            });

            for (let index = 0; index < array.length; index++) {
                const element = array[index];
                if (element == 'Level') {
                    let refA = await database.ref(`Servidores/Usuários/${message.guild.id}/${element}`);
                    let retornoA = await refA.orderByChild('level').limitToLast(10).once('value');

                    await retornoA.forEach(elementA => {
                        arrayFinal.push({ usuario: elementA.key, level: elementA.val().level, xp: elementA.val().pontos });
                    });
                }
            }

            if (!arrayFinal[0]) return message.channel.send(`<@${message.author.id}> Ainda não há usuários no TOP 10.`)

            var position = await arrayFinal.map(function (doc) {
                return {
                    usuario: doc.usuario,
                    level: doc.level,
                    pontos: doc.pontos
                }
            })

            position = await position.sort(function (a, b) {
                return b.level - a.level
                return b.pontos - a.pontos
            });

            position = await position.filter(function (a) {
                try {
                    return bot.users.get(a.usuario).username
                } catch (error) {
                }
            })

            let top = await position.slice(0, 10).map((a, posicao) => {
                try {
                    return `${(posicao + 1)}º ${bot.users.get(a.usuario).username} > Nivel: ${a.level}`
                } catch (error) {

                }
            })

            await message.channel.send(`**TOP 10 Level** \`\`\`xl\n${top.join("\n")}\`\`\``)

        } catch (error) { console.error(error) };

    }

    if (args[0] == 'dinheiro') {
        try {
            let ref = await database.ref(`Servidores/Usuários/${message.guild.id}`);
            let retorno = await ref.once('value');

            let array = [];
            let arrayFinal = [];

            await retorno.forEach(element => {
                array.push(element.key);
            });

            for (let index = 0; index < array.length; index++) {
                const element = array[index];
                if (element == 'Dinheiro') {
                    let refA = await database.ref(`Servidores/Usuários/${message.guild.id}/${element}`);
                    let retornoA = await refA.orderByChild('dinheiro').limitToLast(10).once('value');

                    await retornoA.forEach(elementA => {
                        arrayFinal.push({ usuario: elementA.key, dinheiro: elementA.val().dinheiro });
                    });
                }
            }

            if (!arrayFinal[0]) return message.channel.send(`<@${message.author.id}> Ainda não há usuários no TOP 10.`)

            var position = await arrayFinal.map(function (doc) {
                return {
                    usuario: doc.usuario,
                    dinheiro: doc.dinheiro,
                }
            })

            position = await position.sort(function (a, b) {
                return b.dinheiro - a.dinheiro
            });

            position = await position.filter(function (a) {
                try {
                    return bot.users.get(a.usuario).username
                } catch (error) {

                }
            })

            let top = await position.slice(0, 10).map((a, posicao) => {
                try {
                    return `${(posicao + 1)}º ${bot.users.get(a.usuario).username} > Dinheiro: F$${parseInt(a.dinheiro).toLocaleString('pt-br')}`
                } catch (error) {

                }
            })

            await message.channel.send(`**TOP 10 Dinheiro** \`\`\`xl\n${top.join("\n")}\`\`\``)

        } catch (error) { console.error(error) };

    }
}

module.exports.config = {
    command: 'ranking'
}