import React, { useContext, useState } from 'react'
import Game, { GameContext, Position } from './Game';


interface LetterBoxProps {
    value: string;
    position: Position;
    word: string;
}

const LetterBox: React.FC<LetterBoxProps> = ({ value, position, word }) => {
    const gameContext = useContext(GameContext);
    if (!gameContext)
        return null;
    // Whether or not this letter is being actively chosen by user
    const isActive = position === gameContext.currPosition;
    // Whether or not this letter is part of a guess that's been submitted
    const isSubmitted = position.row < gameContext?.currPosition.row;
    // Whether or not this letter is in the correct spot
    const isCorrect = isSubmitted && value === gameContext.solutionWord[position.column];
    // Whether or not this letter is in the wrong spot
    let isPresent = false;
    if (isSubmitted)
    {
        const numOccurrencesInSolution = (gameContext.solutionWord.match(new RegExp(`${value}`, 'g')) || []).length;
        if (numOccurrencesInSolution > 0)
        {
            // Find number of occurrences of this letter in the user's guess
            // (word) that are CORRECT, as these reduce the number of candidates
            // for 'isPresent' status.
            let numCorrectOccurrencesInGuess = 0;
            for (let i = 0; i < word.length; ++i)
                if (word[i] === value && gameContext.solutionWord[i] === value)
                    ++numCorrectOccurrencesInGuess;
            // Max number of 'isPresent' letter boxes with this value is 
            // <num_in_solution>-<num_correctly_guessed>
            const maxPossiblePresent = numOccurrencesInSolution - numCorrectOccurrencesInGuess;
            // *This* letter can only be marked present if there are less than
            // <maxPossiblePreset> occurrences of this letter in the user's
            // guess (word) that are INCORRECT and PRECEDE this letter.
            let numIncorrectPrecedingOccurrencesInGuess = 0;
            for (let i = 0; i < position.column; ++i)
                if (word[i] === value && gameContext.solutionWord[i] !== value)
                    ++numIncorrectPrecedingOccurrencesInGuess;
            isPresent = numIncorrectPrecedingOccurrencesInGuess < maxPossiblePresent;
        }
    }
    // Whether or not this letter is NOT in the solution word
    const isAbsent = isSubmitted && !isCorrect && !isPresent;

    let id: string = '';
    // assert(isCorrect || isPresent || isAbsent);
    if (isSubmitted)
    {
        if (isCorrect)
        {
            // TODO: "Warning: Cannot update a component (`Game`) while 
            // rendering a different component (`LetterBox`)."
            id = 'correct';
            if (!gameContext.lettersCorrect.find((char) => char === value))
                gameContext.setLettersCorrect([...gameContext.lettersCorrect, value]);
        }
        else if (isPresent)
        {
            id = 'present';
            if (!gameContext.lettersPresent.find((char) => char === value))
                gameContext.setLettersPresent([...gameContext.lettersPresent, value]);
        }
        else if (isAbsent)
        {
            id = 'absent';
            if (!gameContext.lettersAbsent.find((char) => char === value))
                gameContext.setLettersAbsent([...gameContext.lettersAbsent, value]);
        }
    }

    return (
        <div className={`letter-box`} id={id}>
            {value}
        </div>
    );
}

export default LetterBox;
