function do1(init, callback){
    const result = init + 1;
    callback(result);
}
function do2(init, callback){
    const result = init + 2;
    callback(result);
}
function do3(init, callback){ 
    const result = init + 3;
    callback(result);
}
function t(){
    do1(0,(result1) => {
        do2(result1, (result2) => {
            do3(result2, (result3) => {
                console.log(result3); // Should print 6
            });
        });
    });
}


t();



const fet= fetch("something");

console.log(fet);
fet.then((response)=>{
    console.log(response);
});




fet.then((response)=>{
    const j =response.json();
    j.then((data)=>{
        console.log(data);
    })
});


fet
    .then((response=>{
        if(!response.ok){
            throw new Error("Network response was not ok");
        }
        return response.json();
    }))
    .then((data)=>{
        console.log(data);
    });











const f=fetch("https://jsonplaceholder.typicode.com/posts/1");
const f2=fetch("https://jsonplaceholder.typicode.com/posts/2");
const f3=fetch("https://jsonplaceholder.typicode.com/posts/3");
Promise.all([f1,f2,f3])
    .then((responses)=>{
        for (const response of responses){
            console.log(response);
        }
    })
    .catch((error) => {
        console.error("Error fetching data:", error);
    });



async function bruh(){
    try{
        const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}











const fetch=fetch(
    "https://nothing.com",
);
console.log(fetch);
fetch.then((response) => {
    console.log(response);
});