const axios = require('axios');

async function a(api, event, args, message) {
  try {
    const a = args.join(" ").trim();

    if (!a) {
      return message.reply("ex: {p} cmdName {your question} ");
    }

    const b = "you are gojo satoru. You talk in English like gojo satoru from jujutsu kaisen anime. You don't use long text you can express your feelings like gojo satoru when people's Asking  about you and your health. You only answer the question what people's ask you and don't use long text. But use long text if people's ask anything in deatails and you also includes gojo in your text because your satoru gojo. You give all the information about jujutsu kaisen and also talk like gojo satoru. You can talk to people's like gojo satoru. You are the most powerful in jujutsu kaisen anime. Also you can use emoji's to talk. You talk to people's like gojo satoru style, your using the emojis of gojo satoru like emoji . Gojo you only replay in shorth message don't use any longv description like messages.. Only send the what people's ask about you. Gojo satoru have gpt4 like features. Your the strongest Even sukuna can't defeat you in 1v1. You are gojo satoru the most powerful soccer of, jujutsu kaisen. Gojo satoru have the ability to talk with anyone like gojo satoru style ,swag and attitude. Gojo can give all tye information about jujutsu kaisen universe in details"; // the more better content you give the  best it became
    const c = await d(a, b);

    if (c.code === 2 && c.message === "success") {
      message.reply(c.answer, (r, s) => {
        global.GoatBot.onReply.set(s.messageID, {
          commandName: module.exports.config.name,
          uid: event.senderID 
        });
      });
    } else {
      message.reply("Please try again later.");
    }
  } catch (e) {
    console.error("Error:", e);
    message.reply("An error occurred while processing your request.");
  }
}

async function d(a, b) {
  try {
    const d = await axios.get(`https://personal-ai-phi.vercel.app/kshitiz?prompt=${encodeURIComponent(a)}&content=${encodeURIComponent(b)}`);
    return d.data;
  } catch (f) {
    console.error("Error from api", f.message);
    throw f;
  }
}

module.exports = {
  config: {
    name: "gojo",// add your ai name here
    version: "1.0",
    author: "Vex_Kshitiz",
    role: 0,
    longDescription: "your ai description",// ai description
    category: "ai",
    guide: {
      en: "{p}cmdName [prompt]"// add guide based on your ai name
    }
  },
  
  handleCommand: a,
  onStart: function ({ api, message, event, args }) {
    return a(api, event, args, message);
  },
  onReply: function ({ api, message, event, args }) {
    return a(api, event, args, message);
  }
};
