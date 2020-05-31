import styles from './layout.module.css'

export function Layout({ children }: {children: React.ReactNode}) {
    return (
        <div className={styles.container}>
            {children}
        </div>
    )
}
  