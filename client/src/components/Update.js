import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';

const Update = () => {
    const {id} = useParams();
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

    useEffect(() => {
        axios.get(`http://localhost:8000/api/art/${id}`)
        .then(res =>{
            console.log(res)
            setArt(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

    const handleChange = (e) => {
        setArt({...art, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.patch(`http://localhost:8000/api/art/${id}`, art)
        .then(res => {
            console.log(res)
            navigate("/")
        })
        .catch(err => {
            console.log(err.response.data.errors)
            setError(err.response.data.errors)
        })
    }

    const handleDelete = () => {
        axios.delete(`http://localhost:8000/api/art/${id}`)
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
                    <form className="form-background" onSubmit={handleSubmit}>
                <div className="form-title">
                    <label className="form-label">Art Title</label>
                    <input className="form-input" name="title" type="text" value={art.title} onChange = {handleChange}/> 
                    {
                        error.title ? <p className="error-msg">{error.title.message}</p> : null
                    }
                </div>
                <div className="form-body">
                    <label className="form-label">Artist</label>
                    <input className="form-input" name="artist" type="text" value={art.artist} onChange = {handleChange}/> 
                    {
                        error.artist ? <p className="error-msg">{error.artist.message}</p> : null
                    }
                </div>
                <div className="form-body">
                    <label className="form-label">Height</label>
                    <input className="form-input" name="height" type="number" value={art.height} onChange = {handleChange}/> 
                    {
                        error.height ? <p className="error-msg">{error.height.message}</p> : null
                    }
                </div>
                <div className="form-body">
                    <label className="form-label">Width</label>
                    <input className="form-input" name="width" type="number" value={art.width} onChange = {handleChange}/> 
                    {
                        error.width ? <p className="error-msg">{error.width.message}</p> : null
                    }
                </div>
                <div className="form-body">
                    <label className="form-label">Description</label>
                    <textarea className="form-textarea" cols="20" rows="3" name="description" type="text" value={art.description} onChange = {handleChange}/> 
                    {
                        error.description ? <p className="error-msg">{error.description.message}</p> : null
                    }
                </div>
                <div className="form-body">
                    <label className="form-label">Type</label>
                    <input className="form-input" name="type" type="text" value={art.type} onChange = {handleChange}/> 
                    {
                        error.type ? <p className="error-msg">{error.type.message}</p> : null
                    }
                </div>
                <br/>
                <input type="submit" value="Submit"/>
                <button onClick={() => handleDelete(art._id)}>
                    Delete
                </button>
            </form>
    </div>
    )
}

export default Update