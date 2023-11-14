import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

const Detail = () => {
    const navigate = useNavigate();

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
export default Detail