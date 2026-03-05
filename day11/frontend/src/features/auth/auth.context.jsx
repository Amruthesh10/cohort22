import { createContext, useState, useEffect } from "react";
import { getme } from "./services/auth.api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    async function fetchUser() {
      try {
        const data = await getme()
        setUser(data.user)
      } catch (err) {
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()

  }, [])

  return (
    <AuthContext.Provider value={{ user, setUser, loading, setLoading }}>
      {children}
    </AuthContext.Provider>
  )
}