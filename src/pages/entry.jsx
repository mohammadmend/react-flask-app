import React from "react";
import { useNavigate } from "react-router-dom";
export default function EntryPage() {
    const navigate = useNavigate();
    const login = ()=>{
        navigate("/login");
    }
    const create = ()=>{
        navigate("/create");
    }
    return(
        <div>
            <h1> Welcome to the Ticket Managment Systen</h1>
            <button type="button" onClick= {login}>Login</button>
            <button type="button" onClick={create}>Create Account</button>
        </div>
        
    );
}