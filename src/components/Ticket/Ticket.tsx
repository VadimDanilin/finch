import { FC, HTMLAttributes } from 'react'
import './Ticket.css'
import magicWand from '../../assets/magic-wand.svg'
import { Field } from '../Field/Field'
import { useTicket } from './useTicket'

interface TicketProps extends HTMLAttributes<HTMLElement> {
  title: string
}

export interface FieldOptions {
  title: string
  countCells: 2 | 19
  needSelectedCells: number
  selectedCells?: number[]
}

const fields: FieldOptions[] = [
  {
    title: 'Поле 1',
    countCells: 19,
    needSelectedCells: 8,
  },
  {
    title: 'Поле 2',
    countCells: 2,
    needSelectedCells: 1,
  }
]

export const Ticket: FC<TicketProps> = ({title}) => {
  const { selectedCells, selectRandomCells, getResult, checkWin, isTicketWon } = useTicket(fields)
  const [wonCellsFirstField, wonCellsSecondField] = getResult()

  if (isTicketWon === true) {
    return <div  className='ticket'>
      <div className='ticket__title'>{title}</div>
      Ого, вы выиграли! Поздравляем!
    </div>
  } else if (isTicketWon === false) {
    return <div  className='ticket'>
      <div className='ticket__title'>{title}</div>
      К сожалению, вы проиграли :(
    </div>
  }

  return <div className='ticket'>
    <div className='ticket__title'>
      {title}
      <button className='ticket__button-random' onClick={selectRandomCells}>
        <img src={magicWand} />
      </button>
    </div>

    {
      fields.map((item, index) => {
        return <Field options={{
          ...item,
          selectedCells: selectedCells[index]
        }} key={item.title} />
      })
    }

    <button
      className='button-show-results'
      onClick={() => checkWin((wonCellsFirstField >= 4) || (wonCellsFirstField >= 3 && wonCellsSecondField >= 1))}
      disabled={selectedCells[0].length < fields[0].needSelectedCells || selectedCells[1].length < fields[1].needSelectedCells}
    >Показать результат</button>
  </div>
}