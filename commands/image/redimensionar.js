const jimp = require('jimp');
const fs = require('fs');

module.exports.run = async (bot, message, args) => {
    if (!args[0]) return message.channel.send(`<@${message.author.id}> **informe um usuário**`);
    let member = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    global.x = args[1];
    global.y = args[2];

    if (!x) return message.channel.send('Você deve informar a dimensão `x`.');
    if (!y) return message.channel.send('Você deve informar a dimensão `y`.');

    if (x > 200 || y > 200) return message.channel.send('O máximo suportado é de **200x200**, não ultrapasse essa marca!');

    jimp.read(member.user.avatarURL)
        .then(img => {
            img.resize(parseInt(x), parseInt(y));
            img.write('../../images/output/memberredimensionar.jpg', async function () {
                await message.channel.send('<:imagem:492036737019674644> **Sua imagem:**')
                await message.channel.sendFile('../../images/output/memberredimensionar.jpg');
                await fs.unlink('../../images/output/memberredimensionar.jpg');
            });
        })
        .catch(err => {
            console.error(err);
            message.channel.send('Não foi possível realizar a manipulação da imagem.')
        })
}

module.exports.config = {
    command: 'redimensionar'
}