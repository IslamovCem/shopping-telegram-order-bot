const TelegramBot = require("node-telegram-bot-api");

const token = "YOUR_TELEGRAM_BOT_TOKEN";
const adminChatId = "1573771417"; // Adminning Telegram chat ID'si
const adminUsername = "YOUR_ADMIN_USERNAME"; // Telegram username (link uchun)

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "🛒 Mahsulot katalogiga xush kelibsiz!", {
    reply_markup: {
      inline_keyboard: [[
        { text: "📦 Mahsulot 1", callback_data: "product_1" }
      ]]
    }
  });
});

bot.on("callback_query", (query) => {
  const chatId = query.message.chat.id;
  const user = query.from;

  if (query.data === "product_1") {
    // Adminga yuboriladi
    bot.sendPhoto(adminChatId, "https://example.com/product1.jpg", {
      caption: `📥 Yangi buyurtma!

👤 ${user.first_name} (${user.username || "no username"})
🛍 Mahsulot: Vitamin A
💸 Narxi: 99,000 so'm`
    });

    // Foydalanuvchiga tugma yuboriladi
    bot.sendMessage(chatId, "✅ Buyurtma yuborildi. Admin bilan bog‘lanish uchun quyidagi tugmani bosing:", {
      reply_markup: {
        inline_keyboard: [[
          {
            text: "💬 Admin bilan bog‘lanish",
            url: `https://t.me/${adminUsername}`
          }
        ]]
      }
    });
  }
});
