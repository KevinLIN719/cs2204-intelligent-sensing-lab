document.addEventListener('DOMContentLoaded', function(){
    const promo2Section = document.querySelector('.promotion2 h2');
    promo2Section.style.display = 'none';

    const promoMessages = [
        "Optical Sensing Division has 8 openings for PhD researchers! Develop next-gen imaging systems.",
        "Bio-Sensing Group offers 5 internship positions in medical sensor development for researchers!",
        "Smart Sensing Lab is recruiting 10 researchers for IoT and AI-enabled sensing projects!"
    ];

    const promo1Title = document.querySelector('.promotion1 h2');
    const promo2Title = document.querySelector('.promotion2 h2');
    let currentMessageIndex = Math.floor(Math.random() * promoMessages.length);
    promo1Title.textContent = promoMessages[currentMessageIndex];

    setInterval(() => {
        currentMessageIndex = (currentMessageIndex + 1) % promoMessages.length;
        promo1Title.textContent = promoMessages[currentMessageIndex];
    }, 3000);
    const videoSources = [
        {
            mp4: "https://personal.cs.cityu.edu.hk/~cs2204/2025/video/video1.mp4",
            webm: "https://personal.cs.cityu.edu.hk/~cs2204/2025/video/video1.webm",
            text: "Optical Sensing Division has 8 openings for PhD researchers! Develop next-gen imaging systems."
        },
        {
            mp4: "https://personal.cs.cityu.edu.hk/~cs2204/2025/video/video2.mp4",
            webm: "https://personal.cs.cityu.edu.hk/~cs2204/2025/video/video2.webm",
            text: "Bio-Sensing Group offers 5 internship positions in medical sensor development for researchers!"
        }
    ];

    let currentVideoIndex = 0;
    const videoContainer = document.getElementById('videoContainer');
    const promoText = document.getElementById('promoText1');

    function initVideoLoop() {
        const video = videoContainer.querySelector('video');
        video.addEventListener('ended', switchVideo);
    }

    function switchVideo() {
        currentVideoIndex = (currentVideoIndex + 1) % videoSources.length;
        const currentSource = videoSources[currentVideoIndex];
        
        videoContainer.innerHTML = `
            <video width="700" autoplay muted controls>
                <source src="${currentSource.mp4}" type="video/mp4">
                <source src="${currentSource.webm}" type="video/webm">
            </video>
        `;
        
        promoText.textContent = currentSource.text;
        
        const newVideo = videoContainer.querySelector('video');
        newVideo.addEventListener('ended', switchVideo);
    }

    window.onload = initVideoLoop;
});