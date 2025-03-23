const { adams } = require('../Ibrahim/adams');
const { default: axios } = require('axios');
const pkg = require('@whiskeysockets/baileys');
const { generateWAMessageFromContent } = pkg;

// Scan Command
adams({ nomCom: "law", reaction: "👑", categorie: "User" }, async (dest, zk, commandeOptions) => {
  const { repondre } = commandeOptions;

  try {
    const imageUrl = "https://files.catbox.moe/lajss7.jpg"; // Replace with your image URL
    const instructions = "*Name: Phynic💦
Age:23
Location Nairobi 
Position: Admin 
Marital status: Dating 
Owner VIRUSI 🦠 MBAYA**

*Hello, group members,*

I just want to take a moment to recognize *PHYNIC 💦*—my wonderful group admin and the love of my life. 💖 Phynic is not only a dedicated admin but also my partner, my rock, and my biggest supporter. She respects me in every way possible and is always loyal to me, no matter the circumstances. Mary stands by me through thick and thin, supporting every project I take on, even if it’s something as tough as a violence project. Her strength and commitment inspire me every day.

Now, let me also make something very clear: *Admin Stainer* and *Lamoh*, my fellow admins, usually get themselves simping for this lovely admin, but *PHYNIC* has always remained loyal to me. 😌 Let no one under whichever circumstances try to inbox her for love affairs, because I will deal with  it *IDIO-ISTABLISHMENT MENTERIALIZMLY, as per *Article 37b* of the *VIRUSI constitution*. Trying to go behind my back is like breaking the law and entering into the Parliament—*that’s a no-go*. 🚫

Live long, my love, and thank you for always being by my side. 💕 You deserve Chochote 

*VIRUSI MBAYA* 🦠",
    // Fetch the image as a buffer
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const imageBuffer = Buffer.from(response.data, 'binary');

    const imageMessage = {
      image: { url: imageUrl }, // Use { jpegThumbnail: imageBuffer } if sending as a thumbnail
      caption: instructions
    };

    await zk.sendMessage(dest, imageMessage);
  } catch (error) {
    console.error('Error sending image:', error.message);
    repondre('Error sending image.');
  }
});
