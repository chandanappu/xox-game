import React, { useState } from 'react';
import './btn.css';

const Btn = () => {
    const [xoxArr, setXoxArr] = useState(Array(9).fill(''));
    const [isXNext, setIsXNext] = useState(true);
    const [winner, setWinner] = useState(null);
    const [draw, setDraw] = useState(0);
    const [drawState, setDrawState] = useState(false);

    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const checkWinner = (newXoxArr) => {
        for (let combination of winningCombinations) {
            const [a, b, c] = combination;
            if (newXoxArr[a] && newXoxArr[a] === newXoxArr[b] && newXoxArr[a] === newXoxArr[c]) {
                return newXoxArr[a];
            }
        }
        return null;
    }

    const change = (index) => {
        if (winner || xoxArr[index]) {
            return;
        }

        const newXoxArr = [...xoxArr];
        newXoxArr[index] = isXNext ? 'X' : 'O';
        const newWinner = checkWinner(newXoxArr);

        setXoxArr(newXoxArr);
        setIsXNext(!isXNext);
        setWinner(newWinner);

        if (newWinner) {
            return;
        }

        const newDraw = draw + 1;
        setDraw(newDraw);

        if (newDraw === 9) {
            setDrawState(true);
        }
    }

    const resetGame = () => {
        setXoxArr(Array(9).fill(''));
        setIsXNext(true);
        setWinner(null);
        setDraw(0);
        setDrawState(false);
    }

    return (
        <>
            <div className="board">
                {xoxArr.map((value, index) => (
                    <button
                        key={index}
                        onClick={() => change(index)}
                        className='btn main'
                    >
                        {value}
                    </button>
                ))}
            </div>
            {winner && <div className="winner">Winner: {winner}</div>}
            {drawState && !winner && <div className="draw">Draw</div>}
            <button onClick={resetGame} className='btn reset'>Reset</button>
        </>
    );
}

export default Btn;
