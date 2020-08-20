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
    {name:'1. Hatin on the Club', displayName:'1. Hatin on the Club', artiste:'Rihanna'},
    {name:'jacinto-1', displayName:'2. Electric Chill Machine', artiste:'Jacinto Design'},
    {name:'2. Level Up (Twice As Tall)', displayName:'2. Level Up (Twice As Tall)', artiste:'BurnaBoy'},
    {name:'3. Diamonds', displayName:'3. Diamonds', artiste:'Rihanna'},
    {name:'4. exile (feat. Bon Iver)', displayName:'4. exile (feat. Bon Iver)', artiste:'Taylor Swift (feat. Bon Iver)'},
    {name:'5. Drunk On Love', displayName:'5. Drunk On Love', artiste:'Rihanna'},
    {name:'6. Akon feat. Gven Stefani - The Sweet Escape', displayName:'The Sweet Escape', artiste:'Akon feat. Gven Stefani'},
    {name:'7. Seven', displayName:'7. Seven', artiste:'Taylor Swift'},
    {name:'8. California', displayName:'8. California ', artiste:'Lana del ray'},
    {name:'9. Coldplay - Yellow', displayName:'9. Yellow', artiste:'Coldplay'},
    {name:'10. Enya - Flora s secret', displayName:'10. Flora s secret', artiste:'Enya'},
    {name:'11. hymn-for-the-weekend', displayName:'11. hymn-for-the-weekend', artiste:'Coldplay (Beyonce)'},
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

function setProgress (e) {
    const width = this.clientWidth;
    const x =e.offsetX;
    const {duration} = music;
    music.currentTime = (x / width) * duration
}


prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong)
music.addEventListener('timeupdate', updateProgressBar)
progressContainer.addEventListener('click', setProgress)

