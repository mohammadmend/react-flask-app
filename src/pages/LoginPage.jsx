import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import{login} from "../api"

export default function LoginPage(){
    const[username, setUsername] = useState("");
    const[password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const handleSubmit= async e =>{
        e.preventDefault();
        setError(null);
        try{
            await login({username, password});
            navigate("/profile");
        }catch(err){
            setError(err.response?.data?.message || "Login failed. Please try again.");
        }
    
    };
    return (
        <form onSubmit={handleSubmit}>
          <h2>Login</h2>
          {error && <p style={{ color: "red" }}>{error}</p>}
    
          <div>
            <label>
              Username
              <input
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
              />
            </label>
          </div>
    
          <div>
            <label>
              Password
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </label>
          </div>
    
          <button type="submit">Login</button>
        </form>
      );
    }