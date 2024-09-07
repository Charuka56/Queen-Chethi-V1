const { cmd } = require('../command');
const axios = require('axios');

//_____________

//🌤️--------WEATHER-INFO-------🌤️//

cmd({
    pattern: "weather",
    desc: "Get weather information",
    category: "information",
    filename: __filename
},
async (conn, mek, m, {
    from, quoted, q, reply
}) => {
    try {
        if (!q) return reply("Please provide a valid city name... 🌆");

        // React with 🌤️ when the command is triggered
        await conn.sendMessage(from, {
            react: { text: "🌤️", key: mek.key }
        });

        // Fetch weather data using an API (e.g., OpenWeatherMap)
        const apiKey = "YOUR_OPENWEATHERMAP_API_KEY"; // Replace with your API key
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${q}&appid=${apiKey}&units=metric`;

        const response = await axios.get(weatherUrl);
        const weatherData = response.data;

        if (!weatherData || !weatherData.main) {
            return reply("Failed to retrieve weather information. Please check the city name.");
        }

        // Construct the weather information message
        let weatherInfo = `
🌤️ 𝗤𝗨𝗘𝗘𝗡 𝗖𝗛𝗘𝗧𝗛𝗜 𝗪𝗘𝗔𝗧𝗛𝗘𝗥 𝗜𝗡𝗙𝗢 🌤️

*CITY* 🏙️: ${weatherData.name}

*WEATHER* 🌈: ${weatherData.weather[0].description}

*TEMPERATURE* 🌡️: ${weatherData.main.temp}°C

*HUMIDITY* 💧: ${weatherData.main.humidity}%

*WIND SPEED* 🌬️: ${weatherData.wind.speed} m/s

*ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴄʜᴀʀᴜᴋᴀ ᴍᴀʜᴇꜱʜ*
        `;

        await conn.sendMessage(from, {
            text: weatherInfo
        }, { quoted: mek });
    } catch (e) {
        console.error("Error:", e);
        reply("An error occurred while processing your request. Please try again later.");
    }
});
