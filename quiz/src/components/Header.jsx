import React from "react"; 
import {Link} from "react-router-dom"; 

export default function Header(){
    return(
        <header>
            <h1>What is your Hogwarts House?</h1>
            <p>(Based on completly random things)</p>

            <nav>
                <Link to="/">Home </Link>
                <Link to="/quiz"> Quiz</Link>
            </nav>

        </header>
    ); 
}
