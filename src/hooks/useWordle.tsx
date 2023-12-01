import { useContext, useState } from "react"
import { GameContext } from '../components/Game';


interface UseWordleResult {
    handleKeyDown: (e: KeyboardEvent) => void;
}


const useWordle = (): UseWordleResult => {
    const gameContext = useContext(GameContext);

    // Handle keypress on keyboard to track/update current guess;
    const handleKeyDown = (e: KeyboardEvent) => {
        // Don't add letters if user is typing in input field, or if game is over
        if (e.target instanceof HTMLInputElement || gameContext?.gameOver)
            return;
        console.log('keyboard:', e.key);
        if (e.key === "Enter")
            gameContext?.enterGuess();
        else if (e.key === "Backspace")
            gameContext?.deleteLetter();
        else
            gameContext?.addLetter(e.key);
    };

    return {
        handleKeyDown
    };
};

export default useWordle;
