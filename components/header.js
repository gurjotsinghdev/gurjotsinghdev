import Head from 'next/head'
import styles from '../styles/Header.module.css'

export default function Header ( ) {
    return (
        <>
            <div className={styles.header}>
                <h1 classname={styles.logo}> G. </h1>
                <div className={styles.mainMenu}>
                    <p>Work</p>
                    <p>About</p>
                </div>
            </div>
        </>
    )
}