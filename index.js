const play = document.querySelector('#play');
const prev = document.querySelector('#prev');
const next = document.querySelector('#next');

const music_container = document.querySelector('.music-container');
const progress = document.querySelector('.progress');
const progress_container = document.querySelector('.progress-container');
const audio = document.querySelector('audio');
const music_title = document.querySelector('h3');
const music_img = document.querySelector('#cover');

const songTitle = ['hey', 'summer', 'ukulele'];

let songIndex = 2;

loadSong(songTitle[songIndex]);


function loadSong(song) {
    music_title.textContent = song;
    music_img.src = `images/${song}.jpg`;
    audio.src = `music/${song}.mp3`;

}

function playSong() {
    music_container.classList.add('play');
    audio.play();
    play.querySelector('i.fas').classList.remove('fa-play');
    play.querySelector('i.fas').classList.add('fa-pause');
}

function pauseSong() {
    music_container.classList.remove('play');
    audio.pause();
    play.querySelector('i.fas').classList.add('fa-play');
    play.querySelector('i.fas').classList.remove('fa-pause');

}


function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songTitle.length - 1;
        loadSong(songTitle[songIndex]);
        playSong();
    } else {
        loadSong(songTitle[songIndex]);
        playSong();
    }
}


function nextSong() {
    songIndex++;
    if (songIndex >= songTitle.length) {
        songIndex = 0;
        loadSong(songTitle[songIndex]);
        playSong();
    } else {
        loadSong(songTitle[songIndex]);
        playSong();
    }

}

function updateProgress(e) {
    const {
        currentTime,
        duration
    } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    if (progressPercent === 100)
        nextSong();
}

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
}


play.addEventListener('click', () => {
    if (music_container.classList.contains('play')) {
        pauseSong();
    } else {
        playSong();
    }
});
prev.addEventListener('click', prevSong);
next.addEventListener('click', nextSong);
audio.addEventListener('timeupdate', updateProgress)
progress_container.addEventListener('click', setProgress);