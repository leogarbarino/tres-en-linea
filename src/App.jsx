import { useState } from "react"
import confetti from "canvas-confetti"
import { Square } from "./components/Square"
import { TURNS } from "./constant"
import { checkWinnerFrom, checkEndGame } from "./logic/board"
import { WinnerModal } from "./components/WinnerModal"





function App() {
  const [board, setBoard]= useState(() => {
    const boardFromStorage= window.localStorage.getItem('board')
    if(boardFromStorage) return JSON.parse(boardFromStorage)
    return Array(9).fill(null)
  })
  
  // estado para saber quien juega
  const [turn, setTurn]= useState(() => {
    const turnFromStorage= window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X
  })

  // estado para saber si alguien ganó
  const [winner, setWinner]= useState(null) // null es q no hay ganador, false es q hay un empate
  
  

  const resetGame= () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
  }

  

  const updateBoard= (index) => {
    // no actualizamos esta posicion si ya tiene algo
    if (board[index] || winner) return

    // actualizar el tablero
    const newBoard= [...board]
    newBoard[index]= turn // x u o
    setBoard(newBoard)

    // cambiar el turno de jugador
    const newTurn= turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    // guardamos aqui la partida
    window.localStorage.setItem('board', JSON.stringify(newBoard))
    window.localStorage.setItem('turn', newTurn)

    // revisar si hay ganador
    const newWinner= checkWinnerFrom(newBoard)
    if(newWinner){
      confetti()
      setWinner(newWinner)
    } // chequear si el juego terminó
    else if(checkEndGame(newBoard)){
      setWinner(false)// empate
       
    }


  }

  return ( 
  <main className='board'>
  <h1>Tres en línea</h1>
  <button onClick={resetGame}>Reset del juego</button>
  <section className='game'>
    {
      board.map((square, index) => {
        return (
        <Square 
        key= {index}
        index= {index}
        updateBoard={updateBoard}>
          {square}
        </Square>
        )
      })
    }
  </section>

  <section className="turn">
    <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
    <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
  </section>

  <WinnerModal resetGame={resetGame} winner={winner} />
  </main>
  )
}

export default App
