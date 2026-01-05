import { useState, useEffect } from 'react'
import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import { isMobile } from 'react-device-detect'
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

  useEffect(() => {
    if (isMobile && isDragging) {
      document.body.style.overflow = 'hidden'
      document.body.style.touchAction = 'none'
    } else {
      document.body.style.overflow = ''
      document.body.style.touchAction = ''
    }
    
    return () => {
      document.body.style.overflow = ''
      document.body.style.touchAction = ''
    }
  }, [isDragging])

  const rotationFactor = isMobile ? 15 : 10
  const rotation = Math.min(Math.max(dragDelta.x / rotationFactor, -45), 45)
  
  const threshold = isMobile ? 40 : 50
  const swipeDirection = dragDelta.x > threshold ? 'right' : dragDelta.x < -threshold ? 'left' : null
  const swipeProgress = Math.min(Math.abs(dragDelta.x) / 100, 1)

  const style = transform
    ? {
        transform: `${CSS.Translate.toString(transform)} rotate(${rotation}deg)`,
        transition: isDragging ? 'none' : 'transform 0.3s ease',
      }
    : undefined

  return (
    <div className={cn(styles.cardWrapper, { [styles.mobile]: isMobile })}>
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
        
        {isMobile && isDragging && swipeDirection && (
          <div 
            className={cn(styles.mobileOverlay, {
              [styles.overlayRight]: swipeDirection === 'right',
              [styles.overlayLeft]: swipeDirection === 'left',
            })}
            style={{ opacity: swipeProgress }}
          >
            <span className={styles.overlayIcon}>
              {swipeDirection === 'right' ? '✓' : '✗'}
            </span>
          </div>
        )}
        
        {!isMobile && swipeDirection && (
          <div className={cn(styles.swipeIndicator, styles[`indicator${swipeDirection === 'right' ? 'Right' : 'Left'}`])}>
            {swipeDirection === 'right' ? '✓' : '✗'}
          </div>
        )}
      </div>
    </div>
  )
}
