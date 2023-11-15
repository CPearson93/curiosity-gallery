import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';

const Detail = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [oneArt, setOneArt] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/art/` + id)
        .then(res => {
            console.log(res)
            setOneArt(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

    const handleDelete = () => {
        axios.delete(`http://localhost:8000/api/art/` + id)
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
        navigate("/")
    }

    const handleHome = () => {
        navigate('/')
    }
    
    return(
    <div>
        <div className="nav-wall">
            <div className="nav-content">
                <h1>Curiosity Gallery</h1>
                <h2>Share a piece of art, Enjoy a piece of art</h2>
                <button onClick={() => handleHome()}>
                    Go back Home
                </button>
            </div>
        </div>
        <p>Create Page</p>
        <h2>{oneArt.title}</h2>
        <p>{oneArt.artist}</p>
        <p>{oneArt.height}", {oneArt.width}"</p>
        <p>{oneArt.type}</p>
        <p>{oneArt.description}</p>
        <button onClick={() => handleDelete(oneArt._id)}>
            Delete
        </button>
    </div>
    )
}
export default Detail