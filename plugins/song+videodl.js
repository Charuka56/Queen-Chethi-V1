const { cmd } = require('../command');
const fg = require('api-dylux');
const yts = require('yt-search');

//_____________

//🎧--------AUDIO-DOWNLOAD-------🎧//

cmd({
    pattern: "song",
    desc: "Download songs",
    category: "download",
    filename: __filename
},
async (conn, mek, m, {
    from, quoted, q, reply
}) => {
    try {
        if (!q) return reply("Please provide a valid URL or song name... 🙋‍♂️");

        // React with 🎧 when the command is triggered
        await conn.sendMessage(from, {
            react: { text: "🎧", key: mek.key }
        });

        const search = await yts(q);
        if (!search || !search.videos || !search.videos.length) {
            return reply("No results found for the given query.");
        }

        const data = search.videos[0];
        const url = data.url;

        let desc = `
🎧𝗤𝗨𝗘𝗘𝗡 𝗖𝗛𝗘𝗧𝗛𝗜 𝗬𝗧 𝗠𝗨𝗦𝗜𝗖 𝗗𝗢𝗪𝗡𝗟𝗢𝗔𝗗𝗘𝗥🎧

*TITLE* 🔍: ${data.title}

*DESCRIPTION* 🗒️: ${data.description}

*TIME* ⌛: ${data.timestamp}

*AGO* ☄️: ${data.ago}

*VIEWS* 📽️: ${data.views}

*ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴄʜᴀʀᴜᴋᴀ ᴍᴀʜᴇꜱʜ*
        `;

        await conn.sendMessage(from, {
            image: { url: data.thumbnail },
            caption: desc
        }, { quoted: mek });

        // Download Audio
        let downAudio = await fg.yta(url);
        if (!downAudio || !downAudio.dl_url) {
            return reply("Failed to download audio. Please try again later.");
        }
        let downloadAudioUrl = downAudio.dl_url;

        // Send Audio File
        await conn.sendMessage(from, {
            audio: { url: downloadAudioUrl },
            mimetype: "audio/mpeg"
        }, { quoted: mek });
    } catch (e) {
        console.error("Error:", e);
        reply("An error occurred while processing your request. Please try again later.");
    }
});



cmd({
    pattern: "ytmp3",
    desc: "Download songs",
    category: "download",
    filename: __filename
},
async (conn, mek, m, {
    from, quoted, q, reply
}) => {
    try {
        if (!q) return reply("Please provide a valid URL or song name... 🙋‍♂️");

        // React with 🎧 when the command is triggered
        await conn.sendMessage(from, {
            react: { text: "🎧", key: mek.key }
        });

        const search = await yts(q);
        if (!search || !search.videos || !search.videos.length) {
            return reply("No results found for the given query.");
        }

        const data = search.videos[0];
        const url = data.url;

        let desc = `
🎧𝗤𝗨𝗘𝗘𝗡 𝗖𝗛𝗘𝗧𝗛𝗜 𝗬𝗧 𝗠𝗨𝗦𝗜𝗖 𝗗𝗢𝗪𝗡𝗟𝗢𝗔𝗗𝗘𝗥🎧

*TITLE* 🔍: ${data.title}

*DESCRIPTION* 🗒️: ${data.description}

*TIME* ⌛: ${data.timestamp}

*AGO* ☄️: ${data.ago}

*VIEWS* 📽️: ${data.views}

*ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴄʜᴀʀᴜᴋᴀ ᴍᴀʜᴇꜱʜ*
        `;

        await conn.sendMessage(from, {
            image: { url: data.thumbnail },
            caption: desc
        }, { quoted: mek });

        // Download Audio
        let downAudio = await fg.yta(url);
        if (!downAudio || !downAudio.dl_url) {
            return reply("Failed to download audio. Please try again later.");
        }
        let downloadAudioUrl = downAudio.dl_url;

        // Send Audio File
        await conn.sendMessage(from, {
            audio: { url: downloadAudioUrl },
            mimetype: "audio/mpeg"
        }, { quoted: mek });
    } catch (e) {
        console.error("Error:", e);
        reply("An error occurred while processing your request. Please try again later.");
    }
});




