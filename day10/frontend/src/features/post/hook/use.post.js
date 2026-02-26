import { getFeed } from "../services/post.api"
import { createPost,likePost,unlikePost} from "../services/post.api"
import { useContext, useCallback } from "react"
import { PostContext } from "../post.context"
import { useEffect } from "react"

export const usePost = () => {
  const context = useContext(PostContext)

  if (!context) {
    throw new Error("usePost must be used inside PostProvider")
  }

  const { loading, feed, setFeed, setLoading } = context

  const handleFeed = useCallback(async () => {
    try {
      setLoading(true)
      const data = await getFeed()

      // ✅ correct key from backend
      setFeed(data.posts.reverse())
    } catch (err) {
      console.error("Failed to fetch feed", err)
      setFeed([])
    } finally {
      setLoading(false)
    }
  }, [setFeed, setLoading])

  const handleCreatePost =async(imageFile,caption)=>{
    setLoading(true)
    const data=await createPost(imageFile,caption)
    setFeed([data.post,...feed])
      setLoading(false)
  }

  const handleLike=async(post)=>{
 
    const data=await likePost(post)
    await handleFeed()
   
  }
   const handleUnLike=async(post)=>{

    const data=await unlikePost(post)
    await handleFeed()
   
  }










  useEffect(()=>{
    handleFeed()
  },[])






  return { loading, feed, handleFeed, handleCreatePost,handleLike,handleUnLike }
}