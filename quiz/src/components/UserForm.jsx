import React, {useState, useContext} from "react"; 
import {UserContext} from "./UserContext";

export default function UserForm(){
    const [inputName, setInputName] = useState(""); 
    const {setName} = useContext(UserContext); 

    function handleSubmit(e) {
        e.preventDefault(); 
        setName(inputName); //Set the name in context
        window.history.pushState({}, '', '/quiz'); //Change URL without reloading the page
        const navEvent = new PopStateEvent('popstate'); 
        window.dispatchEvent(navEvent); 
    }

    return(
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name: </label>
            <input type="text" id="name" value={inputName} onChange={e => setInputName(e.target.value)} placeholder="Enter your Name"/>
            <button type="submit">Start Quiz</button>
        </form>
    ); 
}