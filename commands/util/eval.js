const Discord = require("discord.js");

module.exports.run = async (bot, message, args, database) => {
    if (message.author.id !== '216691050293624833') return;
    try {
        let codein = args.join(" ");
        let code = eval(codein);

        if (typeof code !== 'string')
            code = require('util').inspect(code, { depth: 0 });
        let embed = new Discord.RichEmbed()
        .setColor(0xDD8A32)
        .addField(':inbox_tray: Entrada', `\`\`\`js\n${codein}\`\`\``)
        .addField(':outbox_tray: Resultado', `\`\`\`js\n${code}\n\`\`\``)
        message.channel.send(embed)
    } catch(e) {
        message.channel.send(`\`\`\`js\n${e}\n\`\`\``);
    }
}

module.exports.config = {
    command: 'eval'
}
