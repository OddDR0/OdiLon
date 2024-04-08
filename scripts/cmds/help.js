
const fs = require("fs-extra");
const axios = require("axios");
const path = require("path");
const { getPrefix } = global.utils;
const { commands, aliases } = global.GoatBot;
const doNotDelete = " 𝙉𝙄𝙎𝙃𝙄𝙈𝙄𝙔𝘼 𓃝";

module.exports = {
    config: {
        name: "help",
        version: "1.0",
        author: "gojo || kshitiz",
        countDown: 5,
        role: 0,
        shortDescription: {
            en: "List all available commands",
        },
        longDescription: {
            en: "View a comprehensive list of all available commands",
        },
        category: "info",
        guide: {
            en: "{pn} / help",
        },
        priority: 1,
    },

    onStart: async function ({ message, args, event, threadsData, role }) {
        const { threadID } = event;
        const threadData = await threadsData.get(threadID);
        const prefix = getPrefix(threadID);
        
        if (args.length === 0) {
            await message.reply(`Please specify a category. For example: 
${prefix}help a (for a specific category),

${prefix}help all (to see all the commands),

${prefix}helpx cmd name (to see cmd usage and information).`);
            return;
        }

        const category = args[0].toUpperCase(); // Convert category to uppercase for consistency
        if (category === 'ALL') {
            await this.listAllCommands(message);
        } else if (category >= 'A' && category <= 'Z') {
            await this.listCommandsStartingWith(category, message);
        } else {
            const commandName = args[0].toLowerCase();
            const commandInfo = await this.getCommandInfo(commandName);

            if (commandInfo) {
                const response = `╭── NAME ────⭓\n│ ${commandInfo.name}\n├── INFO\n│ Description: ${commandInfo.details}\n│ Other names: ${commandInfo.aliases}\n│ Other names in your group: ${commandInfo.groupAliases}\n│ Version: ${commandInfo.version}\n│ Role: ${commandInfo.role}\n│ Time per command: ${commandInfo.countDown}s\n│ Author: ${commandInfo.author}\n├── Usage\n${commandInfo.usage}\n├── Notes\n│ The content inside <XXXXX> can be changed\n│ The content inside [a|b|c] is a or b or c\n╰──────⭔`;
                await message.reply(response);
            } else {
                await message.reply(`The command "${commandName}" does not exist.`);
            }
        }
    },

    listCommandsStartingWith: async function (category, message) {
        const allCommands = Array.from(commands.entries()).sort();
        let formattedResponse = "";

        for (const [command, config] of allCommands) {
            const firstLetter = command.charAt(0).toUpperCase();
            if (firstLetter === category) {
                formattedResponse += `✧${command} `;
            }
        }
        
        if (formattedResponse === "") {
            await message.reply(`No commands found for category ${category}.`);
            return;
        }

        formattedResponse = `╭──『  ${category} 』\n${formattedResponse}\n╰───────────◊`;

        await message.reply(formattedResponse);
    },

    listAllCommands: async function (message) {
        const allCommands = Array.from(commands.keys()).sort();
        let formattedResponse = "";

        formattedResponse += `╭──『  𝗕𝗢𝗧𝗡𝗔𝗠𝗘 』\n`;
        formattedResponse += `✧ ${boldText("NIŞHİMİYA")} \n`;
        formattedResponse += `╰───────────◊\n\n`;

        let currentLetter = '';
        for (const command of allCommands) {
            const firstLetter = command.charAt(0).toUpperCase();
            if (firstLetter !== currentLetter) {
                if (currentLetter !== '') {
                    formattedResponse += `╰───────────◊\n\n`;
                }
                currentLetter = firstLetter;
                formattedResponse += `╭──『  ${firstLetter} cmds 』\n`;
            }
            formattedResponse += `✧${command} `;
        }

        formattedResponse += `╰───────────◊\n\n`;
        formattedResponse += `├───────⭔\n » Currently, the bot has (${commands.size}) commands that can be used\n${doNotDelete} <<<<<\n───────────────⭓`;

        await message.reply(formattedResponse);
    },

    getCommandInfo: async function (commandName) {
        const command = commands.get(commandName);
        
        if (command) {
            const { config } = command;
            return {
                name: config.name,
                version: config.version,
                author: config.author || "Unknown",
                aliases: config.aliases.join(", ") || "None",
                groupAliases: config.groupAliases.join(", ") || "None",
                role: config.role,
                countDown: config.countDown || 1,
                usage: config.longDescription.en || "No usage information available",
                details: config.longDescription.en || "No details available"
            };
        } else {
            return null;
        }
    }
};

function boldText(text) {
    return `𝙉𝙄𝙎𝙃𝙄𝙈𝙄𝙔𝘼 𓃝`;
}
