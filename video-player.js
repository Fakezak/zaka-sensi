// video-player.js

export function initVideoPlayer() {
    const videoContainer = document.querySelector('.video-container');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    const progressFill = document.querySelector('.progress-fill');
    
    let isPlaying = true;
    let progress = 45;
    
    // Simulate video playback
    setInterval(() => {
        if (isPlaying) {
            progress = (progress + 0.1) % 100;
            progressFill.style.width = `${progress}%`;
        }
    }, 100);
    
    // Play/Pause
    playPauseBtn.addEventListener('click', () => {
        isPlaying = !isPlaying;
        playPauseBtn.innerHTML = isPlaying ? 
            '<i class="fas fa-pause"></i>' : 
            '<i class="fas fa-play"></i>';
    });
    
    // Fullscreen
    fullscreenBtn.addEventListener('click', () => {
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            videoContainer.requestFullscreen();
        }
    });
    
    // Click on video to toggle play/pause
    document.querySelector('.video-player').addEventListener('click', () => {
        playPauseBtn.click();
    });
}
