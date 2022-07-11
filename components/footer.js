import Head from 'next/head'
import styles from '../styles/Footer.module.css'

export default function Footer ( ) {
    return (
        <>
            <div className={styles.footer}>
                <p>hello there</p>
                <p>The source code for this project is <u><a href="https://github.com">available on GitHub</a></u>. Built with Next.js</p>
                

            </div>
        </>
    )
}