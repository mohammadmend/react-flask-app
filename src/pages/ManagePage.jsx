import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import {createRequest} from "../api";

export default function ManagePage(){
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const submit = async d=> {
        d.preventDefault();
        setError(null);
        try {
            await createRequest({title, description});
            navigate("/profile");
        } catch (err) {
            setError(err.response?.data?.message || "Request failed. Please try again.");
        }
    }
    return(
        <form onSubmit={submit}>
            <h2>Manage Requests</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <div>
                <label>
                    Title
                    <input
                        value={title}
                        onChange={d => setTitle(d.target.value)}
                        required
                        />
                </label>
            </div>
            <div>
                <label>
                    Description
                    <textarea
                        value={description}
                        onChange={d => setDescription(d.target.value)}
                        required
                    />
                </label>
            </div>
            <button type="submit">Submit</button>
        </form>
    );



}

