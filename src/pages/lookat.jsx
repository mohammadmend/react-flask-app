import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { manage } from "../api";
import { manageDelete } from "../api";
import { manageUpdate } from "../api";
export default function Deal(){
    const [requests, setRequests] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        manage()
            .then(data=>{
                setRequests(data.requests || []);
            })
            .catch(err => {
                setError(err.message || "Failed to load requests.");
            });
        }, []);
    const handleDelete = async id => {
        setError(null);
        try {
            await manageDelete(id);
            setRequests(requests.filter(r => r.id !== id));
        } catch (err) {
            setError(err.message || "Failed to delete request.");
        }
    }
    const handleUpdate = async id => {
        setError(null);
        try {
            await manageUpdate(id, "approved");
            setRequests(requests.map(r => r.id === id ? { ...r } : r));
        } catch (err) {
            setError(err.message || "Failed to update request.");
        }
    };
    if (error) {
        return <p style={{ color: "red" }}>{error}</p>;
    }
    if (requests.length === 0) {
        return <p>No requests found.</p>;
    }
    return (
        <div>
            <h2>Manage Requests</h2>
            <ul>
                {requests.map(r => (
                    <li key={r.id}>
                        {r.title} - {r.status}
                        <button onClick={() => handleUpdate(r.id, "approved")}>Approve</button>
                        <button onClick={() => handleUpdate(r.id, "rejected")}>Reject</button>
                        <button onClick={() => handleDelete(r.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

    