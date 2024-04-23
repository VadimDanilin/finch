import { FC, HTMLAttributes } from 'react'
import './Cell.css'

interface CellProps extends HTMLAttributes<HTMLElement> {
  isActive?: boolean
}

export const Cell: FC<CellProps> = ({children, isActive = false, ...props}) => {
  return <div {...props} className={`cell ${isActive ? 'cell--active' : ''}`}>
    <div className='cell__inner'>
      {children}
    </div>
  </div>
}