// main.js - Core application logic

import { phoneProfiles } from './phone-profiles.js';
import { weaponData } from './weapon-data.js';
import { ashellCommands } from './ashell-commands.js';
import { generateSensitivity } from './sensi-generator.js';
import { initVideoPlayer } from './video-player.js';
import { initAIChat } from './ai-chat.js';

class ZakaSensiBot {
    constructor() {
        this.selectedPhone = 'iphone15';
        this.selectedWeapon = 'ump';
        this.currentSensi = 200;
        this.phoneProfiles = phoneProfiles;
        this.weaponData = weaponData;
        this.ashellCommands = ashellCommands;
        
        this.init();
    }
    
    init() {
        this.loadEventListeners();
        this.initPhoneDisplay();
        this.initWeaponStrip();
        this.initVideoPlayer();
        this.initAIChat();
        this.loadAshellCommands();
    }
    
    loadEventListeners() {
        // Phone selection
        document.querySelectorAll('.phone-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.selectPhone(e.currentTarget.dataset.phone);
            });
        });
        
        // Generate button
        document.getElementById('generateSensi').addEventListener('click', () => {
            this.generateSensitivityForPhone();
        });
        
        // Weapon selection
        document.querySelectorAll('.weapon-item').forEach(item => {
            item.addEventListener('click', (e) => {
                this.selectWeapon(e.currentTarget.dataset.weapon);
            });
        });
        
        // ASHELL command execution
        document.getElementById('executeAshell').addEventListener('click', () => {
            this.executeAshellCommand();
        });
        
        document.getElementById('ashellInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.executeAshellCommand();
            }
        });
        
        // Chat functionality
        document.getElementById('sendMessage').addEventListener('click', () => {
            this.sendChatMessage();
        });
        
        document.getElementById('chatInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendChatMessage();
            }
        });
        
        // Suggestion chips
        document.querySelectorAll('.chip').forEach(chip => {
            chip.addEventListener('click', () => {
                document.getElementById('chatInput').value = chip.textContent;
                this.sendChatMessage();
            });
        });
        
        // Clear chat
        document.querySelector('.clear-chat').addEventListener('click', () => {
            this.clearChat();
        });
        
        // Modal close
        document.querySelector('.close-modal').addEventListener('click', () => {
            document.getElementById('weaponModal').classList.remove('show');
        });
    }
    
    selectPhone(phoneId) {
        this.selectedPhone = phoneId;
        
        // Update active state
        document.querySelectorAll('.phone-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.phone === phoneId) {
                btn.classList.add('active');
            }
        });
        
        // Update display
        const phoneName = btn.querySelector('span').textContent;
        document.getElementById('selectedPhone').textContent = phoneName;
        
        // Update phone specs
        this.updatePhoneSpecs(phoneId);
    }
    
    updatePhoneSpecs(phoneId) {
        const specs = this.phoneProfiles[phoneId];
        const specsContainer = document.getElementById('phoneSpecs');
        
        if (specs) {
            specsContainer.innerHTML = `
                <div class="spec"><i class="fas fa-microchip"></i> ${specs.processor}</div>
                <div class="spec"><i class="fas fa-memory"></i> ${specs.ram}</div>
                <div class="spec"><i class="fas fa-tachometer-alt"></i> ${specs.refreshRate}</div>
                <div class="spec"><i class="fas fa-dragon"></i> ${specs.dpi} DPI</div>
            `;
        }
    }
    
    generateSensitivityForPhone() {
        const phoneSpecs = this.phoneProfiles[this.selectedPhone];
        const sensitivity = generateSensitivity(phoneSpecs, this.selectedWeapon);
        
        // Update display
        document.getElementById('generalSensi').textContent = sensitivity.general;
        document.getElementById('redDotSensi').textContent = sensitivity.redDot;
        document.getElementById('scope2xSensi').textContent = sensitivity.scope2x;
        document.getElementById('scope4xSensi').textContent = sensitivity.scope4x;
        document.getElementById('freeLookSensi').textContent = sensitivity.freeLook;
        document.getElementById('sniperSensi').textContent = sensitivity.sniper;
        
        // Update video sensi indicator
        document.getElementById('videoSensi').textContent = sensitivity.general;
        
        // Update weapon-specific sensitivities
        this.updateWeaponSensitivities(sensitivity.weapons);
        
        // Add animation
        this.animateSensiChange();
        
        // Add AI message about generation
        this.addAIMessage(`✅ Generated sensitivity for ${document.getElementById('selectedPhone').textContent} with ${this.selectedWeapon.toUpperCase()} as primary weapon!`);
    }
    
    updateWeaponSensitivities(weaponSensi) {
        const weaponList = document.getElementById('weaponSensiList');
        weaponList.innerHTML = '';
        
        Object.entries(weaponSensi).forEach(([weapon, sensi]) => {
            const weaponRow = document.createElement('div');
            weaponRow.className = 'sensi-row';
            weaponRow.innerHTML = `
                <span>${weapon.toUpperCase()}</span>
                <span class="sensi-value">${sensi}</span>
            `;
            weaponList.appendChild(weaponRow);
        });
    }
    
    animateSensiChange() {
        const sensiElements = document.querySelectorAll('.sensi-value');
        sensiElements.forEach(el => {
            el.style.transform = 'scale(1.2)';
            setTimeout(() => {
                el.style.transform = 'scale(1)';
            }, 200);
        });
    }
    
    selectWeapon(weaponId) {
        this.selectedWeapon = weaponId;
        
        // Update active state
        document.querySelectorAll('.weapon-item').forEach(item => {
            item.classList.remove('active');
            if (item.dataset.weapon === weaponId) {
                item.classList.add('active');
            }
        });
        
        // Update weapon demo text
        document.querySelector('.weapon-demo span').textContent = 
            `${weaponId.toUpperCase()} · PRO GAMEPLAY`;
        
        // Show weapon details modal
        this.showWeaponDetails(weaponId);
    }
    
    showWeaponDetails(weaponId) {
        const weapon = this.weaponData[weaponId];
        const modal = document.getElementById('weaponModal');
        const modalBody = document.getElementById('weaponModalBody');
        
        if (weapon) {
            document.getElementById('weaponModalTitle').textContent = 
                `${weaponId.toUpperCase()} Sensitivity Guide`;
            
            modalBody.innerHTML = `
                <div style="margin-bottom: 20px;">
                    <h4 style="color: var(--primary); margin-bottom: 10px;">Best Sensitivity</h4>
                    <div class="sensi-row">
                        <span>Recommended</span>
                        <span class="sensi-value">${weapon.recommendedSensi}</span>
                    </div>
                    <div class="sensi-row">
                        <span>Pro Player Avg</span>
                        <span class="sensi-value">${weapon.proSensi}</span>
                    </div>
                </div>
                
                <div style="margin-bottom: 20px;">
                    <h4 style="color: var(--primary); margin-bottom: 10px;">Loadout Tips</h4>
                    <ul style="list-style: none; padding: 0;">
                        ${weapon.tips.map(tip => `
                            <li style="margin-bottom: 8px; padding-left: 20px; position: relative;">
                                <i class="fas fa-check" style="color: var(--success); position: absolute; left: 0;"></i>
                                ${tip}
                            </li>
                        `).join('')}
                    </ul>
                </div>
                
                <div>
                    <h4 style="color: var(--primary); margin-bottom: 10px;">ASHELL Commands</h4>
                    ${weapon.ashellCommands.map(cmd => `
                        <div class="ashell-item" style="margin-bottom: 8px;">
                            <code>${cmd}</code>
                        </div>
                    `).join('')}
                </div>
            `;
        }
        
        modal.classList.add('show');
    }
    
    loadAshellCommands() {
        const ashellGrid = document.querySelector('.ashell-grid');
        ashellGrid.innerHTML = '';
        
        Object.entries(this.ashellCommands).forEach(([cmd, desc]) => {
            const item = document.createElement('div');
            item.className = 'ashell-item';
            item.innerHTML = `
                <code>${cmd}</code>
                <span class="ashell-desc">${desc}</span>
            `;
            item.addEventListener('click', () => {
                document.getElementById('ashellInput').value = cmd;
            });
            ashellGrid.appendChild(item);
        });
    }
    
    executeAshellCommand() {
        const input = document.getElementById('ashellInput');
        const command = input.value.trim();
        
        if (command) {
            // Add to chat
            this.addUserMessage(`ASHELL: ${command}`);
            
            // Simulate execution
            setTimeout(() => {
                if (this.ashellCommands[command]) {
                    this.addAIMessage(`✅ Command executed: ${command}\n${this.ashellCommands[command]}`);
                } else if (command.includes('upscale')) {
                    this.addAIMessage(`✅ Graphics upscaled to 1.9x • FPS boosted to 90`);
                } else if (command.includes('fps')) {
                    this.addAIMessage(`✅ FPS unlocked to 90 • Smooth gameplay enabled`);
                } else {
                    this.addAIMessage(`⚠️ Unknown command. Try: upscale 1.9, fps 90, smooth 2.0`);
                }
            }, 500);
            
            input.value = '';
        }
    }
    
    sendChatMessage() {
        const input = document.getElementById('chatInput');
        const message = input.value.trim();
        
        if (message) {
            this.addUserMessage(message);
            
            // Simulate AI thinking
            setTimeout(() => {
                this.generateAIResponse(message);
            }, 500 + Math.random() * 500);
            
            input.value = '';
        }
    }
    
    addUserMessage(message) {
        const chatMessages = document.getElementById('chatMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message user-message';
        messageDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-user"></i>
            </div>
            <div class="message-content">
                <p>${message}</p>
                <span class="message-time">Just now</span>
            </div>
        `;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    addAIMessage(message) {
        const chatMessages = document.getElementById('chatMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message ai-message';
        messageDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-content">
                <p>${message.replace(/\n/g, '<br>')}</p>
                <span class="message-time">Just now</span>
            </div>
        `;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    generateAIResponse(message) {
        const lowerMsg = message.toLowerCase();
        let response = '';
        
        if (lowerMsg.includes('ump') || lowerMsg.includes('ump45')) {
            response = "For UMP, use 180-190 general sensitivity. Red dot at 185, 2x at 170. Try ASHELL: upscale 1.9 for better recoil control!";
        } else if (lowerMsg.includes('xm8')) {
            response = "XM8 works best with 175-185 sensitivity. Use 4x at 160. Pro tip: enable gyroscope at 200 for better long-range!";
        } else if (lowerMsg.includes('m1887')) {
            response = "M1887 shotgun needs 190-200 sensitivity for quick flicks. Red dot at 195. Use ASHELL command: smooth 2.0";
        } else if (lowerMsg.includes('fps') || lowerMsg.includes('90')) {
            response = "To unlock 90 FPS, use ASHELL command: fps 90. Make sure your device supports it! Your ${document.getElementById('selectedPhone').textContent} can handle it.";
        } else if (lowerMsg.includes('ashell')) {
            response = "Available ASHELL commands:\n• upscale 1.9 - Boost graphics\n• fps 90 - Unlock 90 FPS\n• smooth 2.0 - Enable smoothness\n• render 120 - Increase render scale\n• gpu turbo - Overclock GPU";
        } else if (lowerMsg.includes('best') || lowerMsg.includes('recommend')) {
            response = `Based on your ${document.getElementById('selectedPhone').textContent}, I recommend:\nGeneral: 185\nRed Dot: 192\n2x: 178\n4x: 155\nSniper: 140\n\nClick GENERATE to apply!`;
        } else if (lowerMsg.includes('hello') || lowerMsg.includes('hi')) {
            response = "Hello! I'm Zaka AI. Select your phone and ask me about sensitivity settings, weapons, or ASHELL commands!";
        } else {
            response = "I can help with sensitivity settings, weapon builds, and ASHELL commands. Try asking about UMP, M1887, or 90 FPS!";
        }
        
        this.addAIMessage(response);
    }
    
    clearChat() {
        const chatMessages = document.getElementById('chatMessages');
        chatMessages.innerHTML = `
            <div class="message ai-message">
                <div class="message-avatar">
                    <i class="fas fa-robot"></i>
                </div>
                <div class="message-content">
                    <p>Chat cleared! How can I help you with sensitivity settings?</p>
                    <span class="message-time">Just now</span>
                </div>
            </div>
        `;
    }
    
    initPhoneDisplay() {
        this.updatePhoneSpecs(this.selectedPhone);
    }
    
    initWeaponStrip() {
        // Load more weapons dynamically
        const weaponStrip = document.querySelector('.weapon-strip');
        const additionalWeapons = ['scar', 'ak47', 'm4a1', 'mp40', 'sks', 'dragunov', 'awm', 'vector', 'thompson', 'm1014', 'spas12', 'kar98k'];
        
        additionalWeapons.forEach(weapon => {
            if (!document.querySelector(`[data-weapon="${weapon}"]`)) {
                const weaponItem = document.createElement('div');
                weaponItem.className = 'weapon-item';
                weaponItem.dataset.weapon = weapon;
                weaponItem.innerHTML = `
                    <img src="https://via.placeholder.com/40x40/ff4444/ffffff?text=${weapon.substring(0,3).toUpperCase()}" alt="${weapon}">
                    <span>${weapon.toUpperCase()}</span>
                `;
                weaponStrip.appendChild(weaponItem);
            }
        });
    }
}

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    window.zakaBot = new ZakaSensiBot();
});
