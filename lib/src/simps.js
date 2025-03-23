const { adams } = require('../Ibrahim/adams');
const traduire = require("../Ibrahim/traduction");
const { default: axios } = require('axios');
const pkg = require('@whiskeysockets/baileys');
const { generateWAMessageFromContent } = pkg;

// Scan Command
adams({ nomCom: "simps", reaction: "💞", categorie: "User" }, async (dest, zk, commandeOptions) => {
  const { repondre } = commandeOptions;

  try {
    const instructions = `
**VIRUSI Bot research**

*"Alright folks, gather 'round for the latest drama in the admin world! 😆*

So, we have Lamoh, our ever-dedicated admin, who seems to be *simping for* Shylock, even though Shylock already has a boyfriend! 😂 Honestly, it’s like watching a rom-com where the plot twists are just... well, *awkward*. Lamoh is out here showing mad love, but Shylock's heart belongs to someone else whom **VIRUSI 🦠 MBAYA HIV seems to know**! 💔 

It’s like a love triangle, but without the third party knowing about it! 😂

*Whatever you do with this information is None of my business.* 😅
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
