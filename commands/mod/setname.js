
module.exports.run = async(bot, message, args) => {
    if(!message.member.hasPermission("MANAGE_NICKNAMES")) return message.channel.send('**Você não tem permissões para usar este comando!**');
    if (!args[0]) return message.channel.send('**_Você deve mencionar o usuário que deseja trocar o nick._**');
    if (!args[1]) return message.channel.send('**_Você deve informar o novo nick!_**');
    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) return message.channel.send(`_Não consegui encontrar o usuário mencionado._`);
    let sNick = args[1];
    if(bUser.hasPermission("MANAGE_NICKNAMES")) return message.channel.send(`**ATENÇÃO** eu não posso trocar o nick deste usuário!`);

    message.guild.member(bUser).setNickname(sNick);
    message.channel.send('✅ Nick **trocado** com sucesso.')
}

module.exports.config = {
    command: "setname"
}