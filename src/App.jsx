import { useState } from "react"
import Board from './Board'

export default function Game() {
  const [history, setHistory] = useState([[[null, null, null], [null, null, null], [null, null, null]]])
  const [currentMove, setCurrentMove] = useState(0)
  let xIsNext = currentMove % 2 === 0
  const currentSquares = history[currentMove]

  function handleGame(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
    setHistory(nextHistory)
    setCurrentMove(nextHistory.length - 1)
  }
  function jumpTo(move) {
    setCurrentMove(move)
  }

  const moves = history.map((squares, move) => {
    let description;
    let li;
    if (move === currentMove) {
      li = `you are at #${move}`
    } else if (move > 0) {
      description = `move to #${move}`
    } else {
      description = `move to start`
    }


    if (li) {
      return (
        <li key={move}>
          {li}
        </li>
      )
    } else {
      return (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{description}</button>
        </li>
      )
    }
  })

  return (
    <>
      <div className="game">
        <div className="gameBoard">
          <Board squares={currentSquares} xIsNext={xIsNext} onPlay={handleGame} />
        </div>
        <div className="game-info">
          <ol>
            {moves}
          </ol>
        </div>
      </div>
    </>
  )
}







// export default function Board() {
//   const [squares, setSquares] = useState([Array(9).fill(null)])
//   const [xIsNext, setXIsNext] = useState(true)
//   const [currentMove, setCurrentMove] = useState(Array(9).fill(null))

//   let status = null;
//   const winner = winnerIs(currentMove)
//   if (winner) {
//     status = `winner: ${winner}`
//   } else {
//     status = `Next player: ${xIsNext ? 'X' : 'O'}`
//   }

//   function handleClick(i) {
//     if (currentMove[i] || winnerIs(currentMove)) {
//       return
//     }
//     const nextSquares = currentMove.slice()
//     if (xIsNext) {
//       nextSquares[i] = 'X'
//     } else {
//       nextSquares[i] = 'O'
//     }
//     setCurrentMove(nextSquares)
//     setSquares([...squares, currentMove])
//     console.log(squares)
//     setXIsNext(!xIsNext)
//   }
//   return (
//     <>
//       <div className="game">
//         <div className="status">{status}</div>
//         <div className="board-row">
//           <Square value={currentMove[0]} onClick={() => { handleClick(0) }} />
//           <Square value={currentMove[1]} onClick={() => { handleClick(1) }} />
//           <Square value={currentMove[2]} onClick={() => { handleClick(2) }} />
//         </div>
//         <div className="board-row">
//           <Square value={currentMove[3]} onClick={() => { handleClick(3) }} />
//           <Square value={currentMove[4]} onClick={() => { handleClick(4) }} />
//           <Square value={currentMove[5]} onClick={() => { handleClick(5) }} />
//         </div>
//         <div className="board-row">
//           <Square value={currentMove[6]} onClick={() => { handleClick(6) }} />
//           <Square value={currentMove[7]} onClick={() => { handleClick(7) }} />
//           <Square value={currentMove[8]} onClick={() => { handleClick(8) }} />
//         </div>
//       </div>
//       <div className="game-info">
//         <ol></ol>
//       </div>

//     </>
//   )
// }