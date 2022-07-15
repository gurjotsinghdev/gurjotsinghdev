import Head from 'next/head'
import styles from '../styles/Footer.module.css'

export default function Footer ( ) {
    return (
        <>
            <div className={styles.footer}>
                <p className={styles.footerTitle}>Built with <u><a href="https://www.youtube.com/watch?v=rmru_nIRf9Q&t=727s">Hukam</a></u>, <u><a href="https://www.youtube.com/watch?v=CZqNR42LjlU&t=43s">Kirtan</a></u> & <u><a href="https://nextjs.org/">Next.js</a></u></p>
                <p className={styles.footerText}>Source code <u><a href="https://github.com">available on GitHub</a></u>.</p>
            
            </div>
        </>
    )
}