const Discord = require('discord.js');

module.exports.run = async (bot, message, args, database) => {
    let refA = await database.ref(`Configurações/Servidores/${message.guild.id}`);
    let dataA = await refA.once('value');
    if (dataA.val().economia == false) return message.channel.send(`<@${message.author.id}> os comandos de economia neste servidor estão **desativados**.`)

    let ref = await database.ref('Loja');
    let data = await ref.once('value');
    let json = data.toJSON();
    var categorias = [];
    let itemName = '';
    let itemPrice = 0;
    let itemDesc = '';

    if (!args[0]) {
        for (var i in json) {
            //console.log(json[i]);
            if (!categorias.includes(json[i].tipo)) {
                categorias.push(json[i].tipo);
            }
        }

        let embed = new Discord.RichEmbed()
            .setAuthor(`Fusion Marketplace | ${message.guild.name}`, message.guild.iconURL)
            .setColor(0xD4AF37)
            .setThumbnail('https://icon-icons.com/icons2/403/PNG/512/shop_40505.png')

        for (let i = 0; i < categorias.length; i++) {
            var tempDesc = '';
            for (var c in json) {
                if (categorias[i] == json[c].tipo) {
                    tempDesc += `**${json[c].name}** | **Preço:** F$${json[c].preco} | **Descrição:** ${json[c].desc}\n`
                }
            }
            embed.addField(`Categoria: ${categorias[i]}`, tempDesc)
        }

        message.channel.send(embed);
    } else if (args[0] == "comprar") {
        for (var i in json) {
            if (args.join(" ").slice(8).trim().toUpperCase() == json[i].name.toUpperCase()) {
                itemName = json[i].name;
                itemPrice = json[i].preco;
                itemDesc = json[i].desc;
            }
        }

        if (itemName == '') return message.channel.send(`**Item ${args.join(" ").trim().slice(9)} não foi achado.**`);

        let money = await database.ref(`Servidores/Usuários/${message.guild.id}/Dinheiro/${message.author.id}`);
        let dataMoney = await money.once('value');
        let jsonMoney = dataMoney.toJSON();

        if (jsonMoney.dinheiro < itemPrice || dataMoney.val() == null) return message.channel.send(`Você **não possui** saldo suficiente!`);

        if (itemName == 'VIP') {
            let refQuantidade = await database.ref(`VIP/${message.guild.id}`);
            let retorno = await refQuantidade.once('value');
            let array = [];

            await retorno.forEach(element => {
                array.push(element.key);
            });

            if (array.length == 20) return message.channel.send('**A lista VIP está cheia, espere a lista resetar para comprar seu VIP. [`Reseta a cada 12hrs`]**');
            
            await money.update({ dinheiro: parseInt(jsonMoney.dinheiro) - parseInt(itemPrice) });
            let refVIP = await database.ref('VIP/' + message.guild.id + '/'+ message.author.id);
            let dataVIP = await refVIP.once('value');


            if (dataVIP.val() == null) {
                await refVIP.set({
                    verificado: true,
                    beta: false,
                });

                await message.channel.send(`<@${message.author.id}> Você acaba de adquirir seu VIP! Aproveite.`)
            }

            else {
                return message.channel.send(`<@${message.author.id}> você já é VIP, não é possível realizar a compra.`);
            }
        }

    }
}

module.exports.config = {
    command: "loja"
}