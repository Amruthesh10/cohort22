import axios from "axios";


const api = axios.create({
    baseURL: "https://cohort22-2.onrender.com",
    withCredentials: true
})
export async function uploadSong({ file, mood }) {
    const formData = new FormData()

    formData.append("song", file)
    formData.append("mood", mood)

    const response = await api.post("/api/song", formData)

    return response.data
}

export async function getSong({ mood }) {
    const response = await api.get("/api/song?mood=" + mood)
    console.log(response)
    return response.data
}