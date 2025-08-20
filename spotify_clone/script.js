console.log("yay ha js")
let currentSong = new Audio();
let songs;

function secondsToMInutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
}

async function getsongs() {
    let a = await fetch("http://127.0.0.1:3000/songs/")
    let response = await a.text();
    console.log(response)
    let div = document.createElement("div")
    div.innerHTML = response;
    let as = div.getElementsByTagName("a")
    let songs = []
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".crdownload")) {
            songs.push(element.href.split("/songs/")[1])

        }

    }
    return songs;
}
const playMUsic = (track, pause = false) => {
    // let audio = new Audio("/songs/"+track)
    currentSong.src = "/songs/" + track;
    if (!pause) {
        currentSong.play()
        play.src = "images_used/pause.svg"
    }
    document.querySelector(".songinfo").innerHTML = decodeURI(track)
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00"

}
async function main() {
    songs = await getsongs()
    playMUsic(songs[0], true)
    let songul = document.querySelector(".songlist").getElementsByTagName("ul")[0]
    for (const song of songs) {
        songul.innerHTML = songul.innerHTML + `<li><img class="invert" src="images_used/music.svg" alt="">
                            <div class="info">
                                <div>${song.replaceAll("%20", "")}</div>
                                <div>Achu</div>
                            </div>
                            <div class="playnow">
                                <span>Play Now</span>
                            <img class="invert" src="images_used/play.svg" alt="">
                            </div>
        </li>`;
    }
    Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", element => {
            console.log(e.querySelector(".info").firstElementChild.innerHTML)
            playMUsic(e.querySelector(".info").firstElementChild.innerHTML.trim())
        })
    })

    play.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play()
            play.src = "images_used/pause.svg"
        }
        else {
            currentSong.pause()
            play.src = "images_used/play.svg"
        }
    })

    //listen fot time pdate in the seekbar
    currentSong.addEventListener("timeupdate", () => {
        console.log(currentSong.currentTime, currentSong.duration)
        document.querySelector(".songtime").innerHTML = `${secondsToMInutesSeconds(currentSong.currentTime)} / ${secondsToMInutesSeconds(currentSong.duration)}`
        document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%"
    })

    //event listener for the seekbar
    document.querySelector(".seekbar").addEventListener("click", (e) => {
        // const seekbar = document.querySelector(".seekbar");
        // const rect = seekbar.getBoundingClientRect();
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100
        document.querySelector(".circle").style.left = percent + "%"
        currentSong.currentTime = (currentSong.duration) * (percent / 100);
    })

    //Adding event listener for the hamburger icon
    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".left").style.left = "0px"
    })
    document.querySelector(".close").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-110%"
    })

    // adding event listener for previous and next
    previous.addEventListener("click", () => {
        console.log("previous")
        let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])
        console.log(songs, index)
        if ((index - 1) > 0) {
            playMUsic(songs[index - 1])
        }
    })
    next.addEventListener("click", () => {
        currentSong.pause()
        console.log("next")
        let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])
        console.log(songs, index)
        if ((index + 1) > length) {
            playMUsic(songs[index + 1])
        }
    })

    //add an event to the volume
    document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change", (e) => {
        console.log(e,e.target,e.target.value)
        currentSong.volume = parseInt(e.target.value)/100;
    })

}
main()

window.addEventListener("load", function() {
    // Delay for effect (optional: 1000ms = 1s)
    setTimeout(function(){
        document.getElementById("loading-screen").style.display = "none";
        document.querySelector(".container").style.display = "block";
    }, 2500); 
});
