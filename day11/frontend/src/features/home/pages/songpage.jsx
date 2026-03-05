import { useState } from "react"
import { useSong } from "../hooks/useSong"
import "../styles/songpage.scss"

export default function SongPage() {

    const { loading, song, handleGetSong, handleUploadSong } = useSong()

    const [file, setFile] = useState(null)
    const [mood, setMood] = useState("happy")

    const handleUpload = (e) => {
        e.preventDefault()
        if (!file) return alert("Select a song")

        handleUploadSong({ file, mood })
    }

    return (
        <div className="song-page">

            <h1 className="title">Moodify 🎧</h1>

            {/* Mood Selector */}
            <div className="mood-section">

                <select
                    value={mood}
                    onChange={(e) => setMood(e.target.value)}
                >
                    <option value="happy">Happy 😊</option>
                    <option value="sad">Sad 😢</option>
                    <option value="surprised">Surprised</option>
                </select>

                <button onClick={() => handleGetSong({ mood })}>
                    Get Song
                </button>

            </div>

            {/* Player */}
            {song && (
                <div className="player-card">

                    <img
                        src={song.imgUrl}
                        alt="poster"
                        className="poster"
                    />

                    <h2>{song.title}</h2>

                    <audio controls src={song.url}></audio>

                </div>
            )}

            {loading && <p className="loading">Loading...</p>}

            {/* Upload Section */}
            <div className="upload-section">
  <h3>Upload Song</h3>

  <form onSubmit={handleUpload}>

    <label className="file-upload" htmlFor="">
      <input
        type="file"
        accept="audio/mp3"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <span className="file-upload__btn">
        Choose Song 🎵
      </span>

      <span className="file-upload__name">
        {file ? file.name : "No file selected"}
      </span>
    </label>

    <button type="submit">
      {loading ? "Uploading..." : "Upload"}
    </button>

  </form>
</div>

        </div>
    )
}