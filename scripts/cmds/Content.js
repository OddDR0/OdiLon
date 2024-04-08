const axios = require('axios');

module.exports = {
    config: {
        name: "content",
        aliases: ["cn"],
        version: "1.2",
        author: "Gojo",
        countDown: 10,
        role: 0,
        shortDescription: {
            en: "Get a random content."
        },
        longDescription: {
            en: "Get a random content from various categories such as life, motivation, discipline, joke, hardwork, programming, funny, Batman, rizz, and pickuplines."
        },
        category: "Get content from various categories",
        guide: {
            en: "{pn}\n{pn} life\n{pn} motivation\n{pn} discipline\n{pn} joke\n{pn} hardwork\n{pn} programming\n{pn} funny\n{pn} Batman\n{pn} rizz\n{pn} pickuplines"
        },
        contentCmd: "📜 Content 📜\n\n🫨 Here are all the available categories:\n\nlife, motivation, discipline, joke, hardwork, programming, funny, Batman, rizz, pickuplines"
    },

    onStart: async function ({ message, args, prefix }) {
        try {
            const validCategories = ['life', 'motivation', 'discipline', 'joke', 'hardwork', 'programming', 'funny', 'batman', 'rizz', 'pickuplines'];
            const contentCategory = args[0]?.toLowerCase();

            if (!contentCategory || !validCategories.includes(contentCategory)) {
                return message.reply(module.exports.config.contentCmd.replace(/{pn} /g, prefix));
            }

            const apiUrl = `https://gojo-xuo4.onrender.com/content?category=${contentCategory}`;
            const contentResponse = await axios.get(apiUrl);
            const contentData = contentResponse.data;

            if (contentData && typeof contentData === 'string') {
                message.reply(`🫨 Here's a random content from the category "${contentCategory}":\n\n${contentData}`);
            } else {
                if (contentData && contentData.content) {
                    message.reply(`🫨 Here's a random content from the category "${contentCategory}":\n\n${contentData.content}`);
                } else {
                    message.reply(`🤔 Unable to fetch content for the category "${contentCategory}" at the moment.`);
                }
            }
        } catch (error) {
            message.reply("❌ An error occurred while fetching the content. Please try again later.");
        }
    }
};
