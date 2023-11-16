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
            <h2 className="page-title">Update Page</h2>
                    <form className="form-background" onSubmit={handleSubmit}>
                <div className="form-body">
                    <label className="form-label"><h4>Art Title</h4></label>
                    <input className="form-input" name="title" type="text" value={art.title} onChange = {handleChange}/> 
                </div>
                    {
                        error.title ? <p className="error-msg">{error.title.message}</p> : null
                    }
                <div className="form-body">
                    <label className="form-label"><h4>Artist</h4></label>
                    <input className="form-input" name="artist" type="text" value={art.artist} onChange = {handleChange}/> 
                </div>
                    {
                        error.artist ? <p className="error-msg">{error.artist.message}</p> : null
                    }
                <div className="form-body">
                    <label className="form-label"><h4>Height</h4></label>
                    <input className="form-input" name="height" type="number" value={art.height} onChange = {handleChange}/> 
                </div>
                    {
                        error.height ? <p className="error-msg">{error.height.message}</p> : null
                    }
                <div className="form-body">
                    <label className="form-label"><h4>Width</h4></label>
                    <input className="form-input" name="width" type="number" value={art.width} onChange = {handleChange}/> 
                </div>
                    {
                        error.width ? <p className="error-msg">{error.width.message}</p> : null
                    }
                <div className="form-body">
                    <label className="form-label"><h4>Description</h4></label>
                    <textarea className="form-textarea" cols="20" rows="3" name="description" type="text" value={art.description} onChange = {handleChange}/> 
                </div>
                    {
                        error.description ? <p className="error-msg">{error.description.message}</p> : null
                    }
                <div className="form-body">
                <label className="form-label"><h4>Type</h4></label>
                {art.type !== '' &&
                    <select className="form-input" name="type" defaultValue={art.type} onChange = {handleChange}>
                        <option value="Digital">Digital</option>
                        <option value="Hand Drawn">Hand Drawn</option>
                        <option value="Painting">Painting</option>
                        <option value="Sculpture">Sculpture</option>
                        <option value="Figurine">Figurine</option>
                        <option value="Photograph">Photograph</option>
                    </select>
                }
                </div>
                    {
                        error.type ? <p className="error-msg">{error.type.message}</p> : null
                    }
                <br/>
                <div className="form-buttons">
                    <button onClick={() => handleDelete(art._id)}>
                        Delete
                    </button>
                    <input type="submit" value="Submit"/>
                </div>
            </form>
        </div>
    </div>
    )
}

export default Update