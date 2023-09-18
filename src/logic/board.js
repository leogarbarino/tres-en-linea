import { WINNER_COMBOS } from "../constant"

export const checkWinnerFrom = (boardToCheck) => {
    // revisamos todas las combinaciones ganadoras
    // para ver si x u o ganó
      for(const combo of WINNER_COMBOS){
        const [a, b, c]= combo
        if(
          boardToCheck[a] && // 0 -> x u o
          boardToCheck[a] === boardToCheck[b] && // 0 y 3 -> x -> x u o -> o
          boardToCheck[a] === boardToCheck[c]
        ){
          return boardToCheck[a] // x u o
        }
      }

      // si no hay ganador
      return null
  }

  export const checkEndGame= (newBoard) => {
    // revisamos si hay empate
    // si no hay mas espacios vacíos en el tablero

    return newBoard.every((square) => square !== null) // q los cuadrados tengan una x u o

  }