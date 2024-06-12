// click.js

import { handleSendMessage } from '../../main.js';

export function initializeClickEvents(sendButton, inputElement, messagesElement, bot) {
	if (sendButton) {
		sendButton.addEventListener('click', () => {
			handleSendMessage(bot, inputElement, messagesElement, bot.key);
		});
	} else {
		console.error("Le bouton d'envoi n'a pas été trouvé.");
	}
}
