import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createAccount } from "../api";

export default function CreatePage(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("user");
    const [email, setEmail] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const handleSubmit = async e=>{
        e.preventDefault();
        setError(null);
        try {
            await createAccount({username, password, role, email});
            navigate("/login");
        } catch (err) {
            setError(err.message || "Failed to create account. Please try again.");
        }
    };
    return(
        <form onSubmit={handleSubmit}>
            <h2>Create Account</h2>
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
            <div>
                <label>
                    Role
                    <select value={role} onChange={e => setRole(e.target.value)}>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </label>
            </div>
            <div>
                <label>
                    Email
                    <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                </label>
            </div>
            <button type="submit">Create Account</button>
        </form>
    );
}
