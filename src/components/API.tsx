const APIcalls = {
    URL: "https://coinappcrypto.herokuapp.com/",
    headers:{
        'Content-Type': 'application/json',
        'Authorization': getToken(),
    }
}
function getToken(){
    const TOKEN = localStorage.getItem("token");
    if (TOKEN?.split(" ")[0] === "Bearer"){
        return TOKEN;
    }
    return "123";
}

export default function APIcallsfunc(){
    return APIcalls;
}