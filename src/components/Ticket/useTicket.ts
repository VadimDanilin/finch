import { useState } from 'react'
import sendTicket from '../../utils/sendTicket'

const getRandomCells = (max: number, count: number) => {
  const cells: number[] = []

  while (cells.length < count) {
    const random = Math.floor(Math.random() * (max - 1 + 1)) + 1
    if (!cells.includes(random)) cells.push(random)
  }

  return cells
}

interface IField {
  countCells: number
  needSelectedCells: number
}

export const useTicket = (fields: IField[]) => {
  const [selectedCells, setSelectedCells] = useState<number[][]>(fields.map(_ => []))
  const [isTicketWon, setIsTicketWon] = useState<boolean | null>(null)

  const selectRandomCells = () => {
    setSelectedCells(prev => {
      return prev.map((_, index) => getRandomCells(fields[index].countCells, fields[index].needSelectedCells))
    })
  }

  const getResult = () => {
    for (let i = 0; i < selectedCells.length; i++) {
      if (selectedCells[i].length < fields[i].needSelectedCells) {
        return [0, 0]
      }
    }

    return selectedCells.map((_, index) => {
      return getRandomCells(fields[index].countCells, fields[index].needSelectedCells)
        .filter((item) => selectedCells[index].includes(item)).length
    })
  }

  const checkWin = (conditionForWin: boolean) => {
    setIsTicketWon(conditionForWin)
    sendTicket(selectedCells[0], selectedCells[1], conditionForWin)
  }

  return {
    selectedCells,
    selectRandomCells,
    getResult,
    checkWin,
    isTicketWon
  }
}
