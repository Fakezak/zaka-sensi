// weapon-data.js

export const weaponData = {
    ump: {
        type: 'SMG',
        recommendedSensi: 185,
        proSensi: 192,
        tips: [
            'Use high sensitivity for close range',
            'Enable gyroscope for better control',
            'Practice wall sprays to master recoil'
        ],
        ashellCommands: ['upscale 1.9', 'fps 90', 'smooth 2.0']
    },
    xm8: {
        type: 'AR',
        recommendedSensi: 178,
        proSensi: 185,
        tips: [
            'Medium sensitivity for versatile range',
            '4x scope works best at 160',
            'Tap fire for long distance'
        ],
        ashellCommands: ['render 120', 'gpu turbo', 'unlock 240hz']
    },
    m1887: {
        type: 'Shotgun',
        recommendedSensi: 195,
        proSensi: 200,
        tips: [
            'Maximum sensitivity for quick flicks',
            'Jump shots with 200 sensi',
            'Use dragon breath for extra damage'
        ],
        ashellCommands: ['smooth 2.0', 'upscale 1.9', 'fps 90']
    },
    scar: {
        type: 'AR',
        recommendedSensi: 180,
        proSensi: 188,
        tips: [
            'Balanced for all ranges',
            'Red dot at 185',
            'Compensator reduces recoil'
        ],
        ashellCommands: ['upscale 1.9', 'fps 90']
    },
    ak47: {
        type: 'AR',
        recommendedSensi: 175,
        proSensi: 182,
        tips: [
            'High damage, control recoil',
            'Use gyroscope for stability',
            'Foregrip is essential'
        ],
        ashellCommands: ['gpu turbo', 'render 120']
    },
    m4a1: {
        type: 'AR',
        recommendedSensi: 182,
        proSensi: 190,
        tips: [
            'Easy recoil, high sensitivity',
            'Perfect for beginners',
            'Silencer recommended'
        ],
        ashellCommands: ['smooth 2.0', 'fps 90']
    },
    mp40: {
        type: 'SMG',
        recommendedSensi: 188,
        proSensi: 195,
        tips: [
            'High fire rate, high sensi',
            'Extended mag needed',
            'Hip fire accuracy bonus'
        ],
        ashellCommands: ['upscale 1.9', 'unlock 240hz']
    },
    sks: {
        type: 'DMR',
        recommendedSensi: 165,
        proSensi: 172,
        tips: [
            'Lower sensitivity for precision',
            '4x or 6x scope optimal',
            'Single tap for accuracy'
        ],
        ashellCommands: ['render 120', 'gpu turbo']
    }
};
