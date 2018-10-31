
module.exports.run = async (bot, message, args) => {
    const user = message.mentions.users.first();
    const amount = !!parseInt(message.content.split(' ')[1]) ? parseInt(message.content.split(' ')[1]) : parseInt(message.content.split(' ')[2])
    if (!amount) return message.reply('Especifique a quantidade de mensagens que você quer deletar!');
    if (!amount && !user) return message.reply('você deve especificar um usuário e quantidade, ou apenas uma quantidade, de mensagens para limpar!');
    message.channel.fetchMessages({
        limit: amount,
    }).then((messages) => {
        if (user) {
            const filterBy = user ? user.id : Client.user.id;
            messages = messages.filter(m => m.author.id === filterBy).array().slice(0, amount);
        }
        message.channel.bulkDelete(messages).catch(error => console.log(error.stack));
    });
}

module.exports.config = {
    command: 'limparmsg'
}