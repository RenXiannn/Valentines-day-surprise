// Create floating hearts background
function createFloatingHearts(containerId) {
    const container = document.getElementById(containerId);
    const hearts = ['💕', '💖', '💗', '💓', '💝', '💘'];
    
    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
        heart.style.animationDuration = (Math.random() * 4 + 6) + 's';
        heart.style.animationDelay = Math.random() * 2 + 's';
        
        container.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 10000);
    }, 300);
}

// Initialize floating hearts
createFloatingHearts('heartBg');

// No button behavior
const noBtn = document.getElementById('noBtn');
const message = document.getElementById('message');
const yesBtn = document.getElementById('yesBtn');

const messages = [
    "Are you sure? 🥺",
    "Really? Think again rn! 💭",
    "But why? 😢",
    "Pleaseeeeee My Love! 🙏",
    "You Hate me XU XI YU! 💔",
    "You don't love me anymoreee 🥹",
    "Be my valentines RN! ✨",
    "I'm going to cry! 😭",
    "Your Bullying me! you hate me 💕"
];

let messageIndex = 0;
let noBtnAttempts = 0;

noBtn.addEventListener('mouseenter', () => {
    noBtnAttempts++;
    
    // Show message
    message.textContent = messages[messageIndex % messages.length];
    messageIndex++;
    
    // Move button to random position
    const isMobile = window.innerWidth <= 768;
    
    // Calculate safe boundaries (keeping button within viewport)
    const maxX = window.innerWidth - noBtn.offsetWidth - 20;
    const maxY = window.innerHeight - noBtn.offsetHeight - 20;
    const minX = 10;
    const minY = 100;
    
    let newX, newY;
    
    // Make sure new position is far enough from Yes button
    const minDistance = isMobile ? 120 : 200;
    do {
        newX = Math.random() * (maxX - minX) + minX;
        newY = Math.random() * (maxY - minY) + minY;
    } while (
        Math.abs(newX - yesBtn.offsetLeft) < minDistance && 
        Math.abs(newY - yesBtn.offsetTop) < 80
    );
    
    noBtn.style.position = 'fixed';
    noBtn.style.left = newX + 'px';
    noBtn.style.top = newY + 'px';
    
    // Make Yes button bigger with each attempt (smaller growth on mobile)
    const growthRate = isMobile ? 0.05 : 0.1;
    const newScale = 1 + (noBtnAttempts * growthRate);
    yesBtn.style.transform = `scale(${newScale})`;
});

// Add touch support for mobile
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    noBtnAttempts++;
    
    // Show message
    message.textContent = messages[messageIndex % messages.length];
    messageIndex++;
    
    // Move button to random position
    const maxX = window.innerWidth - noBtn.offsetWidth - 20;
    const maxY = window.innerHeight - noBtn.offsetHeight - 20;
    const minX = 10;
    const minY = 100;
    
    let newX, newY;
    
    const minDistance = 120;
    do {
        newX = Math.random() * (maxX - minX) + minX;
        newY = Math.random() * (maxY - minY) + minY;
    } while (
        Math.abs(newX - yesBtn.offsetLeft) < minDistance && 
        Math.abs(newY - yesBtn.offsetTop) < 80
    );
    
    noBtn.style.position = 'fixed';
    noBtn.style.left = newX + 'px';
    noBtn.style.top = newY + 'px';
    
    const newScale = 1 + (noBtnAttempts * 0.05);
    yesBtn.style.transform = `scale(${newScale})`;
});

// Yes button - show success page
yesBtn.addEventListener('click', () => {
    document.getElementById('questionPage').classList.add('hidden');
    document.getElementById('successPage').classList.remove('hidden');
    
    // Create hearts for success page
    createFloatingHearts('heartBg2');
});
