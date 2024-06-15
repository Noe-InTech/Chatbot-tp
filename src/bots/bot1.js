import { Bot } from '../classes/Bot';

export class Bot1 extends Bot {
	constructor() {
		super('Chuck Norris', 'https://dog.ceo/api/breeds/image/random');
		this.commands = {
			'photo': this.sendPhoto,
			'help': this.showHelp,
			'fact': this.getFact,
			'joke': this.getJoke,

		};
	}

	sendPhoto() {
		return 'https://upload.wikimedia.org/wikipedia/commons/3/30/Chuck_Norris_May_2015.jpg';
	}
	async getFact() {
		try {
			const response = await fetch('https://uselessfacts.jsph.pl/random.json?language=en');
			const data = await response.json();
			return data.text; 
		} catch (error) {
			console.error('Error fetching fact:', error);
			return 'Désolé, je ne peux pas trouver de fait intéressant pour le moment.';
		}
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


	showHelp() {
		return 'Commandes disponibles : joke, help, photo, fact, presentation (pour tous les autres bots)';
	}

	respondTo(message) {
		const command = message.trim().toLowerCase();
		if (command in this.commands) {
			return this.commands[command]();
		} else {
			return 'Commande non reconnue. Tapez "help" pour voir les commandes disponibles.';
		}
	}


}
