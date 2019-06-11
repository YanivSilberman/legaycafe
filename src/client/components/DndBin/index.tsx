import * as React from 'react';
import { useDrop } from 'react-dnd';
import customTheme from '../../lib/theme';

export const ItemTypes = {
  REMOVER: 'remover',
  ADDER: 'adder'
}

interface DustbinProps {
  children: any;
  style: any;
  accept: string;
  onDrop: (item: any) => void;
}

const Dustbin: React.FC<DustbinProps> = ({
  children,
  style,
  accept,
  onDrop
}) => {
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: ItemTypes[accept],
    drop: onDrop,
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  })

  const isActive = canDrop && isOver;
  let backgroundColor = 'inherit';
  if (isActive) {
    backgroundColor = '#bdbdbd';
  } else if (canDrop) {
    backgroundColor = '#bdbdbd';
  }

  return (
    <div ref={drop} className={style} style={{ backgroundColor }}>
      {children}
    </div>
  )
}

export default Dustbin
