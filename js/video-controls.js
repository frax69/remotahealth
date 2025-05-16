// Video Controls for RemotaHealth.AI Website
document.addEventListener('DOMContentLoaded', function() {
    // Main showcase video controls
    const playButton = document.querySelector('.play-button');
    const showcaseVideo = document.getElementById('showcase-video');
    
    if (playButton && showcaseVideo) {
        playButton.addEventListener('click', function() {
            // Pause all other videos
            document.querySelectorAll('video').forEach(video => {
                if (video !== showcaseVideo) {
                    video.pause();
                }
            });
            
            // Create fullscreen modal for the video
            const modal = document.createElement('div');
            modal.className = 'video-modal';
            
            const modalContent = document.createElement('div');
            modalContent.className = 'video-modal-content';
            
            const closeButton = document.createElement('button');
            closeButton.className = 'video-modal-close';
            closeButton.innerHTML = '&times;';
            
            const videoPlayer = document.createElement('video');
            videoPlayer.className = 'video-modal-player';
            videoPlayer.src = showcaseVideo.querySelector('source').src;
            videoPlayer.controls = true;
            videoPlayer.autoplay = true;
            
            modalContent.appendChild(closeButton);
            modalContent.appendChild(videoPlayer);
            modal.appendChild(modalContent);
            document.body.appendChild(modal);
            
            // Add event listeners for closing
            closeButton.addEventListener('click', function() {
                document.body.removeChild(modal);
            });
            
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    document.body.removeChild(modal);
                }
            });
        });
    }
    
    // Testimonial video overlay controls
    const videoItems = document.querySelectorAll('.video-item');
    
    videoItems.forEach(item => {
        const overlay = item.querySelector('.video-overlay');
        const video = item.querySelector('video');
        const videoSrc = video.querySelector('source').src;
        
        overlay.addEventListener('click', function() {
            // Create fullscreen modal for the video
            const modal = document.createElement('div');
            modal.className = 'video-modal';
            
            const modalContent = document.createElement('div');
            modalContent.className = 'video-modal-content';
            
            const closeButton = document.createElement('button');
            closeButton.className = 'video-modal-close';
            closeButton.innerHTML = '&times;';
            
            const videoPlayer = document.createElement('video');
            videoPlayer.className = 'video-modal-player';
            videoPlayer.src = videoSrc;
            videoPlayer.controls = true;
            videoPlayer.autoplay = true;
            
            modalContent.appendChild(closeButton);
            modalContent.appendChild(videoPlayer);
            modal.appendChild(modalContent);
            document.body.appendChild(modal);
            
            // Add event listeners for closing
            closeButton.addEventListener('click', function() {
                document.body.removeChild(modal);
            });
            
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    document.body.removeChild(modal);
                }
            });
        });
    });
});
