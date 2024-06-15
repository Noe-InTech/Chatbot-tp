import { Bot1 } from './src/bots/bot1.js';
import { Bot2 } from './src/bots/bot2.js';
import { Bot3 } from './src/bots/bot3.js';
import { initializeKeyboardEvents } from './src/events/keyboard.js';
import { initializeClickEvents } from './src/events/click.js';
import { loadMessagesFromLocalStorage, saveMessagesToLocalStorage } from './src/utils/localStorage.js';
import { addMessageToChat } from './src/utils/localStorage.js';

const bot1 = new Bot1();
const bot2 = new Bot2();
const bot3 = new Bot3();

document.addEventListener('DOMContentLoaded', () => {
    loadMessagesFromLocalStorage('bot1', document.getElementById('bot1-messages'));
    loadMessagesFromLocalStorage('bot2', document.getElementById('bot2-messages'));
    loadMessagesFromLocalStorage('bot3', document.getElementById('bot3-messages'));

    initializeKeyboardEvents(document.getElementById('bot1-input'), document.getElementById('bot1-messages'), bot1, 'bot1');
    initializeKeyboardEvents(document.getElementById('bot2-input'), document.getElementById('bot2-messages'), bot2, 'bot2');
    initializeKeyboardEvents(document.getElementById('bot3-input'), document.getElementById('bot3-messages'), bot3, 'bot3');

    initializeClickEvents(document.getElementById('bot1-send'), document.getElementById('bot1-input'), document.getElementById('bot1-messages'), bot1, 'bot1');
    initializeClickEvents(document.getElementById('bot2-send'), document.getElementById('bot2-input'), document.getElementById('bot2-messages'), bot2, 'bot2');
    initializeClickEvents(document.getElementById('bot3-send'), document.getElementById('bot3-input'), document.getElementById('bot3-messages'), bot3, 'bot3');
});

export async function handleSendMessage(bot, inputElement, messagesElement, botKey) {
    const message = inputElement.value.trim();
    if (message !== '') {
        const timestamp = new Date().toLocaleTimeString();
        const userMessage = {
            sender: 'user',
            text: message,
            time: timestamp,
        };
        addMessageToChat(userMessage, messagesElement);
        saveMessagesToLocalStorage(botKey, userMessage);
        console.log(`Message sauvegardé pour ${botKey}: `, userMessage);

        if (message.toLowerCase() === 'presentation') {
            const allBots = [bot1, bot2, bot3]; 
            allBots.forEach(b => {
                const botMessage = {
                    sender: b.name,
                    text: `Je suis ${b.name}`, 
                    time: timestamp,
                };
                addMessageToChat(botMessage, messagesElement);
                saveMessagesToLocalStorage(b.key, botMessage);
            });
        } else {
            const botResponsePromise = bot.respondTo(message);
            const botResponse = await botResponsePromise;
            console.log("Retour du bot :", botResponse);

            if (botResponse) {
                const botMessage = {
                    sender: bot.name,
                    text: botResponse,
                    time: timestamp,
                };
                addMessageToChat(botMessage, messagesElement);
                saveMessagesToLocalStorage(botKey, botMessage);
            }
        }

        inputElement.value = '';
    }
}


document.getElementById('switch-to-bot1').addEventListener('click', function () {
    switchToBot('bot1');
});

document.getElementById('switch-to-bot2').addEventListener('click', function () {
    switchToBot('bot2');
});

document.getElementById('switch-to-bot3').addEventListener('click', function () {
    switchToBot('bot3');
});

function switchToBot(botId) {
    const chatBoxes = document.querySelectorAll('.chat-box');
    chatBoxes.forEach(chatBox => {
        chatBox.style.display = 'none';
    });

    document.getElementById(botId + '-chat').style.display = 'block';
}
