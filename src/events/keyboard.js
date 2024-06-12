// keyboard.js

import { handleSendMessage } from '../../main.js';

export function initializeKeyboardEvents(inputElement, messagesElement, bot) {
	document.addEventListener('DOMContentLoaded', function () {
		if (inputElement) {
			inputElement.addEventListener('keydown', (event) => {
				if (event.key === 'Enter') {
					handleSendMessage(bot, inputElement, messagesElement, bot.key);
				}
			});
		} else {
			console.error("L'élément input n'a pas été trouvé.");
		}
	});
}
