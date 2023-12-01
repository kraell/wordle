import React, { useContext, useState } from 'react'
import Game, { GameContext } from './Game';


interface KeyProps {
    value: string;
    isSpecial?: boolean;
}

const Key: React.FC<KeyProps> = ({ value, isSpecial }) => {
    const [ used, setUsed ] = useState<boolean>(false);
    const gameContext = useContext(GameContext);
    if (!gameContext)
        return null;
    const { 
        addLetter, 
        deleteLetter, 
        enterGuess,
        lettersCorrect,
        lettersPresent,
        lettersAbsent,
    } = gameContext;

    const handleKeyClick = () => {
        // Don't accept user input if game is over
        if (gameContext.gameOver)
            return;
        if (value === "Enter")
            enterGuess();
        else if (value === "Delete")
            deleteLetter();
        else
            addLetter(value);
    }

    let id: string = '';
    if (lettersCorrect.find((char) => char === value))
        id = 'correct';
    else if (lettersPresent.find((char) => char === value))
        id = 'present';
    else if (lettersAbsent.find((char) => char === value))
        id = 'absent';

    return (
        <div className={`key${isSpecial ? ' special-key' : ''}`} id={id} onClick={handleKeyClick}>
            {value}
        </div>
    );
}

export default Key;
