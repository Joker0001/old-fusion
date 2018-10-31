
module.exports.run = async (bot, message, args, database) => {
    if (message.author.id !== '216691050293624833' && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(('Você **não possui** permissões suficientes.'));
    if (!args[0]) return message.channel.send({
        embed: {
            author: "Erro ao realizar o comando",
            description: 'Por favor informe o prefixo.'
        }
    });

    message.channel.send('_Fazendo alteração no prefixo. Aguarde ..._');

    await database.ref('Configurações/Servidores'+ "/" +message.guild.id)
        .update({
            prefixo: args[0]
        }, function(error) {
            if (error) {
                message.channel.send('**Erro ao configurar prefixo.**');
                console.error(error);
            } else {
                message.channel.send('**Configuração finalizada.** Prefixo alterado com sucesso.');
            }
        });
    
    //msg.edit('**Configuração finalizada.** Prefixo trocado com sucesso.');

}

module.exports.config = {
    command: "prefix"
}