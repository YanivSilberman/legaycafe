import * as React from 'react'
import { useDrag } from 'react-dnd'
import { ItemTypes } from '../DndBin';

const style: React.CSSProperties = {
  cursor: 'move'
}

interface BoxProps {
  children: any;
  _id: string;
  type: string;
}

const Box: React.FC<BoxProps> = ({ children, _id, type }) => {
  const [{ isDragging }, drag] = useDrag({
    item: { _id, type: ItemTypes[type] },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const opacity = isDragging ? 0.4 : 1

  return (
    <div ref={drag} style={{ ...style, opacity }}>
      {children}
    </div>
  )
}

export default Box
