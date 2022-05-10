// get our elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');

    // selecting the button
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');  //we've had data attributes before
const ranges = player.querySelectorAll('.player__slider');



// build our functions
function togglePlay() {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

function updateButton() {
    // console.log('update the button');


    // ternery operator for if the video is paused then we use the play button, else we show the paused button
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
}

function skip() {
    // console.log('skipping');
    // console.log(this.dataset.skip);
    video.currentTime += parseFloat(this.dataset.skip);
        // so parseFloat is a native function and it will remove the string of dataset.set and change it to a floating number (a number WITHOUT a decimal)   
}

function handleRangeUpdate() {
    video[this.name] = this.value
    // console.log(video[this.name]);
    // console.log(this.name); //gives us the specific bar that we are trying the change the settings for
    // console.log(this.value); //will give us the value of what we are setting the new values to 
    // console.log(video);
}

function handleProgress() {
    // we're updating the flex value of the .progress__filled
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
    // console.log(e.offsetX);
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
        // convert the length of the video being played into a percentage in comparison to the overall video's length
    video.currentTime = scrubTime;
}


// hook up our listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress); //triggers when the video will update its time code


toggle.addEventListener('click', togglePlay);

    // for skipping to different parts of a video
skipButtons.forEach(button => button.addEventListener('click', skip));

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));

// to set it so that the place only changes when there is a mouse down click event
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);