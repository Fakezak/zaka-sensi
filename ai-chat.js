// ai-chat.js

export function initAIChat() {
    // AI response patterns
    const responses = {
        greetings: ['Hello!', 'Hi there!', 'Hey! How can I help?'],
        sensi: ['Try 185 general sensitivity', 'Use 190 for close range', 'Lower to 160 for snipers'],
        weapons: ['UMP needs high sensi', 'M1887 at 200 is deadly', 'XM8 balanced at 175'],
        ashell: ['fps 90 unlocks smooth gameplay', 'upscale 1.9 boosts graphics', 'gpu turbo for performance']
    };
    
    // Random AI thinking indicator
    setInterval(() => {
        const statusDot = document.querySelector('.status-dot');
        statusDot.style.animation = 'pulse 2s infinite';
    }, 3000);
}
