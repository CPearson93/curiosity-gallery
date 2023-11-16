import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

const Create = () => {
    const navigate = useNavigate();
    const [art, setArt] = useState({
        title: '',
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
        console.log(art);
        axios.post("http://localhost:8000/api/art", art)
        .then(res => {
            console.log(res)
            navigate("/")
        })
        .catch(err => {
            console.log(err.response.data.errors)
            setError(err.response.data.errors)
        })
    }

    const handleHome = () => {
        navigate('/')
    }


    return(
    <div className="wrapper">
        <div className="nav-wall">
            <div className="nav-content">
                <h1 className="head-color">Curiosity Gallery</h1>
                <div className="nav-button">
                <button onClick={() => handleHome()}>
                    Home
                </button>
                </div>
            </div>
            <div className="nav-desc">
                <h2 className="head-color">Share a piece of art, Enjoy a piece of art</h2>
            </div>
        </div>
        <div className="page-body">
            <h2 className="page-title">Create Page</h2>
                <form className="form-background" onSubmit={handleSubmit}>
                    <div className="form-body">
                        <label className="form-label">Art Title</label>
                        <input className="form-input" name="title" type="text" onChange = {handleChange}/> 
                    {
                        error.title ? <p className="error-msg">{error.title.message}</p> : null
                    }
                    </div>
                    <div className="form-body">
                        <label className="form-label">Artist</label>
                        <input className="form-input" name="artist" type="text" onChange = {handleChange}/> 
                    {
                        error.artist ? <p className="error-msg">{error.artist.message}</p> : null
                    }
                    </div>
                <div className="form-body">
                    <label className="form-label">Height</label>
                    <input className="form-input" name="height" type="number" onChange = {handleChange}/> 
                    {
                        error.height ? <p className="error-msg">{error.height.message}</p> : null
                    }
                </div>
                <div className="form-body">
                    <label className="form-label">Width</label>
                    <input className="form-input" name="width" type="number" onChange = {handleChange}/> 
                    {
                        error.width ? <p className="error-msg">{error.width.message}</p> : null
                    }
                </div>
                <div className="form-body">
                    <label className="form-label">Description</label>
                    <textarea className="form-textarea" cols="20" rows="3" name="description" type="text" onChange = {handleChange}/> 
                    {
                        error.description ? <p className="error-msg">{error.description.message}</p> : null
                    }
                </div>
                <div className="form-body">
                    <label className="form-label">Type</label>
                    <input className="form-input" name="type" type="text" onChange = {handleChange}/> 
                    {
                        error.type ? <p className="error-msg">{error.type.message}</p> : null
                    }
                </div>
                <br/>
                <input type="submit" value="Submit"/>
            </form>
        </div>
    </div>
    )
}

export default Create