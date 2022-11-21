import React, { useState } from "react";
import "./App.css";

export default function App() {
  //Generate random hex code
  const RandomColor = (size) =>
  [...Array(size)]
  .map(() => Math.floor(Math.random() * 16).toString(16))
  .join("");

  //Shuffling three hex codes with one "correct"
  const [color, setColor] = useState("#" + RandomColor(6));
  const [array, setArray] = useState(
    shuffle(["#" + RandomColor(6), "#" + RandomColor(6), color])
  );
  const [next, setNext] = useState(false);
  const [message, setMessage] = useState("");

  //Check answer for match
  const checkAnswer = (e) => {
    if (e === color) {
      setMessage("Correct");
    } else {
      setMessage("Wrong");
    }

    setNext(true);
  };

  //Restart game with new set of random hex codes
  const shuffleArray = () => {
    let newColor = "#" + RandomColor(6);
    setColor(newColor);
    setArray(shuffle(["#" + RandomColor(6), "#" + RandomColor(6), newColor]));
  };

  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex]
      ];
    }

    return array;
  }

  return (
    <div
      className="App">
      <div
        className="Box"
        style={{backgroundColor: color }}
      ></div>
      <div className="Guess">
        {array.map((item, i) => (
          <button
            onClick={() => checkAnswer(item)}
            key={i}
            style={next ? { background: item } : { background: "white" }}
          >
            <p>{item}</p>
          </button>
        ))}
      </div>

      {next && (
        <button
          onClick={() => {
            shuffleArray();
            setMessage("");
            setNext(false);
          }}
        >
          Next
        </button>
      )}
      <div>{message}</div>
    </div>
  );
}