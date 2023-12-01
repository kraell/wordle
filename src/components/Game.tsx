import React, { createContext, useEffect, useState } from 'react'
import WordGrid from './WordGrid';
import Keyboard from './Keyboard';


interface GameContextProps {
    solutionWord: string;
    grid: string[][];
    setGrid: React.Dispatch<React.SetStateAction<string[][]>>; 
    currPosition: Position; 
    setCurrPosition: React.Dispatch<React.SetStateAction<Position>>;
    addLetter: (value: string) => void;
    deleteLetter: () => void;
    enterGuess: () => void;
    gameOver: boolean;
    lettersCorrect: string[];
    setLettersCorrect: React.Dispatch<React.SetStateAction<string[]>>;
    lettersPresent: string[];
    setLettersPresent: React.Dispatch<React.SetStateAction<string[]>>;
    lettersAbsent: string[];
    setLettersAbsent: React.Dispatch<React.SetStateAction<string[]>>;
}

export const GameContext = createContext<GameContextProps | null>(null);

export interface Position {
    row: number;
    column: number;
}

export default function Game() {
    const [ potentialLineNumber, setPotentialLineNumber ] = useState<string>('');
    const [ lineNumber, setLineNumber ] = useState<number | null>(null);
    const [ wordList, setWordList ] = useState<string[]>([]);
    const [ solutionWord, setSolutionWord ] = useState<string>('');
    const maxAttempts = 6;
    const [ grid, setGrid ] = useState<string[][]>([]);
    const initialPosition: Position = { row: 0, column: 0 };
    const [ currPosition, setCurrPosition ] = useState<Position>(initialPosition);
    const [ lastGuessWord, setLastGuessWord ] = useState<string>('');
    const [ gameOver, setGameOver ] = useState<boolean>(false);
    const [ lettersCorrect, setLettersCorrect ] = useState<string[]>([]);
    const [ lettersPresent, setLettersPresent ] = useState<string[]>([]);
    const [ lettersAbsent, setLettersAbsent ] = useState<string[]>([]);
    
    // Functions to handle user input (whether from virtual or IRL keyboard)
    const addLetter = (value: string) => {
        // make sure there's room to add another letter
        if (currPosition.column >= solutionWord.length || currPosition.row >= maxAttempts)
            return;
        // ensure this is a valid character
        if (!(/^[A-Za-z]$/.test(value)))
            return;
        // update grid and position
        const newGrid = [...grid];
        newGrid[currPosition.row][currPosition.column] = value.toUpperCase();
        setGrid(newGrid);
        setCurrPosition({...currPosition, column: currPosition.column+1});
    }
    const deleteLetter = () => {
        // make sure there's a letter to delete
        if (currPosition.column <= 0)
            return;
            // update grid and position
        const newGrid = [...grid];
        newGrid[currPosition.row][currPosition.column-1] = '';
        setGrid(newGrid);
        setCurrPosition({...currPosition, column: currPosition.column-1});
    }
    const enterGuess = () => {
        // make sure all letter boxes are filled
        if (currPosition.column !== solutionWord.length)
            return;
        const guessWord: string = grid[currPosition.row].reduce((prev,curr) => prev+curr);
        console.log('word guessed:', guessWord);
        setLastGuessWord(guessWord);
        setCurrPosition({row: currPosition.row+1, column: 0});
    }

    // Check for game over after each position move
    useEffect( () => {
        // user ran out of attempts
        if (currPosition && currPosition.row >= maxAttempts)
            setGameOver(true);
    }, [currPosition])

    // Check for game over after each guess 
    useEffect( () => {
        // User guessed correctly
        console.log('lastGuessWord', lastGuessWord);
        if (lastGuessWord && solutionWord && lastGuessWord === solutionWord)
            setGameOver(true);
    }, [lastGuessWord]);

    // Read in the word list from /public/wordlist.txt
    const init = async () => {
        console.log('Fetching word list')
        try {
            const response = await fetch('/wordlist.txt');
            const text = await response.text();
            const words = text.split('\n').map((word) => word.trim());
            setWordList(words);
            console.log('words list:', words);
        } catch (error) {
            console.error('Error fetching word list:', error);
        }
    }

    // Read in word list when page loads
    useEffect( () => {
        init();
    }, []);

    // Set initial grid to have <maxAttempts> rows, and <solutionWord.length> columns
    const initializeGrid = () => {
        console.log(`initializng ${maxAttempts}x${solutionWord.length} grid for word: ${solutionWord}`);
        const newGrid: string[][] = [];
        for (let i = 0; i < maxAttempts; ++i)
            newGrid.push(new Array(solutionWord.length).fill(''));
        setGrid(newGrid);
    }

    // Initialize grid when solution word changes
    useEffect( () => {
        if (solutionWord !== '')
            initializeGrid();
    }, [solutionWord]);

    // Handler for resetting the game
    const resetGame = () => {
        if (!wordList.length)
            return;
        console.log('Resetting game')
        let newWord: string = '';
        if (potentialLineNumber !== '')
        {
            // Use specified line number to get index of new word
            const number = parseInt(potentialLineNumber, 10);
            console.log('lineNumber:', number)
            if (number && 0 < number && number <= wordList.length)
            {
                // Choose word at index <lineNumber-1>
                newWord = wordList[number-1];
                setLineNumber(number);
            }
            else
            {
                alert(`Line number must be a number in the range [1,${wordList.length}]. (Leave this field blank to pick a random word.)`);
            }
        }
        if (!newWord)
        {
            // Choose word randomly
            newWord = wordList[Math.floor(Math.random() * wordList.length)];
            setLineNumber(null);
        }
        // assert(newWord);
        console.log('new solution word:', newWord);
        setSolutionWord(newWord.toUpperCase());
        setCurrPosition(initialPosition);
        setGameOver(false);
        setLettersCorrect([]);
        setLettersPresent([]);
        setLettersAbsent([]);
    }

    // When word list changes, set a new solution word
    useEffect( () => {
        resetGame();
    }, [wordList]);

    // Handler for line number input change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPotentialLineNumber(e.target.value);
    }

    return (
        <div className='game'>
            <h1 className='game-header'>Wordle</h1>
            <br />
            <div>
                <input
                    type='number'
                    placeholder='Specified line number'
                    value={potentialLineNumber || ''}
                    onChange={handleInputChange}
                />
                <button onClick={resetGame}>New Game</button>
            </div>
            <h5>Game now active with {(lineNumber ? `word from line ${lineNumber}` : `random word`)}!</h5>
            {/* <div>Solution: {solutionWord}</div> */}
            <GameContext.Provider value={{
                solutionWord,
                grid, 
                setGrid, 
                currPosition, 
                setCurrPosition,
                addLetter,
                deleteLetter,
                enterGuess,
                gameOver,
                lettersCorrect,
                setLettersCorrect,
                lettersPresent,
                setLettersPresent,
                lettersAbsent,
                setLettersAbsent,
            }}>
                <WordGrid />
                <h3 hidden={!gameOver}>GAME OVER: the word was {solutionWord}!</h3>
                <Keyboard />
            </GameContext.Provider>
        </div>
    );
}
