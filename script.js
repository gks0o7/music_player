let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");
let volumeReading = document.querySelector("#reading");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");
let back = document.querySelector(".backImage");
let repeat_button = document.querySelector(".repeat-one");
let shufflebutton = document.querySelector(".shuffle");
let volumeUp = document.querySelector(".fa-volume-up");
let volumeMute = document.querySelector("#mute-unmute");
let songs_area = document.querySelector(".songs");

let track_index = 0;
let isPlaying = false;
let updateTimer;
let randombool = false;
let repeater = false;
// let stack = new Stack();
let volumeValue = 100;
let muteBool = false;
// let trans_cake = localStorage.getItem("fav");
// console.log(trans_cake);
let fav_songs = localStorage.getItem("fav");
if (fav_songs == null) {
  localStorage.setItem("fav", JSON.stringify([]));
  fav_songs = [];
} else { fav_songs = JSON.parse(fav_songs); }

// Create new audio element
let curr_track = document.createElement('audio');

// Define the tracks that have to be played


let track_list = [
  {
    name: "Merry Christmas",
    artist: "Ed Sheeran",
    image: "https://t2.genius.com/unsafe/409x409/https%3A%2F%2Fimages.genius.com%2F05d94c161dd03248eeda42475bb4763b.1000x1000x1.png",
    path: "http://pagalworldcom.com/siteuploads/files/sfd119/59199/Merry%20Christmas%20-%20Ed%20Sheeran%20320%20kbps(PagalWorldCom.Com).mp3",
    add: true,
  },
  {
    name: "Beutiful people",
    artist: "Ed Sheeran",
    image: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Ed_Sheeran_-_Beautiful_People.png",
    path: "http://pagalworldcom.com/siteuploads/files/sfd56/27596/Beautiful%20People%20-%20Ed%20Sheeran%20320%20Kbps(PagalWorldCom.Com).mp3",
    add: true,
  },
  {
    name: "Tera Zikr",
    artist: "Darshan Raval",
    image: "https://i.pinimg.com/564x/91/78/bc/9178bc57ae869f84f697e8c391220e51.jpg",
    path: "http://pagalworldcom.com/siteuploads/files/sfd4/1674/Tera%20Zikr%20-%20Reprise%20Ft.%20Darshan%20Raval(PagalWorldCom.Com).mp3",
    add: true,
  },
  {
    name: "Tera Chehra",
    artist: "Arijit Singh ",
    image: "https://i1.sndcdn.com/artworks-LoWjyNziWpCXChhR-H7kncg-t500x500.jpg",
    path: "http://pagalworldcom.com/siteuploads/files/sfd21/10358/Tera%20Chehra%20(Sanam%20Teri%20Kasam)(PagalWorldCom.Com).mp3",
    add: true,
  },
  {
    name: "Sanam Teri Kasam",
    artist: "Ankit Tiwari & Palak Muchhal ",
    image: "https://images-na.ssl-images-amazon.com/images/I/A1pBqWv-RKL._RI_.jpg",
    path: "http://pagalworldcom.com/siteuploads/files/sfd21/10357/Sanam%20Teri%20Kasam%20(Sanam%20Teri%20Kasam)(PagalWorldCom.Com).mp3",
    add: true,
  },
  {
    name: "Phir Mulaaqat",
    artist: "Jubin Nautiyal ",
    image: "https://i2.wp.com/bangla-lyrics.club/wp-content/uploads/2019/01/PHIR-MULAQAT-Full-LYRICS%E2%80%93Cheat-India-Jubin-Nautiyal.png?resize=310%2C285",
    path: "http://pagalworldcom.com/siteuploads/files/sfd9/4046/Phir%20Mulaaqat(PagalWorldCom.Com).mp3",
    add: true,
  },
  {
    name: "Phir Le Aaya Dil",
    artist: "Arijit Singh",
    image: "https://upload.wikimedia.org/wikipedia/en/thumb/d/dd/Phir_Le_Aya_Dil_cover.jpg/220px-Phir_Le_Aya_Dil_cover.jpg",
    path: "http://pagalworldcom.com/siteuploads/files/sfd9/4351/Phir%20Le%20Aaya%20Dil%20-%20Contemporary%20Remix(PagalWorldCom.Com).mp3",
    add: true,
  },

  {
    name: "Bandeya Rey Bandeya",
    artist: "Arijit Singh",
    image: "https://i0.wp.com/urbanasian.com/wp-content/uploads/2019/02/Screen-Shot-2019-02-17-at-9.18.57-PM.png?resize=640%2C655&ssl=1",
    path: "http://pagalworldcom.com/siteuploads/files/sfd9/4350/Bandeya%20Rey%20Bandeya(PagalWorldCom.Com).mp3",
    add: true,
  },
  {
    name: "Chhod Diya",
    artist: "Arijit Singh",
    image: "https://i.ytimg.com/vi/Giwd8Y3EF9s/maxresdefault.jpg",
    path: "http://pagalworldcom.com/siteuploads/files/sfd9/4343/Chhod%20Diya(PagalWorldCom.Com).mp3",
    add: true,
  },
  {
    name: "Tera Yaar Hoon Main",
    artist: "Arijit Singh",
    image: "https://i1.sndcdn.com/artworks-000359813853-wq37oe-t500x500.jpg",
    path: "http://pagalworldcom.com/siteuploads/files/sfd9/4322/Tera%20Yaar%20Hoon%20Main%20-%20Remix(PagalWorldCom.Com).mp3",
    add: true,
  },
  {
    name: "Pal",
    artist: "Arijit Singh",
    image: "https://lyricsing.com/wp-content/uploads/Pal-Female-Version-Song-Lyrics.jpg",
    path: "http://pagalworldcom.com/siteuploads/files/sfd9/4342/Pal%20-%20Remix(PagalWorldCom.Com).mp3",
    add: true,
  },
  {
    name: "Dil Jugadu",
    artist: "Arijit Singh",
    image: "https://i.ytimg.com/vi/JZ2R97taa8o/mqdefault.jpg",
    path: "http://pagalworldcom.com/siteuploads/files/sfd9/4324/Dil%20Jugadu(PagalWorldCom.Com).mp3",
    add: true,
  },
  {
    name: "Downtown",
    artist: "Guru Randhawa",
    image: "https://i.ytimg.com/vi/IOlYwy3aANo/maxresdefault.jpg",
    path: "http://pagalworldcom.com/siteuploads/files/sfd9/4243/Downtown%20-%20Guru%20Randhawa(PagalWorldCom.Com).mp3",
    add: true,
  },
];

