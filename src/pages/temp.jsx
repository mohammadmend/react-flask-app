import React from "react";
import { Link, Outlet } from "react-router-dom";
export default function TempPage() {
return(
    <>
    <div>
        <Link to="/login" style={{padding:"1rem"}}>Login</Link>
        <Link to="/create"style={{padding:"1rem"}}>Create Account</Link>
        <Link to="/profile"style={{padding:"1rem"}}>Profile</Link>
        <Link to="/deal"style={{padding:"1rem"}}>Manage Requests</Link>
    </div>
    <main style={{ padding: "1rem" }}>
        <Outlet />
    </main>
    <footer style={{padding:"1rem", marginTop:"auto"}}>
        <p>© 2025 Ticket Management System BY mohammad</p>
    </footer>
    </>
);
}