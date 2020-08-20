const music = document.querySelector('audio');
const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');
const play = document.querySelector('#play');
const img = document.querySelector('img');
const title = document.querySelector('#title');
const artiste = document.querySelector('#artiste');
const progressContainer = document.querySelector('#progress-container');
const progress = document.querySelector('#progress');
const currentEl = document.getElementById("current-time")
const durationEl =  document.getElementById("duration")

// music
const songs = [
    {name:'jacinto-1', displayName:'Electric Chill Machine', artiste:'Jacinto Design'},
    {name:'jacinto-2', displayName:'Seven Nation Army', artiste:'Jacinto Design'},
    {name:'jacinto-3', displayName:'Goodnight disco queen', artiste:'Jacinto Design'},
    {name:'metric-1', displayName:'Front Row', artiste:'Metric'},

]


// checking if playing

let playing =false
// play

function playSong () {
    playing = true
    music.play();
    pause.innerHTml = '<i class="fas fa-pause main-button" id="pause" title="pause"></i>'
}
function pauseSong () {
    playing = false;
    music.pause();
}

play.addEventListener('click', () => {
    if (playing) {
        play.classList.remove('fa-pause');
        play.classList.add('fa-play');
        play.setAttribute('title', 'play')
        pauseSong()
    }else {
        play.classList.add('fa-pause');
        play.classList.remove('fa-play');
        play.setAttribute('title', 'Pause')
        playSong()
    }
})

// Update DOM

function loadSong (songs) {
    title.textContent = songs.displayName;
    artiste.textContent = songs.artiste;
    music.src = `music/${songs.name}.mp3`;
    img.src = `img/${songs.name}.jpg`
}
// current song
let songIndex = 0
loadSong (songs[songIndex]);

function prevSong () {
    songIndex --;
    if (songIndex < 0){
        songIndex = songs.length - 1
    }
    loadSong(songs[songIndex]);
    playSong();
}
function nextSong () {
    songIndex ++;
    if (songIndex > songs.length - 1){
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// Update progress bar and time ()
function updateProgressBar (e){

    if (playing){
        const {duration, currentTime} = e.srcElement;
        const progressPrecentage = (currentTime / duration) * 100;
        progress.style.width = `${progressPrecentage}%`;

        // duration display
        const durationMin = Math.floor (duration / 60);
        let durationSec = Math.floor(duration % 60);
        if(durationSec < 10){
            durationSec = `0${durationSec}`;
        } if (durationSec){
        durationEl.innerHTML = `${durationMin}:${durationSec}`
             } 
             const currentMin = Math.floor (currentTime / 60);
        let curentSec = Math.floor(currentTime % 60);
        if(curentSec < 0){
            curentSec = `0${curentSec}`;
        } if (curentSec){
        currentEl.innerHTML = `${currentMin}:${curentSec}`
             } 
       }

}
music.onseeking = function() {
    alert("Seek operation began!");
};

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('timeupdate', updateProgressBar)

