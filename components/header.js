import Head from 'next/head'
import Link from 'next/link'

import styles from '../styles/Header.module.css'

export default function Header ( ) {
    return (
        <>
            <div className={styles.header}>
                <h1 className={styles.logo}> 
                <Link href="/"><a>G.</a></Link> 
                </h1>
                <div className={styles.mainMenu}>
                    <Link href="/work"><a>Work</a></Link>
                    <Link href="/about"><a>About</a></Link>
                </div>
            </div>
        </>
    )
}