let trans_cake1 = localStorage.getItem("songs");
if (trans_cake1 == null) { localStorage.setItem("songs", JSON.stringify(track_list)); }
track_list = JSON.parse(localStorage.getItem("songs"));

let insert = "";
for (let i = 0; i < track_list.length; i++) {
  if (track_list[i].add) {
    insert += `<div class="song-List" id="${i}"><span class="song-List00">${track_list[i].name}</span><span class="material-icons plus-sign">add</span></div>`;
  } else {
    insert += `<div class="song-List" id="${i}">${track_list[i].name}</div>`;
  }

}
songs_area.innerHTML = insert;
let mySongs_first = document.querySelectorAll(".song-List00");
for (let i of mySongs_first) {
  i.addEventListener("click", function (e) {
    loadTrack(i.parentElement.id);
    playTrack();
  })
}

let addButtons = document.querySelectorAll(".plus-sign");
if (addButtons) {
  for (let i of addButtons) {
    i.addEventListener("click", function () {
      i.style.display = "none";
      // track_list = JSON.parse(localStorage.getItem("songs"));
      track_list[i.parentElement.id].add = false;
      console.log(track_list);
      localStorage.setItem("songs", JSON.stringify(track_list));
      addToFav(i.parentElement.id, track_list[i.parentElement.id].name)
    })
  }
}



function fav_remove(id, data) {
  return id != data[0];
}
function addToFav(id, name) {
  console.log(name + " " + id)
  fav_songs.push([id, name]);
  console.log(fav_songs);
  localStorage.setItem("fav", JSON.stringify(fav_songs));
}




function random_bg_color() {

  // Get a number between 64 to 256 (for getting lighter colors)
  let red = Math.floor(Math.random() * 256) + 64;
  let green = Math.floor(Math.random() * 256) + 6;
  let blue = Math.floor(Math.random() * 256) + 64;
  let black = "black";

  // Construct a color withe the given values
  let bgColor = "rgb(" + red + "," + green + "," + blue + ")";

  // Set the background to that color
  //   back.style.background = bgColor;
  back.style.background = "linear-gradient(" + black + " ," + bgColor + "," + black + ")";
}


function loadTrack(track_index) {
  clearInterval(updateTimer);
  resetValues();
  curr_track.src = track_list[track_index].path;
  curr_track.load();

  track_art.style.backgroundImage = "url(" + track_list[track_index].image + ")";
  track_name.textContent = track_list[track_index].name;
  track_artist.textContent = track_list[track_index].artist;
  now_playing.textContent = ""

  updateTimer = setInterval(seekUpdate, 1000);
  curr_track.addEventListener("ended", function (e) {
    if (repeater) { resetValues(); playTrack(); }
    else if (randombool) { randomTrack_1(); }
    else { nextTrack(); }

  });
  back.style.backgroundImage = random_bg_color();
  // back.style.backgroundImage.filter = "blur(3px)";

}

