const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");
const KievRPSSecAuth = "FABiBBRaTOJILtFsMkpLVWSG6AN6C/svRwNmAAAEgAAACPQp6B+mSAsYIAStFYHEiX/lHsQ7qu0FozlPJITtARoNEIZqibVQ0YTjOJHmpZE9D8Cr326fUm2TxORku6SYjfqo/JRp01TE26PvUY8yhAo+qwJf/lS/1JazKR+TfaNPo4KUKKDCDIwqtOncQP1R7b3DSkngpoDKrdLBqvY+0XeLAOIu9tOfWLR1PqiXmLXV/wOjr0Dbs6UU0GHfp6dFxB7g5xwVN550uXH36hGj+VuodnimMA4VKnmdtXu72Ag//KFFXtW2+XS3FcOAK1kezUK5kSJBScDyI3kJUFz3ryLIy3g9HnaXJBFp+Ab8p1pIbzLOzW7xZx6V9Px3PkjUEAVN/DGxD4B1ywU6VZodh7ejgDNooU+Sc2ia30r3YWPtDn59C7wnk7Y11Yq+yV0d8073YUxK6+x5jbKfNCvb4S5rQojk15ueTNs3mtDTf5B3rddlb0AjOqBBKaa7laegxy/HWRpvpgY4MCFYBNM+ap7hVw1fQoVgtZD8QKp5Wx4RgxVW9BxBuY8OnBSypMmfALnKwO9B0LAOSxj/TSZRvWC2WLlG+YiZ/4hr+geSICthvE6tx5ChoBAUUZ9F7HVtAGluPRYzfgzAS7UCfEVa7TbaZi6ThCllbinFA553zPJ5ibxAmcDodL8d4G7m6m+qChwqwaCXjxfChYw7YOdMt4RLM7WT/9hne9EShCYtwtSct59NfMsqMFLCirAPTCfdcMpalbH93geXYAjs+7637ugZYJWju4b6Zug9jqWypPyNz+EU7Zt0HLhoEZmXnfhOJvyEyL+sFnqgMFmRbaqFfY8e9nr1+3aHwylfMShsvA5vfTiAed5LuJmMfL4BgtS4Lp4AkH0AYz9TkWEw96jtoXDni891tysmscqcXG0NNUPcRQMvOX5uf2DiICvW9Ychi+Altb4GqicTBf0UIRWLokeGKBniaqmrnAUKeMKr5dsNbRKm/IxNNJOJDV/ZxCPynI51V66BVnwDw7K5Cj4TirRzS6xN+Sr7PZ8hpiPzbcOTyDtNoyHAIAmOjPCNTvi+dOACABl00yDZ08U+dUVSXP1bb15AEblGd2ZD2cx8k7Jx22sYdG9jbnZ8I3zWyhH0BlQ+pWC/4YpPJX27h828gUBy6CQ8j44T+B27IrVgbERo81342muEpharWWTDpXCwCVb2tEImCzzOayJHDTDRj3LDVqxvX8IKQ7RGne9+VVOTo5x3Y6UtnLcZZlkePy9YKjPlUDrITef+nr9svNX52Y4ovGrmcvm24AGLFuruV1KSYCIGgdxH0x/E+99A/7Uuz+aPIPY6reNW+XZ3z+I/mmAH3uLWkGikmaqx2nTM2FG4lNlR4tVv7qROxDBEPW6+lXq4ZJ1Mf+/zUpAko6JhVzIWQnuE+gw9wemKqKXoxI44/CxLsBFhddXmyQoUAIyzj0SHjdxyVl774I4Oiqc3hK56";
const _U = "1xaFH7Riv_V-DMIwjyrp-BHjomlpdZT7lWQ09tKW55g93Z3vgNIA2KXvoOisl6RHz9NbGLwLNiOE-1DP0SbEY6sSW_KWvsa1Q5hmI4uCKZSrkDy7A_Chs6JS1_b5WavILC0GfAhwIVrOPoN361ZiFFCHMH3VNKJbOAr3pbpaG8rftswpAS4UI9FbVjQfx7js_PorjiH2pbXHzBQ8eyor5qg";

module.exports = {
  config: {
    name: "dallex",
    version: "1.0.2",
    author: "Samir Œ ",
    role: 0,
    countDown: 5,
    shortDescription: { en: "dalle3 image generator" },
    longDescription: { en: "dalle3 is a image generator powdered by OpenAi" },
    category: "𝗔𝗜",
    guide: { en: "{prefix}dalle <search query>" }
  },

  onStart: async function ({ api, event, args }) {
    const prompt = args.join(" ");

    try {
      const res = await axios.get(`https://apis-dalle-gen.onrender.com/dalle3?auth_cookie_U=${_U}&auth_cookie_KievRPSSecAuth=${KievRPSSecAuth}&prompt=${encodeURIComponent(prompt)}`);
      const data = res.data.results.images;

      if (!data || data.length === 0) {
        api.sendMessage("response received but imgurl are missing ", event.threadID, event.messageID);
        return;
      }

      const imgData = [];

      for (let i = 0; i < Math.min(4, data.length); i++) {
        const imgResponse = await axios.get(data[i].url, { responseType: 'arraybuffer' });
        const imgPath = path.join(__dirname, 'cache', `${i + 1}.jpg`);
        await fs.outputFile(imgPath, imgResponse.data);
        imgData.push(fs.createReadStream(imgPath));
      }

      await api.sendMessage({
        attachment: imgData,
        body: `Here's your generated image`
      }, event.threadID, event.messageID);

    } catch (error) {
      api.sendMessage("Can't Full Fill this request ", event.threadID, event.messageID);
    }
  }
};
