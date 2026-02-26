import { createContext, useState } from "react"

export const PostContext = createContext(null)

export const PostProvider = ({ children }) => {
  const [loading, setLoading] = useState(false)
  const [feed, setFeed] = useState([])   // ✅ MUST be an array

  return (
    <PostContext.Provider
      value={{
        loading,
        feed,
        setFeed,
        setLoading,
      }}
    >
      {children}
    </PostContext.Provider>
  )
}