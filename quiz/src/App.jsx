import { useState, useEffect } from 'react';
import { BrowserRouter,Routes, Route } from 'react-router-dom';

import Header from "./components/Header"; 
import Question from "./components/Question"; 
import Results from "./components/Results"; 
import UserForm from './components/UserForm';
import { UserProvider } from './components/UserContext';

import './App.css'

const questions = [
  {
    question: "What's your favorite color?",
    options: ["Red 🔴", "Blue 🔵", "Green 🟢", "Yellow 🟡"],
  },
  {
    question: "How would your friends describe you?",
    options: ["Brave", "Kind", "Clever", "Cunning"],
  },
  {
    question: "What animal do you prefer?",
    options: ["Lion", "Badger", "Snake", "Eagle"],
  },
  {
    question: "What subject are you most looking forward to studying at Hogwarts?",
    options: ["Charms", "Potions", "Herbology", "Care for Magical Creatures"],
  },
  {
    question: "If you could control one of the elements, which would it be?",
    options: ["Earth", "Air", "Fire", "Water"],
  },
  {
    question: "What is your greatest fear?",
    options: ["Spiders", "Snakes", "Heights", "Clowns"],
  },
  {
    question: "If you were trapped on a desert island, what item would you most want to have with you?",
    options: ["A cell phone", "A pocket knife", "A box of matches", "A weeks supply of food"],
  }
]

const keywords = { 
  Gryffindor: "gryffindor",
  Slytherin: "slytherin", 
  Hufflepuff: "hufflepuff",
  Ravenclaw: "ravenclaw",
}; 

const elements = {
  "Red 🔴": "Gryffindor",
  "Blue 🔵": "Ravenclaw", 
  "Green 🟢": "Slytherin", 
  "Yellow 🟡": "Hufflepuff", 

  "Brave": "Gryffindor",
  "Kind": "Hufflepuff",
  "Clever": "Ravenclaw",
  "Cunning": "Slytherin", 

  "Lion": "Gryffindor",
  "Badger": "Hufflepuff",
  "Snake": "Slytherin", 
  "Eagle": "Ravenclaw",

  "Charms": "Gryffindor",
  "Potions": "Slytherin",
  "Herbology": "Ravenclaw",
  "Care for Magical Creatures": "Hufflepuff",

  "Earth": "Slytherin", 
  "Air": "Hufflepuff", 
  "Fire": "Gryffindor", 
  "Water": "Ravenclaw",

  "Spiders": "Slytherin", 
  "Snakes": "Gryffindor", 
  "Heights": "Hufflepuff", 
  "Clowns": "Ravenclaw",

  "A cell phone": "Hufflepuff", 
  "A pocket knife": "Gryffindor", 
  "A box of matches": "Slytherin", 
  "A weeks supply of food": "Ravenclaw"
};

function App() {
  //initializing the states
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); //which question is showing
  const [answers, setAnswers] = useState([]); //user's answers
  const [userName, setUserName] = useState(""); //user's name
  const [element, setElement] = useState(""); //final determined element 
  const [artwork, setArtwork] = useState(null); //fetched artwork based on the element 

  function handleAnswer(answer){
    //adds selected answer to the answers array 
    setAnswers([...answers, answer]); 
    //Move to the next question 
    setCurrentQuestionIndex(currentQuestionIndex+1); 
  }; 

  function handleUserFormSubmit(name){
    //saves User's name for form submission
    setUserName(name);
  }; 

  function determineElement(answers){
    const counts = {}; 
    //looping through all the user's answers
    answers.forEach(function(answer){
      //converts each answer into an element using the elements mapping
      const element = elements[answer]; 
      //counts how many times each element appears
      counts[element] = (counts[element] || 0)+1; 
    });
    //Picking the most frequent one as the final result
    return Object.keys(counts).reduce(function(a,b){
      return counts[a] > counts[b] ? a : b
    });
  };

  async function fetchImages(keyword){
    try{
      const response = await fetch('https://potterapi-fedeperin.vercel.app/en/characters'); 
      const data = await response.json(); 
      console.log("Characters: ", data[0]);
      console.log(data[0].image);

      console.log("All characters sample: ", data.slice(0,5));

      //Filter character by house 
      const charactersInHouse = data.filter(
        (char) => char.hogwartsHouse?.toLowerCase() === keyword && char.image
      ); 

      console.log("Filtered characters: ", charactersInHouse);

      //Pick random character image from that house 
      if(charactersInHouse.length > 0){
        const randomCharacter = charactersInHouse[Math.floor(Math.random()*charactersInHouse.length)];
        setArtwork({
          name: randomCharacter.fullName,
          image: randomCharacter.image,
        });
      }else{
        setArtwork(null); //fallback if no image found
      }
    }catch(error){
      console.error("Error fetching character images: ", error);
      setArtwork(null); 
    }
    console.log("Image: ", artwork); 
    
  }

  useEffect(
    //runs when the quiz is finished - when all questions habe been answeres
    function(){
      if(currentQuestionIndex === questions.length){
        //determine the element
        const selectedElement = determineElement(answers); 
        setElement(selectedElement); 
        console.log(selectedElement);
        //fetching artwork
        fetchImages(keywords[selectedElement]);
      }
    },
    [currentQuestionIndex]
  );

  return (
    <UserProvider value={{ name: userName, setName: setUserName }}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<UserForm onSubmit={handleUserFormSubmit} />} />
          <Route path="/quiz" element={
            currentQuestionIndex < questions.length ? (
              <Question question={questions[currentQuestionIndex].question}
                options={questions[currentQuestionIndex].options} onAnswer={handleAnswer} />
            ) : (
              <Results element={element} artwork={artwork} />
            )
          }
          />
          
        </Routes>
      </BrowserRouter>
    </UserProvider>
   
  );
}

export default App
