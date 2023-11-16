import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

const Home = () => {
    const navigate = useNavigate();
    const [allArts, setAllArts] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8000/api/art")
        .then(res => {
            console.log(res.data)
            setAllArts(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }, []);
    
    const handleCreate = () => {
        navigate('/api/art/create')
    }

    const handleEdit = (_id) => {
        navigate(`/api/art/edit/${_id}`)
    }

    const handleDetail = (_id) => {
        navigate(`/api/art/${_id}`)
    }

return(
    <div className="wrapper">
        <div className="nav-wall">
            <div className="nav-content">
                <h1 className="head-color">Curiosity Gallery</h1>
                <div className="nav-button">
                <button onClick={() => handleCreate()}>
                    Add Art!
                </button>
                </div>
            </div>
            <div className="nav-desc">
                <h2 className="head-color">Share a piece of art, Enjoy a piece of art</h2>
            </div>
        </div>
        <div className="page-body">
                {
                    allArts.allArt?.map((arts) => (
                        <div className="art-list" key={arts._id}>
                            <div className="art-content">
                                <h2>{arts.title}</h2>
                                <h3>{arts.artist}</h3>
                                <p>{arts.type}</p>
                                <p>{arts.width}" x {arts.height}"</p>
                            </div>
                            <div className="art-buttons">
                                <button onClick={() => handleEdit(arts._id)}>
                                    Edit
                                </button>
                                <button onClick={() => handleDetail(arts._id)}>
                                    Art Details
                                </button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
export default Home