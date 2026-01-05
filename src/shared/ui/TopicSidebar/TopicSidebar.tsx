import cn from 'classnames'
import styles from './TopicSidebar.module.scss'

interface Topic {
  id: string
  name: string
}

interface TopicSidebarProps {
  topics: Topic[]
  selectedTopic: string | null
  onSelectTopic: (topicId: string) => void
  className?: string
}

export const TopicSidebar = ({
  topics,
  selectedTopic,
  onSelectTopic,
  className,
}: TopicSidebarProps) => {
  return (
    <aside className={cn(styles.sidebar, className)}>
      <h2 className={styles.title}>Темы</h2>
      <ul className={styles.list}>
        {topics.map((topic) => (
          <li key={topic.id}>
            <button
              className={cn(styles.topicButton, {
                [styles.active]: selectedTopic === topic.id,
              })}
              onClick={() => onSelectTopic(topic.id)}
            >
              {topic.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  )
}
