const util = require('util');
const fs = require('fs-extra');
const axios = require('axios');
const { adams } = require(__dirname + "/../Ibrahim/adams");
const { format } = require(__dirname + "/../Ibrahim/mesfonctions");
const os = require("os");
const moment = require("moment-timezone");
const s = require(__dirname + "/../config");

const more = String.fromCharCode(8206);
const readmore = more.repeat(4001);

// Function to fetch GitHub repo data
const fetchGitHubStats = async () => {
    try {
        const repo = 'virusdevs/VIRUSI-MBAYA-MDV2';
        const response = await axios.get(`https://api.github.com/repos/${repo}`);

        return {
            name: response.data.name,
            owner: response.data.owner.login,
            description: response.data.description || "No description available",
            stars: response.data.stargazers_count,
            forks: response.data.forks_count,
            watchers: response.data.watchers_count,
            openIssues: response.data.open_issues_count,
            language: response.data.language || "Unknown",
            repoUrl: response.data.html_url,
            createdAt: moment(response.data.created_at).format('DD/MM/YYYY'),
            updatedAt: moment(response.data.updated_at).format('DD/MM/YYYY')
        };
    } catch (error) {
        console.error("Error fetching GitHub stats:", error);
        return null;
    }
};

adams({ nomCom: "repo", categorie: "General" }, async (dest, zk, commandeOptions) => {
    let { ms, repondre, prefixe, nomAuteurMessage } = commandeOptions;
    let { cm } = require(__dirname + "/../Ibrahim/adams");
    var coms = {};
    var mode = s.MODE.toLowerCase() === "public" ? "🌍 Public" : "🔒 Private";

    cm.map((com) => {
        const categoryUpper = com.categorie.toUpperCase();
        if (!coms[categoryUpper]) coms[categoryUpper] = [];
        coms[categoryUpper].push(com.nomCom);
    });

    moment.tz.setDefault(`${s.TZ}`);
    const temps = moment().format('HH:mm:ss');
    const date = moment().format('DD/MM/YYYY');
    const hour = moment().hour();

    let greeting = "🌙 Good Night";
    if (hour >= 0 && hour <= 11) greeting = "🌅 Good Morning";
    else if (hour >= 12 && hour <= 16) greeting = "☀️ Good Afternoon";
    else if (hour >= 16 && hour <= 21) greeting = "🌆 Good Evening";

    const repoData = await fetchGitHubStats();
    if (!repoData) {
        return repondre("❌ Error fetching repository data.");
    }

    let repoInfo = `
╭─────◆◇◆────◆
📦 *GitHub Repository Info* 📦
╰─────◆◇◆────◆

🔹 *Name:* ${repoData.name}
👤 *Owner:* ${repoData.owner}
📄 *Description:* ${repoData.description}

⭐ *Stars:* ${repoData.stars}
🍴 *Forks:* ${repoData.forks}
👀 *Watchers:* ${repoData.watchers}
🐞 *Open Issues:* ${repoData.openIssues}

🛠 *Main Language:* ${repoData.language}
📅 *Created On:* ${repoData.createdAt}
🔄 *Last Updated:* ${repoData.updatedAt}

🔗 *Repo Link:* ${repoData.repoUrl}
`;

    let menuMsg = `${readmore}  
╭🦠 *VIRUSI MBAYA MENU* 🦠╮\n\n`;

    const sortedCategories = Object.keys(coms).sort();
    sortedCategories.forEach((cat) => {
        menuMsg += `🎭 *${cat}* 🎭\n╭─────◆◇◆─────╮`;
        coms[cat].forEach((cmd) => {
            menuMsg += `\n│ 🔹 *${cmd}*`;
        });
        menuMsg += `\n╰─────◆◇◆─────╯\n\n`;
    });

    menuMsg += `
⚡──────────⚡
*© VIRUSI🦠MBAYA MD*
⚡──────────⚡`;

    try {
        // Send image with full caption (repoInfo + menuMsg)
        await zk.sendMessage(dest, { 
            image: { url: "https://files.catbox.moe/8wl1l2.jpg" },
            caption: repoInfo + menuMsg,
            contextInfo: { forwardingScore: 999, isForwarded: true }
        }, { quoted: ms });

        // Send audio with caption
        await zk.sendMessage(dest, { 
            audio: { 
                url: "https://files.catbox.moe/5x9pup.m4a"
            }, 
            mimetype: 'audio/mp4', 
            ptt: true,
            caption: "🎶 BMW MD SONG 🎶",
            contextInfo: { forwardingScore: 999, isForwarded: true }
        }, { quoted: ms });

    } catch (e) {
        console.log("❌ Menu Error: " + e);
        repondre("❌ Menu Error: " + e);
    }
});
