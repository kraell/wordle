import React, { useCallback, useContext, useEffect, useState } from 'react'
import Key from './Key';
import { GameContext } from './Game';
import useWordle from '../hooks/useWordle';


export default function Keyboard() {
    const { handleKeyDown } = useWordle();

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);

        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [handleKeyDown]);
    
    const keys_top = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
    const keys_mid = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
    const keys_bot = ['Z', 'X', 'C', 'V', 'B', 'N', 'M'];

    const delete_icon = '\u232B';

    return (
        <div className='keyboard' onKeyDown={handleKeyDown as unknown as React.KeyboardEventHandler<HTMLDivElement>}>
            <div className='keys'>
                {keys_top.map((value,index) => (
                    <Key key={`top_${index}`} value={value} />
                ))}
            </div>
            <div className='keys'>
                {keys_mid.map((value,index) => (
                    <Key key={`mid_${index}`} value={value} />
                ))}
            </div>
            <div className='keys'>
                <Key value='Enter' isSpecial={true} /> 
                {keys_bot.map((value,index) => (
                    <Key key={`bot_${index}`} value={value} />
                ))}
                <Key value={delete_icon} isSpecial={true} /> 
            </div>
        </div>
    );
}
