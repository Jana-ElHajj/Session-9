const musicContainer = document.getElementById('music-container');

const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover')


// Song titles
const songs = ['Queen - Broken heart', 'Eminem - Godzilla', 'Spongebob - Best Day Ever!']

// Keep track of songs
let songIndex = 0;

let format;

// Formatter improvising
function formatter() {
    if (songIndex == 0) {
        format = 'png'
    } else if (songIndex == 1) {
        format = 'jpeg'
    } else {
        format = 'jpg'
    }
}

// Initially load song details into DOM
loadsong(songs[songIndex])

// Update song details
function loadsong(song) {
    formatter();
    title.innerText = song;
    audio.src = `${song}.m4a`;
    cover.src = `${song}.${format}`;
}

// Play song
function playSong() {
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');

    audio.play();
}

// Pause song
function pauseSong() {
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.add('fa-play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');

    audio.pause();
}

// Previous song
function prevSong() {
    songIndex--;

    if(songIndex < 0) {
        songIndex = songs.length - 1
    }

    loadsong(songs[songIndex])

    playSong();
}

// Next song
function nextSong() {
    songIndex++;

    if(songIndex > songs.length - 1) {
        songIndex = 0
    }

    loadsong(songs[songIndex])

    playSong();
}

// Update progress bar
function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
}

// Set progress bar
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
}

// Event listeners
playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');

    if(isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
})

// Change song
prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)

// Time/song update
audio.addEventListener('timeupdate', updateProgress)


// Click on progress bar
progressContainer.addEventListener('click', setProgress)

// Song ends
audio.addEventListener('ended', nextSong)