import React, { useState } from 'react'
import "../../post/style/createpost.scss"
import { usePost } from '../hook/use.post'
import { useRef } from 'react'
import { useNavigate } from 'react-router'


const CreatePost = () => {
    const [caption, setcaption] = useState("")
    const postImageInputFieldRef=useRef(null)
    const navigate=useNavigate()
    const {loading,handleCreatePost}=usePost()
    async function handleSubmit(e){
        e.preventDefault()
         const file=postImageInputFieldRef.current.files[0]
  await handleCreatePost(file,caption)
    navigate("/feed")
    }
    if(loading){
        return(
            <main><h1>Creating post...</h1></main>
        )
    }
  return (
   <main>
    <div className="create-post-page">
        <h1>Create New Post</h1>
        <form onSubmit={handleSubmit} >
            <label className="create-post-label" htmlFor="postImage">Select Image</label>
            <input hidden ref={postImageInputFieldRef} type="file" name="postImage" id="postImage" />
            <input type="text" 
            value={caption}
            onChange={(e)=>{setcaption(e.target.value)}}
            name="caption" id="caption" placeholder='Enter your caption'/>
            <button type="submit" className='button primary-button'>create post</button>
        </form>
    </div>
   </main>
  )
}

export default CreatePost