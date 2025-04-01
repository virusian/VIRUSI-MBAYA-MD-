"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
  var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc); 
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const baileys_1 = __importStar(require("@whiskeysockets/baileys"));
const logger_1 = __importDefault(require("@whiskeysockets/baileys/lib/Utils/logger"));
const { isJidGroup } = require('@whiskeysockets/baileys');
const logger = logger_1.default.child({});
logger.level = 'silent';
const pino = require("pino");
const boom_1 = require("@hapi/boom");
const conf = require("./config");
const axios = require("axios");
const moment = require("moment-timezone");
let fs = require("fs-extra");
let path = require("path");
let botPassword = null;
const FileType = require('file-type');
const { Sticker, createSticker, StickerTypes } = require('wa-sticker-formatter');
//import chalk from 'chalk'
const { verifierEtatJid , recupererActionJid } = require("./lib/antilien");
let evt = require(__dirname + "/Ibrahim/adams");
const {isUserBanned , addUserToBanList , removeUserFromBanList} = require("./lib/banUser");
const  {addGroupToBanList,isGroupBanned,removeGroupFromBanList} = require("./lib/banGroup");
const {isGroupOnlyAdmin,addGroupToOnlyAdminList,removeGroupFromOnlyAdminList} = require("./lib/onlyAdmin");
//const //{loadCmd}=require("/framework/mesfonctions")
let { reagir } = require(__dirname + "/Ibrahim/app");
const prefixe = conf.PREFIXE;
const more = String.fromCharCode(8206)
const BaseUrl = process.env.GITHUB_GIT;
const adamsapikey = process.env.BOT_OWNER;
const BaseUrl1 = process.env.MADE_IN_KENYA;
const adamsapikey2 = process.env.BOT_NAME;
require('dotenv').config({ path: './config.env' });
const herokuAppName = process.env.HEROKU_APP_NAME || "Unknown App Name";
const herokuAppLink = process.env.HEROKU_APP_LINK || `https://dashboard.heroku.com/apps/${herokuAppName}`; 
const botOwner = process.env.NUMERO_OWNER || "Unknown Owner"; 
const express = require('express');
const { exec } = require('child_process');
const app = express();
const PORT = process.env.PORT || 3000;

// Enable garbage collection if available
if (global.gc) {
    setInterval(() => {
        global.gc();  // Helps free memory
        console.log("Garbage collection triggered.");
    }, 60000);  // Every 60 seconds
}

// Memory check to prevent overflow
setInterval(() => {
    const used = process.memoryUsage();
    const memoryLimit = 500 * 1024 * 1024; // Set limit to 500MB
    if (used.heapUsed > memoryLimit) {
        console.error(`Memory usage too high: ${used.heapUsed / 1024 / 1024} MB. Restarting...`);
        process.exit(1);  // Restart process
    }
}, 30000);  // Check every 30 seconds

// Prevent multiple listeners (memory leak)
process.setMaxListeners(15);

// Global error handling
process.on('uncaughtException', (err) => {
    console.error("Uncaught Exception:", err);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error("Unhandled Rejection at:", promise, "reason:", reason);
});

function atbverifierEtatJid(jid) {
    if (!jid.endsWith('@s.whatsapp.net')) {
        console.error(' successful verified:', jid);
        return false;
    }
    console.log('Verified by bwm xmd:', jid);
    return true;
}

function atbverifierEtatJid(jid) {
    if (!jid.endsWith('@s.whatsapp.net')) {
        console.error('Invalid JID format:', jid);
        return false;
    }
    console.log('JID verified:', jid);
    return true;
}


const zlib = require('zlib');

async function authentification() {
    try {
        if (!fs.existsSync(__dirname + "/Session/creds.json")) {
            console.log("Session connected...");
            // Split the session string into header and Base64 data
            const [header, b64data] = conf.session.split(';;;'); 

            // Validate the session format
            if (header === "VIRUSI-MBAYA" && b64data) {
                let compressedData = Buffer.from(b64data.replace('...', ''), 'base64'); // Decode and truncate
                let decompressedData = zlib.gunzipSync(compressedData); // Decompress session
                fs.writeFileSync(__dirname + "/Session/creds.json", decompressedData, "utf8"); // Save to file
            } else {
                throw new Error("Invalid session format");
            }
        } else if (fs.existsSync(__dirname + "/Session/creds.json") && conf.session !== "zokk") {
            console.log("Updating existing session...");
            const [header, b64data] = conf.session.split(';;;'); 

            if (header === "VIRUSI-MBAYA" && b64data) {
                let compressedData = Buffer.from(b64data.replace('...', ''), 'base64');
                let decompressedData = zlib.gunzipSync(compressedData);
                fs.writeFileSync(__dirname + "/Session/creds.json", decompressedData, "utf8");
            } else {
                throw new Error("Invalid session format");
            }
        }
    } catch (e) {
        console.log("Session Invalid: " + e.message);
        return;
    }
}
module.exports = { authentification };

