import Square from './Square';

export default function Board({ squares, xIsNext, onPlay }) {
    const winnerObj = winnerIs(squares)

    function handleClick(i, j) {
        console.log(this)
        if (squares[i][j] || winnerIs(squares)) {

            return
        }
        const nextSquares = JSON.parse(JSON.stringify(squares))
        if (xIsNext) {
            nextSquares[i][j] = 'X'
        } else {
            nextSquares[i][j] = 'O'
        }
        onPlay(nextSquares)
    }

    let status = null;
    if (winnerObj) {
        const winner = winnerObj.winner
        status = `winner: ${winner}`
    } else {
        status = `Next player: ${xIsNext ? 'X' : 'O'}`
    }

    return (
        <>
            <div className="status">{status}</div>
            {Array(3).fill(null).map((_, i) => {
                return (
                    <div key={i} className='board-row'>
                        {
                            Array(3).fill(null).map((_, j) => {
                                return (
                                    <Square key={`${i}${j}`} value={squares[i][j]} onClick={handleClick.bind(null, i, j)} />
                                )
                            })
                        }
                    </div>
                )
            })
            }
        </>
    )
}

function winnerIs(data) {
    for (let i = 0; i < 3; i++) {
        if (data[i][0] && data[i][0] === data[i][1] && data[i][0] === data[i][2]) {
            return {
                i: i,
                winner: data[i][0]
            }
        } else if (data[0][i] && data[0][i] === data[1][i] && data[0][i] === data[2][i]) {
            return {
                col: i,
                winner: data[0][i]
            }
        }
    }
    if (data[1][1] && data[0][0] === data[1][1] && data[0][0] === data[2][2]) {
        return {
            diagonal: 'left',
            winner: data[1][1]
        }
    } else if (data[1][1] && data[0][2] === data[1][1] && data[0][2] === data[2][0]) {
        return {
            diagonal: 'right',
            winner: data[1][1]
        }
    }
    return null
}


// const winPosibility = [
//     [0, 1, 2],
//     [3, 4, 5],
//     [6, 7, 8],
//     [0, 3, 6],
//     [1, 4, 7],
//     [2, 5, 8],
//     [0, 4, 8],
//     [2, 4, 6]
// ]

// for (let i = 0; i < winPosibility.length; i++) {
//     const [a, b, c] = winPosibility[i]
//     if (data[a] && data[a] === data[b] && data[a] === data[c]) {
//         return data[a]
//     }
// }
// return null
// }

/* <div className="board-row">
                <Square value={squares[0]} onClick={() => handleClick(0)} />
                <Square value={squares[1]} onClick={() => handleClick(1)} />
                <Square value={squares[2]} onClick={() => handleClick(2)} />
            </div>
            <div className="board-row">
                <Square value={squares[3]} onClick={() => handleClick(3)} />
                <Square value={squares[4]} onClick={() => handleClick(4)} />
                <Square value={squares[5]} onClick={() => handleClick(5)} />
            </div>
            <div className="board-row">
                <Square value={squares[6]} onClick={() => handleClick(6)} />
                <Square value={squares[7]} onClick={() => handleClick(7)} />
                <Square value={squares[8]} onClick={() => handleClick(8)} />
            </div> */