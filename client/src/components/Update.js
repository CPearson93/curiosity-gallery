import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';

const Update = () => {
    const {id} = useParams();
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

    useEffect(() => {
        axios.get('http://localhost:8000/api/art/${id}')
        .then(res =>{
            console.log(res)
            setArt(res.data.arts)
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
        axios.patch('http://localhost:8000/api/art/${id}', art)
        .then(res => {
            console.log(res)
            navigate("/")
        })
    }

    const handleDelete = () => {
        axios.delete('http://localhost:8000/api/art/${id}')
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
        <button onClick={() => handleHome()}>
            Go back Home
        </button>
    </div>
    )
}

export default Update