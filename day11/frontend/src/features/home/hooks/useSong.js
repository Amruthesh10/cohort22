import { getSong, uploadSong } from "../services/song.api";
import { useContext } from "react";
import { SongContext } from "../song.context";

export const useSong = () => {
    const context = useContext(SongContext)

    const {
        loading,
        setLoading,
        songs,
        setSongs,
        currentIndex,
        setCurrentIndex
    } = context

    const song = songs[currentIndex] || null

    async function handleGetSong({ mood }) {
        try {
            setLoading(true)

            const data = await getSong({ mood })

            setSongs(data.song)   // backend should return songs array
            setCurrentIndex(0)

        } catch (error) {
            console.error("Get song failed:", error)
        } finally {
            setLoading(false)
        }
    }

    async function handleUploadSong({ file, mood }) {
        try {
            setLoading(true)

            const data = await uploadSong({ file, mood })

            setSongs((prev) => [...prev, data.song])

        } catch (error) {
            console.error("Upload failed:", error)
        } finally {
            setLoading(false)
        }
    }

    function nextSong() {
        setCurrentIndex((prev) => (prev + 1) % songs.length)
    }

    function prevSong() {
        setCurrentIndex((prev) => (prev - 1 + songs.length) % songs.length)
    }

    return {
        loading,
        song,
        songs,
        currentIndex,
        handleGetSong,
        handleUploadSong,
        nextSong,
        prevSong
    }
}