function resetValues() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}

// Load the first track in the tracklist
loadTrack(track_index);

function playpauseTrack() {
  if (!isPlaying) playTrack();
  else pauseTrack();
}

function playTrack() {
  curr_track.play();
  isPlaying = true;

  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
  track_art.classList.add("anime");
}

function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
  track_art.classList.remove("anime");
}

function nextTrack() {
  if (randombool) { randomTrack_1(); return; }
  if (track_index < track_list.length - 1)
    track_index += 1;
  else track_index = 0;
  loadTrack(track_index);
  playTrack();
}

function randomTrack() {
  if (repeater) {
    // alert("!! Please disable REPEAT-ONE first. !!");
    // repeater = false;
    repeat_button.click();

  }
  // else{
  if (!randombool) {
    randombool = true;
    shufflebutton.children[0].style.color = "green";
  } else {
    randombool = false;
    shufflebutton.children[0].style.color = "black";
  }
  // }

}
function randomTrack_1() {
  let index = Math.floor(Math.random() * (track_list.length - 1));
  if (index == track_index) { randomTrack_1(); }
  else {
    loadTrack(index);
    track_index = index;
    playTrack();
  }
}
function repeatify() {
  if (randombool) {
    // randombool = false;
    shufflebutton.click();
  }
  // else{
  if (!repeater) {
    repeat_button.style.color = "green";
    repeater = true;
  } else {
    repeater = false;
    repeat_button.style.color = "black";
  }
  // }
}

if (curr_time.innerText == total_duration.innerText) {
  if (repeater)
    repeatify_1();
}

function repeatify_1() {
  let index = track_index;
  if (curr_time.innerText == total_duration.innerText) {  //curr_time.innerText == total_duration.innerText
    loadTrack(index);
    playTrack();
  }
}


function prevTrack() {
  if (randombool) { randomTrack_1(); return; }
  if (track_index > 0)
    track_index -= 1;
  else track_index = track_list.length;
  loadTrack(track_index);
  playTrack();
}

function seekTo() {
  let seekto = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekto;
}

function setVolume() {
  curr_track.volume = volume_slider.value / 100;
  volumeReading.innerText = volume_slider.value;
  volumeValue = volume_slider.value;
}

volume_slider.addEventListener("change", function (e) {
  setVolume();
});

function seekUpdate() {
  let seekPosition = 0;

  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);

    seek_slider.value = seekPosition;

    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

    if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
    if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
    if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}




let open = document.querySelector(".open");
let MyPlayList = false;
open.addEventListener("click", function (e) {

  if (!MyPlayList) {
    let inner = "";
    if (fav_songs.length != 0) {
      inner = "";
      for (let i = 0; i < fav_songs.length; i++) {
        inner += `<div class="song-List1" id="${fav_songs[i][0]}"><span class="song-List11">${fav_songs[i][1]}</span><span class="material-icons minus-sign">remove</span></div>`;
      }
    }
    let modal = document.createElement("div");
    modal.classList.add("modal");
    modal.innerHTML = `<div class="playList">
                      <div class="music-playList">Play List</div>
                      <div class="songs">
                      ${inner}                        
                      </div>
                    </div>`;
    document.querySelector(".workplace").appendChild(modal);
    // console.log("hi");
    MyPlayList = true;
    let PlayList_songs = document.querySelectorAll(".song-List11");

    for (let i of PlayList_songs) {
      i.addEventListener("click", function (e) {
        loadTrack(i.parentElement.id);
        playTrack();
      })
    }

    let deleteButtons = document.querySelectorAll(".minus-sign");
    if (deleteButtons) {
      for (let i of deleteButtons) {
        i.addEventListener("click", function () {
          console.log(i.parentElement);
          // track_list = JSON.parse(localStorage.getItem("songs"));
          track_list[i.parentElement.id].add = true;
          console.log(track_list);
          localStorage.setItem("songs", JSON.stringify(track_list));
          fav_songs = fav_songs.filter(fav_remove.bind(this, i.parentElement.id));
          localStorage.setItem("fav", JSON.stringify(fav_songs));
          i.parentElement.remove();
          // setTimeout(function(){playpause_btn.click();},10);
        })
      }
    }

  } else {
    let removeMyList = document.querySelector(".modal");
    removeMyList.remove();
    MyPlayList = false;
    window.location.reload(true);
  }

})

