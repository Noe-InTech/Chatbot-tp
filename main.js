import { Bot1 } from './src/bots/bot1.js';
import { Bot2 } from './src/bots/bot2.js';
import { Bot3 } from './src/bots/bot3.js';
import { initializeKeyboardEvents } from './src/events/keyboard.js';
import { initializeClickEvents } from './src/events/click.js';
import { loadMessagesFromLocalStorage, saveMessagesToLocalStorage } from './src/utils/localStorage.js';
export const COMMON_ACTION = "greet";

const bot1 = new Bot1();
const bot2 = new Bot2();
const bot3 = new Bot3();

loadMessagesFromLocalStorage('bot1', document.getElementById('bot1-messages'));
loadMessagesFromLocalStorage('bot2', document.getElementById('bot2-messages'));
loadMessagesFromLocalStorage('bot3', document.getElementById('bot3-messages'));

initializeKeyboardEvents(document.getElementById('bot1-input'), document.getElementById('bot1-messages'), bot1);
initializeKeyboardEvents(document.getElementById('bot2-input'), document.getElementById('bot2-messages'), bot2);
initializeKeyboardEvents(document.getElementById('bot3-input'), document.getElementById('bot3-messages'), bot3);

initializeClickEvents(document.getElementById('bot1-send'), document.getElementById('bot1-input'), document.getElementById('bot1-messages'), bot1);
initializeClickEvents(document.getElementById('bot2-send'), document.getElementById('bot2-input'), document.getElementById('bot2-messages'), bot2);
initializeClickEvents(document.getElementById('bot3-send'), document.getElementById('bot3-input'), document.getElementById('bot3-messages'), bot3);




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

		inputElement.value = '';
	}
}

const botAvatars = {};
const userAvatars = {};

async function addMessageToChat(message, messagesElement) {
	const messageElement = document.createElement('div');
	messageElement.classList.add('message');
	messageElement.classList.add(message.sender === 'user' ? 'user-message' : 'bot-message');

	const avatarElement = document.createElement('img');
	avatarElement.classList.add('avatar');

	if (message.sender === 'user') {
		if (!userAvatars[message.sender]) {
			userAvatars[message.sender] = await getRandomAvatar();
		}
		avatarElement.src = userAvatars[message.sender];
	} else {
		const botName = message.sender;
		if (!botAvatars[botName]) {
			botAvatars[botName] = await getRandomAvatar(botName);
		}
		avatarElement.src = botAvatars[botName];
	}

	messageElement.appendChild(avatarElement);

	const messageTextElement = document.createElement('div');
	messageTextElement.classList.add('message-text');

	if (isValidImageUrl(message.text)) {
		const imageElement = document.createElement('img');
		imageElement.src = message.text;
		imageElement.alt = 'User Message Image';
		imageElement.style.maxWidth = '50%';
		messageTextElement.appendChild(imageElement);
	} else {
		messageTextElement.innerHTML = `<strong>${message.sender}</strong> [${message.time}]: ${message.text}`;
	}

	messageElement.appendChild(messageTextElement);

	messagesElement.appendChild(messageElement);
	messagesElement.scrollTop = messagesElement.scrollHeight;
}




async function getRandomAvatar(botName) {
	console.log('Chuck Norris:', botName);
	if (botName === 'Chuck Norris') {
		return "images.6f062f1c.jpg";
	} else {
		try {
			const response = await fetch('https://randomuser.me/api/');
			const data = await response.json();
			const avatarUrl = data.results[0].picture.thumbnail;
			return avatarUrl;
		} catch (error) {
			console.error('Error fetching random avatar:', error);
			return 'https://via.placeholder.com/50';
		}
	}
}



function isValidImageUrl(url) {
	return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
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
