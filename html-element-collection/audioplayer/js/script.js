'use strict';
const media = document.getElementsByClassName('mediaplayer')[0],
player = document.getElementsByClassName('player')[0],
playButton = document.getElementsByClassName('playstate')[0],
playIcon = document.getElementsByClassName('fa-play')[0],
puaseIcon = document.getElementsByClassName('fa-pause')[0],
stopButton = document.getElementsByClassName('stop')[0],
backButton = document.getElementsByClassName('back')[0],
nextButton = document.getElementsByClassName('next')[0],
songTitle = document.getElementsByClassName('title')[0],
mediaList = [{title: 'LA Chill Tour', src: 'https://netology-code.github.io/hj-homeworks/html-element-collection/audioplayer/mp3/LA Chill Tour.mp3'},
{title: 'This is it band', src: 'https://netology-code.github.io/hj-homeworks/html-element-collection/audioplayer/mp3/This is it band.mp3'},
{title: 'LA Fusion Jam', src: 'https://netology-code.github.io/hj-homeworks/html-element-collection/audioplayer/mp3/LA Fusion Jam.mp3'}];
let songIndex = 0;
playButton.onclick = () => {	
	if (player.paused) {
		player.play();
		playIcon.style.display = "none";
		puaseIcon.style.display = "block";		
		media.classList.add('play');
	} else {
		player.pause();
		playIcon.style.display = "block";
		puaseIcon.style.display = "none";		
		media.classList.remove('play');
	}
};
stopButton.onclick = () => {	
	player.currentTime = 0;
	playIcon.style.display = "block";
	puaseIcon.style.display = "none";
	player.pause();		
	media.classList.remove('play');
};
function changeSong() {
	player.src = mediaList[songIndex].src;
	if (media.classList.contains('play')) {
		player.play();
	}
	songTitle.title = mediaList[songIndex].title;
}
backButton.onclick = () => {
	if (songIndex === 0) {
		songIndex = mediaList.length - 1;
	} else {
		songIndex--;
	}
	changeSong();
};
nextButton.onclick = () => {
	if (songIndex < mediaList.length - 1) {
		songIndex++;
	} else {
		songIndex = 0;
	}	
	changeSong();
};