import React, { useContext, useState } from 'react'
import Game, { GameContext, Position } from './Game';
import LetterBox from './LetterBox';


export default function WordGrid() {
    const gameContext = useContext(GameContext);
    if (!gameContext)
        return null;
    const { grid, setGrid } = gameContext;
    const words: string[] = grid.map(row => (
        row.reduce((prevChar, currChar) => prevChar + currChar)
    ));
    // console.log("words on grid:", words);
    return (
        <div className='word-grid'>
            {grid.map((row, rowIndex) => (
                <div key={rowIndex} className='word-row'>
                    {row.map((letterValue, columnIndex) => (
                        <LetterBox 
                            key={columnIndex} 
                            value={letterValue} 
                            position={{row: rowIndex, column: columnIndex}} 
                            word={words[rowIndex]}
                        />
                    ))}
                </div>
            ))}
        </div>
    )
}
