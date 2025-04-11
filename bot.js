const TelegramBot = require('node-telegram-bot-api');

// .env fayldan tokenni olish
require('dotenv').config();
const token = process.env.BOT_TOKEN;

// polling bilan botni ishga tushirish
const bot = new TelegramBot(token, { polling: true });

// /start komandasi
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const firstName = msg.from.first_name || 'foydalanuvchi';

  bot.sendMessage(chatId, `🛍 Salom ${firstName}!

Bu bot orqali siz dori, vitamin va parfyumeriya mahsulotlarini qulay tarzda ko‘rishingiz va buyurtma qilishingiz mumkin.`, {
    reply_markup: {
      inline_keyboard: [
        [{ text: '🛒 Do‘konni ochish', web_app: { url: process.env.WEB_APP_URL } }]
      ]
    }
  });
});
