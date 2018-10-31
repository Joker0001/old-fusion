
module.exports.run = async (bot, message, args) => {
    if (!message.member.hasPermission("MANAGE_ROLES")) return message.reply('**ATENÇÃO você não possui** permissões suficientes.**');

    let member = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    let cargo = args[1];

    if (!member) return message.channel.send('Você **deve mencionar** um usuário.');
    if (!cargo) return message.channel.send('Você **deve informar** um cargo.');

    let nomeCargo = message.guild.roles.find('name', cargo);
    if (!nomeCargo) return message.channel.send('O cargo informado **não está presente** no servidor!');

    member.removeRole(nomeCargo.id);
    await message.channel.send(`O usuário **${member.user.username}** perdeu o cargo \`${args[1]}\``);

}

module.exports.config = {
    command: 'removerole'
}

