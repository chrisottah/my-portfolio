const chatWindow = document.getElementById('chatWindow');
const chatBody = document.getElementById('chatBody');

function toggleChat() {
    chatWindow.style.display = chatWindow.style.display === 'flex' ? 'none' : 'flex';
}

function ask(question) {
    appendMessage('user', question);
    processAI(question);
}

function sendMessage() {
    const input = document.getElementById('chatInput');
    if (input.value.trim() === "") return;
    appendMessage('user', input.value);
    processAI(input.value);
    input.value = "";
}

function appendMessage(sender, text) {
    const msg = document.createElement('div');
    msg.className = sender === 'user' ? 'user-msg' : 'bot-msg';
    msg.style.padding = "10px";
    msg.style.borderRadius = "8px";
    msg.style.marginBottom = "5px";
    msg.style.background = sender === 'user' ? '#333' : '#ff000022';
    msg.style.alignSelf = sender === 'user' ? 'flex-end' : 'flex-start';
    msg.innerText = text;
    chatBody.appendChild(msg);
    chatBody.scrollTop = chatBody.scrollHeight;
}

function processAI(query) {
    // Knowledge Base Logic
    let response = "That's an interesting question! I'm still learning, but Christian specializes in MERN, Flutter, and AI integration.";
    
    if (query.toLowerCase().includes('services')) {
        response = "Christian offers Fullstack Web Dev, Mobile App development (Flutter), and AI System Architecture.";
    } else if (query.toLowerCase().includes('price')) {
        response = "Pricing is project-based. For a custom quote, please use the contact form to reach Christian directly!";
    } else if (query.toLowerCase().includes('projects')) {
        response = "You can see LN247, Eden AI, and Nova Concierge right here on the 'Work' section of the site!";
    }

    setTimeout(() => appendMessage('bot', response), 600);
}