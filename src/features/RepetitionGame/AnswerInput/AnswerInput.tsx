import { useState } from 'react'
import cn from 'classnames'
import { Button } from '@shared/ui'
import styles from './AnswerInput.module.scss'

interface AnswerInputProps {
  onSubmit: (answer: string) => void
  className?: string
}

export const AnswerInput = ({ onSubmit, className }: AnswerInputProps) => {
  const [value, setValue] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (value.trim()) {
      onSubmit(value.trim())
      setValue('')
    }
  }

  return (
    <form className={cn(styles.form, className)} onSubmit={handleSubmit}>
      <textarea
        className={styles.input}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Введите ваш ответ..."
        rows={5}
      />
      <Button type="submit" variant="primary" fullWidth>
        Отправить
      </Button>
    </form>
  )
}
