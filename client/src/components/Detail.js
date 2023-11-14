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
        <p>Create Page</p>
        <button onClick={() => handleHome()}>
                        Go back Home
                    </button>
    </div>
)
}
export default Detail