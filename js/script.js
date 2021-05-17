const app=()=>{
  const song = document.querySelector(".song");
  const play = document.querySelector(".play");
  const replay = document.querySelector(".replay");
  const outline = document.querySelector(".moving-outline circle");
  const video = document.querySelector(".vid-container video");
  //Sounds
  const sounds = document.querySelectorAll(".sound-picker button");
  //Time Display
  const timeDisplay = document.querySelector(".time-display");
  const timeSelect=document.querySelectorAll('.time-select button');
  const outlineLength = outline.getTotalLength();
  let fakeDuration=600;
  outline.style.strokeDasharray=outlineLength;
  outline.style.strokeDashoffset=outlineLength;

  sounds.forEach(sound => {
    sound.addEventListener("click", function() {
      song.src = this.getAttribute("data-sound");
      video.src = this.getAttribute("data-video");
      checkPlaying(song);
    });
  });

//play sound
  play.addEventListener('click',() =>{
    checkPlaying(song);
  });
  
  timeSelect.forEach(option => {
    option.addEventListener("click", function() {
      fakeDuration = this.getAttribute("data-time");
      timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(
        fakeDuration % 60
      )}`;
    });
  });
//create a function specific to stop and play the sounds
  const checkPlaying = song => {
    if (song.paused) {
      song.play();
      video.play();
      play.src = "../svg/pause.svg";
    } else {
      song.pause();
      video.pause();
      play.src = "../svg/play.svg";
    }
  };
  //we can animate the circle
  song.ontimeupdate=()=>{
    let currentTime=song.currentTime;
    let elapsed=fakeDuration-currentTime;
    let seconds=Math.floor(elapsed % 60);
    let minutes=Math.floor(elapsed / 60);
    //animate the bar
    let progress=outlineLength-(currentTime/fakeDuration)*outlineLength;
    outline.style.strokeDashoffset=progress;
    timeDisplay.textContent = `${minutes}:${seconds}`;
    if (currentTime >= fakeDuration) {
      song.pause();
      song.currentTime = 0;
      play.src = "../svg/play.svg";
      video.pause();
    }
  };
  //Duration
  /*const timeSelect = document.querySelectorAll(".time-select button");
  let fakeDuration = 600;

  outline.style.strokeDashoffset = outlineLength;
  outline.style.strokeDasharray = outlineLength;
  timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(
    fakeDuration % 60
  )}`;

  sounds.forEach(sound => {
    sound.addEventListener("click", function() {
      song.src = this.getAttribute("data-sound");
      video.src = this.getAttribute("data-video");
      checkPlaying(song);
    });
  });

  play.addEventListener("click", function() {
    checkPlaying(song);
  });

  replay.addEventListener("click", function() {
      restartSong(song);
      
    });


  const restartSong = song =>{
      let currentTime = song.currentTime;
      song.currentTime = 0;
      

  }

  timeSelect.forEach(option => {
    option.addEventListener("click", function() {
      fakeDuration = this.getAttribute("data-time");
      timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(
        fakeDuration % 60
      )}`;
    });
  });

  const checkPlaying = song => {
    if (song.paused) {
      song.play();
      video.play();
      play.src = "../svg/pause.svg";
    } else {
      song.pause();
      video.pause();
      play.src = "../svg/play.svg";
    }
  };

  song.ontimeupdate = function() {
    let currentTime = song.currentTime;
    let elapsed = fakeDuration - currentTime;
    let seconds = Math.floor(elapsed % 60);
    let minutes = Math.floor(elapsed / 60);
    timeDisplay.textContent = `${minutes}:${seconds}`;
    let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
    outline.style.strokeDashoffset = progress;

    if (currentTime >= fakeDuration) {
      song.pause();
      song.currentTime = 0;
      play.src = "../svg/play.svg";
      video.pause();
    }
  };*/
};
app();
