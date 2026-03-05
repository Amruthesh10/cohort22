import React from 'react'
import FaceExpression from '../../Expression/components/FaceExpression'
import Player from '../component/Player'
import { useSong } from '../hooks/useSong'
import {Link} from 'react-router'
const Home = () => {

    const { handleGetSong } = useSong()

    return (
        <>
                    <div style={{ padding: "20px" }}>
                <Link to="/create">
                    <button className='button'>Create Song</button>
                </Link>
            </div>

            <FaceExpression
                onClick={(expression) => { handleGetSong({ mood: expression }) }}
                
            />
            <Player />
            
        </>
    )
}

export default Home