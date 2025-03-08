import { useState } from "react";
import Flashcard from "./Flashcard";
import "./FlashcardList.css";

const flashcards = [
  { question: "What is the capital of France?", answer: "Paris" },
  { question: "What is 2 + 2?", answer: "4" },
  { question: "Who wrote 'To Kill a Mockingbird'?", answer: "Harper Lee" },
  { question: "Who wrote the Declaration of Independence?", answer: "Thomas Jefferson" },
  { question: "When is Independence Day?", answer: "July 4th" },
];

export default function FlashcardList() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextCard = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
  };

  const prevCard = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? flashcards.length - 1 : prevIndex - 1
    );
  };

  const randomCard = () => {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * flashcards.length);
    } while (randomIndex === currentIndex); // Ensure a different card is picked
    setCurrentIndex(randomIndex);
  };

  return (
    <div className="flashcard-container">
      <h1><strong>Flashcards</strong></h1>
      <Flashcard card={flashcards[currentIndex]} />
      <p>Total Cards: {flashcards.length}</p> 
      <div className="navigation">
        <button onClick={prevCard}>&larr; Previous</button>
        <button onClick={randomCard}>🔀 Random</button>
        <button onClick={nextCard}>&rarr; Next</button>
      </div>
    </div>
  );
}
