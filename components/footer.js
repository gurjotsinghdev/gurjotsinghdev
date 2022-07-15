import Head from 'next/head'
import styles from '../styles/Footer.module.css'

export default function Footer ( ) {
    return (
        <>
            <div className={styles.footer}>
                <p className={styles.footerTitle}>Built with Next.js</p>
                <p className={styles.footerText}>The source code for this project is <u><a href="https://github.com">available on GitHub</a></u>.</p>
            
            </div>
        </>
    )
}