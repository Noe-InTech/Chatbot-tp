export function loadMessagesFromLocalStorage(botKey, messagesElement) {
    const messages = JSON.parse(localStorage.getItem(botKey)) || [];
    
    // Trier les messages par leur horodatage
    messages.sort((a, b) => new Date(a.time) - new Date(b.time));

    messages.forEach((message) => {
        addMessageToChat(message, messagesElement);
    });
    console.log("Messages chargés pour ", botKey, ":", messages);
}

export function saveMessagesToLocalStorage(botKey, message) {
    const messages = JSON.parse(localStorage.getItem(botKey)) || [];
    messages.push(message);
    localStorage.setItem(botKey, JSON.stringify(messages));
    console.log(`Message sauvegardé pour ${botKey}:`, messages);
}

export async function addMessageToChat(message, messagesElement) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.classList.add(message.sender === 'user' ? 'user-message' : 'bot-message');

    const avatarElement = document.createElement('img');
    avatarElement.classList.add('avatar');
    avatarElement.src = getAvatarUrl(message.sender);

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

// Fonction pour obtenir l'URL de l'avatar
function getAvatarUrl(sender) {
    const avatarKey = `avatar_${sender}`;
    let avatarUrl = localStorage.getItem(avatarKey);
    if (!avatarUrl) {
        avatarUrl = generateAvatarUrl(sender);
        localStorage.setItem(avatarKey, avatarUrl);
    }
    return avatarUrl;
}

// Fonction pour générer une URL d'avatar aléatoire pour les bots
function generateAvatarUrl(sender) {
    if (sender === 'Chuck Norris') {
        return "images.6f062f1c.jpg"; // Avatar statique pour Chuck Norris
    } else {
        // Générer une URL d'avatar aléatoire pour les autres bots
        return `https://randomuser.me/api/portraits/${Math.random() < 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 100)}.jpg`;
    }
}

// Fonction pour vérifier si une URL est une image valide
function isValidImageUrl(url) {
    return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
}
