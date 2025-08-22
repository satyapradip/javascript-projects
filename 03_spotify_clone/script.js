console.log("Spotify Clone Loaded");

let songIndex = 0;   // To keep track of the current song
let audioElement = new Audio('song_1.mp3'); // Initializing audio element with the first song
let masterPlay = document.getElementById('masterPlay');// Play/Pause button
let myProgressBar = document.getElementById('myProgressBar'); // Progress bar
let gif = document.getElementById('gif'); // GIF element to show when music is playing
let masterSongName = document.getElementById('masterSongName'); // Display current song name
let songItems = Array.from(document.getElementsByClassName('songItem')); // Array of song items


// Array of song objects with name, file path, and cover image path
let songs = [
    {songName: "Humnava", filePath: "song_1.mp3", coverPath: "cover_image1.jpg"},
    {songName: "Tum Hi Ho", filePath: "song_2.mp3", coverPath: "Tum_Hi_Ho_cover.jpg"},
    {songName: "Tera Ban Jaunga", filePath: "song_3.mp3", coverPath: "Tera_Ban_Jaunga_cover.jpg"},
    {songName: "Kabira", filePath: "song_4.mp3", coverPath: "Kabira_cover.jpeg"},
    {songName: "Raabta", filePath: "song_5.mp3", coverPath: "Raabta_cover.jpeg"},
    {songName: "Khud Ko Tere", filePath: "song_6.mp3", coverPath: "khud_ko_tere.jpg"},
];

// Setting up the song items with their respective cover images and song names
songItems.forEach((element, i) => { // i is the index
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; // Setting cover image
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; // Setting song name
});

masterPlay.addEventListener('click', () => { // Play/Pause button click event
    if (audioElement.paused || audioElement.currentTime <= 0) { // If audio is not playing
        audioElement.play();// Play the audio
        masterPlay.classList.remove('fa-play-circle');// Change icon to pause
        masterPlay.classList.add('fa-pause-circle'); // Change icon to pause
        gif.style.opacity = 1; // Show the GIF
    } else {
        audioElement.pause(); // Pause the audio
        masterPlay.classList.remove('fa-pause-circle'); // Change icon to play
        masterPlay.classList.add('fa-play-circle');  // Change icon to play
        gif.style.opacity = 0;  // Hide the GIF
    }
});

audioElement.addEventListener('timeupdate', () => { // Update progress bar as the song plays
    // Update Seekbar
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100); // Calculate progress percentage
    myProgressBar.value = progress;  // Update progress bar value
});
// Seekbar functionality
myProgressBar.addEventListener('change', () => {  // Seek to a different part of the song when progress bar is changed
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100; // Update current time of audio
});
// Function to reset all play buttons to play icon
const makeAllPlays = () => { // Function to reset all play buttons to play icon
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {  // Loop through all play buttons
        element.classList.remove('fa-pause-circle'); // Remove pause icon
        element.classList.add('fa-play-circle');  // Add play icon
    }); // End of loop
};
// Adding event listeners to each song's play button
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {  // Add click event to each play button
    element.addEventListener('click', (e) => { // e is the event
        makeAllPlays(); // Reset all play buttons
        songIndex = parseInt(e.target.id);  // Get the index of the clicked song
        e.target.classList.remove('fa-play-circle'); // Change clicked button to pause icon
        e.target.classList.add('fa-pause-circle'); // Change clicked button to pause icon
        audioElement.src = songs[songIndex].filePath; // Update audio source to the selected song
        masterSongName.innerText = songs[songIndex].songName;  // Update the displayed song name
        audioElement.currentTime = 0; // Reset audio time to start
        audioElement.play();  // Play the selected song
        gif.style.opacity = 1;  // Show the GIF
        masterPlay.classList.remove('fa-play-circle');  // Change master play button to pause icon
        masterPlay.classList.add('fa-pause-circle');  // Change master play button to pause icon
    });
});

// Next and previous button functionality

document.getElementById('next').addEventListener('click', () => { // Next button click event
    if (songIndex >= 5) {  // If it's the last song, go to the first song
        songIndex = 0; // Loop back to the first song
    } else { // Else go to the next song
        songIndex += 1;  // Increment song index
    }
    audioElement.src = songs[songIndex].filePath;  // Update audio source to the selected song
    masterSongName.innerText = songs[songIndex].songName;  // Update the displayed song name
    audioElement.currentTime = 0;  // Reset audio time to start
    audioElement.play();  // Play the selected song
    masterPlay.classList.remove('fa-play-circle');  // Change master play button to pause icon
    masterPlay.classList.add('fa-pause-circle'); // Change master play button to pause icon
});
// Previous button functionality
document.getElementById('previous').addEventListener('click', () => { // Previous button click event
    if (songIndex <= 0) { // If it's the first song, go to the last song
        songIndex = 0; // Stay at the first song (no wrap around)
    } else { // Else go to the previous song
        songIndex -= 1; // Decrement song index
    }
    audioElement.src = songs[songIndex].filePath; // Update audio source to the selected song
    masterSongName.innerText = songs[songIndex].songName; // Update the displayed song name
    audioElement.currentTime = 0;  // Reset audio time to start
    audioElement.play(); // Play the selected song
    masterPlay.classList.remove('fa-play-circle'); // Change master play button to pause icon
    masterPlay.classList.add('fa-pause-circle'); // Change master play button to pause icon
});