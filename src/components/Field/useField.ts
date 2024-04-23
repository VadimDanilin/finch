import { useEffect, useState } from 'react'
import { FieldOptions } from '../Ticket/Ticket'

export const useField = (options: FieldOptions) => {
  const { needSelectedCells, selectedCells: selCells } = options
  const [selectedCells, setSelectedCells] = useState<number[]>(selCells || [])

  useEffect(() => {
    setSelectedCells(selCells || [])
  }, [options])

  const handleClickCell = (cell: number) => {
    if (selectedCells.includes(cell)) {
      setSelectedCells((prev: number[]) => prev.filter(item => item !== cell))
      return 
    }
  
    if (selectedCells.length < needSelectedCells) {
      setSelectedCells((prev: number[]) => [...prev, cell])
    }
  }

  const declension = (count: number) => {
    switch (true) {
      case count % 10 === 1:
        return 'число'
      case count >= 2 && count <= 4:
        return 'числа'
      case count % 10 >= 2 && count % 10 <= 4:
        return 'числа'
      default:
        return 'чисел'
    }
  }

  return {
    selectedCells,
    handleClickCell,
    declension
  }
}