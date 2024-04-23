import { FC, HTMLAttributes } from 'react'
import './Field.css'
import { FieldOptions } from '../Ticket/Ticket'
import { useField } from './useField'
import { Cell } from '../Cell/Cell'


interface FieldProps extends HTMLAttributes<HTMLElement> {
  options: FieldOptions
}

export const Field: FC<FieldProps> = ({options}) => {
  const { selectedCells, handleClickCell, declension } = useField(options)
  const { title, countCells, needSelectedCells } = options

  return <>
    <div className='field__title'>
      <span className='field__title-bold'>{title}</span>
      <span>
        {
          selectedCells.length < needSelectedCells
          ? `Отметьте ${needSelectedCells - selectedCells.length} ${declension(needSelectedCells - selectedCells.length)}`
          : 'Вы отметили все числа'
        }
      </span>
    </div>
    <div  className='field__cells'>
      {new Array(countCells).fill(null).map((_, index) => {
        return <Cell
          isActive={selectedCells.includes(index + 1)}
          onClick={() => handleClickCell(index + 1)}
          key={index}
        >{index + 1}</Cell>
      })}
    </div>
  </>
}