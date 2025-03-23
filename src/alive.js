
const util = require('util');
const fs = require('fs-extra');
const axios = require('axios');
const { adams } = require(__dirname + "/../Ibrahim/adams");
const os = require("os");
const moment = require("moment-timezone");
const s = require(__dirname + "/../config");

const AUDIO_URL = "https://storage.giftedtech.web.id/file/download/PP8Hj.mp3"; // Replace with your audio URL
const THUMBNAIL_URL = "https://storage.giftedtech.web.id/file/download/PP8Hj.mp3"; // Replace with your image URL
const SOURCE_URL = "https://whatsapp.com/channel/0029VafL5zUKbYMKza6vAv1V"; // Your source link

moment.tz.setDefault(`${s.TZ}`);

const getTimeAndDate = () => {
    return {
        time: moment().format('HH:mm:ss'),
        date: moment().format('DD/MM/YYYY')
    };
};

// Alive Command
adams({ nomCom: "alive", categorie: "General" }, async (dest, zk, commandeOptions) => {
    let { ms, nomAuteurMessage } = commandeOptions;
    const { time, date } = getTimeAndDate();

    const botName = "🤖 VIRUSI MBAYA MD 🤖";
    const status = "🔥 Bot Status: Online & Active";

    try {
        await zk.sendMessage(dest, { 
            audio: { url: AUDIO_URL }, 
            mimetype: 'audio/mp4', 
            ptt: true, 
            contextInfo: {
                externalAdReply: {
                    title: botName,
                    body: `${status}\n📅 Date: ${date}\n⏰ Time: ${time}\n🎭 Hello, ${nomAuteurMessage}!`,
                    thumbnailUrl: THUMBNAIL_URL,
                    sourceUrl: SOURCE_URL,
                    mediaType: 1,
                    renderLargerThumbnail: true 
                }
            }
        }, { quoted: ms });

    } catch (e) {
        console.log("❌ Alive Command Error: " + e);
        repondre("❌ Error: " + e);
    }
});

// Ping Command
adams({ nomCom: "ping", categorie: "General" }, async (dest, zk, commandeOptions) => {
    let { ms } = commandeOptions;
    const { time, date } = getTimeAndDate();
    const ping = Math.floor(Math.random() * 100) + 1; // Generate a random ping between 1ms - 100ms

    try {
        await zk.sendMessage(dest, { 
            text: `🦠 *Ping:* ${ping}ms\n📅 *Date:* ${date}\n⏰ *Time:* ${time}`, 
            contextInfo: { forwardingScore: 999, isForwarded: true }
        }, { quoted: ms });

    } catch (e) {
        console.log("❌ Ping Command Error: " + e);
        repondre("❌ Error: " + e);
    }
});

// Support Command
adams({ nomCom: "support1", categorie: "General" }, async (dest, zk, commandeOptions) => {
    let { ms } = commandeOptions;
    const { time, date } = getTimeAndDate();

    try {
        await zk.sendMessage(dest, { 
            text: `🔗 *Support Channel:*\n${SOURCE_URL}\n📅 *Date:* ${date}\n⏰ *Time:* ${time}`, 
            contextInfo: { forwardingScore: 999, isForwarded: true }
        }, { quoted: ms });

    } catch (e) {
        console.log("❌ Support Command Error: " + e);
        repondre("❌ Error: " + e);
    }
});

// Time Command
adams({ nomCom: "time", categorie: "General" }, async (dest, zk, commandeOptions) => {
    let { ms } = commandeOptions;
    const { time, date } = getTimeAndDate();

    try {
        await zk.sendMessage(dest, { 
            text: `📅 *Date:* ${date}\n⏰ *Time:* ${time}`, 
            contextInfo: { forwardingScore: 999, isForwarded: true }
        }, { quoted: ms });

    } catch (e) {
        console.log("❌ Time Command Error: " + e);
        repondre("❌ Error: " + e);
    }
});
