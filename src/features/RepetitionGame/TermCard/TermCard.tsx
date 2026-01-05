import { useState, useEffect } from 'react'
import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import cn from 'classnames'
import styles from './TermCard.module.scss'

interface TermCardProps {
  term: string
  definition: string
  isFlipped: boolean
  onDragStateChange?: (isDragging: boolean) => void
}

export const TermCard = ({
  term,
  definition,
  isFlipped,
  onDragStateChange,
}: TermCardProps) => {
  const [dragDelta, setDragDelta] = useState({ x: 0, y: 0 })
  
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: 'term-card',
  })

  useEffect(() => {
    if (transform) {
      setDragDelta({ x: transform.x, y: transform.y })
    } else {
      setDragDelta({ x: 0, y: 0 })
    }
  }, [transform])

  useEffect(() => {
    onDragStateChange?.(isDragging)
  }, [isDragging, onDragStateChange])

  const rotation = Math.min(Math.max(dragDelta.x / 10, -45), 45)
  
  const swipeDirection = dragDelta.x > 50 ? 'right' : dragDelta.x < -50 ? 'left' : null

  const style = transform
    ? {
        transform: `${CSS.Translate.toString(transform)} rotate(${rotation}deg)`,
        transition: isDragging ? 'none' : 'transform 0.3s ease',
      }
    : undefined

  return (
    <div className={styles.cardWrapper}>
      <div
        ref={setNodeRef}
        className={cn(styles.card, {
          [styles.flipped]: isFlipped,
          [styles.dragging]: isDragging,
          [styles.swipeRight]: swipeDirection === 'right',
          [styles.swipeLeft]: swipeDirection === 'left',
        })}
        style={style}
        {...listeners}
        {...attributes}
      >
        <div className={styles.cardInner}>
          <div className={styles.cardFront}>
            <p className={styles.term}>{term}</p>
          </div>
          <div className={styles.cardBack}>
            <p className={styles.definition}>{definition}</p>
          </div>
        </div>
        
        {swipeDirection && (
          <div className={cn(styles.swipeIndicator, styles[`indicator${swipeDirection === 'right' ? 'Right' : 'Left'}`])}>
            {swipeDirection === 'right' ? '✓' : '✗'}
          </div>
        )}
      </div>
    </div>
  )
}
