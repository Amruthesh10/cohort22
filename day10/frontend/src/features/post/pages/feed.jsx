import React, { useEffect } from "react"
import "../../post/style/feed.scss"
import Post from "../component/post"
import { usePost } from "../hook/use.post"
import Nav from "../../shared/components/Nav"

const Feed = () => {
  const { handleFeed, feed,loading,handleLike,handleUnLike } = usePost()

  useEffect(() => {
    handleFeed()
  }, [handleFeed])

  if (loading) {
    return (
      <main>
        <h1>Loading feed...</h1>
      </main>
    )
  }

  return (
    <main>
      <div className="feed-page">
        <Nav />
        <div className="feed">
          <div className="posts">
            {feed.map(post => (
              <Post
                key={post._id}
                user={post.user}
                post={post}
                loading={loading}
                handleLike={handleLike}
                handleUnlike={handleUnLike}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

export default Feed