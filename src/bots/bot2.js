import { Bot } from '../classes/Bot';

export class Bot2 extends Bot {
	constructor() {
		super('Robot conseil', 'https://api.adviceslip.com/advice');
		this.commands = {
			'advice': this.getAdvice,
			'help': this.showHelp,
			'robotimage': this.getRobotImage,
			'transformers': this.getTransformersWiki,
			'who': this.greet,

		};
	}

	showInitialMessage(messagesElement) {
		const initialMessage = 'Salut ! Moi c\'est le Robot conseil, je suis là pour te donner des conseils. Tape "advice" pour en avoir un !';
		const timestamp = new Date().toLocaleTimeString();
		const botMessage = {
			sender: this.name,
			text: initialMessage,
			time: timestamp
		};
		this.addMessageToChat(botMessage, messagesElement);
	}

	async getAdvice() {
		try {
			const response = await fetch('https://api.adviceslip.com/advice');
			const data = await response.json();
			return data.slip.advice;
		} catch (error) {
			console.error('Error fetching advice:', error);
			return 'Sorry, I could not fetch advice at the moment.';
		}
	}

	async getRobotImage() {
		try {
			const randomSeed = Math.floor(Math.random() * 1000);
			const imageUrl = `https://robohash.org/${randomSeed}.png`;
			return {
				text: 'téma la taille du robot',
				imageUrl: imageUrl
			};
		} catch (error) {
			console.error('Error fetching robot image:', error);
			return {
				text: 'Sorry, I could not fetch a robot image at the moment.',
				imageUrl: ''
			};
		}
	}

	getTransformersWiki() {
		return 'Le wiki de mon film : https://fr.wikipedia.org/wiki/Transformers';
	}

	showHelp() {
		return 'Commandes disponibles : advice, help, robotimage, transformers, who';
	}

	async respondTo(message) {
		const command = message.trim().toLowerCase();
		if (command in this.commands) {
			const response = await this.commands[command]();
			if (command === 'robotimage') {
				return `${response.text}\n${response.imageUrl}`;
			}
			return response;
		} else {
			return 'Commande non reconnue. Tapez "help" pour voir les commandes disponibles.';
		}
	}

	async greet() {
		return "Bonjour à tous ! Je suis le Robot Conseil.";
	}
}
