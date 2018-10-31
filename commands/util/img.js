const jimp = require('jimp');
const path = require('path');
const fs = require('fs');
module.exports.run = async(bot, message, args) => {
    var p1 = jimp.read(message.author.avatarURL);
    var p2 = jimp.read(path.resolve('./images/input/circulo.png'));
    var p3 = jimp.read(path.resolve('./images/input/bemvindo.png'));
    var p4 = jimp.read(path.resolve('./images/input/footer.png'));
    var p5 = jimp.read('https://cdn.discordapp.com/emojis/438399398808911882.png?v=1');
    var p6 = jimp.read('https://cdn.discordapp.com/emojis/438399398796460032.png?v=1');
    var p7 = jimp.read('https://cdn.discordapp.com/emojis/438399396548313091.png?v=1');
    var p8 = jimp.read('https://cdn.discordapp.com/emojis/438399398762905600.png?v=1');
    var status = message.author.presence.status;
    var statusJimp = '';

    let promisse = await Promise.all([p1, p2, p3, p4, p5, p6, p7, p8]);
    var avatar = promisse[0];
    var mask = promisse[1];
    var fundo = promisse[2];
    var footer = promisse[3];
    var online = promisse[4];
    var ausente = promisse[5];
    var naopertube = promisse[6];
    var offline = promisse[7];

    await avatar.resize(100,100);
    await mask.resize(100,100);
    await footer.resize(50, 350);
    await footer.mirror(false, true);
    await footer.rotate(-90);

    await avatar.mask(mask, 0, 0).write(path.resolve('./images/output/avatarbedit.png'));
    await mask.resize(30, 30);

    if (status == 'online') {
        await online.resize(20, 20);
        statusJimp = await online.mask(mask, 0, 0).write(path.resolve('./images/output/status.png'));
    } else if (status == 'dnd') {
        await naopertube.resize(20, 20);
        statusJimp = await naopertube.mask(mask, 0, 0).write(path.resolve('./images/output/status.png'));
    } else if (status == 'offline') {
        await offline.resize(30, 30);
        statusJimp = await offline.mask(mask, 0, 0).write(path.resolve('./images/output/status.png'));
    } else if (status == 'idle') {
        await ausente.resize(20, 20);
        statusJimp = await ausente.mask(mask, 0, 0).write(path.resolve('./images/output/status.png'));
    } 

    let font = await jimp.loadFont(jimp.FONT_SANS_16_WHITE);
    await fundo.composite(avatar, 22, 16);//.write(path.resolve('./images/output/bemvindoedit.png')).print(font, 40, 16, 'Testando');
    await fundo.print(font, 155, 45, `${message.author.tag}`);
    await fundo.composite(footer, 5, 85);
    await fundo.composite(statusJimp, 90, 90);
    await fundo.write(path.resolve('./images/output/bemvindoedit.png'));
    await message.channel.sendFile(path.resolve('./images/output/bemvindoedit.png')).then(() => {
        fs.unlink(path.resolve('./images/output/bemvindoedit.png'));
        fs.unlink(path.resolve('./images/output/avatarbedit.png'));
        fs.unlink(path.resolve('./images/output/status.png'));
    })
    //await console.log('Editado');
}

module.exports.config = {
    command: 'img'
}