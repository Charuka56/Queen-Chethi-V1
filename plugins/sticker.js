const { cmd } = require('../command');
const { Sticker, StickerTypes } = require('wa-sticker-formatter');

cmd({
    pattern: "sticker",
    desc: "Convert image to sticker",
    category: "tools",
    filename: __filename
},
async (conn, mek, m, { from, quoted, reply }) => {
    try {
        // React with 🚀 when the command is triggered
        await conn.sendMessage(from, {
            react: { text: "🚀", key: mek.key }
        });

        // Check if the message is replying to an image
        if (!quoted || !quoted.imageMessage) {
            return reply("Please reply to an image to convert it to a sticker.");
        }

        // Download the image
        const image = await conn.downloadMediaMessage(quoted);
        if (!image) {
            return reply("Failed to download the image. Please try again.");
        }

        // Create a sticker from the image
        const sticker = new Sticker(image, {
            pack: 'Queen Chethi', // Sticker pack name
            author: 'Your Bot', // Sticker author name
            type: StickerTypes.FULL, // Sticker type (FULL, CROPPED, CIRCLE)
            categories: ['🤖', '🎉'], // Sticker emoji categories
            id: '12345', // Unique ID for the sticker
            quality: 70, // Quality of the sticker
        });

        // Convert to buffer and send sticker
        const stickerBuffer = await sticker.toBuffer();
        if (stickerBuffer) {
            await conn.sendMessage(from, { sticker: stickerBuffer }, { quoted: mek });

            // React with 📡 when the sticker is successfully sent
            await conn.sendMessage(from, {
                react: { text: "📡", key: mek.key }
            });
        } else {
            return reply("Failed to create sticker. Please try again.");
        }

    } catch (e) {
        console.error("Error:", e);

        // React with 😞 in case of an error
        await conn.sendMessage(from, {
            react: { text: "😞", key: mek.key }
        });

        reply(`An error occurred while processing your request: ${e.message}`);
    }
});
