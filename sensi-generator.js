// sensi-generator.js

export function generateSensitivity(phoneSpecs, primaryWeapon) {
    const baseSensi = phoneSpecs.baseSensi;
    const dpiFactor = phoneSpecs.dpi / 400;
    const refreshRateFactor = parseInt(phoneSpecs.refreshRate) / 120;
    const gyroBonus = phoneSpecs.gyroSupport ? 1.05 : 1;
    
    // Calculate sensitivities
    const general = Math.min(200, Math.round(baseSensi * dpiFactor * refreshRateFactor * gyroBonus));
    const redDot = Math.min(200, Math.round(general * 1.04));
    const scope2x = Math.min(200, Math.round(general * 0.96));
    const scope4x = Math.min(200, Math.round(general * 0.84));
    const freeLook = Math.min(200, Math.round(general * 0.89));
    const sniper = Math.min(200, Math.round(general * 0.76));
    
    // Generate weapon-specific sensitivities
    const weapons = {
        ump: Math.min(200, Math.round(general * 1.02)),
        xm8: Math.min(200, Math.round(general * 0.98)),
        m1887: Math.min(200, Math.round(general * 1.06)),
        scar: Math.min(200, Math.round(general * 0.99)),
        ak47: Math.min(200, Math.round(general * 0.95)),
        m4a1: Math.min(200, Math.round(general * 1.00)),
        mp40: Math.min(200, Math.round(general * 1.03)),
        sks: Math.min(200, Math.round(general * 0.91))
    };
    
    return {
        general,
        redDot,
        scope2x,
        scope4x,
        freeLook,
        sniper,
        weapons
    };
}
