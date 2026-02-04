import React, { useEffect, useState ,} from 'react'
import axios from 'axios'

const App = () => {
  const [note, setnote] = useState([{
  }])
  console.log("app integration")

  function fetchdata(){
  axios.get('https://cohort22.onrender.com/api/notes')
  .then((res)=>{
    setnote(res.data.note)
  })
}
function handleSubmit(e){
  e.preventDefault();
  const {title,description}= e.target.elements;
  console.log(title.value,description.value)
  axios.post('https://cohort22.onrender.com/api/notes',{
    title: title.value,
    description:description.value
  })
    .then((res)=>{
      console.log(res.data)
    })
  fetchdata()
}
function handleDeleteNote(noteId){
  axios.delete("https://cohort22.onrender.com/api/notes/"+noteId)
  .then(()=>{
    console.log(res.data)
  })
  fetchdata()
}

  useEffect(()=>{
    fetchdata()
  },[])
  return (
   <>
   <form className='note-create-form' onSubmit={handleSubmit} >
      <input name="title" type="text" placeholder="Title"  />
      <input name="description" type="text"  placeholder="Description"  />
      <button>Create notes</button>
   </form>
    <div className="notes">
      {note.map((elem, index) => {
        return (
          <div className="note" key={index}>
            <h1>{elem.title}</h1>
            <p>{elem.description}</p>
            <button className='delete' onClick={()=>{
              handleDeleteNote(elem._id)
            }}>delete</button>

          </div>
        )
      })}
    </div>
   </>
  )
}

export default App
