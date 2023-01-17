const express = require('express')
const router = express.Router()
const { createBot } = require('whatsapp-cloud-api');

router.post('/', async(req, res) => {
    try {
        // replace the values below
        const from = '117797241201373';
        const token = 'EAAKErH9uO7wBAMLZANdNVQ9x5jIL19kM9pn7fpf1zOrc5U9Pu5bZA5ahhHqH0tApZAgQ9z75ZArvJsGi9Yqv7eAPNvgfxQF6FGDc29foTAv8ZBgmoPePZAigwx9C33dUN74ZBirPt9M5CaEpgEbGAU9dSgPkxlV7P6LRyZAn4Mwn1WQABtKCXH3E9kDuZCdzfJKq1XnG1Si7ZBZCwZDZD';
        const to = '+923363374624';
        const webhookVerifyToken = 'ashar.2day';

        // Create a bot that can send messages
        const bot = createBot(from, token);

        // Send text message
        const result = await bot.sendText(to, 'Hello world');

        // Start express server to listen for incoming messages
        // NOTE: See below under `Documentation/Tutorial` to learn how
        // you can verify the webhook URL and make the server publicly available
        await bot.startExpressServer({
            webhookVerifyToken,
        });

        // Listen to ALL incoming messages
        // NOTE: remember to always run: await bot.startExpressServer() first
        bot.on('message', async(msg) => {
            console.log(msg);

            if (msg.type === 'text') {
                await bot.sendText(msg.from, 'Received your text message!');
            } else if (msg.type === 'image') {
                await bot.sendText(msg.from, 'Received your image!');
            }
        });
    } catch (err) {
        console.log(err);
    }
})