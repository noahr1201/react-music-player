import React, { useState } from "react";
import "./App.css"; 

import songData from "./songData";
import artistData from "./artistData";
import albumData from "./albumData";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false); 
  const filteredSongs = songData.filter(
    (song) =>
      song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const playSong = (song) => {
    setCurrentSong(song);
    setIsPlaying(true);
  };

  return (
    <div className="App">
      <header>
        <h1>Muziek Streaming App</h1>
        <input
          type="text"
          placeholder="Zoeken naar nummers, albums of artiesten"
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
      </header>
      <main>
        <div className="mobile-container">
          <section>
            <h2>Nummers</h2>
            <div className="song-list">
              {filteredSongs.map((song) => (
                <div
                  className={`song ${currentSong && currentSong.title === song.title && isPlaying ? 'active' : ''}`}
                  key={song.title}
                  onClick={() => playSong(song)}
                >
                  <img src={song.image} alt={song.title} />
                  <p>
                    {song.title} - {song.artist}
                  </p>
                </div>
              ))}
            </div>
          </section>
          <section>
            <h2>Artiesten</h2>
            <div className="artist-list">
              {artistData.map((artist) => (
                <div className="artist" key={artist.title} onClick={() => artist.songs && artist.songs.length > 0 && playSong(artist.songs[0])}>
                  <img src={artist.image} alt={artist.title} />
                  <p>{artist.title}</p>
                </div>
              ))}
            </div>
          </section>
          <section>
            <h2>Albums</h2>
            <div className="album-list">
              {albumData.map((album) => (
                <div className="album" key={album.title} onClick={() => album.songs && album.songs.length > 0 && playSong(album.songs[0])}>
                  <img src={album.image} alt={album.title} />
                  <p>{album.title} - {album.artist}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      <footer>{<p>Muziek ding</p>}</footer>
      {currentSong && (
        <div className="music-player">
          <h2>Now Playing</h2>
          <p>
            {currentSong.title} - {currentSong.artist}
          </p>
          <audio
            controls
            autoPlay={isPlaying} 
            onPause={() => setIsPlaying(false)} 
            onEnded={() => setIsPlaying(false)} 
            key={currentSong.title} 
          >
            <source src={currentSong.mp3} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
    </div>
  );
}

export default App;
