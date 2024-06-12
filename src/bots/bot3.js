import { Bot } from '../classes/Bot';

export class Bot3 extends Bot {
	constructor() {
		super('Dog Bot', 'https://dog.ceo/api/breeds/image/random');
		this.commands = {
			'dog': this.getDogImage,
			'help': this.showHelp,
			'name': this.getRandomName,
			'citation': this.getQuote,
			'who': this.greet,

		};
	}

	async getDogImage() {
		try {
			const response = await fetch('https://dog.ceo/api/breeds/image/random');
			const data = await response.json();
			return data.message;
		} catch (error) {
			console.error('Error fetching dog image:', error);
			return 'Désolé, je n\'ai pas pu récupérer d\'image de chien pour le moment.';
		}
	}

	async getRandomName() {
		const names = ['Max', 'Bella', 'Charlie', 'Lucy', 'Cooper', 'Daisy', 'Rocky', 'Luna', 'Bailey', 'Sadie'];
		const randomIndex = Math.floor(Math.random() * names.length);
		return `tu aimes bien le prénom "${names[randomIndex]}"?`;
	}

	async getQuote() {
		try {
			const response = await fetch('https://api.quotable.io/random');
			const data = await response.json();
			return `"${data.content}" - ${data.author}`;
		} catch (error) {
			console.error('Error fetching quote:', error);
			return 'Désolé, je n\'ai pas pu récupérer de citation inspirante pour le moment.';
		}
	}


	showInitialMessage(messagesElement) {
		const initialMessage = 'Wouf woufff ! Moi c\'est DogMan, et j\'adore les chiens. Tape "dog" pour voir mes meilleurs potes.';
		const timestamp = new Date().toLocaleTimeString();
		const botMessage = {
			sender: this.name,
			text: initialMessage,
			time: timestamp
		};
		this.addMessageToChat(botMessage, messagesElement);
	}

	showHelp() {
		return 'Commandes disponibles : dog, name, citation (je suis un toutou inspiré), help, who';
	}

	showCommands() {
		return 'Commandes disponibles : dog, name, citation';
	}

	respondTo(message) {
		const command = message.trim().toLowerCase();
		if (command in this.commands) {
			return this.commands[command]();
		} else {
			return 'Commande non reconnue. Tapez "help" pour voir les commandes disponibles.';
		}
	}

	async greet() {
		return "Bonjour à tous ! Je suis DogMan.";
	}
}
