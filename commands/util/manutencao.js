
module.exports.run = async (bot, message, args, database) => {
    let comando = args[0];
    if (message.author.id !== '216691050293624833') return message.channel.send(`<@${message.author.id}> você **não possui** permissões.`)
    let manutencao = await database.ref(`Manutenção/${comando}`);
    let retorno = await manutencao.once('value');

    if (retorno.val() == null) {
        await manutencao.set({
            status: true
        })

        await message.channel.send(`✅ Manutenção **ativada** com sucesso. [${comando}]`);
    } else if (retorno.val().status == true) {
        await manutencao.set({
            status: false
        })

        await message.channel.send(`✅ Manutenção **desativada** com sucesso. [${comando}]`);
    } else if (retorno.val().status == false) {
        await manutencao.set({
            status: true
        });

        await message.channel.send(`✅ Manutenção **ativada** com sucesso. [${comando}]`);
    }   
}

module.exports.config = {
    command: 'manutencao'
}