import { createContext, useState } from "react";

export const SongContext = createContext()

export const SongContextProvider = ({ children }) => {

    const [songs, setSongs] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0)

    const [loading, setLoading] = useState(false)

    const song = songs[currentIndex] || null

    return (
        <SongContext.Provider
            value={{
                songs,
                setSongs,
                currentIndex,
                setCurrentIndex,
                song,
                loading,
                setLoading
            }}
        >
            {children}
        </SongContext.Provider>
    )
}