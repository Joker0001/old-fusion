
module.exports.run = async (bot, message, args) => {
    if (message.author.id !== '216691050293624833') return message.channel.send(`Você não tem permissão para usar este comando!`)
    let path = args[0];
    let cmd = args[1];
    if (!path) return message.reply(`coloque o nome da pasta!`);
    if (!cmd) return message.reply(`coloque o nome do comando!`);
    try {
        delete require.cache[require.resolve(`./../${path}/${cmd}.js`)];
        bot.commands.delete(cmd);

        const props = require(`./../${path}/${cmd}.js`);
        bot.commands.set(cmd, props);
    } catch (e) {
        return message.channel.send(`Comando ${cmd} não encontrado`);
    }

    await message.channel.send(`Comando ${cmd} reiniciado.`);
}

module.exports.config = {
    command: 'resetarcmd'
}