import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'

import pokeball from '../public/pokeball.png'
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
                    <Link href="/about"><a>Blog</a></Link>
                    <Link href="/"><a>
                    <Image
                        src={pokeball}
                        alt="Picture of the author"
                        className={styles.pokeball}
                        width={35}
                        height={35}
                    />
                    </a>
                    </Link>

                </div>
            </div>
        </>
    )
}