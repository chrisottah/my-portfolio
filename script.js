// 1. Scroll Reveal Logic
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('active'); });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// 2. Project Modal Data
const projectData = {
    ln247: {
        title: "LN247 Web/Mobile App",
        desc: "A massive production platform for media outlets featuring live TV streaming and content delivery.",
        problem: "The challenge was handling high-submission traffic while maintaining sub-second latency for live streams.",
        date: "October 2025", link: "#"
    },
    eden: {
        title: "Eden AI",
        desc: "An automated decision infrastructure designed for enterprise-level data processing.",
        problem: "Legacy systems were failing to automate complex conditional business logic in real-time.",
        date: "December 2025", link: "#"
    },
    nova: {
        title: "Nova AI Concierge",
        desc: "My personal automated portfolio agent, demonstrating full RAG and VLLM integration.",
        problem: "Passive portfolio visitors often leave without finding specific tech-stack details they need.",
        date: "January 2026", link: "#"
    }
};

function openProject(key) {
    const data = projectData[key];
    document.getElementById('modalContent').innerHTML = `
        <h2 style="font-size:2rem; margin-bottom:15px;">${data.title}</h2>
        <p style="color:#94a3b8; margin-bottom:20px;">${data.desc}</p>
        <div class="modal-info-grid">
            <div><span class="info-label">The Problem</span><p style="font-size:0.9rem;">${data.problem}</p></div>
            <div><span class="info-label">Completion Date</span><p style="font-size:0.9rem;">${data.date}</p></div>
        </div>
        <div style="margin-top:35px;"><a href="${data.link}" class="cta-btn">View Live Project</a></div>`;
    document.getElementById('projectModal').style.display = 'flex';
}

function closeProject() { document.getElementById('projectModal').style.display = 'none'; }

// Handle Modal closing on outside click
window.onclick = (e) => { 
    if (e.target.className === 'modal') closeProject(); 
}

// 3. Mobile Navigation Logic
function toggleMobileMenu() {
    if (window.innerWidth <= 768) {
        const menu = document.getElementById('mobile-menu');
        const links = document.getElementById('nav-links');
        menu.classList.toggle('active');
        links.classList.toggle('active');

        // Prevent scrolling when menu is open
        document.body.style.overflow = links.classList.contains('active') ? 'hidden' : 'auto';
    }
}

// 4. NOVA AI (First Person Logic)
let chatInitiated = false;

function toggleChat() {
    const win = document.getElementById('chatWindow');
    if (win.style.display === 'flex') {
        win.style.display = 'none';
    } else {
        win.style.display = 'flex';
        setTimeout(() => document.getElementById('chatInput').focus(), 100);
    }
}

function clearChat() {
    const body = document.getElementById('chatBody');
    body.innerHTML = '<div class="bot-msg">Chat cleared. I\'m ready for new questions!</div>';
}

function autoGreet(reason) {
    if (chatInitiated) return;
    const win = document.getElementById('chatWindow');
    win.style.display = 'flex';
    
    let message = "Hi! I'm Nova, Christian's AI twin. I noticed you've been exploring my work for a bit. Need a hand or want to know more about a specific project?";
    if(reason === 'scroll') message = "Ready to build something reliable? I'm right here if you have questions, or you can drop me an email below!";
    
    addMsg(message, 'bot');
    chatInitiated = true;
}

// AI Triggers
setTimeout(() => autoGreet('time'), 180000); 

window.addEventListener('scroll', () => {
    const contactSection = document.getElementById('contact');
    if(contactSection) {
        const position = contactSection.getBoundingClientRect();
        if(position.top < window.innerHeight && position.bottom >= 0) {
            autoGreet('scroll');
        }
    }
});

function addMsg(text, sender) {
    const body = document.getElementById('chatBody');
    const msg = document.createElement('div');
    msg.className = sender === 'user' ? 'user-msg' : 'bot-msg';
    msg.innerText = text;
    body.appendChild(msg);
    body.scrollTop = body.scrollHeight;
}

function handleUserInput() {
    const input = document.getElementById('chatInput');
    if(!input || !input.value) return;
    
    const text = input.value.toLowerCase();
    addMsg(input.value, 'user');
    input.value = '';

    let response = "That's interesting! Feel free to reach out to me directly at christian@example.com so we can discuss that further.";
    
    if(text.includes('service') || text.includes('build')) {
        response = "I specialize in MERN stack, Flutter, and AI infrastructure. I love turning complex ideas into reliable systems.";
    } else if(text.includes('stack') || text.includes('tech')) {
        response = "I work primarily with React, Node.js, and Python. I'm currently deep into VLLM and AI-powered automation.";
    }

    setTimeout(() => addMsg(response, 'bot'), 800);
}

// Add "Enter" key support for the chat input
document.addEventListener('keypress', function (e) {
    const input = document.getElementById('chatInput');
    if (e.key === 'Enter' && document.activeElement === input) {
        handleUserInput();
    }
});