//🎧--------VIDEO-DOWNLOAD-------//





cmd({
    pattern: "video",
    desc: "Download videoes",
    category: "download",
    filename: __filename
},
async (conn, mek, m, {
    from, quoted, q, reply
}) => {
    try {
        if (!q) return reply("Please provide a valid URL or song name... 🙋‍♂️");

        // React with 🎥 when the command is triggered
        await conn.sendMessage(from, {
            react: { text: "🎥", key: mek.key }
        });

        const search = await yts(q);
        if (!search || !search.videos || !search.videos.length) {
            return reply("No results found for the given query.");
        }

        const data = search.videos[0];
        const url = data.url;

        let desc = `
🎥𝗤𝗨𝗘𝗘𝗡 𝗖𝗛𝗘𝗧𝗛𝗜 𝗬𝗧 𝗩𝗜𝗗𝗘𝗢 𝗗𝗢𝗪𝗡𝗟𝗢𝗔𝗗𝗘𝗥🎥

*TITLE* 🔍: ${data.title}

*DESCRIPTION* 🗒️: ${data.description}

*TIME* ⌛: ${data.timestamp}

*AGO* ☄️: ${data.ago}

*VIEWS* 📽️: ${data.views}

*ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴄʜᴀʀᴜᴋᴀ ᴍᴀʜᴇꜱʜ*
        `;

        await conn.sendMessage(from, {
            image: { url: data.thumbnail },
            caption: desc
        }, { quoted: mek });
// Download Video
        let downVideo = await fg.ytv(url);
        if (!downVideo || !downVideo.dl_url) {
            return reply("Failed to download video. Please try again later.");
        }
        let downloadVideoUrl = downVideo.dl_url;

        // Send Video File
        await conn.sendMessage(from, {
            video: { url: downloadVideoUrl },
            mimetype: "video/mp4",
            caption: `${data.title} - Video`
        }, { quoted: mek });
    } catch (e) {
        console.error("Error:", e);
        reply("An error occurred while processing your request. Please try again later.");
    }
});




cmd({
    pattern: "ytmp4",
    desc: "Download videoes",
    category: "download",
    filename: __filename
},
async (conn, mek, m, {
    from, quoted, q, reply
}) => {
    try {
        if (!q) return reply("Please provide a valid URL or song name... 🙋‍♂️");

        // React with 🎥 when the command is triggered
        await conn.sendMessage(from, {
            react: { text: "🎥", key: mek.key }
        });

        const search = await yts(q);
        if (!search || !search.videos || !search.videos.length) {
            return reply("No results found for the given query.");
        }

        const data = search.videos[0];
        const url = data.url;

        let desc = `
🎥𝗤𝗨𝗘𝗘𝗡 𝗖𝗛𝗘𝗧𝗛𝗜 𝗬𝗧 𝗩𝗜𝗗𝗘𝗢 𝗗𝗢𝗪𝗡𝗟𝗢𝗔𝗗𝗘𝗥🎥

*TITLE* 🔍: ${data.title}

*DESCRIPTION* 🗒️: ${data.description}

*TIME* ⌛: ${data.timestamp}

*AGO* ☄️: ${data.ago}

*VIEWS* 📽️: ${data.views}

*ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴄʜᴀʀᴜᴋᴀ ᴍᴀʜᴇꜱʜ*
        `;

        await conn.sendMessage(from, {
            image: { url: data.thumbnail },
            caption: desc
        }, { quoted: mek });
// Download Video
        let downVideo = await fg.ytv(url);
        if (!downVideo || !downVideo.dl_url) {
            return reply("Failed to download video. Please try again later.");
        }
        let downloadVideoUrl = downVideo.dl_url;

        // Send Video File
        await conn.sendMessage(from, {
            video: { url: downloadVideoUrl },
            mimetype: "video/mp4",
            caption: `${data.title} - Video`
        }, { quoted: mek });
    } catch (e) {
        console.error("Error:", e);
        reply("An error occurred while processing your request. Please try again later.");
    }
});
