import React, { useState, useEffect } from 'react';

const words = ['REACT', 'STATE', 'PROPS', 'HOOKS', 'ARRAY', 'FETCH', 'ASYNC', 'CLASS', 'REDUX', 'STYLE'];

const WordGuessingGame = () => {
  const [word, setWord] = useState('');
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [gameStatus, setGameStatus] = useState('playing'); // 'playing', 'won', 'lost'
  const maxGuesses = 6;

  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setWord(randomWord);
    setGuesses([]);
    setCurrentGuess('');
    setGameStatus('playing');
  };

  const handleInputChange = (e) => {
    const value = e.target.value.toUpperCase();
    if (value.length <= word.length && /^[A-Z]*$/.test(value)) {
      setCurrentGuess(value);
    }
  };

  const handleSubmitGuess = () => {
    if (currentGuess.length !== word.length) return;

    const newGuesses = [...guesses, currentGuess];
    setGuesses(newGuesses);
    setCurrentGuess('');

    if (currentGuess === word) {
      setGameStatus('won');
    } else if (newGuesses.length >= maxGuesses) {
      setGameStatus('lost');
    }
  };

  const renderGuess = (guess) => {
    return guess.split('').map((letter, index) => {
      let backgroundColor = '#3A3A3C'; // Default gray
      if (letter === word[index]) {
        backgroundColor = '#538D4E'; // Green for correct position
      } else if (word.includes(letter)) {
        backgroundColor = '#B59F3B'; // Yellow for correct letter, wrong position
      }
      return (
        <span key={index} style={{
          display: 'inline-block',
          width: '40px',
          height: '40px',
          lineHeight: '40px',
          textAlign: 'center',
          margin: '2px',
          backgroundColor,
          color: 'white',
          fontWeight: 'bold',
          borderRadius: '4px'
        }}>
          {letter}
        </span>
      );
    });
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#121213',
      color: 'white',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Word Guessing Game</h1>
      
      <div style={{ marginBottom: '1rem' }}>
        {guesses.map((guess, index) => (
          <div key={index} style={{ margin: '5px 0' }}>{renderGuess(guess)}</div>
        ))}
      </div>

      {gameStatus === 'playing' && (
        <div style={{ marginBottom: '1rem' }}>
          <input
            type="text"
            value={currentGuess}
            onChange={handleInputChange}
            maxLength={word.length}
            style={{ 
              padding: '5px',
              fontSize: '1rem',
              textTransform: 'uppercase',
              backgroundColor: '#3A3A3C',
              color: 'white',
              border: 'none',
              borderRadius: '4px'
            }}
          />
          <button 
            onClick={handleSubmitGuess}
            style={{
              marginLeft: '5px',
              padding: '5px 10px',
              fontSize: '1rem',
              backgroundColor: '#538D4E',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Guess
          </button>
        </div>
      )}

      {gameStatus !== 'playing' && (
        <div style={{ marginBottom: '1rem' }}>
          <p>{gameStatus === 'won' ? 'Congratulations! You guessed the word!' : `Game Over. The word was ${word}.`}</p>
          <button 
            onClick={startNewGame}
            style={{
              padding: '5px 10px',
              fontSize: '1rem',
              backgroundColor: '#538D4E',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Play Again
          </button>
        </div>
      )}

      <p>Guess the {word.length}-letter word. You have {maxGuesses - guesses.length} guesses left.</p>
    </div>
  );
};

export default WordGuessingGame;
