import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

const Create = () => {
    const navigate = useNavigate();
    const [art, setArt] = useState({
        name: '',
        artist: '',
        height: '',
        width: '',
        description: '',
        type: ''
    })

    const [error, setError] = useState({})

    const handleChange = (e) => {
        setArt({...art, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/art", art)
        .then(res => {
            console.log(res)
            navigate("/")
        })
        .catch(err => {
            console.log(err.response.data.error.errors)
            setError(err.response.data.error.errors)
        })
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
                    <form className="form-background" onSubmit={handleSubmit}>
                <div className="form-title">
                    <label className="form-label">Art Name</label>
                    <input className="form-input" name="name" type="text" onChange = {handleChange}/> 
                    {
                        error.name ? <p className="error-msg">{error.name.message}</p> : null
                    }
                </div>
                <div className="form-body">
                    <label className="form-label">Artist</label>
                    <textarea className="form-textarea" cols="20" rows="3" name="artist" type="text" onChange = {handleChange}/> 
                    {
                        error.artist ? <p className="error-msg">{error.artist.message}</p> : null
                    }
                </div>
                <br/>
                <input type="submit" value="Submit"/>
            </form>
    </div>
    )
}

export default Create