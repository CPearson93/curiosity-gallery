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

    const handleEdit = (_id) => {
        navigate(`/api/art/edit/${_id}`)
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
        <p>Create Page</p>
        <h2>{oneArt.title}</h2>
        <p>{oneArt.artist}</p>
        <p>{oneArt.height}" x {oneArt.width}"</p>
        <p>{oneArt.type}</p>
        <p>{oneArt.description}</p>
        <button onClick={() => handleEdit(oneArt._id)}>
            Edit
        </button>
        <button onClick={() => handleDelete(oneArt._id)}>
            Delete
        </button>
        </div>
    </div>
    )
}
export default Detail