import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

const Home = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filterType, setFilterType] = useState('title');
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

    const handleSearch = () => {
        // Fetch filtered arts based on searchQuery and filterType
        axios.get(`http://localhost:8000/api/search?${filterType}=${searchQuery}`)
            .then(res => {
                console.log(res.data);
                setAllArts(res.data);
            })
            .catch(err => {
                console.log(err);
            });

            if(searchQuery=="" || searchQuery==null){
                axios.get("http://localhost:8000/api/art")
                .then(res => {
                    console.log(res.data)
                    setAllArts(res.data)
                })
                .catch(err => {
                    console.log(err)
                })
            }   

    };

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
            <div className="nav-desc">
            <div>
                <label className="query" htmlFor="search" >Search:</label>
                <input
                    type="text"
                    id="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <label className="query" htmlFor="filterType">Filter by:</label>
                <select
                    id="filterType"
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                >
                    <option value="title">Title</option>
                    <option value="artist">Artist</option>
                </select>
                <button  onClick={() => handleSearch()}>Search</button>
            </div>
            </div>
        </div>
        <div className="page-body">
                {
                    allArts.allArt?.map((arts) => (
                        <div className="art-list" key={arts._id}>

                            <div className="art-content">
                            <img key={1} src={`http://localhost:8000/${arts.imageUrls[0]}`} alt={`Art Image`} height={100}/>                            </div>
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