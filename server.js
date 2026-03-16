const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// API Routes
app.get('/api/phone-profiles', (req, res) => {
    res.json(require('./phone-profiles.js').phoneProfiles);
});

app.get('/api/weapon-data', (req, res) => {
    res.json(require('./weapon-data.js').weaponData);
});

app.get('/api/ashell-commands', (req, res) => {
    res.json(require('./ashell-commands.js').ashellCommands);
});

app.post('/api/generate-sensi', (req, res) => {
    const { phone, weapon } = req.body;
    const phoneProfiles = require('./phone-profiles.js').phoneProfiles;
    const { generateSensitivity } = require('./sensi-generator.js');
    
    const sensitivity = generateSensitivity(phoneProfiles[phone], weapon);
    res.json(sensitivity);
});

app.post('/api/chat', (req, res) => {
    const { message } = req.body;
    // Simple AI response logic
    let response = '';
    const lowerMsg = message.toLowerCase();
    
    if (lowerMsg.includes('ump')) {
        response = 'UMP best at 185-190 sensitivity with gyro!';
    } else if (lowerMsg.includes('m1887')) {
        response = 'M1887 needs MAX 200 sensitivity for quick flicks!';
    } else if (lowerMsg.includes('fps')) {
        response = 'Use ASHELL command: fps 90 to unlock 90 FPS';
    } else {
        response = 'Ask me about weapons, sensitivity, or ASHELL commands!';
    }
    
    res.json({ response });
});

// Serve main page
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Zaka Sensi Bot running on http://localhost:${PORT}`);
});
