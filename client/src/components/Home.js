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
    <div>
        <div className="nav-wall">
            <div className="nav-content">
                <h1>Curiosity Gallery</h1>
                <h2>Share a piece of art, Enjoy a piece of art</h2>
                <button onClick={() => handleCreate()}>
                    Add Art!
                </button>
            </div>
        </div>
            {
                allArts.allArt?.map((arts) => (
                    <div className="art-list" key={arts._id}>
                        <div className="art-content">
                            <h2>{arts.title}</h2>
                            <p>{arts.artist}</p>
                            <p>{arts.type}</p>
                        </div>
                        <div className="art-edit">
                            <button onClick={() => handleEdit(arts._id)}>
                                Edit
                            </button>
                        </div>
                        <button onClick={() => handleDetail(arts._id)}>
                    Art Details
                </button>
                    </div>
                ))
            }
        </div>
    )
}
export default Home