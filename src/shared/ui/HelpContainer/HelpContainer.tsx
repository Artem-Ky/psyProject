import { type ReactNode, useEffect, useState, useCallback, useRef } from 'react'
import { createPortal } from 'react-dom'
import { isMobile } from 'react-device-detect'
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react'
import cn from 'classnames'
import { Button } from '../Button'
import styles from './HelpContainer.module.scss'

interface HelpContainerProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  title?: string
}

const MobileDrawer = ({ isOpen, onClose, children, title }: HelpContainerProps) => {
  const [dragY, setDragY] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const startYRef = useRef(0)
  const drawerRef = useRef<HTMLDivElement>(null)

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const target = e.target as HTMLElement
    if (target.closest(`.${styles.drawerHandle}`)) {
      startYRef.current = e.touches[0].clientY
      setIsDragging(true)
    }
  }, [])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging) return
    
    const currentY = e.touches[0].clientY
    const deltaY = currentY - startYRef.current
    
    if (deltaY > 0) {
      const resistance = 0.5
      const resistedDelta = deltaY * resistance
      setDragY(resistedDelta)
    }
  }, [isDragging])

  const handleTouchEnd = useCallback(() => {
    if (!isDragging) return
    
    if (dragY > 100) {
      onClose()
    }
    
    setDragY(0)
    setIsDragging(false)
  }, [isDragging, dragY, onClose])

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    const target = e.target as HTMLElement
    if (target.closest(`.${styles.drawerHandle}`)) {
      startYRef.current = e.clientY
      setIsDragging(true)
    }
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return
    
    const deltaY = e.clientY - startYRef.current
    
    if (deltaY > 0) {
      const resistance = 0.5
      const resistedDelta = deltaY * resistance
      setDragY(resistedDelta)
    }
  }, [isDragging])

  const handleMouseUp = useCallback(() => {
    if (!isDragging) return
    
    if (dragY > 100) {
      onClose()
    }
    
    setDragY(0)
    setIsDragging(false)
  }, [isDragging, dragY, onClose])

  useEffect(() => {
    if (isDragging) {
      const handleGlobalMouseUp = () => {
        if (dragY > 100) {
          onClose()
        }
        setDragY(0)
        setIsDragging(false)
      }
      
      document.addEventListener('mouseup', handleGlobalMouseUp)
      return () => document.removeEventListener('mouseup', handleGlobalMouseUp)
    }
  }, [isDragging, dragY, onClose])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen) return null

  const drawerStyle = {
    transform: dragY > 0 ? `translateY(${dragY}px)` : undefined,
    transition: isDragging ? 'none' : 'transform 0.3s ease',
  }

  return createPortal(
    <div 
      className={styles.drawerOverlay} 
      onClick={onClose}
      style={{ opacity: dragY > 0 ? 1 - (dragY / 300) : 1 }}
    >
      <div
        ref={drawerRef}
        className={cn(styles.drawer, { [styles.drawerOpen]: isOpen })}
        style={drawerStyle}
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <div className={styles.drawerHandle}>
          <div className={styles.handleBar} />
        </div>
        
        {title && <h2 className={styles.drawerTitle}>{title}</h2>}
        
        <OverlayScrollbarsComponent
          className={styles.drawerContent}
          options={{
            scrollbars: { autoHide: 'scroll' },
          }}
        >
          {children}
        </OverlayScrollbarsComponent>
        
        <div className={styles.drawerFooter}>
          <Button variant="primary" fullWidth onClick={onClose}>
            Я всё понял
          </Button>
        </div>
      </div>
    </div>,
    document.body
  )
}

const DesktopModal = ({ isOpen, onClose, children, title }: HelpContainerProps) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return createPortal(
    <div className={styles.modalOverlay} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className={styles.modalHeader}>
          {title && <h2 className={styles.modalTitle}>{title}</h2>}
          <Button
            variant="ghost"
            size="sm"
            round
            icon="✕"
            onClick={onClose}
            aria-label="Закрыть"
          />
        </div>
        <div className={styles.modalContent}>{children}</div>
      </div>
    </div>,
    document.body
  )
}

export const HelpContainer = (props: HelpContainerProps) => {
  if (isMobile) {
    return <MobileDrawer {...props} />
  }
  return <DesktopModal {...props} />
}
