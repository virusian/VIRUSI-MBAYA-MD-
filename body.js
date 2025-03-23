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
"A true developer builds the fut
