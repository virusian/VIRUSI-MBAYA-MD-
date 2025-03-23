const { adams } = require('../Ibrahim/adams');
const traduire = require("../Ibrahim/traduction");
const { default: axios } = require('axios');
const pkg = require('@whiskeysockets/baileys');
const { generateWAMessageFromContent } = pkg;

// Scan Command
adams({ nomCom: "msg", reaction: "📥", categorie: "User" }, async (dest, zk, commandeOptions) => {
  const { repondre } = commandeOptions;

  try {
    const instructions = `
*"Hello, VIRUSI 🦠 MBAYA MDV2 Family!*

As the admin and a developer, I want to take a moment to thank Admin Stainer C and each and every one of you for your incredible co-operation and support. Your engagement and dedication have been instrumental in making this group successful.

Together, we’ve reached an amazing milestone, and I’m excited to announce the launch of *VIRUSI 🦠 MBAYA MDV2*, the new and improved bot that everyone Loves and wishes to have. This wouldn't have been possible without your continuous trust and contribution.

Here’s to even more success and fun with the new bot! Thank you for being part of this journey! 🚀🦠💀
    `;

    const instructionMessage = generateWAMessageFromContent(dest, {
      extendedTextMessage: {
        text: instructions
      }
    }, {});

    await zk.relayMessage(dest, instructionMessage.message, {
      messageId: instructionMessage.key.id
    });
  } catch (error) {
    console.error('Error sending instructions:', error.message);
    repondre('Error sending instructions.');
  }
});
