import { useState } from "react";
import "./Flashcard.css";

export default function Flashcard({ card }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className={`flashcard ${isFlipped ? "flipped" : ""}`}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className="front">{card.question}</div>
      <div className="back">{card.answer}</div>
    </div>
  );
}
