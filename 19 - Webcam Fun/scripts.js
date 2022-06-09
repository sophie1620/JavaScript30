const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo() {
    navigator.mediaDevices.getUserMedia({ video: true, audio: false})
    .then(localMedialStream => {
        console.log(localMedialStream, video);
        video.src = window.URL.createObjectURL(localMedialStream);
        video.play();
    });
}

getVideo();