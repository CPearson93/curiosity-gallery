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
        <p>Create Page</p>
        <button onClick={() => handleHome()}>
                        Go back Home
                    </button>
    </div>
)
}

export default Create