authentification();
const store = (0, baileys_1.makeInMemoryStore)({
    logger: pino().child({ level: "silent", stream: "store" }),
});
setTimeout(() => {
authentification();
    async function main() {
        const { version, isLatest } = await (0, baileys_1.fetchLatestBaileysVersion)();
        const { state, saveCreds } = await (0, baileys_1.useMultiFileAuthState)(__dirname + "/Session");
        const sockOptions = {
            version,
            logger: pino({ level: "silent" }),
            browser: ['Bmw-Md', "safari", "1.0.0"],
            printQRInTerminal: true,
            fireInitQueries: false,
            shouldSyncHistoryMessage: true,
            downloadHistory: true,
            syncFullHistory: true,
            generateHighQualityLinkPreview: true,
            markOnlineOnConnect: false,
            keepAliveIntervalMs: 30_000,
            /* auth: state*/ auth: {
                creds: state.creds,
                /** caching makes the store faster to send/recv messages */
                keys: (0, baileys_1.makeCacheableSignalKeyStore)(state.keys, logger),
            },
            //////////
            getMessage: async (key) => {
                if (store) {
                    const msg = await store.loadMessage(key.remoteJid, key.id, undefined);
                    return msg.message || undefined;
                }
                return {
                    conversation: 'An Error Occurred, Repeat Command!'
                };
            }
                };


   const zk = (0, baileys_1.default)(sockOptions);
   store.bind(zk.ev);

zk.ev.on("messages.upsert", async (m) => {
    if (conf.ANTIDELETE1 === "yes") { // Ensure antidelete is enabled
        const { messages } = m;
        const ms = messages[0];
        if (!ms.message) return; // Skip messages with no content

        const messageKey = ms.key;
        const remoteJid = messageKey.remoteJid;

        // Initialize chat storage if it doesn't exist
        if (!store.chats[remoteJid]) {
            store.chats[remoteJid] = [];
        }

        // Save the received message to storage
        store.chats[remoteJid].push(ms);

        // Handle deleted messages
        if (ms.message.protocolMessage && ms.message.protocolMessage.type === 0) {
            const deletedKey = ms.message.protocolMessage.key;

            // Search for the deleted message in stored messages
            const chatMessages = store.chats[remoteJid];
            const deletedMessage = chatMessages.find(
                (msg) => msg.key.id === deletedKey.id
            );

            if (deletedMessage) {
                try {
                    const participant = deletedMessage.key.participant || deletedMessage.key.remoteJid;
                    const notification = `*🛑 This message was deleted by @${participant.split("@")[0]}*`;

                    const botOwnerJid = `${conf.NUMERO_OWNER}@s.whatsapp.net`; // Bot owner's JID

                    // Handle text messages
                    if (deletedMessage.message.conversation) {
                        await zk.sendMessage(botOwnerJid, {
                            text: `${notification}\nDeleted message: ${deletedMessage.message.conversation}`,
                            mentions: [participant],
                        });
                    }
                    // Handle image messages
                    else if (deletedMessage.message.imageMessage) {
                        const caption = deletedMessage.message.imageMessage.caption || '';
                        const imagePath = await zk.downloadAndSaveMediaMessage(deletedMessage.message.imageMessage);
                        await zk.sendMessage(botOwnerJid, {
                            image: { url: imagePath },
                            caption: `${notification}\n${caption}`,
                            mentions: [participant],
                        });
                    }
                    // Handle video messages
                    else if (deletedMessage.message.videoMessage) {
                        const caption = deletedMessage.message.videoMessage.caption || '';
                        const videoPath = await zk.downloadAndSaveMediaMessage(deletedMessage.message.videoMessage);
                        await zk.sendMessage(botOwnerJid, {
                            video: { url: videoPath },
                            caption: `${notification}\n${caption}`,
                            mentions: [participant],
                        });
                    }
                    // Handle audio messages
                    else if (deletedMessage.message.audioMessage) {
                        const audioPath = await zk.downloadAndSaveMediaMessage(deletedMessage.message.audioMessage);
                        await zk.sendMessage(botOwnerJid, {
                            audio: { url: audioPath },
                            ptt: true, // Send as a voice message
                            caption: notification,
                            mentions: [participant],
                        });
                    }
                    // Handle sticker messages
                    else if (deletedMessage.message.stickerMessage) {
                        const stickerPath = await zk.downloadAndSaveMediaMessage(deletedMessage.message.stickerMessage);
                        await zk.sendMessage(botOwnerJid, {
                            sticker: { url: stickerPath },
                            caption: notification,
                            mentions: [participant],
                        });
                    }
                } catch (error) {
                    console.error('Error handling deleted message:', error);
                }
            }
        }
    }
});

            
const isAnyLink = (message) => {
    // Regex pattern to detect any link
    const linkPattern = /https?:\/\/[^\s]+/;
    return linkPattern.test(message);
};

zk.ev.on('messages.upsert', async (msg) => {
    try {
        const { messages } = msg;
        const message = messages[0];

        if (!message.message) return; // Skip empty messages

        const from = message.key.remoteJid; // Chat ID
        const sender = message.key.participant || message.key.remoteJid; // Sender ID
        const isGroup = from.endsWith('@g.us'); // Check if the message is from a group

        if (!isGroup) return; // Skip non-group messages

        const groupMetadata = await zk.groupMetadata(from); // Fetch group metadata
        const groupAdmins = groupMetadata.participants
            .filter((member) => member.admin)
            .map((admin) => admin.id);

        // Check if ANTI-LINK is enabled for the group
        if (conf.ANTILINK_GROUP === 'yes') {
            const messageType = Object.keys(message.message)[0];
            const body =
                messageType === 'conversation'
                    ? message.message.conversation
                    : message.message[messageType]?.text || '';

            if (!body) return; // Skip if there's no text

            // Skip messages from admins
            if (groupAdmins.includes(sender)) return;

            // Check for any link
            if (isAnyLink(body)) {
                // Delete the message
                await zk.sendMessage(from, { delete: message.key });

                // Remove the sender from the group
                await zk.groupParticipantsUpdate(from, [sender], 'remove');

                // Send a notification to the group
                await zk.sendMessage(
                    from,
                    {
                        text: `Anti-link online!\n User @${sender.split('@')[0]} has been removed for sharing a link.`,
                        mentions: [sender],
                    }
                );
            }
        }
    } catch (err) {
        console.error('Error handling message:', err);
    }
});
        
const googleTTS = require('google-tts-api');
const ai = require('unlimited-ai');

zk.ev.on("messages.upsert", async (m) => {
  const { messages } = m;
  const ms = messages[0];

  if (!ms.message) return; // Skip messages without content

  const messageType = Object.keys(ms.message)[0];
  const remoteJid = ms.key.remoteJid;
  const messageContent = ms.message.conversation || ms.message.extendedTextMessage?.text;

  // Skip bot's own messages and bot-owner messages
  if (ms.key.fromMe || remoteJid === conf.NUMERO_OWNER + "@s.whatsapp.net") return;

  // Check if chatbot feature is enabled
  if (conf.CHATBOT1 !== "yes") return; // Exit if CHATBOT is not enabled

  if (messageType === "conversation" || messageType === "extendedTextMessage") {
    const alpha = messageContent.trim();

    if (!alpha) return;

    let conversationData = [];

    // Read previous conversation data
    try {
      const rawData = fs.readFileSync('store.json', 'utf8');
      if (rawData) {
        conversationData = JSON.parse(rawData);
        if (!Array.isArray(conversationData)) {
          conversationData = [];
        }
      }
    } catch (err) {
      console.log('No previous conversation found, starting new one.');
    }

    const model = 'gpt-4-turbo-2024-04-09';
    const userMessage = { role: 'user', content: alpha };  
    const systemMessage = { role: 'system', content: 'You are called VIRUSI 🦠 MBAYA. Developed by 𝗩𝗜𝗥𝗨𝗦𝗜 𝗠𝗕𝗔𝗬𝗔. You respond to user commands. Only mention developer name if someone asks.' };

    // Add user message and system message to the conversation
    conversationData.push(userMessage);
    conversationData.push(systemMessage);

    try {
      // Generate AI response
      const aiResponse = await ai.generate(model, conversationData);

      // Add AI response to the conversation
      conversationData.push({ role: 'assistant', content: aiResponse });

      // Save the updated conversation
      fs.writeFileSync('store.json', JSON.stringify(conversationData, null, 2));

      // Determine the language (English or Swahili)
      const language = alpha.includes("swahili") || aiResponse.includes("swahili") ? 'sw' : 'en';

      // Adjusting to better quality voice for both languages
      const audioUrl = googleTTS.getAudioUrl(aiResponse, {
        lang: language,
        slow: false,
        host: 'https://translate.google.com',
        // You can adjust the voice rate, pitch, and volume for better quality
        voice: language === 'sw' ? 'google_swahili_female' : 'google_en_us_female',
        pitch: 10.6,  // Adjust pitch for better clarity
        speed: 10.5   // Adjust speed for clearer pronunciation
      });

      // Send the audio response using zk.sendMessage
      await zk.sendMessage(remoteJid, { 
        audio: { url: audioUrl }, 
        mimetype: 'audio/mp4', 
        ptt: true 
      });
    } catch (error) {
      // Silent error handling, no response to the user
      console.error("Error with AI generation:", error);
    }
  }
});

       

zk.ev.on("messages.upsert", async (m) => {
  const { messages } = m;
  const ms = messages[0];

  if (!ms.message) return; // Skip messages without content

  const messageType = Object.keys(ms.message)[0];
  const remoteJid = ms.key.remoteJid;
  const messageContent = ms.message.conversation || ms.message.extendedTextMessage?.text;

  // Skip bot's own messages and bot-owner messages
  if (ms.key.fromMe || remoteJid === conf.NUMERO_OWNER + "@s.whatsapp.net") return;

  // Check if chatbot feature is enabled
  if (conf.CHATBOT !== "yes") return; // Exit if CHATBOT is not enabled

  if (messageType === "conversation" || messageType === "extendedTextMessage") {
    const alpha = messageContent.trim();

    if (!alpha) return;

    let conversationData = [];

    // Read previous conversation data
    try {
      const rawData = fs.readFileSync('store.json', 'utf8');
      if (rawData) {
        conversationData = JSON.parse(rawData);
        if (!Array.isArray(conversationData)) {
          conversationData = [];
        }
      }
    } catch (err) {
      console.log('No previous conversation found, starting new one.');
    }

    const model = 'gpt-4-turbo-2024-04-09';
    const userMessage = { role: 'user', content: alpha };  
    const systemMessage = { role: 'system', content: 'You are called Bwm xmd. Developed by Ibrahim Adams. You respond to user commands. Only mention developer name if someone asks.' };

    // Add user message and system message to the conversation
    conversationData.push(userMessage);
    conversationData.push(systemMessage);

    try {
      // Generate AI response
      const aiResponse = await ai.generate(model, conversationData);

      // Add AI response to the conversation
      conversationData.push({ role: 'assistant', content: aiResponse });

      // Save the updated conversation
      fs.writeFileSync('store.json', JSON.stringify(conversationData, null, 2));

      // Send the text response using zk.sendMessage
      await zk.sendMessage(remoteJid, { 
        text: aiResponse 
      });
    } catch (error) {
      // Silent error handling, no response to the user
      console.error("Error with AI generation:", error);
    }
  }
});

        
        function getCurrentDateTime() {
    const options = {
        timeZone: 'Africa/Nairobi', // Kenya time zone
        year: 'numeric',
        month: 'long', // Full month name
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false, // 24-hour format
    };
    return new Intl.DateTimeFormat('en-KE', options).format(new Date());
}

// List of mixed quotes: Kenyan and cool English ones
const quotes = [


"VIRUSI 🦠 MBAYA doesn’t follow trends – he codes the next big thing😂",
"With every project, VIRUSI 🦠 MBAYA proves that passion for coding can change the world",
"A true developer builds the future, and VIRUSI 🦠 MBAYA is doing just that, one line of code at a time.🎭😂",
"When VIRUSI 🦠 MBAYA codes, he doesn’t just solve problems – he invents solutions ➖😂",
"Coding isn’t just a job for VIRUSI 🦠 MBAYA, it’s a passion that fuels innovation😆",
"Every algorithm VIRUSI 🦠 MBAYA writes is a step toward making the world a smarter",
"A developer's journey is never easy, but VIRUSI 🦠 MBAYA makes it look effortless",
"To develop is to dream in bytes, and VIRUSI 🦠 MBAYA is a dreamer who never stops coding",
"𝗩𝗜𝗥𝗨𝗦𝗜-𝗠𝗕𝗔𝗬𝗔- 𝗨𝗞𝗢𝗥𝗔 𝗔𝗞𝗜𝗟𝗜 𝗡𝗔 𝗞𝗜𝗕𝗨𝗥𝗜 𝗠𝗜𝗡𝗚𝗜...🦠🦠",
"Behind every line of code, there’s a vision, and VIRUSI 🦠 MBAYA sees the future😋",
"VIRUSI 🦠 MBAYA doesn’t just code; he creates digital masterpieces",
"All Days are the same only The alternation of events✍️🔋",
"Don't Date and Cheat, instead Stay single And F**k to your satisfaction the machine is yours 🦠😂😂🍸",
"Alone,But never Behind.The Game is still on...Revenge comes when they least expect it-STÃÏÑÊR Ç😜",
"Simping is like feeding a stray cat—it stays as long as you give, but once you're empty, it’s gone👌-STÃÏÑÊR Ç😜",
"Revenge is making sure they regret ever leaving-STÃÏÑÊR Ç😜",
];

// Function to get a random quote
function getRandomQuote() {
    return quotes[Math.floor(Math.random() * quotes.length)];
}

// Function to generate a dynamic bio
function generateBio(nomAuteurMessage = "User") {
    const currentDateTime = getCurrentDateTime(); // Get the current date and time
    const quote = getRandomQuote(); // Get a random quote
    return `👋ʜᴇʏ,  ${nomAuteurMessage} VIRUSI-MBAYA-MD ɪs Running 24/6  🚀,\n📅 ${currentDateTime}\n💬 "${quote}"`;
}

// Auto Bio Update Interval
setInterval(async () => {
    if (conf.AUTO_BIO === "yes") {
        // Replace "User" dynamically if you can fetch an author/message participant
        const nomAuteurMessage = "🚀"; // Replace with logic to fetch the participant's name or ID
        const bioText = generateBio(nomAuteurMessage); // Generate the advanced bio text
        await zk.updateProfileStatus(bioText); // Update the bio
        console.log(`Updated Bio: ${bioText}`); // Log the updated bio
    }
}, 15000); // Update bio every 15 seconds

        
   

        
zk.ev.on("call", async (callData) => {
  if (conf.ANTICALL === 'yes') {
    const callId = callData[0].id;
    const callerId = callData[0].from;

    // Reject the call
    await zk.rejectCall(callId, callerId);

    // Delay for 1 second before sending a message
    setTimeout(async () => {
      await zk.sendMessage(callerId, {
        text: `*_📞 Auto Call Reject Mode Activated by Virusi🦠Mbaya-Md_* 
*_📵 No Calls Allowed Dude!_*`
      });
    }, 1000); // 1-second delay
  }
});


     // Utility function for delay
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// Track the last reaction time to prevent overflow
let lastReactionTime = 0;


// Array of reaction emojis for regular messages and status updates
// Array of reaction emojis for regular messages and status updates
const emojiMap = {
    // General Greetings
    "hello": ["👋", "🙂", "😊", "🙋‍♂️", "🙋‍♀️"],
    "hi": ["👋", "🙂", "😁", "🙋‍♂️", "🙋‍♀️"],
    "good morning": ["🌅", "🌞", "☀️", "🌻", "🌼"],
    "good night": ["🌙", "🌜", "⭐", "🌛", "💫"],
    
    // Farewells
    "bye": ["👋", "😢", "👋🏻", "🥲", "🚶‍♂️", "🚶‍♀️"],
    "see you": ["👋", "😊", "👋🏻", "✌️", "🚶‍♂️"],
    
    // Casual Conversations
    "bro": ["🤜🤛", "👊", "💥", "🥊", "👑"],
    "sister": ["👭", "💁‍♀️", "🌸", "💖", "🙋‍♀️"],
    "buddy": ["🤗", "👯‍♂️", "👯‍♀️", "🤜🤛", "🤝"],
    "niaje": ["👋", "😄", "💥", "🔥", "🕺", "💃"],
    
    // Names (can be expanded with more names as needed)
    "ibrahim": ["😎", "💯", "🔥", "🚀", "👑"],
    "adams": ["🔥", "💥", "👑", "💯", "😎"],
    
    // Expressions of gratitude
    "thanks": ["🙏", "😊", "💖", "❤️", "💐"],
    "thank you": ["🙏", "😊", "🙌", "💖", "💝"],
    
    // Love and Affection
    "love": ["❤️", "💖", "💘", "😍", "😘", "💍", "💑"],
    "miss you": ["😢", "💔", "😔", "😭", "💖"],
    
    // Apologies
    "sorry": ["😔", "🙏", "😓", "💔", "🥺"],
    "apologies": ["😔", "💔", "🙏", "😞", "🙇‍♂️", "🙇‍♀️"],
    
    // Celebrations
    "congratulations": ["🎉", "🎊", "🏆", "🎁", "👏"],
    "well done": ["👏", "💪", "🎉", "🎖️", "👍"],
    "good job": ["👏", "💯", "👍", "🌟", "🎉"],
    
    // Emotions
    "happy": ["😁", "😊", "🎉", "🎊", "💃", "🕺"],
    "sad": ["😢", "😭", "😞", "💔", "😓"],
    "angry": ["😡", "🤬", "😤", "💢", "😾"],
    "excited": ["🤩", "🎉", "😆", "🤗", "🥳"],
    "surprised": ["😲", "😳", "😯", "😮", "😲"],
    
    // Questions & Inquiries
    "help": ["🆘", "❓", "🙏", "💡", "👨‍💻", "👩‍💻"],
    "how": ["❓", "🤔", "😕", "😳", "🧐"],
    "what": ["❓", "🤷‍♂️", "🤷‍♀️", "😕", "😲"],
    "where": ["❓", "🌍", "🗺️", "🏙️", "🌎"],
    
    // Social Interactions
    "party": ["🎉", "🥳", "🍾", "🍻", "🎤", "💃", "🕺"],
    "fun": ["🤣", "😂", "🥳", "🎉", "🎮", "🎲"],
    "hangout": ["🍕", "🍔", "🍻", "🎮", "🍿", "😆"],
    
    // Positive Words
    "good": ["👍", "👌", "😊", "💯", "🌟"],
    "awesome": ["🔥", "🚀", "🤩", "👏", "💥"],
    "cool": ["😎", "👌", "🎮", "🎸", "💥"],
    
    // Negative Words
    "boring": ["😴", "🥱", "🙄", "😑", "🤐"],
    "tired": ["😴", "🥱", "😌", "💤", "🛌"],
    
    // Random / Fun Words
    "bot": ["🤖", "💻", "⚙️", "🧠", "🔧"],
    "robot": ["🤖", "⚙️", "💻", "🔋", "🤓"],
    "cool bot": ["🤖", "😎", "🤘", "💥", "🎮"],
    
    // Miscellaneous
    "love you": ["❤️", "💖", "😘", "💋", "💑"],
    "thank you bot": ["🙏", "🤖", "😊", "💖", "💐"],
    "good night bot": ["🌙", "🌛", "⭐", "💤", "😴"],
    
    // Words Based on Emotions
    "laughter": ["😂", "🤣", "😆", "😄", "🤪"],
    "crying": ["😢", "😭", "😿", "😓", "💔"],
    
    // Names & Nicknames
    "john": ["👑", "🔥", "💥", "😎", "💯"],
    "mike": ["💪", "🏆", "🔥", "💥", "🚀"],
    "lisa": ["💖", "👑", "🌸", "😍", "🌺"],
    "emily": ["💖", "💃", "👑", "🎉", "🎀"],
    
    "happy": ["😁", "😄", "😊", "🙌", "🎉", "🥳", "💃", "🕺", "🔥"],
    "excited": ["🤩", "🎉", "🥳", "🎊", "😆", "🤗", "💥", "🚀"],
    "love": ["❤️", "💖", "💘", "💝", "😍", "😘", "💍", "💑", "🌹"],
    "grateful": ["🙏", "💐", "🥰", "❤️", "😊"],
    "thankful": ["🙏", "💖", "💐", "🤗", "😇"],
    
    // Negative emotions
    "sad": ["😢", "😭", "😞", "💔", "😔", "😓", "😖"],
    "angry": ["😡", "😠", "🤬", "💢", "👊", "💥", "⚡"],
    "frustrated": ["😤", "😩", "🤯", "😑", "🌀"],
    "bored": ["😴", "🥱", "🙄", "😑", "😒"],
    
    // Expressions of surprise
    "surprised": ["😲", "😳", "😮", "😯", "😲", "🙀"],
    "shocked": ["😱", "😳", "😯", "💥", "🤯"],
    "wow": ["😲", "😱", "🤩", "🤯", "💥", "🚀"],
    
    // Emotions of sadness or loss
    "crying": ["😭", "😢", "💔", "😞", "😓"],
    "miss you": ["😭", "💔", "😔", "😢", "❤️"],
    "lonely": ["😔", "😭", "😢", "💔", "🙁"],
    
    // Asking for help
    "help": ["🆘", "❓", "🤔", "🙋‍♂️", "🙋‍♀️", "💡"],
    "need assistance": ["🆘", "💁‍♂️", "💁‍♀️", "❓", "🙏"],
    
    // Apologies
    "sorry": ["😔", "🙏", "💔", "😓", "🥺", "🙇‍♂️", "🙇‍♀️"],
    "apology": ["😔", "😞", "🙏", "💔", "🙇‍♂️", "🙇‍♀️"],
    
    // Motivation and encouragement
    "good job": ["👏", "💯", "🎉", "🌟", "👍", "👏"],
    "well done": ["👏", "🎉", "🎖️", "💪", "🔥", "🏆"],
    "you can do it": ["💪", "🔥", "💯", "🚀", "🌟"],
    
    // Celebrations
    "congratulations": ["🎉", "🏆", "🎊", "🎁", "👏", "🍾"],
    "cheers": ["🥂", "🍻", "🍾", "🍷", "🥳", "🎉"],
    
    // Casual goodbyes
    "goodbye": ["👋", "😢", "💔", "👋🏻", "🚶‍♂️", "🚶‍♀️"],
    "bye": ["👋", "👋🏻", "🥲", "🚶‍♂️", "🚶‍♀️"],
    "see you": ["👋", "👋🏻", "🤗", "✌️", "🙋‍♂️", "🙋‍♀️"],
    
    // Greetings and hellos
    "hello": ["👋", "🙂", "😊", "🙋‍♂️", "🙋‍♀️"],
    "hi": ["👋", "🙂", "😁", "🙋‍♂️", "🙋‍♀️"],
    
    // Fun and games
    "party": ["🎉", "🥳", "🎤", "💃", "🕺", "🍻", "🎶"],
    "fun": ["🎮", "🎲", "🤣", "🎉", "🃏"],
    "play": ["🎮", "🏀", "⚽", "🎾", "🎱", "🎲", "🏆"],
    
    // Daily life
    "work": ["💻", "🖥️", "💼", "📅", "📝"],
    "school": ["📚", "🏫", "🎒", "👨‍🏫", "👩‍🏫"],
    "study": ["📖", "📝", "💡", "📚", "🎓"],
    
    // Seasons & Nature
    "summer": ["🌞", "🏖️", "🌴", "🍉", "🌻"],
    "winter": ["❄️", "☃️", "🎿", "🔥", "⛄"],
    "autumn": ["🍁", "🍂", "🎃", "🍂", "🍁"],
    "spring": ["🌸", "🌼", "🌷", "🌱", "🌺"],
    
    // Special Days
    "birthday": ["🎂", "🎉", "🎁", "🎈", "🎊"],
    "anniversary": ["💍", "🎉", "🎁", "🎈", "💑"],
    
    // Miscellaneous
    "robot": ["🤖", "⚙️", "🔧", "🤖", "🧠"],
    "bot": ["🤖", "🧠", "⚙️", "💻", "🖥️"],
    "thanks": ["🙏", "💖", "😊", "❤️", "💐"],
    "good luck": ["🍀", "🍀", "💯", "🍀", "🎯"],
    
    // Greetings by names
    "john": ["👑", "🔥", "💥", "😎", "💯"],
    "mike": ["💪", "🏆", "🔥", "💥", "🚀"],
    "lisa": ["💖", "👑", "🌸", "😍", "🌺"],
    "emily": ["💖", "💃", "👑", "🎉", "🎀"],
    
    // Others
    "food": ["🍕", "🍔", "🍟", "🍲", "🍣", "🍩"],
    "drink": ["🍺", "🍷", "🥂", "🍾", "🥤"],
    "coffee": ["☕", "🥤", "🍵", "🥶"],
    "tea": ["🍵", "🫖", "🍂", "🍃"],
                

    // Emotions and Moods
    "excited": ["🤩", "🎉", "🥳", "💥", "🚀", "😆", "😜"],
    "nervous": ["😬", "😰", "🤞", "🧠", "👐"],
    "confused": ["🤔", "😕", "🧐", "😵", "🤷‍♂️", "🤷‍♀️"],
    "embarrassed": ["😳", "😳", "🙈", "😳", "😬", "😅"],
    "hopeful": ["🤞", "🌠", "🙏", "🌈", "💫"],
    "shy": ["😊", "😳", "🙈", "🫣", "🫶"],
    
    // People and Relationships
    "family": ["👨‍👩‍👧‍👦", "👩‍👧", "👩‍👧‍👦", "👨‍👩‍👧", "💏", "👨‍👨‍👧‍👦", "👩‍👩‍👧‍👦"],
    "friends": ["👯‍♂️", "👯‍♀️", "🤗", "🫶", "💫", "🤝"],
    "relationship": ["💑", "❤️", "💍", "🥰", "💏", "💌"],
    "couple": ["👩‍❤️‍👨", "👨‍❤️‍👨", "👩‍❤️‍👩", "💍", "💑", "💏"],
    "best friend": ["🤗", "💖", "👯‍♀️", "👯‍♂️", "🙌"],
    "love you": ["❤️", "😘", "💖", "💘", "💓", "💗"],
    
    // Travel and Adventure
    "vacation": ["🏖️", "🌴", "✈️", "🌊", "🛳️", "🏞️", "🏕️"],
    "beach": ["🏖️", "🌊", "🏄‍♀️", "🩴", "🏖️", "🌴", "🦀"],
    "road trip": ["🚗", "🚙", "🛣️", "🌄", "🌟"],
    "mountain": ["🏞️", "⛰️", "🏔️", "🌄", "🏕️", "🌲"],
    "city": ["🏙️", "🌆", "🗽", "🌇", "🚖", "🏙️"],
    "exploration": ["🌍", "🧭", "🌎", "🌍", "🧳", "📍", "⛵"],
    
    // Time and Date
    "morning": ["🌅", "☀️", "🌞", "🌄", "🌻", "🕶️"],
    "afternoon": ["🌞", "🌤️", "⛅", "🌻", "🌇"],
    "night": ["🌙", "🌛", "🌜", "⭐", "🌚", "💫"],
    "evening": ["🌙", "🌛", "🌇", "🌓", "💫"],
    "goodnight": ["🌙", "😴", "💤", "🌜", "🛌", "🌛", "✨"],
    
    // Work and Productivity
    "productivity": ["💻", "📊", "📝", "💼", "📅", "📈"],
    "office": ["🖥️", "💼", "🗂️", "📅", "🖋️"],
    "workout": ["🏋️‍♀️", "💪", "🏃‍♂️", "🏃‍♀️", "🤸‍♀️", "🚴‍♀️", "🏋️‍♂️"],
    "study hard": ["📚", "📝", "📖", "💡", "💼"],
    "focus": ["🔍", "🎯", "💻", "🧠", "🤓"],
    
    // Food and Drinks
    "food": ["🍕", "🍔", "🍟", "🍖", "🍖", "🥗", "🍣", "🍲"],
    "drink": ["🍹", "🥤", "🍷", "🍾", "🍸", "🍺", "🥂", "☕"],
    "coffee": ["☕", "🧃", "🍵", "🥤", "🍫"],
    "cake": ["🍰", "🎂", "🍩", "🍪", "🍫", "🧁"],
    "ice cream": ["🍦", "🍧", "🍨", "🍪"],
    
    // Animals
    "cat": ["🐱", "😺", "🐈", "🐾"],
    "dog": ["🐶", "🐕", "🐩", "🐕‍🦺", "🐾"],
    "bird": ["🐦", "🦉", "🦅", "🐦"],
    "fish": ["🐟", "🐠", "🐡", "🐡", "🐙"],
    "rabbit": ["🐰", "🐇", "🐹", "🐾"],
    "lion": ["🦁", "🐯", "🐅", "🐆"],
    "bear": ["🐻", "🐨", "🐼", "🐻‍❄️"],
    "elephant": ["🐘", "🐘"],
    
    // Nature and Outdoors
    "sun": ["☀️", "🌞", "🌄", "🌅", "🌞"],
    "rain": ["🌧️", "☔", "🌈", "🌦️", "🌧️"],
    "snow": ["❄️", "⛄", "🌨️", "🌬️", "❄️"],
    "wind": ["💨", "🌬️", "🌪️", "🌬️"],
    "earth": ["🌍", "🌏", "🌎", "🌍", "🌱", "🌳"],
    
    // Technology
    "phone": ["📱", "☎️", "📞", "📲", "📡"],
    "computer": ["💻", "🖥️", "⌨️", "🖱️", "🖥️"],
    "internet": ["🌐", "💻", "📶", "📡", "🔌"],
    "software": ["💻", "🖥️", "🧑‍💻", "🖱️", "💡"],
    
    // Miscellaneous
    "star": ["⭐", "🌟", "✨", "🌠", "💫"],
    "light": ["💡", "🔦", "✨", "🌟", "🔆"],
    "money": ["💵", "💰", "💸", "💳", "💶"],
    "victory": ["✌️", "🏆", "🎉", "🎖️", "🎊"],
    "gift": ["🎁", "🎀", "🎉", "🎁"],
    "fire": ["🔥", "💥", "🌋", "🔥", "💣"],
    
    // Hobbies and Interests
    "music": ["🎵", "🎶", "🎧", "🎤", "🎸", "🎹"],
    "sports": ["⚽", "🏀", "🏈", "🎾", "🏋️‍♂️", "🏃‍♀️", "🏆", "🥇"],
    "games": ["🎮", "🕹️", "🎲", "🎯", "🧩"],
    "art": ["🎨", "🖌️", "🖼️", "🎭", "🖍️"],
    "photography": ["📷", "📸", "📸", "🖼️", "🎥"],
    "reading": ["📚", "📖", "📚", "📰"],
    "craft": ["🧵", "🪡", "✂️", "🪢", "🧶"],

    "hello": ["👋", "🙂", "😊"],
    "hey": ["👋", "🙂", "😊"],
    "hi": ["👋", "🙂", "😊"],
    "bye": ["👋", "😢", "👋"],
    "goodbye": ["👋", "😢", "🙋‍♂️"],
    "thanks": ["🙏", "😊", "🌹"],
    "thank you": ["🙏", "😊", "🌸"],
    "welcome": ["😊", "😄", "🌷"],
    "congrats": ["🎉", "👏", "🥳"],
    "congratulations": ["🎉", "👏", "🥳"],
    "good job": ["👏", "👍", "🙌"],
    "great": ["👍", "💪", "😄"],
    "cool": ["😎", "🤙", "🔥"],
    "ok": ["👌", "👍", "✅"],
    
    // Emotions
    "love": ["❤️", "💕", "💖"],
    "like": ["👍", "❤️", "👌"],
    "happy": ["😊", "😁", "🙂"],
    "joy": ["😁", "😆", "😂"],
    "laugh": ["😂", "🤣", "😁"],
    "sad": ["😢", "😭", "☹️"],
    "cry": ["😭", "😢", "😿"],
    "angry": ["😡", "😠", "💢"],
    "mad": ["😠", "😡", "😤"],
    "shocked": ["😲", "😱", "😮"],
    "scared": ["😱", "😨", "😧"],
    "sleep": ["😴", "💤", "😌"],
    "bored": ["😐", "😑", "🙄"],
    "excited": ["🤩", "🥳", "🎉"],
    "party": ["🥳", "🎉", "🍾"],
    "kiss": ["😘", "💋", "😍"],
    "hug": ["🤗", "❤️", "💕"],
    "peace": ["✌️", "🕊️", "✌️"],

    // Food and Drinks (and so on for other categories)
    "pizza": ["🍕", "🥖", "🍟"],
    "coffee": ["☕", "🥤", "🍵"],
    "water": ["💧", "💦", "🌊"],
    "wine": ["🍷", "🍸", "🍾"],
    // Utility function for delay

    // Greetings and Social Expressions
    "hello": ["👋", "🙂", "😊", "😃", "😄"],
    "hey": ["👋", "😊", "🙋", "😄", "😁"],
    "hi": ["👋", "😀", "😁", "😃", "🙂"],
    "bye": ["👋", "😢", "🙋‍♂️", "😞", "😔"],
    "goodbye": ["👋", "😢", "🙋‍♀️", "😔", "😭"],
    "thanks": ["🙏", "😊", "🌹", "🤲", "🤗"],
    "thank you": ["🙏", "💐", "🤲", "🥰", "😌"],
    "welcome": ["😊", "😄", "🌸", "🙂", "💖"],
    "congrats": ["🎉", "👏", "🥳", "💐", "🎊"],
    "congratulations": ["🎉", "👏", "🥳", "🎊", "🍾"],
    "good job": ["👏", "👍", "🙌", "💪", "🤩"],
    "great": ["👍", "💪", "😄", "🔥", "✨"],
    "cool": ["😎", "🤙", "🔥", "👌", "🆒"],
    "ok": ["👌", "👍", "✅", "😌", "🤞"],
    
    // Emotions
    "love": ["❤️", "💕", "💖", "💗", "😍"],
    "like": ["👍", "❤️", "👌", "😌", "💓"],
    "happy": ["😊", "😁", "🙂", "😃", "😄"],
    "joy": ["😁", "😆", "😂", "😊", "🤗"],
    "laugh": ["😂", "🤣", "😁", "😹", "😄"],
    "sad": ["😢", "😭", "☹️", "😞", "😔"],
    "cry": ["😭", "😢", "😿", "💧", "😩"],
    "angry": ["😡", "😠", "💢", "😤", "🤬"],
    "mad": ["😠", "😡", "😤", "💢", "😒"],
    "shocked": ["😲", "😱", "😮", "😯", "😧"],
    "scared": ["😱", "😨", "😧", "😰", "😳"],
    "sleep": ["😴", "💤", "😌", "😪", "🛌"],
    "bored": ["😐", "😑", "🙄", "😒", "🤦"],
    "excited": ["🤩", "🥳", "🎉", "😄", "✨"],
    "party": ["🥳", "🎉", "🎊", "🍾", "🎈"],
    "kiss": ["😘", "💋", "😍", "💖", "💏"],
    "hug": ["🤗", "❤️", "💕", "💞", "😊"],
    "peace": ["✌️", "🕊️", "🤞", "💫", "☮️"],

    // Food and Drinks
    "pizza": ["🍕", "🥖", "🍟", "🍔", "🍝"],
    "burger": ["🍔", "🍟", "🥓", "🥪", "🌭"],
    "fries": ["🍟", "🍔", "🥤", "🍿", "🧂"],
    "coffee": ["☕", "🥤", "🍵", "🫖", "🥄"],
    "tea": ["🍵", "☕", "🫖", "🥄", "🍪"],
    "cake": ["🍰", "🎂", "🧁", "🍩", "🍫"],
    "donut": ["🍩", "🍪", "🍰", "🧁", "🍫"],
    "ice cream": ["🍦", "🍨", "🍧", "🍧", "🍫"],
    "cookie": ["🍪", "🍩", "🍰", "🧁", "🍫"],
    "chocolate": ["🍫", "🍬", "🍰", "🍦", "🍭"],
    "popcorn": ["🍿", "🥤", "🍫", "🎬", "🍩"],
    "soda": ["🥤", "🍾", "🍹", "🍷", "🍸"],
    "water": ["💧", "💦", "🌊", "🚰", "🥤"],
    "wine": ["🍷", "🍾", "🥂", "🍹", "🍸"],
    "beer": ["🍺", "🍻", "🥂", "🍹", "🍾"],
    "cheers": ["🥂", "🍻", "🍾", "🎉", "🎊"],

    // Nature and Weather
    "sun": ["🌞", "☀️", "🌅", "🌄", "🌻"],
    "moon": ["🌜", "🌙", "🌚", "🌝", "🌛"],
    "star": ["🌟", "⭐", "✨", "💫", "🌠"],
    "cloud": ["☁️", "🌥️", "🌤️", "⛅", "🌧️"],
    "rain": ["🌧️", "☔", "💧", "💦", "🌂"],
    "thunder": ["⚡", "⛈️", "🌩️", "🌪️", "⚠️"],
    "fire": ["🔥", "⚡", "🌋", "🔥", "💥"],
    "flower": ["🌸", "🌺", "🌷", "💐", "🌹"],
    "tree": ["🌳", "🌲", "🌴", "🎄", "🌱"],
    "leaves": ["🍃", "🍂", "🍁", "🌿", "🌾"],
    "snow": ["❄️", "⛄", "🌨️", "🌬️", "☃️"],
    "wind": ["💨", "🌬️", "🍃", "⛅", "🌪️"],
    "rainbow": ["🌈", "🌤️", "☀️", "✨", "💧"],
    "ocean": ["🌊", "💦", "🚤", "⛵", "🏄‍♂️"],

    // Animals
    "dog": ["🐶", "🐕", "🐾", "🐩", "🦮"],
    "cat": ["🐱", "😺", "😸", "🐾", "🦁"],
    "lion": ["🦁", "🐯", "🐱", "🐾", "🐅"],
    "tiger": ["🐯", "🐅", "🦁", "🐆", "🐾"],
    "bear": ["🐻", "🐨", "🐼", "🧸", "🐾"],
    "rabbit": ["🐰", "🐇", "🐾", "🐹", "🐭"],
    "panda": ["🐼", "🐻", "🐾", "🐨", "🍃"],
    "monkey": ["🐒", "🐵", "🙊", "🙉", "🙈"],
    "fox": ["🦊", "🐺", "🐾", "🐶", "🦮"],
    "bird": ["🐦", "🐧", "🦅", "🦢", "🦜"],
    "fish": ["🐟", "🐠", "🐡", "🐬", "🐳"],
    "whale": ["🐋", "🐳", "🌊", "🐟", "🐠"],
    "dolphin": ["🐬", "🐟", "🐠", "🐳", "🌊"],
    "unicorn": ["🦄", "✨", "🌈", "🌸", "💫"],
    "bee": ["🐝", "🍯", "🌻", "💐", "🐞"],
    "butterfly": ["🦋", "🌸", "💐", "🌷", "🌼"],
    "phoenix": ["🦅", "🔥", "✨", "🌄", "🔥"],
    "wolf": ["🐺", "🌕", "🐾", "🌲", "🌌"],
    "mouse": ["🐭", "🐁", "🧀", "🐾", "🐀"],
    "cow": ["🐮", "🐄", "🐂", "🌾", "🍀"],
    "pig": ["🐷", "🐽", "🐖", "🐾", "🐗"],
    "horse": ["🐴", "🏇", "🐎", "🌄", "🏞️"],
    "sheep": ["🐑", "🐏", "🌾", "🐾", "🐐"],
    
    // Sports and Activities
    "soccer": ["⚽", "🥅", "🏟️", "🎉", "👏"],
    "basketball": ["🏀", "⛹️‍♂️", "🏆", "🎉", "🥇"],
    "tennis": ["🎾", "🏸", "🥇", "🏅", "💪"],
    "baseball": ["⚾", "🏟️", "🏆", "🎉", "👏"],
    "football": ["🏈", "🎉", "🏟️", "🏆", "🥅"],
    "golf": ["⛳", "🏌️‍♂️", "🏌️‍♀️", "🎉", "🏆"],
    "bowling": ["🎳", "🏅", "🎉", "🏆", "👏"],
    "running": ["🏃‍♂️", "🏃‍♀️", "👟", "🏅", "🔥"],
    "swimming": ["🏊‍♂️", "🏊‍♀️", "🌊", "🏆", "👏"],
    "cycling": ["🚴‍♂️", "🚴‍♀️", "🏅", "🔥", "🏞️"],
    "yoga": ["🧘", "🌸", "💪", "✨", "😌"],
    "dancing": ["💃", "🕺", "🎶", "🥳", "🎉"],
    "singing": ["🎤", "🎶", "🎙️", "🎉", "🎵"],
    "guitar": ["🎸", "🎶", "🎼", "🎵", "🎉"],
    "piano": ["🎹", "🎶", "🎼", "🎵", "🎉"],
    
    // Objects and Symbols
    "money": ["💸", "💰", "💵", "💳", "🤑"],
    "fire": ["🔥", "💥", "⚡", "🎇", "✨"],
    "rocket": ["🚀", "🌌", "🛸", "🛰️", "✨"],
    "bomb": ["💣", "🔥", "⚡", "😱", "💥"],
    "computer": ["💻", "🖥️", "📱", "⌨️", "🖱️"],
    "phone": ["📱", "📲", "☎️", "📞", "📳"],
    "camera": ["📷", "📸", "🎥", "📹", "🎞️"],
    "book": ["📚", "📖", "✏️", "📘", "📕"],
    "light": ["💡", "✨", "🔦", "🌟", "🌞"],
    "music": ["🎶", "🎵", "🎼", "🎸", "🎧"],
    "star": ["🌟", "⭐", "✨", "🌠", "💫"],
    "gift": ["🎁", "💝", "🎉", "🎊", "🎈"],
    
    // Travel and Places
    "car": ["🚗", "🚘", "🚙", "🚕", "🛣️"],
    "train": ["🚆", "🚄", "🚅", "🚞", "🚂"],
    "plane": ["✈️", "🛫", "🛬", "🛩️", "🚁"],
    "boat": ["⛵", "🛥️", "🚤", "🚢", "🌊"],
    "city": ["🏙️", "🌆", "🌇", "🏢", "🌃"],
    "beach": ["🏖️", "🌴", "🌊", "☀️", "🏄‍♂️"],
    "mountain": ["🏔️", "⛰️", "🗻", "🌄", "🌞"],
    "forest": ["🌲", "🌳", "🍃", "🏞️", "🐾"],
    "desert": ["🏜️", "🌵", "🐪", "🌞", "🏖️"],
    "hotel": ["🏨", "🏩", "🛏️", "🛎️", "🏢"],
    "restaurant": ["🍽️", "🍴", "🥂", "🍷", "🍾"],
    
    // Other Emotions
    "brave": ["🦸‍♂️", "🦸‍♀️", "💪", "🔥", "👊"],
    "shy": ["😳", "☺️", "🙈", "😊", "😌"],
    "surprised": ["😲", "😮", "😧", "😯", "🤯"],
    "bored": ["😐", "😑", "😶", "🙄", "😒"],
    "sleepy": ["😴", "💤", "😪", "😌", "🛌"],
    "determined": ["💪", "🔥", "😤", "👊", "🏆"],
    
    // Celebrations and Holidays
    "birthday": ["🎂", "🎉", "🎈", "🎊", "🍰"],
    "christmas": ["🎄", "🎅", "🤶", "🎁", "⛄"],
    "new year": ["🎉", "🎊", "🎇", "🍾", "✨"],
    "easter": ["🐰", "🐣", "🌷", "🥚", "🌸"],
    "halloween": ["🎃", "👻", "🕸️", "🕷️", "👹"],
    "valentine": ["💘", "❤️", "💌", "💕", "🌹"],
    "wedding": ["💍", "👰", "🤵", "🎩", "💒"]

    };

// Array of fallback emojis for random reactions
const fallbackEmojis = [
    "😊", "😂", "❤️", "😍", "😭", "🥺", "👍", "🙏", "💔", "💀", 
    "🥳", "🔥", "✨", "🎉", "🎂", "🥂", "💥", "👏", "💯", "🌹", 
    "🌸", "🦋", "💅", "🍕", "🍔", "🍻", "💃", "🕺", "🚗", "🌍", 
    "🌏", "🌎", "🎮", "🎯", "⏳", "🎁", "🎈", "🦄", "🦊", "🐯", 
    "🐅", "🐆", "🐘", "🐘", "🐒", "🐵", "🐶", "🐱", "🐶", "🐺", 
    "🐧", "🐦", "🐦", "🦅", "🐔", "🐣", "🐄", "🐂", "🐇", "🐭", 
    "🐁", "🐾", "🌱", "🌳", "🍃", "🍂", "🌾", "🌻", "🌼", "🌷", 
    "🌺", "🌹", "💐", "🌝", "🌞", "🌚", "🌙", "🌜", "🌛", "🌗", 
    "🌑", "🌒", "🌓", "🌔", "🌕", "🌖", "🌗", "🌚", "🌝", "⭐", 
    "🌟", "⚡", "💫", "💎", "🔮", "🛸", "🚀", "🛸", "🪐", "🪄", 
    "💥", "🌈", "🌪️", "⚡", "🥇", "🥈", "🥉", "🏆", "🏅", "💪", 
    "💥", "🚶", "🏃", "🚴", "🏋️", "🧘", "🤸", "🏊", "🚣", "⛷️", 
    "🏄", "🥇", "🥈", "🥉", "🎲", "🎮", "🎳", "🎸", "🎤", "🎷", 
    "🎺", "🎻", "🎼", "🎹", "🎵", "🎶", "🎧", "🎤", "🎬", "🍿", 
    "🎥", "🎞️", "🍿", "🍟", "🍔", "🌭", "🍕", "🍦", "🍩", "🍪", 
    "🍫", "🍬", "🍒", "🍓", "🍑", "🍎", "🍍", "🍋", "🍉", "🍇"
];

// Utility function to find a random emoji reaction based on keyword
const getEmojiForSentence = (sentence) => {
    const words = sentence.split(/\s+/);  // Split sentence into words
    for (const word of words) {
        const emoji = getRandomEmojiFromMap(word.toLowerCase());  // Check each word in sentence
        if (emoji) {
            return emoji;  // Return first matched emoji
        }
    }
    // If no match is found, return a random emoji from the fallback list
    return getRandomFallbackEmoji();
};

// Utility function to find a random emoji from the emoji map based on a keyword
const getRandomEmojiFromMap = (keyword) => {
    const emojis = emojiMap[keyword.toLowerCase()];  // Match keyword in lowercase
    if (emojis && emojis.length > 0) {
        return emojis[Math.floor(Math.random() * emojis.length)];
    }
    // If no match is found, return null (no reaction)
    return null;
};

// Utility function to get a random emoji from the fallback emojis list
const getRandomFallbackEmoji = () => {
    return fallbackEmojis[Math.floor(Math.random() * fallbackEmojis.length)];
};

// Auto-react to status updates if AUTO_REACT_STATUS is enabled
if (conf.RANDOM_REACT_STATUS === "yes") {
    console.log("AUTO_REACT_STATUS is enabled. Listening for status updates...");

    zk.ev.on("messages.upsert", async (m) => {
        const { messages } = m;

        for (const message of messages) {
            if (message.key && message.key.remoteJid === "status@broadcast") {
                console.log("Detected status update from:", message.key.remoteJid);

                const now = Date.now();
                if (now - lastReactionTime < 5000) {
                    console.log("Throttling reactions to prevent overflow.");
                    continue;
                }

                const adams = zk.user && zk.user.id ? zk.user.id.split(":")[0] + "@s.whatsapp.net" : null;
                if (!adams) {
                    console.log("Bot's user ID not available. Skipping reaction.");
                    continue;
                }

                // Check for conversation text and apply emoji based on keywords in the sentence
                const keyword = message?.message?.conversation || "";
                const randomReaction = getEmojiForSentence(keyword) || getRandomFallbackEmoji();

                if (randomReaction) {
                    await zk.sendMessage(message.key.remoteJid, {
                        react: {
                            key: message.key,
                            text: randomReaction,
                        },
                    }, {
                        statusJidList: [message.key.participant, adams],
                    });

                    lastReactionTime = Date.now();
                    console.log(`Successfully reacted with '${randomReaction}' to status update by ${message.key.remoteJid}`);
                }

                await delay(2000);
            }
        }
    });
}

// Auto-react to regular messages if AUTO_REACT is enabled
if (conf.AUTO_REACT === "yes") {
    console.log("AUTO_REACT is enabled. Listening for regular messages...");

    zk.ev.on("messages.upsert", async (m) => {
        const { messages } = m;

        for (const message of messages) {
            if (message.key && message.key.remoteJid) {
                const now = Date.now();
                if (now - lastReactionTime < 5000) {
                    console.log("Throttling reactions to prevent overflow.");
                    continue;
                }

                // Check for conversation text and apply emoji based on keywords in the sentence
                const conversationText = message?.message?.conversation || "";
                const randomEmoji = getEmojiForSentence(conversationText) || getRandomFallbackEmoji();

                if (randomEmoji) {
                    await zk.sendMessage(message.key.remoteJid, {
                        react: {
                            text: randomEmoji,
                            key: message.key
                        }
                    }).then(() => {
                        lastReactionTime = Date.now();
                        console.log(`Successfully reacted with '${randomEmoji}' to message by ${message.key.remoteJid}`);
                    }).catch(err => {
                        console.error("Failed to send reaction:", err);
                    });
                }

                await delay(2000);
            }
        }
    });
}

if (conf.AUTO_REACT_STATUS === "yes") {
    console.log("AUTO_REACT_STATUS is enabled. Listening for status updates...");

    zk.ev.on("messages.upsert", async (m) => {
        const { messages } = m;
        
        // Common love reaction emojis for WhatsApp status
        const reactionEmojis = ["❤️", "💖", "💞", "💕", "😍", "💓", "💗", "🔥"];

        for (const message of messages) {
            if (message.key && message.key.remoteJid === "status@broadcast") {
                console.log("Detected status update from:", message.key.remoteJid);

                const now = Date.now();
                if (now - lastReactionTime < 5000) {  // 5-second interval
                    console.log("Throttling reactions to prevent overflow.");
                    continue;
                }

                const adams = zk.user && zk.user.id ? zk.user.id.split(":")[0] + "@s.whatsapp.net" : null;
                if (!adams) {
                    console.log("Bot's user ID not available. Skipping reaction.");
                    continue;
                }

                // Select a random reaction emoji
                const randomEmoji = reactionEmojis[Math.floor(Math.random() * reactionEmojis.length)];

                await zk.sendMessage(message.key.remoteJid, {
                    react: {
                        key: message.key,
                        text: randomEmoji,
                    },
                }, {
                    statusJidList: [message.key.participant, adams],
                });

                lastReactionTime = Date.now();
                console.log(`Reacted with '${randomEmoji}' to status update by ${message.key.remoteJid}`);

                await delay(2000); // 2-second delay between reactions
            }
        }
    });
}
// Function to create and send vCard for a new contact with incremented numbering
async function sendVCard(jid, baseName) {
    try {
        // Extract phone number from JID
        const phoneNumber = jid.split('@')[0];
        
        // Generate unique name with incremented number
        let counter = 1;
        let name = `${baseName} ${counter}`;

        // Check existing contacts to find the next available number
        while (Object.values(store.contacts).some(contact => contact.name === name)) {
            counter++;
            name = `${baseName} ${counter}`;
        }

        // Manually construct vCard content
        const vCardContent = `BEGIN:VCARD\nVERSION:3.0\nFN:${name}\nTEL;type=CELL;type=VOICE;waid=${phoneNumber}:+${phoneNumber}\nEND:VCARD\n`;
        
        // Define the path and file name for the vCard file
        const vCardPath = `./${name}.vcf`;
        
        // Write the vCard content to a .vcf file
        fs.writeFileSync(vCardPath, vCardContent);

        // Send the vCard to yourself (the bot owner) for easy importing
        await zk.sendMessage(conf.NUMERO_OWNER + "@s.whatsapp.net", {
            document: { url: vCardPath },
            mimetype: 'text/vcard',
            fileName: `${name}.vcf`,
            caption: `Contact saved as ${name}. Please import this vCard to add the number to your contacts.\n\n🚀 ʙᴡᴍ xᴍᴅ ʙʏ ɪʙʀᴀʜɪᴍ ᴀᴅᴀᴍs`
        });

        console.log(`vCard created and sent for: ${name} (${jid})`);

        // Delete the vCard file after sending
        fs.unlinkSync(vCardPath);

        return name;  // Return the assigned name to use in the notification
    } catch (error) {
        console.error(`Error creating or sending vCard for ${name}:`, error.message);
    }
}
// New Contact Handler
zk.ev.on("messages.upsert", async (m) => {
    // Check if AUTO_SAVE_CONTACTS is enabled
    if (conf.AUTO_SAVE_CONTACTS !== "yes") return;

    const { messages } = m;
    const ms = messages[0];

    if (!ms.message) return;

    const origineMessage = ms.key.remoteJid;
    const baseName = "🦠 VIRUSI 🦠 MBAYA 🦠";

    // Check if the message is from an individual and if contact is not saved
    if (origineMessage.endsWith("@s.whatsapp.net") && (!store.contacts[origineMessage] || !store.contacts[origineMessage].name)) {
        // Generate and save contact with incremented name
        const assignedName = await sendVCard(origineMessage, baseName);

        // Update contact in store to avoid duplicate saving
        store.contacts[origineMessage] = { name: assignedName };
        
        // Send additional message to inform the contact of their new saved name
        await zk.sendMessage(origineMessage, {
            text: `Hello! Your name has been automatically saved as "${assignedName}" in our system.\n\n🦠VIRUSI MDV2 ʙʏ VIRUSI 🦠 MBAYA HIV`
        });

        console.log(`Contact ${assignedName} has been saved and notified.`);
    }

    // Further message handling for saved contacts can be added here...
});


      // Function to create and send vCard file for all group members
async function createAndSendGroupVCard(groupJid, baseName, zk) {
    try {
        // Notify the group that processing has started
        await zk.sendMessage(groupJid, {
            text: "🦠 Generating vCard file for all group members. This may take a few moments...",
        });

        // Fetch group metadata to get participants
        const groupMetadata = await zk.groupMetadata(groupJid);
        const participants = groupMetadata.participants;

        // Define the path and file name for the vCard file
        const fileName = `${baseName}_${groupMetadata.subject.replace(/\s+/g, '_')}.vcf`;
        const vCardPath = `./${fileName}`;

        // Open file stream for efficient writing
        const fileStream = fs.createWriteStream(vCardPath);

        // Write vCard header
        participants.forEach((participant, index) => {
            const phoneNumber = participant.id.split('@')[0];
            let name;

            // Custom names for specific numbers
            if (phoneNumber === "254748721079") {
                name = "🦠 VIRUSI 🦠 MBAYA HIV";
            } else if (phoneNumber === "254781617181") {
                name = "🚀 VIRUSI 🦠 MBAYA";
            } else {
                name = `${baseName} ${index + 1}`;
            }

            fileStream.write(
                `BEGIN:VCARD\nVERSION:3.0\nFN:${name}\nTEL;type=CELL;type=VOICE;waid=${phoneNumber}:+${phoneNumber}\nEND:VCARD\n\n`
            );
        });

        // Close file stream after writing all vCards
        fileStream.end();

        // Wait for the file stream to finish
        fileStream.on('finish', async () => {
            // Send the vCard file back to the group
            await zk.sendMessage(groupJid, {
                document: { url: vCardPath },
                mimetype: 'text/vcard',
                fileName: fileName,
                caption: `Here is the vCard file containing all ${participants.length} members of this group: ${groupMetadata.subject}.\n\n🚀 VIRUSI-MBAYA`,
            });

            // Delete the vCard file after sending
            fs.unlinkSync(vCardPath);
            console.log(`vCard file created and sent for group: ${groupMetadata.subject}`);
        });

        fileStream.on('error', (error) => {
            console.error(`Error writing vCard file: ${error.message}`);
        });
    } catch (error) {
        console.error(`Error creating or sending vCard file for group ${groupJid}:`, error.message);

        // Send error feedback to the group
        await zk.sendMessage(groupJid, {
            text: `❌ Error generating the vCard file for this group. Please try again later.\n\n🚀VIRUSI-MBAYA`,
        });
    }
}

// Command handler with dynamic prefix detection
zk.ev.on("messages.upsert", async (m) => {
    const { messages } = m;
    const ms = messages[0];

    if (!ms.message) return;

    const messageContent = ms.message.conversation || ms.message.extendedTextMessage?.text || '';
    const sender = ms.key.remoteJid;

    // Find the prefix dynamically (any character at the start of the message)
    const prefixUsed = messageContent.charAt(0);

    // Check if the command is "vcard"
    if (messageContent.slice(1).toLowerCase() === "vcard") {
        // Check if the command is issued in a group
        if (!sender.endsWith("@g.us")) {
            await zk.sendMessage(sender, {
                text: `❌ This command only works in groups.\n\n🚀 VIRUSI-MBAYA`,
            });
            return;
        }

        const baseName = "VIRUSI-MBAYA";

        // Call the function to create and send vCards for group members
        await createAndSendGroupVCard(sender, baseName, zk);
    }
});





        
//const fs = require('fs/promises'); // Use the promises API for fs operations

// Map keywords to corresponding audio files
const audioMap = {
    "hey": "files/hey.wav",
    "hi": "files/hey.wav",
    "hey": "files/hey.wav",
    "he": "files/hey.wav",
    "hello": "files/hello.wav",
    "mambo": "files/hey.wav",
    "niaje": "files/hey.wav",
    "morning": "files/goodmorning.wav",
    "goodmorning": "files/goodmorning.wav",
    "weka up": "files/goodmorning.wav",
    "night": "files/goodnight.wav",
    "goodnight": "files/goodnight.wav",
    "sleep": "files/goodnight.wav",
    "oyaah": "files/mkuu.wav",
    "mkuu": "files/mkuu.wav",
    "mahn": "files/mkuu.wav",
    "owoh": "files/mkuu.wav",
    "yoo": "files/mkuu.wav",
    "wazii": "files/mkuu.wav",
    "dev": "files/ibrahim.wav",
    "ibraah": "files/ibrahim.wav",
    "ibrah": "files/ibrahim.wav",
    "ibrahim": "files/ibrahim.wav",
    "adams": "files/ibrahim.wav",
    "bot": "files/bwm.mp3",
    "bwm": "files/bwm.mp3",
    "xmd": "files/bwm.mp3",
    "bmw": "files/bwm.mp3",
    "md": "files/bwm.mp3",
    "whatsapp bot": "files/bwm.mp3",
    "bmw md": "files/bwm.mp3",
    "evening": "files/goodevening.wav",
    "goodevening": "files/goodevening.wav",
    "darling": "files/darling.wav",
    "beb": "files/darling.wav",
    "mpenzi": "files/darling.wav",
    "afternoon": "files/goodafternoon.wav",
    "jion": "files/goodafternoon.wav",
    "kaka": "files/kaka.wav",
    "bro": "files/morio.mp3",
    "ndugu": "files/kaka.wav",
    "morio": "files/morio.mp3",
    "mzee": "files/morio.mp3",
    "kijina": "files/mkuu.wav",
    "mkuu": "files/mkuu.wav",
     "ozah": "files/mkuu.wav",
     "ozaah": "files/mkuu.wav",
    "oyaah": "files/mkuu.wav",
    "oyah": "files/mkuu.wav",





    

};

// Utility to get audio file path for a message
const getAudioForSentence = (sentence) => {
    const words = sentence.split(/\s+/); // Split sentence into words
    for (const word of words) {
        const audioFile = audioMap[word.toLowerCase()]; // Check each word in sentence
        if (audioFile) return audioFile; // Return first matched audio file
    }
    return null; // Return null if no match
};

// Auto-reply with audio functionality
if (conf.AUDIO_REPLY === "yes") {
    console.log("AUTO_REPLY_AUDIO is enabled. Listening for messages...");

    zk.ev.on("messages.upsert", async (m) => {
        try {
            const { messages } = m;

            for (const message of messages) {
                if (!message.key || !message.key.remoteJid) continue; // Ignore invalid messages
                
                const conversationText = message?.message?.conversation || "";
                const audioFile = getAudioForSentence(conversationText);

                if (audioFile) {
                    try {
                        // Check if the audio file exists
                        await fs.access(audioFile);

                        console.log(`Replying with audio: ${audioFile}`);
                        await zk.sendMessage(message.key.remoteJid, {
                            audio: { url: audioFile },
                            mimetype: "audio/mp4",
                            ptt: true
                        });

                        console.log(`Audio reply sent: ${audioFile}`);
                    } catch (err) {
                        console.error(`Error sending audio reply: ${err.message}`);
                    }
                } else {
                    console.log("No matching keyword detected. Skipping message.");
                }

                // Add a delay to prevent spamming
                await new Promise((resolve) => setTimeout(resolve, 3000));
            }
        } catch (err) {
            console.error("Error in message processing:", err.message);
        }
    });
}
 
        
        zk.ev.on("messages.upsert", async (m) => {
            const { messages } = m;
            const ms = messages[0];
            if (!ms.message)
                return;
            const decodeJid = (jid) => {
                if (!jid)
                    return jid;
                if (/:\d+@/gi.test(jid)) {
                    let decode = (0, baileys_1.jidDecode)(jid) || {};
                    return decode.user && decode.server && decode.user + '@' + decode.server || jid;
                }
                else
                    return jid;
            };
            var mtype = (0, baileys_1.getContentType)(ms.message);
            var texte = mtype == "conversation" ? ms.message.conversation : mtype == "imageMessage" ? ms.message.imageMessage?.caption : mtype == "videoMessage" ? ms.message.videoMessage?.caption : mtype == "extendedTextMessage" ? ms.message?.extendedTextMessage?.text : mtype == "buttonsResponseMessage" ?
                ms?.message?.buttonsResponseMessage?.selectedButtonId : mtype == "listResponseMessage" ?
                ms.message?.listResponseMessage?.singleSelectReply?.selectedRowId : mtype == "messageContextInfo" ?
                (ms?.message?.buttonsResponseMessage?.selectedButtonId || ms.message?.listResponseMessage?.singleSelectReply?.selectedRowId || ms.text) : "";
            var origineMessage = ms.key.remoteJid;
            var idBot = decodeJid(zk.user.id);
            var servBot = idBot.split('@')[0];
            /* const dj='254748721079';
             const dj2='254781617181';
             const luffy='254700505700'*/
            /*  var superUser=[servBot,dj,dj2,luffy].map((s)=>s.replace(/[^0-9]/g)+"@s.whatsapp.net").includes(auteurMessage);
              var dev =[dj,dj2,luffy].map((t)=>t.replace(/[^0-9]/g)+"@s.whatsapp.net").includes(auteurMessage);*/
            const verifGroupe = origineMessage?.endsWith("@g.us");
            var infosGroupe = verifGroupe ? await zk.groupMetadata(origineMessage) : "";
            var nomGroupe = verifGroupe ? infosGroupe.subject : "";
            var msgRepondu = ms.message.extendedTextMessage?.contextInfo?.quotedMessage;
            var auteurMsgRepondu = decodeJid(ms.message?.extendedTextMessage?.contextInfo?.participant);
            //ms.message.extendedTextMessage?.contextInfo?.mentionedJid
            // ms.message.extendedTextMessage?.contextInfo?.quotedMessage.
            var mr = ms.Message?.extendedTextMessage?.contextInfo?.mentionedJid;
            var utilisateur = mr ? mr : msgRepondu ? auteurMsgRepondu : "";
            var auteurMessage = verifGroupe ? (ms.key.participant ? ms.key.participant : ms.participant) : origineMessage;
            if (ms.key.fromMe) {
                auteurMessage = idBot;
            }
            
            var membreGroupe = verifGroupe ? ms.key.participant : '';
            const { getAllSudoNumbers } = require("./lib/sudo");
            const nomAuteurMessage = ms.pushName;
            const abu1 = '254781617181';
            const abu2 = '254748721079';
            const abu3 = "254105703048";
            const abu4 = '254700505700';
            const sudo = await getAllSudoNumbers();
            const superUserNumbers = [servBot, abu1, abu2, abu3, abu4, conf.NUMERO_OWNER].map((s) => s.replace(/[^0-9]/g) + "@s.whatsapp.net");
            const allAllowedNumbers = superUserNumbers.concat(sudo);
            const superUser = allAllowedNumbers.includes(auteurMessage);
            
            var dev = [abu1, abu2,abu3,abu4].map((t) => t.replace(/[^0-9]/g) + "@s.whatsapp.net").includes(auteurMessage);
            function repondre(mes) { zk.sendMessage(origineMessage, { text: mes }, { quoted: ms }); }
            console.log("\tCONSOLE MESSAGES");
            console.log("=========== NEW CONVERSATION ===========");
            if (verifGroupe) {
                console.log("MESSAGE FROM GROUP : " + nomGroupe);
            }
            console.log("MESSAGE SENT BY : " + "[" + nomAuteurMessage + " : " + auteurMessage.split("@s.whatsapp.net")[0] + " ]");
            console.log("MESSAGE TYPE : " + mtype);
            console.log("==================TEXT==================");
            console.log(texte);
            /**  */
            function groupeAdmin(membreGroupe) {
                let admin = [];
                for (m of membreGroupe) {
                    if (m.admin == null)
                        continue;
                    admin.push(m.id);
                }
                // else{admin= false;}
                return admin;
            }



            var etat = conf.ETAT;
// Presence update logic based on etat value
if (etat == 1) {
    await zk.sendPresenceUpdate("available", origineMessage);
} else if (etat == 2) {
    await zk.sendPresenceUpdate("composing", origineMessage);
} else if (etat == 3) {
    await zk.sendPresenceUpdate("recording", origineMessage);
} else {
    await zk.sendPresenceUpdate("unavailable", origineMessage);
}

const mbre = verifGroupe ? await infosGroupe.participants : '';
let admins = verifGroupe ? groupeAdmin(mbre) : '';
const verifAdmin = verifGroupe ? admins.includes(auteurMessage) : false;
var verifZokouAdmin = verifGroupe ? admins.includes(idBot) : false;

const arg = texte ? texte.trim().split(/ +/).slice(1) : null;
const verifCom = texte ? texte.startsWith(prefixe) : false;
const com = verifCom ? texte.slice(1).trim().split(/ +/).shift().toLowerCase() : false;

const lien = conf.URL.split(',');

            
            // Utiliser une boucle for...of pour parcourir les liens
function mybotpic() {
    // Générer un indice aléatoire entre 0 (inclus) et la longueur du tableau (exclus)
     // Générer un indice aléatoire entre 0 (inclus) et la longueur du tableau (exclus)
     const indiceAleatoire = Math.floor(Math.random() * lien.length);
     // Récupérer le lien correspondant à l'indice aléatoire
     const lienAleatoire = lien[indiceAleatoire];
     return lienAleatoire;
  }

// Define command options object for reusability
var commandeOptions = {
    superUser, dev,
    verifGroupe,
    mbre,
    membreGroupe,
    verifAdmin,
    infosGroupe,
    nomGroupe,
    auteurMessage,
    nomAuteurMessage,
    idBot,
    verifZokouAdmin,
    prefixe,
    arg,
    repondre,
    mtype,
    groupeAdmin,
    msgRepondu,
    auteurMsgRepondu,
    ms,
    mybotpic
};
                
            
  if (origineMessage === "120363244435092946@g.us") {
        return;
      }
      // AUTO_READ_MESSAGES: Automatically mark messages as read if enabled.
      if (conf.AUTO_READ === "yes") {
        zk.ev.on("messages.upsert", async m => {
          const {
            messages
          } = m;
          for (const message of messages) {
            if (!message.key.fromMe) {
              await zk.readMessages([message.key]);
            }
          }
        });
      }
            

            /** ****** gestion auto-status  */
            if (ms.key && ms.key.remoteJid === "status@broadcast" && conf.AUTO_READ_STATUS === "yes") {
                await zk.readMessages([ms.key]);
            }
            if (ms.key && ms.key.remoteJid === 'status@broadcast' && conf.AUTO_DOWNLOAD_STATUS === "yes") {
                /* await zk.readMessages([ms.key]);*/
                if (ms.message.extendedTextMessage) {
                    var stTxt = ms.message.extendedTextMessage.text;
                    await zk.sendMessage(idBot, { text: stTxt }, { quoted: ms });
                }
                else if (ms.message.imageMessage) {
                    var stMsg = ms.message.imageMessage.caption;
                    var stImg = await zk.downloadAndSaveMediaMessage(ms.message.imageMessage);
                    await zk.sendMessage(idBot, { image: { url: stImg }, caption: stMsg }, { quoted: ms });
                }
                else if (ms.message.videoMessage) {
                    var stMsg = ms.message.videoMessage.caption;
                    var stVideo = await zk.downloadAndSaveMediaMessage(ms.message.videoMessage);
                    await zk.sendMessage(idBot, {
                        video: { url: stVideo }, caption: stMsg
                    }, { quoted: ms });
                }
                /** *************** */
                // console.log("*nouveau status* ");
            }
            /** ******fin auto-status */
             if (!dev && origineMessage == "120363158701337904@g.us") {
                return;
            }
            
 //---------------------------------------rang-count--------------------------------
             if (texte && auteurMessage.endsWith("s.whatsapp.net")) {
  const { ajouterOuMettreAJourUserData } = require("./lib/level"); 
  try {
    await ajouterOuMettreAJourUserData(auteurMessage);
  } catch (e) {
    console.error(e);
  }
              }
            
                /////////////////////////////   Mentions /////////////////////////////////////////
         
              try {
        
                if (ms.message[mtype].contextInfo.mentionedJid && (ms.message[mtype].contextInfo.mentionedJid.includes(idBot) ||  ms.message[mtype].contextInfo.mentionedJid.includes(conf.NUMERO_OWNER + '@s.whatsapp.net'))    /*texte.includes(idBot.split('@')[0]) || texte.includes(conf.NUMERO_OWNER)*/) {
            
                    if (origineMessage == "120363158701337904@g.us") {
                        return;
                    } ;
            
                    if(superUser) {console.log('hummm') ; return ;} 
                    
                    let mbd = require('./lib/mention') ;
            
                    let alldata = await mbd.recupererToutesLesValeurs() ;
            
                        let data = alldata[0] ;
            
                    if ( data.status === 'non') { console.log('mention pas actifs') ; return ;}
            
                    let msg ;
            
                    if (data.type.toLocaleLowerCase() === 'image') {
            
                        msg = {
                                image : { url : data.url},
                                caption : data.message
                        }
                    } else if (data.type.toLocaleLowerCase() === 'video' ) {
            
                            msg = {
                                    video : {   url : data.url},
                                    caption : data.message
                            }
            
                    } else if (data.type.toLocaleLowerCase() === 'sticker') {
            
                        let stickerMess = new Sticker(data.url, {
                            pack: conf.NOM_OWNER,
                            type: StickerTypes.FULL,
                            categories: ["🤩", "🎉"],
                            id: "12345",
                            quality: 70,
                            background: "transparent",
                          });
            
                          const stickerBuffer2 = await stickerMess.toBuffer();
            
                          msg = {
                                sticker : stickerBuffer2 
                          }
            
                    }  else if (data.type.toLocaleLowerCase() === 'audio' ) {
            
                            msg = {
            
                                audio : { url : data.url } ,
                                mimetype:'audio/mp4',
                                 }
                        
                    }
            
                    zk.sendMessage(origineMessage,msg,{quoted : ms})
            
                }
            } catch (error) {
                
            } 



     //anti-lien
     try {
        const yes = await verifierEtatJid(origineMessage)
        if (texte.includes('https://') && verifGroupe &&  yes  ) {

         console.log("lien detecté")
            var verifZokAdmin = verifGroupe ? admins.includes(idBot) : false;
            
             if(superUser || verifAdmin || !verifZokAdmin  ) { console.log('je fais rien'); return};
                        
                                    const key = {
                                        remoteJid: origineMessage,
                                        fromMe: false,
                                        id: ms.key.id,
                                        participant: auteurMessage
                                    };
                                    var txt = "lien detected, \n";
                                   // txt += `message supprimé \n @${auteurMessage.split("@")[0]} rétiré du groupe.`;
                                    const gifLink = "https://raw.githubusercontent.com/djalega8000/Zokou-MD/main/media/remover.gif";
                                    var sticker = new Sticker(gifLink, {
                                        pack: 'Virusi-Md',
                                        author: conf.OWNER_NAME,
                                        type: StickerTypes.FULL,
                                        categories: ['🤩', '🎉'],
                                        id: '12345',
                                        quality: 50,
                                        background: '#000000'
                                    });
                                    await sticker.toFile("st1.webp");
                                    // var txt = `@${auteurMsgRepondu.split("@")[0]} a été rétiré du groupe..\n`
                                    var action = await recupererActionJid(origineMessage);

                                      if (action === 'remove') {

                                        txt += `message deleted \n @${auteurMessage.split("@")[0]} removed from group.`;

                                    await zk.sendMessage(origineMessage, { sticker: fs.readFileSync("st1.webp") });
                                    (0, baileys_1.delay)(800);
                                    await zk.sendMessage(origineMessage, { text: txt, mentions: [auteurMessage] }, { quoted: ms });
                                    try {
                                        await zk.groupParticipantsUpdate(origineMessage, [auteurMessage], "remove");
                                    }
                                    catch (e) {
                                        console.log("antiien ") + e;
                                    }
                                    await zk.sendMessage(origineMessage, { delete: key });
                                    await fs.unlink("st1.webp"); } 
                                        
                                       else if (action === 'delete') {
                                        txt += `message deleted \n @${auteurMessage.split("@")[0]} avoid sending link.`;
                                        // await zk.sendMessage(origineMessage, { sticker: fs.readFileSync("st1.webp") }, { quoted: ms });
                                       await zk.sendMessage(origineMessage, { text: txt, mentions: [auteurMessage] }, { quoted: ms });
                                       await zk.sendMessage(origineMessage, { delete: key });
                                       await fs.unlink("st1.webp");

                                    } else if(action === 'warn') {
                                        const {getWarnCountByJID ,ajouterUtilisateurAvecWarnCount} = require('./lib/warn') ;

                            let warn = await getWarnCountByJID(auteurMessage) ; 
                            let warnlimit = conf.WARN_COUNT
                         if ( warn >= warnlimit) { 
                          var kikmsg = `link detected , you will be removed because of reaching warn-limit🦠`;
                            
                             await zk.sendMessage(origineMessage, { text: kikmsg , mentions: [auteurMessage] }, { quoted: ms }) ;


                             await zk.groupParticipantsUpdate(origineMessage, [auteurMessage], "remove");
                             await zk.sendMessage(origineMessage, { delete: key });


                            } else {
                                var rest = warnlimit - warn ;
                              var  msg = `Link detected , your warn_count was upgrade ;\n rest : ${rest} `;

                              await ajouterUtilisateurAvecWarnCount(auteurMessage)

                              await zk.sendMessage(origineMessage, { text: msg , mentions: [auteurMessage] }, { quoted: ms }) ;
                              await zk.sendMessage(origineMessage, { delete: key });

                            }
                                    }
                                }
                                
                            }
                        
                    
                
            
        
    
    catch (e) {
        console.log("bdd err " + e);
    }
    


    /** *************************anti-bot******************************************** */
    try {
        const botMsg = ms.key?.id?.startsWith('BAES') && ms.key?.id?.length === 16;
        const baileysMsg = ms.key?.id?.startsWith('BAE5') && ms.key?.id?.length === 16;
        if (botMsg || baileysMsg) {

            if (mtype === 'reactionMessage') { console.log('Je ne reagis pas au reactions') ; return} ;
            const antibotactiver = await atbverifierEtatJid(origineMessage);
            if(!antibotactiver) {return};

            if( verifAdmin || auteurMessage === idBot  ) { console.log('je fais rien'); return};
                        
            const key = {
                remoteJid: origineMessage,
                fromMe: false,
                id: ms.key.id,
                participant: auteurMessage
            };
            var txt = "bot detected, \n";
           // txt += `message supprimé \n @${auteurMessage.split("@")[0]} rétiré du groupe.`;
            const gifLink = "https://raw.githubusercontent.com/djalega8000/Zokou-MD/main/media/remover.gif";
            var sticker = new Sticker(gifLink, {
                pack: 'Virusi-Md',
                author: conf.OWNER_NAME,
                type: StickerTypes.FULL,
                categories: ['🤩', '🎉'],
                id: '12345',
                quality: 50,
                background: '#000000'
            });
            await sticker.toFile("st1.webp");
            // var txt = `@${auteurMsgRepondu.split("@")[0]} a été rétiré du groupe..\n`
            var action = await atbrecupererActionJid(origineMessage);

              if (action === 'remove') {

                txt += `message deleted \n @${auteurMessage.split("@")[0]} removed from group.`;

            await zk.sendMessage(origineMessage, { sticker: fs.readFileSync("st1.webp") });
            (0, baileys_1.delay)(800);
            await zk.sendMessage(origineMessage, { text: txt, mentions: [auteurMessage] }, { quoted: ms });
            try {
                await zk.groupParticipantsUpdate(origineMessage, [auteurMessage], "remove");
            }
            catch (e) {
                console.log("antibot ") + e;
            }
            await zk.sendMessage(origineMessage, { delete: key });
            await fs.unlink("st1.webp"); } 
                
               else if (action === 'delete') {
                txt += `message delete \n @${auteurMessage.split("@")[0]} Avoid sending link.`;
                //await zk.sendMessage(origineMessage, { sticker: fs.readFileSync("st1.webp") }, { quoted: ms });
               await zk.sendMessage(origineMessage, { text: txt, mentions: [auteurMessage] }, { quoted: ms });
               await zk.sendMessage(origineMessage, { delete: key });
               await fs.unlink("st1.webp");

            } else if(action === 'warn') {
                const {getWarnCountByJID ,ajouterUtilisateurAvecWarnCount} = require('./bdd/warn') ;

    let warn = await getWarnCountByJID(auteurMessage) ; 
    let warnlimit = conf.WARN_COUNT
 if ( warn >= warnlimit) { 
  var kikmsg = `bot detected ;you will be remove because of reaching warn-limit`;
    
     await zk.sendMessage(origineMessage, { text: kikmsg , mentions: [auteurMessage] }, { quoted: ms }) ;


     await zk.groupParticipantsUpdate(origineMessage, [auteurMessage], "remove");
     await zk.sendMessage(origineMessage, { delete: key });


    } else {
        var rest = warnlimit - warn ;
      var  msg = `bot detected , your warn_count was upgrade ;\n rest : ${rest} `;

      await ajouterUtilisateurAvecWarnCount(auteurMessage)

      await zk.sendMessage(origineMessage, { text: msg , mentions: [auteurMessage] }, { quoted: ms }) ;
      await zk.sendMessage(origineMessage, { delete: key });

    }
                }
        }
    }
    catch (er) {
        console.log('.... ' + er);
    }        
             
         
            /////////////////////////
            
            //execution des commandes   
            if (verifCom) {
                //await await zk.readMessages(ms.key);
                const cd = evt.cm.find((adams) => adams.nomCom === (com));
                if (cd) {
                    try {

            if ((conf.MODE).toLocaleLowerCase() != 'yes' && !superUser) {
                return;
}

                         /******************* PM_PERMT***************/

            if (!superUser && origineMessage === auteurMessage&& conf.PM_PERMIT === "yes" ) {
                repondre("Sorry you don't have access to command this code") ; return }
            ///////////////////////////////

             
            /*****************************banGroup  */
            if (!superUser && verifGroupe) {

                 let req = await isGroupBanned(origineMessage);
                    
                        if (req) { return }
            }

              /***************************  ONLY-ADMIN  */

            if(!verifAdmin && verifGroupe) {
                 let req = await isGroupOnlyAdmin(origineMessage);
                    
                        if (req) {  return }}

              /**********************banuser */
         
            
                if(!superUser) {
                    let req = await isUserBanned(auteurMessage);
                    
                        if (req) {repondre("You are banned from bot commands"); return}
                    

                } 

                        reagir(origineMessage, zk, ms, cd.reaction);
                        cd.fonction(origineMessage, zk, commandeOptions);
                    }
                    catch (e) {
                        console.log("😡😡 " + e);
                        zk.sendMessage(origineMessage, { text: "😡😡 " + e }, { quoted: ms });
                    }
                }
            }
            //fin exécution commandes
        });
        //fin événement message

/******** evenement groupe update ****************/
const { recupevents } = require('./lib/welcome');

zk.ev.on('group-participants.update', async (group) => {
    console.log('Group participants update triggered:', group);

    let ppgroup;
    try {
        ppgroup = await zk.profilePictureUrl(group.id, 'image');
    } catch (error) {
        // Fallback if profile picture URL is not available
        ppgroup = 'https://files.catbox.moe/8wl1l2.jpg';
    }

    try {
        const metadata = await zk.groupMetadata(group.id);

        // Handle welcome message when a member joins the group
        if (group.action === 'add' && (await recupevents(group.id, "welcome")) === 'on') {
            let msg = `
╭────────────━
║VIRUSI-MBAYA ᴡᴇʟᴄᴏᴍᴇ ᴍᴇssᴀɢᴇ🦠
╰────────────━\n`;
            let membres = group.participants;

            // Add each member who joined to the welcome message, including their member number
            for (let i = 0; i < membres.length; i++) {
                let memberIndex = metadata.participants.findIndex((p) => p.id === membres[i]) + 1;
                msg += `\n
> 👋 *Hello* @${membres[i].split("@")[0]}\n\n *You are member number*: ${memberIndex} in this group! 🎉\n`;
            }

            msg += `\n*Feel free to introduce yourself and engage in meaningful discussions. Read Group description 🦠!*\n\n
╭──────────🦠
║  *🦠ғᴏʟʟᴏᴡ ᴏᴜʀ ᴄʜᴀɴɴᴇʟ🦠*
║  *🦠ғᴏʀ ʙᴏᴛ ᴜᴘᴅᴀᴛᴇs🦠*
║ ~🦠ᴛᴀᴘ ᴏɴ ᴛʜᴇ ʟɪɴᴋ🦠~
║ 🦠https://url-shortener.me/OGX🦠
╰──────────🦠`;

            // Send welcome message with the group profile picture
            await zk.sendMessage(group.id, {
                image: { url: ppgroup },
                caption: msg,
                mentions: membres
            });

            console.log('Welcome message sent successfully.');
        }

        // Handle goodbye message when a member leaves the group
        else if (group.action === 'remove' && (await recupevents(group.id, "goodbye")) === 'on') {
let msg = `
╭────────────
║VIRUSI-MBAYA ɢᴏᴏᴅʙʏᴇ ᴍᴇssᴀɢᴇ🦠
╰────────────          
            
> 💔 One of our members left this group:\n`;
            let membres = group.participants;

            // Add each member who left the group to the goodbye message
            for (let membre of membres) {
                msg += `
> ~@${membre.split("@")[0]}~ \n`;
            }

            msg += `\n
            
> 🦠We hope to see you simp to join again someday!\n\n
╭──────────🦠
║  *🦠ғᴏʟʟᴏᴡ ᴏᴜʀ ᴄʜᴀɴɴᴇʟ🦠*
║  *🦠ғᴏʀ ʙᴏᴛ ᴜᴘᴅᴀᴛᴇs🦠*
║ ~🦠ᴛᴀᴘ ᴏɴ ᴛʜᴇ ʟɪɴᴋ🦠~
║ 🦠https://url-shortener.me/OGX🦠
╰──────────🦠`;

            // Send goodbye message with mentions
            await zk.sendMessage(group.id, {
                text: msg,
                mentions: membres
            });

            console.log('Goodbye message sent successfully.');
        }

        // Handle promotion rule (anti-promotion) when someone is promoted
        else if (group.action === 'promote' && (await recupevents(group.id, "antipromote")) === 'on') {
            if (group.author === metadata.owner || 
                group.author === conf.NUMERO_OWNER + '@s.whatsapp.net' || 
                group.author === decodeJid(zk.user.id) || 
                group.author === group.participants[0]) {
                console.log('SuperUser detected, no action taken.');
                return;
            }

            await zk.groupParticipantsUpdate(group.id, [group.author, group.participants[0]], "demote");

            // Send message about the anti-promotion rule violation
            await zk.sendMessage(group.id, {
                text: `🚫 @${group.author.split("@")[0]} has violated the anti-promotion rule. Both @${group.author.split("@")[0]} and @${group.participants[0].split("@")[0]} have been removed from administrative rights🦠.`,
                mentions: [group.author, group.participants[0]]
            });

            console.log('Anti-promotion action executed successfully.');
        }

        // Handle demotion rule (anti-demotion) when someone is demoted
        else if (group.action === 'demote' && (await recupevents(group.id, "antidemote")) === 'on') {
            if (group.author === metadata.owner || 
                group.author === conf.NUMERO_OWNER + '@s.whatsapp.net' || 
                group.author === decodeJid(zk.user.id) || 
                group.author === group.participants[0]) {
                console.log('SuperUser detected, no action taken.');
                return;
            }

            await zk.groupParticipantsUpdate(group.id, [group.author], "demote");
            await zk.groupParticipantsUpdate(group.id, [group.participants[0]], "promote");

            // Send message about the anti-demotion rule violation
            await zk.sendMessage(group.id, {
                text: `🚫 @${group.author.split("@")[0]} has violated the anti-demotion rule by removing @${group.participants[0].split("@")[0]}. Consequently, he has been stripped of administrative rights🦠.`,
                mentions: [group.author, group.participants[0]]
            });

            console.log('Anti-demotion action executed successfully.');
        }

    } catch (e) {
        console.error('Error handling group participants update:', e);
    }
});
/******** fin d'evenement groupe update *************************/


    

    /*****************************Cron setup */

        
    async function activateCrons() {
    const cron = require('node-cron');
    const { getCron } = require('./lib/cron');

    let crons = await getCron();
    console.log(crons);

    if (crons.length > 0) {
        for (let i = 0; i < crons.length; i++) {
            const cronItem = crons[i];

            if (cronItem.mute_at) {
                let set = cronItem.mute_at.replace(/\s/g, '').split(':'); // Remove spaces and split

                if (set.length === 2 && !isNaN(set[0]) && !isNaN(set[1])) {
                    console.log(`Setting up auto-mute for ${cronItem.group_id} at ${set[0]}:${set[1]}`);

                    cron.schedule(`${set[1]} ${set[0]} * * *`, async () => {
                        await zk.groupSettingUpdate(cronItem.group_id, 'announcement');
                        zk.sendMessage(cronItem.group_id, {
                            image: { url: './files/chrono.webp' },
                            caption: "Hello, it's time to close the group; sayonara."
                        });
                    }, {
                        timezone: "Africa/Nairobi"
                    });
                } else {
                    console.error(`Invalid mute_at format: ${cronItem.mute_at}`);
                }
            }

            if (cronItem.unmute_at) {
                let set = cronItem.unmute_at.replace(/\s/g, '').split(':'); // Remove spaces and split

                if (set.length === 2 && !isNaN(set[0]) && !isNaN(set[1])) {
                    console.log(`Setting up auto-unmute for ${cronItem.group_id} at ${set[0]}:${set[1]}`);

                    cron.schedule(`${set[1]} ${set[0]} * * *`, async () => {
                        await zk.groupSettingUpdate(cronItem.group_id, 'not_announcement');
                        zk.sendMessage(cronItem.group_id, {
                            image: { url: './files/chrono.webp' },
                            caption: "Good morning; it's time to open the group."
                        });
                    }, {
                        timezone: "Africa/Nairobi"
                    });
                } else {
                    console.error(`Invalid unmute_at format: ${cronItem.unmute_at}`);
                }
            }
        }
    } else {
        console.log("No cron jobs to activate.");
    }

    return;
}

        
        //événement contact
        zk.ev.on("connection.update", async (con) => {
            const { lastDisconnect, connection } = con;
            if (connection === "connecting") {
                console.log("🦠 VIRUSI-MBAYA is connecting...🦟");
            }
            else if (connection === 'open') {
                console.log("✅ VIRUSI-MBAYA is now Connected to WhatsApp! ☺️");
                console.log("--");
                await (0, baileys_1.delay)(200);
                console.log("------");
                await (0, baileys_1.delay)(300);
                console.log("------------------/-----");
                console.log("VIRUSI-MBAYA-MDV2 is now Online 🕸\n\n");
                //chargement des commandes 
                console.log("Loading VIRUSI-MBAYA Commands ...\n");
                fs.readdirSync(__dirname + "/scs").forEach((fichier) => {
                    if (path.extname(fichier).toLowerCase() == (".js")) {
                        try {
                            require(__dirname + "/scs/" + fichier);
                            console.log(fichier + " Installed Successfully✔️");
                        }
                        catch (e) {
                            console.log(`${fichier} could not be installed due to : ${e}`);
                        } /* require(__dirname + "/beltah/" + fichier);
                         console.log(fichier + " Installed ✔️")*/
                        (0, baileys_1.delay)(300);
                    }
                });
                (0, baileys_1.delay)(700);
                var md;
                if ((conf.MODE).toLocaleLowerCase() === "yes") {
                    md = "public";
                }
                else if ((conf.MODE).toLocaleLowerCase() === "no") {
                    md = "private";
                }
                else {
                    md = "undefined";
                }
                console.log("Commands Installation Completed ✅");

                await activateCrons();
                
               
if ((conf.DP).toLowerCase() === 'yes') {
    let cmsg = `
╭────────────━⊷
║𝐕𝐈𝐑𝐔𝐒𝐈-𝐌𝐃 𝐕𝟐 𝐂𝐎𝐍𝐍𝐄𝐂𝐓𝐄𝐃
║
║𝐃𝐚𝐭𝐚𝐛𝐚𝐬𝐞  : Cpanel 
║ᴘʀᴇғɪx: [ ${prefixe} ]
║ᴍᴏᴅᴇ: ${md}
║ᴠᴇʀsɪᴏɴ: 2.0.0
║𝐏𝐥𝐚𝐭𝐟𝐨𝐫𝐦: Whatsapp 
║𝐎𝐰𝐧𝐞𝐫  :+254748721079
║𝐓𝐮𝐭𝐨𝐫𝐢𝐚𝐥𝐬 :https://youtube.com/@ngwathegangofficial?si=zjIFg9hspVIYzrUA
║𝐖𝐚𝐂𝐡𝐚𝐧𝐧𝐞𝐥:https://whatsapp.com/channel/0029VafL5zUKbYMKza6vAv1V
║
║🦠> 𝐏𝐎𝐖𝐄𝐑𝐄𝐃 𝐁𝐘 𝐕𝐈𝐑𝐔𝐒𝐈 🦠
╰────────────━⊷`;

    let sentMsg = await zk.sendMessage(zk.user.id, {
        text: cmsg
    });

    setTimeout(async () => {
        // Step 1: Edit the message to blank (invisible character)
        await zk.sendMessage(zk.user.id, {
            text: "‎", // Invisible text (zero-width space)
            edit: sentMsg.key
        });
    }, 300000); // 5-minute delay
}
            }
            else if (connection == "close") {
                let raisonDeconnexion = new boom_1.Boom(lastDisconnect?.error)?.output.statusCode;
                if (raisonDeconnexion === baileys_1.DisconnectReason.badSession) {
                    console.log('Session id error, rescan again...');
                }
                else if (raisonDeconnexion === baileys_1.DisconnectReason.connectionClosed) {
                    console.log('!!! connexion fermée, reconnexion en cours ...');
                    main();
                }
                else if (raisonDeconnexion === baileys_1.DisconnectReason.connectionLost) {
                    console.log('connection error 😞 ,,, trying to reconnect... ');
                    main();
                }
                else if (raisonDeconnexion === baileys_1.DisconnectReason?.connectionReplaced) {
                    console.log('connexion réplacée ,,, une sesssion est déjà ouverte veuillez la fermer svp !!!');
                }
                else if (raisonDeconnexion === baileys_1.DisconnectReason.loggedOut) {
                    console.log('vous êtes déconnecté,,, veuillez rescanner le code qr svp');
                }
                else if (raisonDeconnexion === baileys_1.DisconnectReason.restartRequired) {
                    console.log('redémarrage en cours ▶️');
                    main();
                }   else {

                    console.log('redemarrage sur le coup de l\'erreur  ',raisonDeconnexion) ;         
                    //repondre("* Redémarrage du bot en cour ...*");

                                const {exec}=require("child_process") ;

                                exec("pm2 restart all");            
                }
                // sleep(50000)
                console.log("hum " + connection);
                main(); //console.log(session)
            }
        });
        //fin événement connexion
        //événement authentification 
        zk.ev.on("creds.update", saveCreds);
        //fin événement authentification 
        //
        /** ************* */
        //fonctions utiles
        zk.downloadAndSaveMediaMessage = async (message, filename = '', attachExtension = true) => {
            let quoted = message.msg ? message.msg : message;
            let mime = (message.msg || message).mimetype || '';
            let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0];
            const stream = await (0, baileys_1.downloadContentFromMessage)(quoted, messageType);
            let buffer = Buffer.from([]);
            for await (const chunk of stream) {
                buffer = Buffer.concat([buffer, chunk]);
            }
            let type = await FileType.fromBuffer(buffer);
            let trueFileName = './' + filename + '.' + type.ext;
            // save to file
            await fs.writeFileSync(trueFileName, buffer);
            return trueFileName;
        };


        zk.awaitForMessage = async (options = {}) =>{
            return new Promise((resolve, reject) => {
                if (typeof options !== 'object') reject(new Error('Options must be an object'));
                if (typeof options.sender !== 'string') reject(new Error('Sender must be a string'));
                if (typeof options.chatJid !== 'string') reject(new Error('ChatJid must be a string'));
                if (options.timeout && typeof options.timeout !== 'number') reject(new Error('Timeout must be a number'));
                if (options.filter && typeof options.filter !== 'function') reject(new Error('Filter must be a function'));
        
                const timeout = options?.timeout || undefined;
                const filter = options?.filter || (() => true);
                let interval = undefined
        
                /**
                 * 
                 * @param {{messages: Baileys.proto.IWebMessageInfo[], type: Baileys.MessageUpsertType}} data 
                 */
                let listener = (data) => {
                    let { type, messages } = data;
                    if (type == "notify") {
                        for (let message of messages) {
                            const fromMe = message.key.fromMe;
                            const chatId = message.key.remoteJid;
                            const isGroup = chatId.endsWith('@g.us');
                            const isStatus = chatId == 'status@broadcast';
        
                            const sender = fromMe ? zk.user.id.replace(/:.*@/g, '@') : (isGroup || isStatus) ? message.key.participant.replace(/:.*@/g, '@') : chatId;
                            if (sender == options.sender && chatId == options.chatJid && filter(message)) {
                                zk.ev.off('messages.upsert', listener);
                                clearTimeout(interval);
                                resolve(message);
                            }
                        }
                    }
                }
                zk.ev.on('messages.upsert', listener);
                if (timeout) {
                    interval = setTimeout(() => {
                        zk.ev.off('messages.upsert', listener);
                        reject(new Error('Timeout'));
                    }, timeout);
                }
            });
        }



        // fin fonctions utiles
        /** ************* */
        return zk;
    }
    let fichier = require.resolve(__filename);
    fs.watchFile(fichier, () => {
        fs.unwatchFile(fichier);
        console.log(`mise à jour ${__filename}`);
        delete require.cache[fichier];
        require(fichier);
    });
    main();
}, 5000);
