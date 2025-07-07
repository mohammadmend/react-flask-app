async function handle(res){
    const payload= await res.json();
    if(!res.ok) throw payload;
    return payload;
}
export function createAccount({username, password,email, role}){
    return fetch("/api/create",{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({username, password,email, role})
    }).then(handle)
}
export function login({username, password}){
    return fetch ("/api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({username, password})
    }).then(handle)
}
export function createRequest({title, description}){
    return fetch("/api/request",{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({title, description})

    })
}

export function profile(){
    return fetch("/api/profile", {
        method: "GET",
        credentials: "include"
    }).then(handle)
}

export function manage(){
    return fetch("/api/manage",{
        method: "GET",
        credentials: "include"

    }).then(handle)
}

export function manageDelete(id){
    return fetch("/api/manage/${id}/DELETE",{
        method: "DELETE",
        credentials: "include"
    }).then(handle)
}
export function manageUpdate(id){
    return fetch ("/api/manage/${id}/update", {
        method: "PUT",
        credentials: "include"
    }).then(handle)
}
