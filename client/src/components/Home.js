import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

const Home = () => {
    const navigate = useNavigate();
    const [allArt, setAllArt] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8000/api/art")
        .then(res => {
            console.log(res)
            setAllArt(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }, []);
    
    const handleCreate = () => {
        navigate('/api/art/create')
    }

    const handleEdit = (_id) => {
        navigate('/api/art/edit/${_id}')
    }

    const handleDetail = (_id) => {
        navigate('/api/art/${_id}')
    }

return(
    <div>
        <p>Home Page</p>
        <button onClick={() => handleCreate()}>
                    Add Art!
                </button>
        <button onClick={() => handleEdit()}>
                    Edit Art
                </button>
        <button onClick={() => handleDetail()}>
                    Art Details
                </button>
    </div>
)
}
export default Home