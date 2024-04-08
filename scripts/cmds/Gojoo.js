module.exports = {
  config: {
    name: "gojoo",
    version: "1.0",
    author: "GOJOXRIMON'",
    countDown: 5,
    role: 0,
    shortDescription: "no prefix",
    longDescription: "no prefix",
    category: "no prefix",
  },
  onStart: async function() {},
  onChat: async function({ event, message, getLang }) {
    if (event.body && event.body.toLowerCase() === "gojo") {
      return message.reply({
        body: "𝗛𝗲𝗿𝗲'𝘀 𝗺𝘆 𝗽𝗿𝗲𝗳𝗶𝘅:\n🌸 𝗻𝗶𝘀𝗵𝗶 𝗽𝗿𝗲𝗳𝗶𝘅 𝘀𝘆𝘀𝘁𝗲𝗺: /\n🌸𝗻𝗶𝘀𝗵𝗶 𝗽𝗿𝗲𝗳𝗶𝘅 𝗶𝗻 𝘆𝗼𝘂𝗿 𝗯𝗼𝘅: /",
        attachment: await global.utils.getStreamFromURL("https://i.imgur.com/PzkRrlw.gif")
      });
    }
  }
 }
