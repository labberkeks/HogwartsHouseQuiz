import React from "react"; 
import { useContext } from "react";
import { UserContext } from "./UserContext";

export default function Results({element, artwork}){
    //Reference Context for "name"
    const {name} = useContext(UserContext); 

    return (
        <div>
            <p>
                <strong>{name}</strong>, your element is: {element}
            </p>
            {artwork ? (
                <div className="artwork">
                    <h2>{artwork.name}</h2>
                    <img src={artwork.image} alt={artwork.name} />
                </div>
            ) : (
                <p>No artwork found.</p>
            )}
        </div>
    );

}