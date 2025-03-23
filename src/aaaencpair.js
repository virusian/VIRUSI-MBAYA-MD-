const {
  adams
} = require("../Ibrahim/adams");
const {
  default: axios
} = require("axios");
const pkg = require("@whiskeysockets/baileys");
const {
  generateWAMessageFromContent
} = pkg;
adams({
  'nomCom': "pair",
  'reaction': '🦠',
  'categorie': "User"
}, async (_0x195291, _0x555512, _0x500776) => {
  const {
    repondre: _0x17f0cd,
    arg: _0x5511e8,
    ms: _0x49eab9
  } = _0x500776;
  try {
    if (!_0x5511e8 || _0x5511e8.length === 0) {
      return _0x17f0cd("Example Usage: .pair 254781617181.");
    }
    await _0x17f0cd("VIRUSI is Generating your code chill.....");
    const _0x144c5e = encodeURIComponent(_0x5511e8.join(" "));
    const _0x4259b6 = "https://vurusession.onrender.com/code?number=" + _0x144c5e;
    const _0xf2617 = await axios.get(_0x4259b6);
    const _0x18809d = _0xf2617.data;
    if (_0x18809d && _0x18809d.code) {
      const _0x5e7178 = _0x18809d.code;
      const _0x3b31ac = generateWAMessageFromContent(_0x195291, {
        'extendedTextMessage': {
          'text': "```" + _0x5e7178 + "```"
        }
      }, {});
      await _0x555512.relayMessage(_0x195291, _0x3b31ac.message, {
        'messageId': _0x3b31ac.key.id
      });
      const _0x238293 = generateWAMessageFromContent(_0x195291, {
        'extendedTextMessage': {
          'text': "*Copy the above code and link it to your WhatsApp*\n\n*VIRUSI MBAYA MDV2 *\n\n*MADE BY VIRUSI 🦠 MBAYA HIV*"
        }
      }, {});
      await _0x555512.relayMessage(_0x195291, _0x238293.message, {
        'messageId': _0x238293.key.id
      });
    } else {
      throw new Error("Invalid response from API.");
    }
  } catch (_0x183049) {
    console.error("Error getting API response:", _0x183049.message);
    _0x17f0cd("Error getting response from API.");
  }
});
adams({
  'nomCom': "session",
  'reaction': '🔍',
  'categorie': "User"
}, async (_0x313506, _0x28a340, _0x4b498c) => {
  const {
    repondre: _0x8fd4a5
  } = _0x4b498c;
  try {
    const _0x55a756 = generateWAMessageFromContent(_0x313506, {
      'extendedTextMessage': {
        'text': "\n*📖 HOW TO GET VIRUSI MBAYA MDV2 SESSION ID:*\n\n1️⃣ **Open the link below**\n\n>https://vurusession.onrender.com\n\n2️⃣ **Enter Your WhatsApp Number** \n\n 👉 Type your WhatsApp number without your country code (e.g., 254781617181) and tap **Submit**. \n\n3️⃣ **Receive a Code** \n\n 👉 VIRUSI TECH will send a short 8 Digit code, Copy it to your keyboard. \n\n4️⃣ **Check WhatsApp Notification** \n\n 👉 WhatsApp will notify you saying Enter code to link new device. Tap on the notification and enter the code sent by VIRUSI TECH. \n\n5️⃣ **Wait for the Session, don't opt back it might delay and fail** \n\n 👉 After loading, it will link then VIRUSI TECH will send a session to your WhatsApp number. \n\n6️⃣ **Copy and Share the Session** \n\n 👉 Copy the long message stating with VIRUSI-MBAYA and send it to your deployer. \n\n*💻 Powered by VIRUSI MBAYA MDV2* \n\n\n> Made by VIRUSI 🦠 MBAYA HIV\n "
      }
    }, {});
    await _0x28a340.relayMessage(_0x313506, _0x55a756.message, {
      'messageId': _0x55a756.key.id
    });
  } catch (_0x38e2cd) {
    console.error("Error sending instructions:", _0x38e2cd.message);
    _0x8fd4a5("Error sending instructions.");
  }
});
