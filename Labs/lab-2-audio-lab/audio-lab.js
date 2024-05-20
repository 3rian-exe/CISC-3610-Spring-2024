"use strict";

document.addEventListener("DOMContentLoaded", function() {
    var playlist = [
        "audio-files/for-her-chill-upbeat.mp3",
        "audio-files/in-dreams.mp3",
        "audio-files/better-day.mp3"
    ];

    var trackIds = {
        "audio-files/for-her-chill-upbeat.mp3" : "For Her",
        "audio-files/in-dreams.mp3" : "In Dreams",
        "audio-files/better-day.mp3" : "Better Day"
    };

    var currentTrack = document.getElementById("currentTrack");
    var playlistIndex = 0;

    function playTrack(index) {
        if (index >= 0 && index < playlist.length) {
            currentTrack.src = playlist[index];
            currentTrack.play();
            document.getElementById("trackId").value = trackIds[playlist[playlistIndex]];
        }
    }

    playTrack(playlistIndex);

    currentTrack.addEventListener("ended", function() {
        if (playlistIndex + 1 > playlist.length - 1) {
            playlistIndex = 0
        }
        else {
            playlistIndex++;
        }
        playTrack(playlistIndex);
    });

    document.getElementById("loop").addEventListener("click", function() {
        if (currentTrack.loop) {
            currentTrack.loop = false;
        }
        else {
            currentTrack.loop = true;
        }
    });

    document.getElementById("next").addEventListener("click", function() {
        // Pause the current track.
        currentTrack.pause();
        currentTrack.currentTime = 0;
    
        // Go to the next track or loop back to the first one.
        if (playlistIndex + 1 > playlist.length - 1) {
            playlistIndex = 0;
        }
        else {
            playlistIndex++;
        }
    
        // Play the next one.
        playTrack(playlistIndex);
    });

    document.getElementById("prev").addEventListener("click", function() {
        // Pause the current track.
        currentTrack.pause();
        currentTrack.currentTime = 0;
    
        // Go to the previous track or loop to the last one.
        if (playlistIndex - 1 < 0) {
            playlistIndex = playlist.length - 1;
        }
        else {
            playlistIndex--;
        }
    
        // Play the next one.
        playTrack(playlistIndex);
    });

    document.getElementById("pause").addEventListener("click", function() {
        currentTrack.pause();
    });
    
    document.getElementById("play").addEventListener("click", function() {
        currentTrack.play();
    });

});
