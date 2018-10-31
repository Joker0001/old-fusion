const path = require('path');

module.exports.initCMD = (fs, bot) => {
    fs.readdir(path.resolve('commands/configs'), (err, files) => {
        if (err) console.error(err);
        var jsfiles = files.filter(f => f.split('.').pop() === "js");

        jsfiles.forEach((f, i) => {
            delete require.cache[require.resolve(path.resolve(`commands/configs/${f}`))];
            var cmds = require(path.resolve(`commands/configs/${f}`));
            bot.commands.set(cmds.config.command, cmds);
        });
    });

    fs.readdir(path.resolve('commands/mod'), (err, files) => {
        if (err) console.error(err);
        var jsfiles = files.filter(f => f.split('.').pop() === "js");

        jsfiles.forEach((f, i) => {
            delete require.cache[require.resolve(path.resolve(`commands/mod/${f}`))];
            var cmds = require(path.resolve(`commands/mod/${f}`));
            bot.commands.set(cmds.config.command, cmds);
        });
    });

    fs.readdir(path.resolve('commands/music'), (err, files) => {
        if (err) console.error(err);
        var jsfiles = files.filter(f => f.split('.').pop() === "js");

        jsfiles.forEach((f, i) => {
            delete require.cache[require.resolve(path.resolve(`commands/music/${f}`))];
            var cmds = require(path.resolve(`commands/music/${f}`));
            bot.commands.set(cmds.config.command, cmds);
        });
    });

    fs.readdir(path.resolve('commands/util'), (err, files) => {
        if (err) console.error(err);
        var jsfiles = files.filter(f => f.split('.').pop() === "js");

        jsfiles.forEach((f, i) => {
            delete require.cache[require.resolve(path.resolve(`commands/util/${f}`))];
            var cmds = require(path.resolve(`commands/util/${f}`));
            bot.commands.set(cmds.config.command, cmds);
        });
    });

    fs.readdir(path.resolve('commands/info'), (err, files) => {
        if (err) console.error(err);
        var jsfiles = files.filter(f => f.split('.').pop() === "js");

        jsfiles.forEach((f, i) => {
            delete require.cache[require.resolve(path.resolve(`commands/info/${f}`))];
            var cmds = require(path.resolve(`commands/info/${f}`));
            bot.commands.set(cmds.config.command, cmds);
        });
    });

    fs.readdir(path.resolve('commands/economia'), (err, files) => {
        if (err) console.error(err);
        var jsfiles = files.filter(f => f.split('.').pop() === "js");

        jsfiles.forEach((f, i) => {
            delete require.cache[require.resolve(path.resolve(`commands/economia/${f}`))];
            var cmds = require(path.resolve(`commands/economia/${f}`));
            bot.commands.set(cmds.config.command, cmds);
        });
    });
    
    fs.readdir(path.resolve('commands/image'), (err, files) => {
        if (err) console.error(err);
        var jsfiles = files.filter(f => f.split('.').pop() === "js");

        jsfiles.forEach((f, i) => {
            delete require.cache[require.resolve(path.resolve(`commands/image/${f}`))];
            var cmds = require(path.resolve(`commands/image/${f}`));
            bot.commands.set(cmds.config.command, cmds);
        });
    });
}
