const { adams } = require('../Ibrahim/adams');  
const { default: axios } = require('axios');  
const pkg = require('@whiskeysockets/baileys');  
const { generateWAMessageFromContent } = pkg;  

// Scan Command  
adams({ nomCom: "hey", reaction: "🗣️", categorie: "User" }, async (dest, zk, commandeOptions) => {  
  const { repondre } = commandeOptions;  

  try {  
    const imageUrl = "https://storage.giftedtech.web.id/file/download/fUFn8.jpg";  
    const instructions = "Hey, welcome! Here’s VIRUSI 🦠 MBAYA HIV's image still learning coding.";  

    const imageMessage = {  
      image: { url: imageUrl },  
      caption: instructions  
    };  

    const instructionMessage = generateWAMessageFromContent(dest, {  
      imageMessage  
    }, {});  

    await zk.relayMessage(dest, instructionMessage.message, {  
      messageId: instructionMessage.key.id  
    });  
  } catch (error) {  
    console.error('Error sending instructions:', error.message);  
    repondre('Error sending instructions.');  
  }  
});
