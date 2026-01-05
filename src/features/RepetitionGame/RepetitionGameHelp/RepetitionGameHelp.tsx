import { useState } from 'react'
import { isMobile } from 'react-device-detect'
import { HelpContainer, Button } from '@shared/ui'
import styles from './RepetitionGameHelp.module.scss'

interface RepetitionGameHelpProps {
  className?: string
}

export const RepetitionGameHelp = ({ className }: RepetitionGameHelpProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button
        variant="accent"
        size="sm"
        round
        icon="?"
        onClick={() => setIsOpen(true)}
        aria-label="Правила игры"
        className={className}
      />

      <HelpContainer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Правила игры «Повторение»"
      >
        <div className={styles.content}>
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Цель игры</h3>
            <p className={styles.text}>
              Повторить и закрепить психологические термины. На карточке показывается термин, 
              ваша задача — вспомнить его определение.
            </p>
          </section>

          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Как играть</h3>
            
            <div className={styles.instructions}>
              <div className={styles.instruction}>
                <div className={styles.instructionVisual}>
                  <div className={styles.cardDemo}>
                    <div className={styles.cardDemoInner}>Термин</div>
                    <span className={styles.checkIcon}>✓</span>
                  </div>
                </div>
                <p className={styles.instructionText}>
                  {isMobile ? (
                    <><strong>Свайп вправо</strong> — если вы знаете ответ (верно)</>
                  ) : (
                    <><strong>Кнопка ✓</strong> — если вы знаете ответ (верно)</>
                  )}
                </p>
              </div>

              <div className={styles.instruction}>
                <div className={styles.instructionVisual}>
                  <div className={styles.cardDemo}>
                    <span className={styles.crossIcon}>✗</span>
                    <div className={styles.cardDemoInner}>Термин</div>
                  </div>
                </div>
                <p className={styles.instructionText}>
                  {isMobile ? (
                    <><strong>Свайп влево</strong> — если не знаете ответ (неверно)</>
                  ) : (
                    <><strong>Кнопка ✗</strong> — если не знаете ответ (неверно)</>
                  )}
                </p>
              </div>

              {!isMobile && (
                <div className={styles.instruction}>
                  <div className={styles.instructionVisual}>
                    <div className={styles.dragDemo}>
                      <div className={styles.cardDemoSmall}>
                        Термин
                        <span className={styles.dragCursor}>✋</span>
                      </div>
                    </div>
                  </div>
                  <p className={styles.instructionText}>
                    Карточку можно <strong>перетащить</strong> мышкой влево или вправо
                  </p>
                </div>
              )}

              <div className={styles.instruction}>
                <div className={styles.instructionVisual}>
                  <div className={styles.flipDemo}>
                    <div className={styles.flipCard}>
                      <span>🔄</span>
                    </div>
                  </div>
                </div>
                <p className={styles.instructionText}>
                  <strong>Кнопка «Показать ответ»</strong> — перевернёт карточку и покажет определение
                </p>
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>После прохождения</h3>
            <p className={styles.text}>
              В конце вы увидите результат. Если были ошибки, можно повторить только те термины, 
              на которые вы ответили неверно.
            </p>
          </section>
        </div>
      </HelpContainer>
    </>
  )
}
