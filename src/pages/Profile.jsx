import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {profile} from "../api";

export default function Profile() {
    const [requests, setRequests] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const createRequest = () => {
        navigate("/manage");
    }
    useEffect(() => {
        profile()
            .then(data => {
                setRequests(data.requests || []);
            })
            .catch(err => {
                setError(err.message || "Failed to load profile data.");
            });
        }, []);
    if (error){
        return <p style= {{color:"red"}}>{{error}}</p>
    }
    if (requests.length === 0) {
        return (
        <div>
        <button type="button" onClick={createRequest}>Create New Request</button>

        <p>No requests found.</p>
        </div>
        );
    }
    return(
        
        <ul>
            <button type="button" onClick={createRequest}>Create New Request</button>
            <h2>My Requests</h2>
            {requests.map(r=>(
                <li key= {r.id}>
                    {r.title} - {r.status}
                    {r.descrption}
                    </li>
            ))}
        </ul>  
    );
}