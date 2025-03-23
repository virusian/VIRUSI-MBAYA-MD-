const { adams } = require("../Ibrahim/adams");
const moment = require("moment-timezone");
const { getBuffer } = require("../Ibrahim/dl/Function");
const { default: axios } = require('axios');
const speed = require("performance-now");

// Function to simulate delay for loading
function delay(ms) {
  console.log(`⏱️ delay for ${ms}ms`);
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Loading animation
async function loading(dest, zk) {
  var lod = [
    "《 █▒▒▒▒▒▒▒▒▒▒▒》10%",
    "《 ████▒▒▒▒▒▒▒▒》30%",
    "《 ███████▒▒▒▒▒》50%",
    "《 ██████████▒▒》80%",
    "《 ████████████》100%",
    "Loading pong 🦠"
  ];
  let { key } = await zk.sendMessage(dest, {text: 'Loading Please Wait'});

  for (let i = 0; i < lod.length; i++) {
    await zk.sendMessage(dest, {text: lod[i], edit: key });
    await delay(500); // Simulate delay between loading steps
  }
}

// Function to handle reaction
function react(dest, zk, msg, reaction) {
  zk.sendMessage(dest, {react: {text : reaction, key: msg.key}});
}

// Command: Ping
adams({
    nomCom: 'ping2',
    desc: 'To check ping',
    Categorie: 'General',
    reaction: '🦠', 
    fromMe: 'true',
  },
  async (dest, zk, commandeOptions) => {
    const { ms, arg, repondre } = commandeOptions;

    // Call the loading animation before responding
    await loading(dest, zk);

    const timestamp = speed();
    const flashspeed = (speed() - timestamp).toFixed(4);
    await repondre(`*Virusi▰▰▰▰▰ ${flashspeed} MS*`);
  }
);

// Command: Uptime
adams({
    nomCom: 'uptime',
    desc: 'To check runtime',    
    Categorie: 'General',
    reaction: '🪀', 
    fromMe: 'true',
  },
  async (dest, zk, commandeOptions) => {
    const { ms, arg, repondre } = commandeOptions;
    await repondre(`*Virusi Uptime : ${runtime(process.uptime())}_*`);
  }
);

// Command: Screenshot Website
adams({
    nomCom: 'ss',
    desc: 'screenshots website',
    Categorie: 'General',
    reaction: '📜', 
    fromMe: 'true', 
  },
  async (dest, zk, commandeOptions) => {
    const { ms, arg, repondre } = commandeOptions;
    if (!arg || arg.length === 0) return repondre("provide a link...");

    const linkk = arg.join(' ');
    let linkkk = `https://api.maher-zubair.tech/misc/sstab?url=${linkk}&dimension=720x720`;
    let res = await getBuffer(linkkk);
    let caption = '*Virusi Md*'; 
    await zk.sendMessage(dest, { image: res }, { caption: caption }, { quoted: ms });
  }
);
