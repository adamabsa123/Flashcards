import { useState } from "react";
import Flashcard from "./Flashcard";
import "./FlashcardList.css";

const initialFlashcards = [
  { question: "What is the capital of France?", answer: "Paris" },
  { question: "What is 2 + 2?", answer: "4" },
  { question: "Who wrote 'To Kill a Mockingbird'?", answer: "Harper Lee" },
  { question: "Who wrote the Declaration of Independence?", answer: "Thomas Jefferson" },
  { question: "When is Independence Day?", answer: "July 4th" },
];

export default function FlashcardList() {
  const [flashcards, setFlashcards] = useState(initialFlashcards);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [streak, setStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [masteredCards, setMasteredCards] = useState([]);

  const currentCard = flashcards[currentIndex];

  const handleSubmit = () => {
    if (!userAnswer.trim()) return;

    const isCorrect = userAnswer.trim().toLowerCase() === currentCard.answer.toLowerCase();
    setFeedback(isCorrect ? "Correct! ✅" : "Incorrect ❌");
    
    if (isCorrect) {
      setCorrectCount(correctCount + 1);
      setStreak(streak + 1);
      if (streak + 1 > longestStreak) {
        setLongestStreak(streak + 1);
      }
    } else {
      setStreak(0);
    }

    setUserAnswer("");
  };

  const nextCard = () => {
    setCurrentIndex((prev) => (prev + 1) % flashcards.length);
    setFeedback(null);
  };

  const prevCard = () => {
    setCurrentIndex((prev) => (prev === 0 ? flashcards.length - 1 : prev - 1));
    setFeedback(null);
  };

  const randomCard = () => {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * flashcards.length);
    } while (randomIndex === currentIndex);
    setCurrentIndex(randomIndex);
    setFeedback(null);
  };

  const markAsMastered = () => {
    setMasteredCards([...masteredCards, currentCard]);
    setFlashcards(flashcards.filter((_, i) => i !== currentIndex));
    setCurrentIndex(0);
    setFeedback(null);
  };

  return (
    <div className="flashcard-container">
      <h1>Flashcards</h1>
      {flashcards.length > 0 ? (
        <>
          <Flashcard card={currentCard} />
          <p>Total Cards: {flashcards.length}</p>

          <div className="user-input">
            <input
              type="text"
              placeholder="Enter your answer..."
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
            />
            <button onClick={handleSubmit}>Submit</button>
          </div>
          {feedback && <p>{feedback}</p>}

          <div className="navigation">
            <button onClick={prevCard}>⬅ Previous</button>
            <button onClick={randomCard}>🔀 Random</button>
            <button onClick={nextCard}>➡ Next</button>
          </div>

          <button onClick={markAsMastered} disabled={masteredCards.includes(currentCard)}>
            ✅ Mark as Mastered
          </button>

          <p>Correct Answers: {correctCount}</p>
          <p>Current Streak: {streak}</p>
          <p>Longest Streak: {longestStreak}</p>
        </>
      ) : (
        <h2>No more cards!</h2>
      )}
    </div>
  );
}
