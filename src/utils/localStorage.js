export function loadMessagesFromLocalStorage(botKey, messagesElement) {
	const messages = JSON.parse(localStorage.getItem(botKey)) || [];
	messages.forEach((message) => {
		addMessageToChat(message, messagesElement);
	});
}

export function saveMessagesToLocalStorage(botKey, message) {
	const messages = JSON.parse(localStorage.getItem(botKey)) || [];
	messages.push(message);
	localStorage.setItem(botKey, JSON.stringify(messages));
}

function addMessageToChat(message, messagesElement) {
	const messageElement = document.createElement('div');
	messageElement.classList.add('message');
	messageElement.classList.add(message.sender === 'user' ? 'user-message' : 'bot-message');
	messageElement.innerHTML = `<strong>${message.sender}</strong> [${message.time}]: ${message.text}`;
	messagesElement.appendChild(messageElement);
	messagesElement.scrollTop = messagesElement.scrollHeight;
}
