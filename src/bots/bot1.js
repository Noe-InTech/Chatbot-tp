import { Bot } from '../classes/Bot';

export class Bot1 extends Bot {
	constructor() {
		super('Chuck Norris', 'https://api.chucknorris.io/jokes/random');
		this.commands = {
			'joke': this.getJoke,
			'help': this.showHelp,
			'photo': this.sendPhoto,
			'fact': this.getFact,
			'who': this.greet,

		};
	}

	showInitialMessage(messagesElement) {
		const initialMessage = 'Saluuttt ! Moi c\'est Chuck Novice, mais tu peux m\'appeler Chuck le zinzin, parce que je suis complétement crazyyyy comme on dit aujourd\'hui. Tape "help" pour voir les commandes disponibles. PS : J\'arore les armes et les explosions !';
		const timestamp = new Date().toLocaleTimeString();
		const botMessage = {
			sender: this.name,
			text: initialMessage,
			time: timestamp
		};
		this.addMessageToChat(botMessage, messagesElement);
	}

	async getJoke() {
		try {
			const response = await fetch('https://api.chucknorris.io/jokes/random');
			const data = await response.json();
			return data.value;
		} catch (error) {
			console.error('Error fetching Chuck Norris joke:', error);
			return 'Désolé, je suis à cours de blagues.';
		}
	}

	sendPhoto() {
		return 'images.6f062f1c.jpg';
	}

	async getFact() {
		try {
			const response = await fetch('https://uselessfacts.jsph.pl/random.json?language=en');
			const data = await response.json();
			return data.text; // Retourne directement le texte du fait
		} catch (error) {
			console.error('Error fetching fact:', error);
			return 'Désolé, je ne peux pas trouver de fait intéressant pour le moment.';
		}
	}

	showHelp() {
		return 'Commandes disponibles : joke, help, photo, fact, who';
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
		return "Bonjour à tous ! Je suis Chuck Novice.";
	}

}
